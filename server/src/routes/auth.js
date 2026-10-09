const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const { signToken, requireAuth } = require("../middleware/auth");
const { makeLimiter } = require("../middleware/security");

// Máximo 10 intentos FALLIDOS de login por IP cada 15 min (frena ataques de fuerza bruta)
const loginLimiter = makeLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true, // solo cuentan los intentos fallidos
  message: "Demasiados intentos. Espera unos minutos e intenta de nuevo.",
});

// Y además 10 intentos fallidos por CORREO: aunque el atacante cambie de IP, no puede probar
// contraseñas sin fin contra una misma cuenta.
const emailLimiter = makeLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  key: (req) => `login:${String(req.body?.email ?? "").trim().toLowerCase().slice(0, 150)}`,
  message: "Demasiados intentos con esa cuenta. Espera unos minutos e intenta de nuevo.",
});

// Hash de mentira: cuando el correo NO existe, comparamos contra este para que la respuesta
// tarde lo mismo que cuando sí existe (así no se puede adivinar qué correos son usuarios).
const DUMMY_HASH = bcrypt.hashSync("contraseña-de-mentira", 10);

// POST /api/auth/login — { email, password } -> { token, user }
router.post("/login", loginLimiter, emailLimiter, async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({ error: "Correo y contraseña son obligatorios" });
    }
    // bcrypt solo mira los primeros 72 caracteres: no tiene sentido aceptar textos enormes
    if (email.length > 150 || password.length > 200) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    const user = await User.findOne({ where: { email } });
    const valid = user ? await user.checkPassword(password) : (await bcrypt.compare(password, DUMMY_HASH), false);
    // Mismo mensaje si el correo no existe o la contraseña está mal (no revela cuál falló)
    if (!valid) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    res.json({ token: signToken(user), user: user.toPublic() });
  } catch (error) {
    console.error("Error en login:", error.message);
    res.status(500).json({ error: "No se pudo iniciar sesión. Intenta de nuevo." });
  }
});

// GET /api/auth/me — devuelve el usuario dueño del token (para mantener la sesión al recargar)
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user.toPublic() });
});

module.exports = router;

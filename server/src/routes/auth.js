const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const User = require("../models/User");
const { signToken, requireAuth } = require("../middleware/auth");

// Máximo 10 intentos FALLIDOS de login por IP cada 15 min (frena ataques de fuerza bruta)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true, // solo cuentan los intentos fallidos
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Demasiados intentos. Espera unos minutos e intenta de nuevo." },
});

// POST /api/auth/login — { email, password } -> { token, user }
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({ error: "Correo y contraseña son obligatorios" });
    }

    const user = await User.findOne({ where: { email } });
    // Mismo mensaje si el correo no existe o la contraseña está mal (no revela cuál falló)
    if (!user || !(await user.checkPassword(password))) {
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

// Middlewares de autenticación: leen el token JWT que manda el frontend
// en el header "Authorization: Bearer <token>".
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Falta JWT_SECRET en el archivo .env");
  // Una clave corta se puede adivinar por fuerza bruta: exigimos al menos 32 caracteres
  if (secret.length < 32) throw new Error("JWT_SECRET es muy corta (mínimo 32 caracteres)");
  return secret;
}

function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, getSecret(), { algorithm: "HS256", expiresIn: "2h" });
}

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Inicia sesión para continuar" });

    const payload = jwt.verify(token, getSecret(), { algorithms: ["HS256"] });
    const user = await User.findByPk(payload.sub);
    if (!user) return res.status(401).json({ error: "Sesión inválida" });

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Sesión inválida o expirada" });
    }
    console.error("Error en requireAuth:", error.message);
    res.status(500).json({ error: "Error de autenticación" });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "No tienes permiso para esto" });
  }
  next();
}

module.exports = { signToken, requireAuth, requireAdmin };

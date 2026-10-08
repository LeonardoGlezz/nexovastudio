require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const { ensureColumns } = require("./config/migrate");

// Importar los modelos aquí garantiza que sequelize.sync() cree TODAS las tablas
require("./models/ContactMessage");
require("./models/PortfolioProject");
require("./models/User");

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const portfolioRoutes = require("./routes/portfolio");

const app = express();
const PORT = process.env.PORT || 4000;

// Detrás de un proxy (Render, Railway...) hay que confiar en él para ver la IP real
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);

// ── Middlewares ──
// CLIENT_URL puede traer varias URLs separadas por coma (ej: local + producción)
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "100kb" }));

// ── Rutas ──
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Nexova Studio API funcionando 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/portfolio", portfolioRoutes);

// ── Manejo de rutas no encontradas ──
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ── Manejo de errores (JSON roto, etc.) — nunca expone el stack trace ──
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "El cuerpo de la petición no es un JSON válido" });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "La petición es demasiado grande" });
  }
  console.error("Error no controlado:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

// ── Conectar a la base de datos y levantar el servidor ──
async function start() {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("Falta JWT_SECRET en el archivo .env (mira .env.example)");
    }

    await sequelize.authenticate();
    const { host, port, database } = sequelize.config;
    console.log(`✅ Conectado a MySQL correctamente (${host}:${port} / ${database})`);

    // Sincroniza los modelos con la base de datos (crea las tablas si no existen)
    await sequelize.sync();
    console.log("✅ Tablas sincronizadas");
    await ensureColumns();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor Nexova Studio corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error.message);
    console.log("👉 Revisa que la base de datos esté accesible y tu archivo .env esté bien configurado");
    process.exit(1);
  }
}

start();

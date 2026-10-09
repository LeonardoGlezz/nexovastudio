require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const sequelize = require("./config/database");
const { ensureColumns } = require("./config/migrate");
const { makeLimiter } = require("./middleware/security");

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
if (process.env.NODE_ENV === "production") app.set("trust proxy", Number(process.env.TRUST_PROXY_HOPS) || 1);

// ── Middlewares ──
// CLIENT_URL puede traer varias URLs separadas por coma (ej: local + producción)
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
// Helmet agrega cabeceras de seguridad y quita "x-powered-by: Express" (que revela tu tecnología)
app.use(helmet());
app.use(cors({ origin: allowedOrigins, methods: ["GET", "POST"], allowedHeaders: ["Content-Type", "Authorization"], maxAge: 600 }));
app.use(express.json({ limit: "20kb" })); // el formulario más grande cabe de sobra en 20 KB

// Límite global: 120 peticiones por minuto por visitante. Frena avalanchas que quieran "tumbar" la API.
app.use("/api", makeLimiter({ windowMs: 60 * 1000, limit: 120, message: "Demasiadas peticiones. Intenta en un momento." }));

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
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      throw new Error("Falta JWT_SECRET en el .env, o es muy corta (mínimo 32 caracteres; mira .env.example)");
    }

    await sequelize.authenticate();
    const { host, port, database } = sequelize.config;
    console.log(`✅ Conectado a MySQL correctamente (${host}:${port} / ${database})`);

    // Crea las tablas y columnas que falten. Para producción endurecida se puede apagar con
    // DB_AUTO_SYNC=false, y así el usuario de la base no necesita permiso de CREATE ni ALTER.
    if (String(process.env.DB_AUTO_SYNC).toLowerCase() !== "false") {
      await sequelize.sync();
      console.log("✅ Tablas sincronizadas");
      await ensureColumns();
    } else {
      console.log("⏭  DB_AUTO_SYNC=false: no se tocan las tablas al arrancar");
    }

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

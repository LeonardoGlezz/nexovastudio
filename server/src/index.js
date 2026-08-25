require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const contactRoutes = require("./routes/contact");
const portfolioRoutes = require("./routes/portfolio");

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middlewares ──
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// ── Rutas ──
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Nexova Studio API funcionando 🚀" });
});

app.use("/api/contact", contactRoutes);
app.use("/api/portfolio", portfolioRoutes);

// ── Manejo de rutas no encontradas ──
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ── Conectar a la base de datos y levantar el servidor ──
async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a MySQL correctamente");

    // Sincroniza los modelos con la base de datos (crea las tablas si no existen)
    await sequelize.sync();
    console.log("✅ Tablas sincronizadas");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor Nexova Studio corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error.message);
    console.log("👉 Revisa que MySQL esté corriendo y tu archivo .env esté bien configurado");
  }
}

start();

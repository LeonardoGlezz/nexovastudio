// Configuración de conexión a MySQL usando Sequelize.
// Sirve igual para MySQL local (XAMPP) que para una base en la nube (TiDB Cloud, Aiven, Railway...).
// Lo único que cambia es el archivo .env — el código no se toca.
require("dotenv").config();
const { Sequelize } = require("sequelize");

// Las bases en la nube (TiDB, Aiven, PlanetScale...) exigen conexión cifrada.
// Pon DB_SSL=true en el .env y se activa TLS automáticamente.
// Si la base NO está en tu computadora, el cifrado es obligatorio aunque se te olvide DB_SSL
// (solo se apaga a propósito con DB_SSL=false).
const dbHost = process.env.DB_HOST || "localhost";
const isLocalDb = ["localhost", "127.0.0.1", "::1"].includes(dbHost);
const sslSetting = String(process.env.DB_SSL).toLowerCase();
const useSSL = sslSetting === "true" || (!isLocalDb && sslSetting !== "false");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || null,
  {
    host: dbHost,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false, // pon esto en console.log si quieres ver las queries SQL
    // Tope de conexiones abiertas: si llega una avalancha de visitas, la base no se satura
    pool: { max: 8, min: 0, acquire: 20000, idle: 10000 },
    dialectOptions: {
      connectTimeout: 15000,
      ...(useSSL ? { ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true } } : {}),
    },
    define: {
      timestamps: true, // agrega createdAt / updatedAt automáticamente
    },
  }
);

module.exports = sequelize;

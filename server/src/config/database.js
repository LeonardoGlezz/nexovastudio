// Configuración de conexión a MySQL usando Sequelize.
// Sirve igual para MySQL local (XAMPP) que para una base en la nube (TiDB Cloud, Aiven, Railway...).
// Lo único que cambia es el archivo .env — el código no se toca.
require("dotenv").config();
const { Sequelize } = require("sequelize");

// Las bases en la nube (TiDB, Aiven, PlanetScale...) exigen conexión cifrada.
// Pon DB_SSL=true en el .env y se activa TLS automáticamente.
const useSSL = String(process.env.DB_SSL).toLowerCase() === "true";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || null,
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false, // pon esto en console.log si quieres ver las queries SQL
    dialectOptions: useSSL
      ? { ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true } }
      : {},
    define: {
      timestamps: true, // agrega createdAt / updatedAt automáticamente
    },
  }
);

module.exports = sequelize;

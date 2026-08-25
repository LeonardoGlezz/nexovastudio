// Configuración de conexión a MySQL usando Sequelize (el mismo ORM que ya conoces)
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false, // pon esto en console.log si quieres ver las queries SQL
    define: {
      timestamps: true, // agrega createdAt / updatedAt automáticamente
    },
  }
);

module.exports = sequelize;

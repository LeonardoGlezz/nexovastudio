// Modelo: cada proyecto de tu portafolio (así lo puedes editar sin tocar código)
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PortfolioProject = sequelize.define("PortfolioProject", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tag: {
    // Ej: "SaaS · Gestión clínica"
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  emoji: {
    // El emoji/ícono que representa el proyecto en la tarjeta
    type: DataTypes.STRING,
    defaultValue: "💻",
  },
  colorFrom: {
    type: DataTypes.STRING,
    defaultValue: "#5B6EF5",
  },
  colorTo: {
    type: DataTypes.STRING,
    defaultValue: "#3d4bc4",
  },
  stack: {
    // Guardamos como JSON: ["React", "Node.js", "MySQL"]
    type: DataTypes.JSON,
    defaultValue: [],
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = PortfolioProject;

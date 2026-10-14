// Migraciones pequeñas: agrega columnas nuevas a tablas que YA existen.
// Por qué hace falta: sequelize.sync() solo crea tablas que no existen; si le agregas
// un campo a un modelo, NO lo agrega a la tabla vieja. Esta función lo hace.
// Es seguro correrla todas las veces que quieras: si la columna ya está, no hace nada.
const { DataTypes } = require("sequelize");
const sequelize = require("./database");

async function ensureColumns() {
  const qi = sequelize.getQueryInterface();

  const portfolio = await qi.describeTable("PortfolioProjects");
  if (!portfolio.image) {
    await qi.addColumn("PortfolioProjects", "image", { type: DataTypes.STRING, allowNull: true });
    console.log('✅ Migración: columna "image" agregada a PortfolioProjects');
  }

  const contact = await qi.describeTable("ContactMessages");
  if (!contact.budget) {
    await qi.addColumn("ContactMessages", "budget", { type: DataTypes.STRING, allowNull: true });
    console.log('✅ Migración: columna "budget" agregada a ContactMessages');
  }
}

module.exports = { ensureColumns };

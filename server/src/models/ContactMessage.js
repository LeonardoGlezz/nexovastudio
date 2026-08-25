// Modelo: cada mensaje que alguien envía desde el formulario de contacto
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ContactMessage = sequelize.define("ContactMessage", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    // WhatsApp o correo que dejó la persona
    type: DataTypes.STRING,
    allowNull: false,
  },
  interest: {
    // Qué servicio le interesa (chatbot, app móvil, etc.)
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    // Para que tú puedas dar seguimiento: nuevo -> contactado -> cerrado
    type: DataTypes.ENUM("nuevo", "contactado", "cerrado"),
    defaultValue: "nuevo",
  },
});

module.exports = ContactMessage;

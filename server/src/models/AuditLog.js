// Bitácora: un registro de CADA alta, baja y cambio que se hace en el sistema.
// Es "solo de agregar" (append-only): una vez escrito un registro, ya no se puede editar ni borrar,
// para que la trazabilidad sea confiable.
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AuditLog = sequelize.define(
  "AuditLog",
  {
    action: {
      // alta = crear, baja = eliminar, cambio = modificar
      type: DataTypes.ENUM("alta", "baja", "cambio"),
      allowNull: false,
    },
    entity: {
      // sobre qué se actuó: "proyecto" o "mensaje"
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    summary: {
      // texto corto legible: "Proyecto «Nggigua App» eliminado"
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    details: {
      // en los cambios: qué campo pasó de qué valor a cuál
      type: DataTypes.JSON,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // null = lo hizo un visitante (por ejemplo, envió el formulario)
    },
    userEmail: {
      // se guarda el correo tal cual, para que el registro siga siendo legible aunque se borre el usuario
      type: DataTypes.STRING(150),
      allowNull: true,
    },
  },
  {
    updatedAt: false, // un registro nunca se modifica
    // (sin índices extra: la bitácora se lee ordenada por su id, que ya es la llave primaria. Además,
    //  sync() intenta recrear índices con nombre propio en cada arranque y puede fallar)
    hooks: {
      beforeUpdate: () => { throw new Error("La bitácora no se puede modificar"); },
      beforeDestroy: () => { throw new Error("La bitácora no se puede borrar"); },
      beforeBulkUpdate: () => { throw new Error("La bitácora no se puede modificar"); },
      beforeBulkDestroy: () => { throw new Error("La bitácora no se puede borrar"); },
    },
  }
);

module.exports = AuditLog;

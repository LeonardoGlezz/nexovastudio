// Modelo: usuarios con contraseña. La contraseña NUNCA se guarda en texto plano,
// solo su hash bcrypt (se ve como "$2a$10$....").
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database");

const SALT_ROUNDS = 10;

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      // Aquí vive el HASH, no la contraseña real
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      // "admin" puede ver los mensajes de contacto; "user" solo inicia sesión
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    hooks: {
      // Encripta automáticamente al crear...
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      },
      // ...y también si algún día cambias la contraseña de un usuario existente
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        }
      },
    },
  }
);

// Compara la contraseña escrita en el login contra el hash guardado
User.prototype.checkPassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// Versión segura para mandar al frontend (sin el hash)
User.prototype.toPublic = function () {
  return {
    id: this.id,
    name: this.name,
    email: this.email,
    role: this.role,
    createdAt: this.createdAt,
  };
};

module.exports = User;

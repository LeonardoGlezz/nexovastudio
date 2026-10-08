// Crea los usuarios de prueba (con contraseña encriptada) en la base de datos.
// Corre esto con: npm run seed:users
// Es seguro correrlo varias veces: si el usuario ya existe, lo deja como está.
require("dotenv").config();
const sequelize = require("./database");
const User = require("../models/User");

// Contraseñas de DEMOSTRACIÓN para la tarea. En la BD solo se guarda su hash bcrypt.
const usuarios = [
  { name: "Leonardo González", email: "leo@nexovastudio.com", password: "Nexova2026!", role: "admin" },
  { name: "Admin Demo", email: "admin@nexovastudio.com", password: "Admin2026!", role: "admin" },
  { name: "Usuario Prueba", email: "prueba@nexovastudio.com", password: "Prueba2026!", role: "user" },
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    for (const u of usuarios) {
      const [user, created] = await User.findOrCreate({
        where: { email: u.email },
        defaults: u,
      });
      console.log(created ? `✅ Usuario creado: ${user.email}` : `⏭  Ya existía: ${user.email}`);
    }

    console.log("🎉 Usuarios listos en la base de datos");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error en el seed de usuarios:", error.message);
    process.exit(1);
  }
}

seed();

// Crea tu usuario administrador REAL (te pide los datos en la terminal) y, si quieres,
// borra los usuarios de prueba. Corre esto con: npm run admin:create
//
// Por qué así: la contraseña se escribe aquí, en tu terminal, y viaja directo a la base
// de datos ya encriptada. Nunca queda escrita en un archivo ni en el repositorio.
require("dotenv").config();
const readline = require("readline");
const sequelize = require("./database");
const User = require("../models/User");

const DEMO_EMAILS = ["leo@nexovastudio.com", "admin@nexovastudio.com", "prueba@nexovastudio.com"];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
rl.muted = false;
// Mientras "muted" esté activo, lo que escribes se ve como asteriscos
rl._writeToOutput = (text) => {
  if (rl.muted && !/^[\r\n]+$/.test(text)) rl.output.write("*".repeat(text.length));
  else rl.output.write(text);
};

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.muted = false;
      resolve(answer.trim());
    });
    rl.muted = hidden; // se activa DESPUÉS de mostrar la pregunta
  });
}

async function main() {
  await sequelize.authenticate();
  const { host, database } = sequelize.config;
  console.log(`\n📡 Base de datos: ${host} / ${database}\n`);
  await sequelize.sync();

  const name = await ask("Tu nombre completo: ");
  const email = (await ask("Tu correo (será tu usuario para entrar): ")).toLowerCase();
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) throw new Error("Nombre o correo inválido");

  if (await User.findOne({ where: { email } })) throw new Error(`Ya existe un usuario con ${email}`);

  const password = await ask("Contraseña (mínimo 12 caracteres, que NO uses en otro sitio): ", { hidden: true });
  if (password.length < 12) throw new Error("La contraseña debe tener al menos 12 caracteres");
  const lower = password.toLowerCase();
  const weak = ["nexova", "password", "contraseña", "123456", "qwerty", email.split("@")[0]].find((w) => w.length >= 4 && lower.includes(w));
  if (weak) throw new Error("La contraseña es muy fácil de adivinar (contiene algo predecible como el nombre del sitio, tu correo o '123456')");
  const again = await ask("Repite la contraseña: ", { hidden: true });
  if (password !== again) throw new Error("Las contraseñas no coinciden");

  await User.create({ name, email, password, role: "admin" });
  console.log(`\n✅ Administrador creado: ${email}`);

  const present = await User.findAll({ where: { email: DEMO_EMAILS } });
  if (present.length) {
    console.log(`\nSiguen existiendo ${present.length} usuarios de prueba: ${present.map((u) => u.email).join(", ")}`);
    const answer = (await ask("¿Borrarlos ahora? (s/n): ")).toLowerCase();
    if (answer === "s" || answer === "si" || answer === "sí") {
      const removed = await User.destroy({ where: { email: DEMO_EMAILS } });
      console.log(`🗑  ${removed} usuarios de prueba borrados`);
    } else {
      console.log("⏭  Los dejé. Acuérdate de borrarlos antes de publicar la página.");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(`\n❌ ${error.message}`);
    process.exit(1);
  })
  .finally(() => rl.close());

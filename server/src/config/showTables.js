// Muestra en consola las tablas de la base de datos y su contenido.
// Útil como evidencia para la tarea: npm run db:show
require("dotenv").config();
const sequelize = require("./database");

// Recorta textos largos para que las tablas quepan en una captura de pantalla
const short = (v) => (typeof v === "string" && v.length > 62 ? v.slice(0, 59) + "..." : v);

async function show() {
  try {
    await sequelize.authenticate();
    const { host, port, database } = sequelize.config;
    console.log(`\n📡 Conectado a ${host}:${port} — base de datos "${database}"\n`);

    const [rows] = await sequelize.query("SHOW TABLES");
    const tables = rows.map((r) => Object.values(r)[0]);
    console.log("📋 Tablas:", tables.join(", "), "\n");

    for (const table of tables) {
      const [data] = await sequelize.query(`SELECT * FROM \`${table}\``);
      console.log(`── ${table} (${data.length} registros) ──`);
      if (data.length) {
        console.table(data.map((row) => Object.fromEntries(Object.entries(row).map(([k, v]) => [k, short(v)]))));
      }
      else console.log("(vacía)");
      console.log();
    }
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

show();

// Script para llenar la base de datos con tus 3 proyectos reales
// Corre esto UNA VEZ con: node src/config/seed.js
require("dotenv").config();
const sequelize = require("./database");
const PortfolioProject = require("../models/PortfolioProject");
const { ensureColumns } = require("./migrate");

const proyectos = [
  {
    title: "Sistema de gestión para fisioterapia",
    tag: "SaaS · Gestión clínica",
    description:
      "Plataforma SaaS completa para administrar pacientes, citas y tratamientos en clínicas de fisioterapia. Arquitectura pensada para múltiples usuarios y datos sensibles.",
    image: "/projects/fisioterapia.jpg",
    emoji: "🏥",
    colorFrom: "#5B6EF5",
    colorTo: "#3d4bc4",
    stack: ["React", "Node.js", "MySQL"],
    order: 1,
  },
  {
    title: "Plataforma de comercio electrónico",
    tag: "E-commerce",
    description:
      "Tienda en línea completa con catálogo de productos, carrito de compras, gestión de pedidos y panel administrativo para el dueño del negocio.",
    image: "/projects/ecommerce.jpg",
    emoji: "🛒",
    colorFrom: "#A78BFA",
    colorTo: "#7c5cd6",
    stack: ["React", "Laravel", "MySQL"],
    order: 2,
  },
  {
    title: "Punto de venta para gimnasio",
    tag: "Sistema POS",
    description:
      "Sistema de punto de venta con control de membresías, cobros, inventario de productos y reportes de ingresos en tiempo real.",
    image: "/projects/gimnasio.jpg",
    emoji: "💪",
    colorFrom: "#0F6E56",
    colorTo: "#0a4d3d",
    stack: ["React", "Node.js", "ACID / MySQL"],
    order: 3,
  },
  {
    title: "Nggigua App",
    tag: "PWA · Preservación cultural",
    description:
      "Videojuego educativo web para enseñar la lengua indígena Nggigua, pensado para preservar y acercar la lengua a nuevas generaciones.",
    image: "/projects/nggigua.jpg",
    emoji: "🎮",
    colorFrom: "#EF9F27",
    colorTo: "#b8760f",
    stack: ["React", "Tailwind CSS", "Node.js", "PostgreSQL", "Python"],
    order: 4,
  },
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await ensureColumns();

    for (const proyecto of proyectos) {
      const [item, created] = await PortfolioProject.findOrCreate({
        where: { title: proyecto.title },
        defaults: proyecto,
      });
      if (!created && item.image !== proyecto.image) {
        await item.update({ image: proyecto.image }); // proyecto ya existente: solo actualiza su foto
        console.log(`🖼  Foto actualizada: ${item.title}`);
      } else {
        console.log(created ? `✅ Creado: ${item.title}` : `⏭  Ya existía: ${item.title}`);
      }
    }

    console.log("🎉 Seed completado");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error en el seed:", error.message);
    process.exit(1);
  }
}

seed();

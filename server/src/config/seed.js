// Script para llenar la base de datos con tus 3 proyectos reales
// Corre esto UNA VEZ con: node src/config/seed.js
require("dotenv").config();
const sequelize = require("./database");
const PortfolioProject = require("../models/PortfolioProject");

const proyectos = [
  {
    title: "Sistema de gestión para fisioterapia",
    tag: "SaaS · Gestión clínica",
    description:
      "Plataforma SaaS completa para administrar pacientes, citas y tratamientos en clínicas de fisioterapia. Arquitectura pensada para múltiples usuarios y datos sensibles.",
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
    emoji: "💪",
    colorFrom: "#0F6E56",
    colorTo: "#0a4d3d",
    stack: ["React", "Node.js", "ACID / MySQL"],
    order: 3,
  },
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    for (const proyecto of proyectos) {
      const [item, created] = await PortfolioProject.findOrCreate({
        where: { title: proyecto.title },
        defaults: proyecto,
      });
      console.log(created ? `✅ Creado: ${item.title}` : `⏭  Ya existía: ${item.title}`);
    }

    console.log("🎉 Seed completado");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error en el seed:", error.message);
    process.exit(1);
  }
}

seed();

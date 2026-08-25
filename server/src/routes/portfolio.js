const express = require("express");
const router = express.Router();
const PortfolioProject = require("../models/PortfolioProject");

// GET /api/portfolio — devuelve los proyectos publicados, en orden
router.get("/", async (req, res) => {
  try {
    const projects = await PortfolioProject.findAll({
      where: { published: true },
      order: [["order", "ASC"]],
    });
    res.json(projects);
  } catch (error) {
    console.error("Error obteniendo portafolio:", error);
    res.status(500).json({ error: "No se pudo cargar el portafolio" });
  }
});

// POST /api/portfolio — agrega un nuevo proyecto (lo usarás tú desde Postman o un panel admin futuro)
router.post("/", async (req, res) => {
  try {
    const project = await PortfolioProject.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creando proyecto:", error);
    res.status(500).json({ error: "No se pudo crear el proyecto" });
  }
});

module.exports = router;

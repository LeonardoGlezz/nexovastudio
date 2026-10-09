const express = require("express");
const router = express.Router();
const PortfolioProject = require("../models/PortfolioProject");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { validatePortfolio } = require("../utils/validatePortfolio");

// GET /api/portfolio — devuelve los proyectos publicados, en orden (público)
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

// POST /api/portfolio — agrega un proyecto. SOLO admins con sesión iniciada
// (manda el token en el header "Authorization: Bearer <token>").
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { error, data } = validatePortfolio(req.body);
    if (error) return res.status(400).json({ error });

    const project = await PortfolioProject.create(data);
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creando proyecto:", error);
    res.status(500).json({ error: "No se pudo crear el proyecto" });
  }
});

module.exports = router;

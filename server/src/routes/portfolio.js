const express = require("express");
const router = express.Router();
const sequelize = require("../config/database");
const PortfolioProject = require("../models/PortfolioProject");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { validatePortfolio } = require("../utils/validatePortfolio");
const { logChange, diff } = require("../services/audit");

const FIELDS = ["title", "tag", "description", "emoji", "image", "colorFrom", "colorTo", "stack", "order", "published"];
const admin = [requireAuth, requireAdmin];

const parseId = (value) => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
};

// GET /api/portfolio — los proyectos PUBLICADOS, en orden (público: lo que ve la página)
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

// GET /api/portfolio/all — TODOS los proyectos, publicados o no (solo admins, para el panel)
router.get("/all", ...admin, async (req, res) => {
  try {
    res.json(await PortfolioProject.findAll({ order: [["order", "ASC"], ["id", "ASC"]] }));
  } catch (error) {
    console.error("Error listando proyectos:", error);
    res.status(500).json({ error: "No se pudieron cargar los proyectos" });
  }
});

// ALTA — POST /api/portfolio
router.post("/", ...admin, async (req, res) => {
  try {
    const { error, data } = validatePortfolio(req.body);
    if (error) return res.status(400).json({ error });

    // Transacción: se guarda el proyecto Y su registro en la bitácora, o ninguno de los dos
    const project = await sequelize.transaction(async (t) => {
      const created = await PortfolioProject.create(data, { transaction: t });
      await logChange(
        { action: "alta", entity: "proyecto", entityId: created.id, summary: `Proyecto «${created.title}» creado`, user: req.user },
        t
      );
      return created;
    });
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creando proyecto:", error);
    res.status(500).json({ error: "No se pudo crear el proyecto" });
  }
});

// CAMBIO — PUT /api/portfolio/:id
router.put("/:id", ...admin, async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Id inválido" });

    const { error, data } = validatePortfolio(req.body);
    if (error) return res.status(400).json({ error });
    // validatePortfolio ignora image vacía; en una edición, vaciarla significa "quitar la foto"
    if (req.body.image === "" || req.body.image === null) data.image = null;

    const result = await sequelize.transaction(async (t) => {
      const project = await PortfolioProject.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
      if (!project) return null;

      // Copia REAL del registro antes de editarlo (get() devuelve una referencia viva que se modificaría)
      const before = { ...project.get({ plain: true }) };
      await project.update(data, { transaction: t });
      const changes = diff(before, project.get({ plain: true }), FIELDS);

      // Si no cambió nada, no se escribe nada en la bitácora
      if (Object.keys(changes).length) {
        await logChange(
          {
            action: "cambio", entity: "proyecto", entityId: id, details: changes, user: req.user,
            summary: `Proyecto «${project.title}» modificado (${Object.keys(changes).join(", ")})`,
          },
          t
        );
      }
      return project;
    });

    if (!result) return res.status(404).json({ error: "Proyecto no encontrado" });
    res.json(result);
  } catch (error) {
    console.error("Error editando proyecto:", error);
    res.status(500).json({ error: "No se pudo guardar el cambio" });
  }
});

// BAJA — DELETE /api/portfolio/:id
router.delete("/:id", ...admin, async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Id inválido" });

    const removed = await sequelize.transaction(async (t) => {
      const project = await PortfolioProject.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
      if (!project) return null;
      const title = project.title;
      await project.destroy({ transaction: t });
      // La bitácora conserva el nombre, para que se sepa QUÉ se eliminó aunque el registro ya no exista
      await logChange({ action: "baja", entity: "proyecto", entityId: id, summary: `Proyecto «${title}» eliminado`, user: req.user }, t);
      return title;
    });

    if (!removed) return res.status(404).json({ error: "Proyecto no encontrado" });
    res.json({ success: true });
  } catch (error) {
    console.error("Error eliminando proyecto:", error);
    res.status(500).json({ error: "No se pudo eliminar el proyecto" });
  }
});

module.exports = router;

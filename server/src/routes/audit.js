const express = require("express");
const router = express.Router();
const AuditLog = require("../models/AuditLog");
const { requireAuth, requireAdmin } = require("../middleware/auth");

// GET /api/audit?limit=100 — la bitácora, lo más reciente primero. Solo lectura y solo para admins:
// no existe ninguna ruta para editar o borrar registros de la bitácora.
router.get("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 100, 1), 200);
    const rows = await AuditLog.findAll({ order: [["id", "DESC"]], limit });
    res.json(rows);
  } catch (error) {
    console.error("Error leyendo la bitácora:", error);
    res.status(500).json({ error: "No se pudo cargar la bitácora" });
  }
});

module.exports = router;

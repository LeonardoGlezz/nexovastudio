const express = require("express");
const router = express.Router();
const sequelize = require("../config/database");
const ContactMessage = require("../models/ContactMessage");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { notifyNewContact } = require("../services/notify");
const { validateContact } = require("../utils/validateContact");
const { makeLimiter } = require("../middleware/security");
const { logChange } = require("../services/audit");

const STATUSES = ["nuevo", "contactado", "cerrado"];
const admin = [requireAuth, requireAdmin];

const parseId = (value) => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
};

// Evita que alguien llene tu base de datos de basura: 8 mensajes por IP cada hora
const contactLimiter = makeLimiter({
  windowMs: 60 * 60 * 1000,
  limit: 8,
  message: "Has enviado muchos mensajes. Intenta más tarde o escríbenos por WhatsApp.",
});

// ALTA — POST /api/contact: recibe un mensaje del formulario de la página (público)
router.post("/", contactLimiter, async (req, res) => {
  try {
    // Campo trampa: está escondido en la página, una persona nunca lo llena, un robot sí.
    // Si viene lleno, fingimos éxito (para que el robot no aprenda) pero no guardamos nada.
    if (req.body.nx_hp_8f3k) {
      return res.status(201).json({ success: true, message: "Mensaje recibido.", data: { id: 0 } });
    }

    const { error, data } = validateContact(req.body);
    if (error) return res.status(400).json({ error });

    // Transacción: el mensaje y su registro en la bitácora se guardan juntos o no se guarda ninguno.
    // (La bitácora no copia el nombre ni el contacto: son datos personales, solo queda el número.)
    const newMessage = await sequelize.transaction(async (t) => {
      const created = await ContactMessage.create(data, { transaction: t });
      await logChange({ action: "alta", entity: "mensaje", entityId: created.id, summary: `Mensaje #${created.id} recibido desde el formulario` }, t);
      return created;
    });

    // El aviso por correo NO se espera: si falla, el visitante igual ve "enviado" (ya quedó guardado)
    notifyNewContact(newMessage).catch((err) => console.error("No se pudo mandar el aviso por correo:", err.message));

    res.status(201).json({
      success: true,
      message: "Mensaje recibido. Nexova Studio te contactará pronto.",
      data: { id: newMessage.id },
    });
  } catch (error) {
    console.error("Error guardando mensaje de contacto:", error);
    res.status(500).json({ error: "Algo salió mal. Intenta de nuevo." });
  }
});

// GET /api/contact — lista los mensajes recibidos. SOLO admins con sesión iniciada:
// contiene datos personales de tus clientes, no puede ser público.
router.get("/", ...admin, async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [["createdAt", "DESC"]],
      limit: 500, // tope: nunca devolvemos una lista sin límite
    });
    res.json(messages);
  } catch (error) {
    console.error("Error obteniendo mensajes:", error);
    res.status(500).json({ error: "No se pudieron cargar los mensajes" });
  }
});

// CAMBIO — PATCH /api/contact/:id/status  { status: "nuevo" | "contactado" | "cerrado" }
router.patch("/:id/status", ...admin, async (req, res) => {
  try {
    const id = parseId(req.params.id);
    const status = String(req.body.status ?? "");
    if (!id) return res.status(400).json({ error: "Id inválido" });
    if (!STATUSES.includes(status)) return res.status(400).json({ error: `status debe ser: ${STATUSES.join(", ")}` });

    const result = await sequelize.transaction(async (t) => {
      const msg = await ContactMessage.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
      if (!msg) return null;
      const before = msg.status;
      if (before !== status) {
        await msg.update({ status }, { transaction: t });
        await logChange(
          {
            action: "cambio", entity: "mensaje", entityId: id, user: req.user,
            summary: `Mensaje #${id}: estado «${before}» → «${status}»`,
            details: { status: { de: before, a: status } },
          },
          t
        );
      }
      return msg;
    });

    if (!result) return res.status(404).json({ error: "Mensaje no encontrado" });
    res.json(result);
  } catch (error) {
    console.error("Error cambiando estado:", error);
    res.status(500).json({ error: "No se pudo cambiar el estado" });
  }
});

// BAJA — DELETE /api/contact/:id
router.delete("/:id", ...admin, async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Id inválido" });

    const removed = await sequelize.transaction(async (t) => {
      const msg = await ContactMessage.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
      if (!msg) return false;
      await msg.destroy({ transaction: t });
      await logChange({ action: "baja", entity: "mensaje", entityId: id, summary: `Mensaje #${id} eliminado`, user: req.user }, t);
      return true;
    });

    if (!removed) return res.status(404).json({ error: "Mensaje no encontrado" });
    res.json({ success: true });
  } catch (error) {
    console.error("Error eliminando mensaje:", error);
    res.status(500).json({ error: "No se pudo eliminar el mensaje" });
  }
});

module.exports = router;

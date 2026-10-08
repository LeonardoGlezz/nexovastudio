const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");
const { requireAuth, requireAdmin } = require("../middleware/auth");

// Evita que alguien llene tu base de datos de basura: 15 mensajes por IP cada hora
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Has enviado muchos mensajes. Intenta más tarde o escríbenos por WhatsApp." },
});

const clean = (value, max) => String(value ?? "").trim().slice(0, max);

// POST /api/contact — recibe un mensaje del formulario de la página
router.post("/", contactLimiter, async (req, res) => {
  try {
    const name = clean(req.body.name, 100);
    const contact = clean(req.body.contact, 150);
    const interest = clean(req.body.interest, 100) || null;
    const message = clean(req.body.message, 2000) || null;

    if (!name || !contact) {
      return res.status(400).json({
        error: "Nombre y contacto (WhatsApp o correo) son obligatorios",
      });
    }

    const newMessage = await ContactMessage.create({ name, contact, interest, message });

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
router.get("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(messages);
  } catch (error) {
    console.error("Error obteniendo mensajes:", error);
    res.status(500).json({ error: "No se pudieron cargar los mensajes" });
  }
});

module.exports = router;

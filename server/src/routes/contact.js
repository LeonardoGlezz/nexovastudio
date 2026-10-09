const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { notifyNewContact } = require("../services/notify");
const { validateContact } = require("../utils/validateContact");
const { makeLimiter } = require("../middleware/security");

// Evita que alguien llene tu base de datos de basura: 8 mensajes por IP cada hora
const contactLimiter = makeLimiter({
  windowMs: 60 * 60 * 1000,
  limit: 8,
  message: "Has enviado muchos mensajes. Intenta más tarde o escríbenos por WhatsApp.",
});

// POST /api/contact — recibe un mensaje del formulario de la página
router.post("/", contactLimiter, async (req, res) => {
  try {
    // Campo trampa: está escondido en la página, una persona nunca lo llena, un robot sí.
    // Si viene lleno, fingimos éxito (para que el robot no aprenda) pero no guardamos nada.
    if (req.body.website) {
      return res.status(201).json({ success: true, message: "Mensaje recibido.", data: { id: 0 } });
    }

    const { error, data } = validateContact(req.body);
    if (error) return res.status(400).json({ error });

    const newMessage = await ContactMessage.create(data);

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
router.get("/", requireAuth, requireAdmin, async (req, res) => {
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

module.exports = router;

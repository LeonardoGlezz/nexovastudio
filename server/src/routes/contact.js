const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

// POST /api/contact — recibe un mensaje del formulario de la página
router.post("/", async (req, res) => {
  try {
    const { name, contact, interest, message } = req.body;

    if (!name || !contact) {
      return res.status(400).json({
        error: "Nombre y contacto (WhatsApp o correo) son obligatorios",
      });
    }

    const newMessage = await ContactMessage.create({
      name,
      contact,
      interest,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Mensaje recibido. Nexova Studio te contactará pronto.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error guardando mensaje de contacto:", error);
    res.status(500).json({ error: "Algo salió mal. Intenta de nuevo." });
  }
});

// GET /api/contact — lista todos los mensajes recibidos (para tu panel admin, más adelante)
router.get("/", async (req, res) => {
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

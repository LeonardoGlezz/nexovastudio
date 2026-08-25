import { useState } from "react";
import { sendContactMessage } from "../api";

// 👉 EDITA ESTOS DATOS con tu información real cuando la tengas lista
const CONTACT_INFO = {
  whatsapp: "2226709233", // tu número con código de país, ej: 522381234567
  email: "contacto.nexovastudio@gmail.com",
  instagram: "https://www.instagram.com/nexovastudio_/",
  facebook: "#",
  linkedin: "https://www.linkedin.com/in/leonardo-gonz%C3%A1lez-cuevas-4ab742219/",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", interest: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      await sendContactMessage(form);
      setStatus("success");
      setForm({ name: "", contact: "", interest: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "No se pudo enviar. Intenta por WhatsApp directo.");
    }
  }

  return (
    <section id="contacto">
      <div className="contact-box">
        <h3>
          Empecemos a construir
          <br />
          algo juntos
        </h3>
        <p>Cuéntame qué necesitas. Te respondo en menos de 24 horas con una propuesta o una llamada para platicar.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tu nombre</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="¿Cómo te llamas?" required />
          </div>
          <div className="form-group">
            <label>WhatsApp o correo</label>
            <input type="text" name="contact" value={form.contact} onChange={handleChange} placeholder="Para responderte rápido" required />
          </div>
          <div className="form-group">
            <label>¿Qué te interesa?</label>
            <select name="interest" value={form.interest} onChange={handleChange}>
              <option value="">Selecciona una opción</option>
              <option>Chatbot inteligente</option>
              <option>Sistema de ventas digital</option>
              <option>Automatización de procesos</option>
              <option>App móvil a medida</option>
              <option>Videojuego móvil</option>
              <option>Consultoría Tech + IA</option>
              <option>Otro / No sé aún</option>
            </select>
          </div>
          <div className="form-group">
            <label>Cuéntame tu idea (opcional)</label>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="¿Qué problema quieres resolver? ¿Qué hace tu negocio?" />
          </div>

          <button type="submit" className="submit-btn" disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Enviar mensaje →"}
          </button>

          {status === "success" && (
            <p style={{ color: "#8FD16A", fontSize: 13, textAlign: "center" }}>
              ✅ Mensaje enviado y guardado — te contacto en menos de 24h
            </p>
          )}
          {status === "error" && (
            <p style={{ color: "#E24B4A", fontSize: 13, textAlign: "center" }}>
              ⚠️ {errorMsg}
            </p>
          )}
        </form>

        <div className="contact-channels">
          <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hola%20Nexova%20Studio`} target="_blank" rel="noreferrer" className="channel-btn">💬 WhatsApp</a>
          <a href={`mailto:${CONTACT_INFO.email}`} className="channel-btn">✉️ Correo</a>
          <a href={CONTACT_INFO.instagram} target="_blank" rel="noreferrer" className="channel-btn">📷 Instagram</a>
          <a href={CONTACT_INFO.facebook} target="_blank" rel="noreferrer" className="channel-btn">📘 Facebook</a>
          <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer" className="channel-btn">💼 LinkedIn</a>
        </div>
      </div>
    </section>
  );
}

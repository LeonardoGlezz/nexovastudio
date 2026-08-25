import { useState } from "react";
import { sendContactMessage } from "../api";

// 👉 EDITA ESTOS DATOS con tu información real
const CONTACT_INFO = {
  whatsapp: "522226709233",           // con código de país (52 = México)
  whatsappLabel: "222 670 9233",
  email: "contacto.nexovastudio@gmail.com",
  instagram: "https://www.instagram.com/nexovastudio_/",
  linkedin: "https://www.linkedin.com/in/leonardo-gonz%C3%A1lez-cuevas-4ab742219/",
};

const INTERESTS = [
  "Consultoría tecnológica",
  "Chatbot para WhatsApp",
  "Automatización de procesos",
  "Software a medida",
  "App móvil",
  "Otro / No sé aún",
];

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
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "No se pudo enviar. Intenta por WhatsApp directo.");
    }
  }

  return (
    <section id="contacto" className="contact">
      <div className="contact-glow"></div>

      <div className="contact-layout">
        <div>
          <div className="eyebrow">08 — Contacto</div>
          <h2 className="sec-title" style={{ marginBottom: 22 }}>
            Empecemos a construir<br />algo juntos
          </h2>
          <p className="contact-intro">
            Cuéntanos qué necesitas. Respondemos en menos de 24 horas con una propuesta o una
            llamada para platicar.
          </p>

          <div className="channels">
            <a className="channel" href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hola%20Nexova%20Studio`} target="_blank" rel="noreferrer">
              <span>
                <span className="channel-label">WhatsApp</span>
                <span className="channel-value">{CONTACT_INFO.whatsappLabel}</span>
              </span>
              <span className="channel-arrow">→</span>
            </a>
            <a className="channel" href={`mailto:${CONTACT_INFO.email}`}>
              <span>
                <span className="channel-label">Correo</span>
                <span className="channel-value">{CONTACT_INFO.email}</span>
              </span>
              <span className="channel-arrow">→</span>
            </a>
            <a className="channel" href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer">
              <span>
                <span className="channel-label">LinkedIn</span>
                <span className="channel-value">Leonardo González Cuevas</span>
              </span>
              <span className="channel-arrow">→</span>
            </a>
            <a className="channel" href={CONTACT_INFO.instagram} target="_blank" rel="noreferrer">
              <span>
                <span className="channel-label">Instagram</span>
                <span className="channel-value">@nexovastudio_</span>
              </span>
              <span className="channel-arrow">→</span>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="nx-name">Tu nombre</label>
            <input id="nx-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="¿Cómo te llamas?" required />
          </div>
          <div className="field">
            <label htmlFor="nx-contact">WhatsApp o correo</label>
            <input id="nx-contact" type="text" name="contact" value={form.contact} onChange={handleChange} placeholder="Para responderte rápido" required />
          </div>
          <div className="field">
            <label htmlFor="nx-interest">¿Qué te interesa?</label>
            <select id="nx-interest" name="interest" value={form.interest} onChange={handleChange}>
              <option value="">Selecciona una opción</option>
              {INTERESTS.map((i) => <option key={i}>{i}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="nx-msg">Cuéntanos tu idea (opcional)</label>
            <textarea id="nx-msg" name="message" value={form.message} onChange={handleChange} placeholder="¿Qué problema quieres resolver? ¿Qué hace tu negocio?" />
          </div>

          <button type="submit" className="btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Enviar mensaje →"}
          </button>

          <div className="form-status">
            {status === "success" && (
              <span className="form-status-ok">Mensaje enviado — te contactamos en menos de 24 h</span>
            )}
            {status === "error" && <span className="form-status-err">{errorMsg}</span>}
          </div>
        </form>
      </div>
    </section>
  );
}

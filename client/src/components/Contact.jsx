import { useEffect, useMemo, useRef, useState } from "react";
import { sendContactMessage } from "../api";
import { validateFields, EMAIL_RE } from "../validate";
import { CONTACT_INFO, whatsappUrl } from "../contactInfo";

const INTERESTS = [
  "Consultoría tecnológica",
  "Chatbot para WhatsApp",
  "Automatización de procesos",
  "Software a medida",
  "App móvil",
  "Otro / No sé aún",
];

const EMPTY = { name: "", contact: "", interest: "", message: "", nx_hp_8f3k: "" };

// Lluvia corta de confeti al enviar (puro CSS; se desactiva con "reducir movimiento")
function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        left: 6 + Math.random() * 88,
        delay: Math.random() * 0.4,
        dur: 1.5 + Math.random() * 1.3,
        x: (Math.random() - 0.5) * 180,
        rot: Math.random() * 600,
        tone: i % 3,
      })),
    []
  );
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <i
          key={i}
          className={`c${p.tone}`}
          style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, "--x": `${p.x}px`, "--r": `${p.rot}deg` }}
        />
      ))}
    </div>
  );
}

// Lo que ve la persona después de enviar: confirmación clara de que su mensaje llegó
function Success({ sent, onReset }) {
  const ref = useRef(null);
  const viaEmail = EMAIL_RE.test(sent.contact);
  const firstName = sent.name.trim().split(/\s+/)[0];
  const date = sent.at.toLocaleDateString("es-MX", { day: "numeric", month: "long" });
  const time = sent.at.toLocaleTimeString("es-MX", { hour: "numeric", minute: "2-digit" });

  // En celular el formulario queda abajo: nos aseguramos de que la confirmación se vea completa
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({ block: "center", behavior: calm ? "auto" : "smooth" });
  }, []);

  return (
    <div className="contact-form success-panel" role="status" aria-live="polite" ref={ref}>
      <Confetti />
      <div className="success-badge">
        <svg viewBox="0 0 52 52" aria-hidden="true">
          <circle className="sb-ring" cx="26" cy="26" r="23" fill="none" />
          <path className="sb-check" fill="none" d="M15 27.5l8 8 15-17" />
        </svg>
      </div>
      <h3>¡Listo, {firstName}! Tu mensaje ya llegó</h3>
      <p className="success-lead">
        Lo recibimos correctamente y quedó guardado. Lo vamos a leer y a contestarte personalmente.
      </p>

      <ol className="success-steps">
        <li className="done">
          <span className="dot">✓</span>
          <div>
            <b>Mensaje recibido</b>
            <small>{date}, {time}</small>
          </div>
        </li>
        <li>
          <span className="dot">2</span>
          <div>
            <b>Lo revisamos</b>
            <small>Leemos cada mensaje con atención</small>
          </div>
        </li>
        <li>
          <span className="dot">3</span>
          <div>
            <b>Te respondemos en menos de 24 horas</b>
            <small>{viaEmail ? `Por correo a ${sent.contact}` : `Por WhatsApp al ${sent.contact}`}</small>
          </div>
        </li>
      </ol>

      <div className="success-actions">
        <a className="btn-primary" href={whatsappUrl("Hola Nexova Studio, acabo de enviar un mensaje por la página")} target="_blank" rel="noreferrer">
          ¿Es urgente? Escríbenos por WhatsApp
        </a>
        <button type="button" className="btn-ghost" onClick={onReset}>Enviar otro mensaje</button>
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [sent, setSent] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // En cuanto la persona corrige un campo, se quita su error
    if (fieldErrors[name]) setFieldErrors({ ...fieldErrors, [name]: undefined });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const problems = validateFields(form);
    if (Object.keys(problems).length) {
      setFieldErrors(problems);
      setStatus("idle");
      // Llevamos el cursor al primer campo con problema
      document.getElementById(problems.name ? "nx-name" : "nx-contact")?.focus();
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setSent({ name: form.name, contact: form.contact.trim(), at: new Date() });
      setForm(EMPTY);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "No se pudo enviar. Intenta por WhatsApp directo.");
    }
  }

  function reset() {
    setSent(null);
    setStatus("idle");
  }

  return (
    <section id="contacto" className="contact">
      <div className="contact-glow"></div>

      <div className="contact-layout">
        <div className="reveal">
          <div className="eyebrow num">Contacto</div>
          <h2 className="sec-title" style={{ marginBottom: 22 }}>
            Empecemos a construir<br />algo juntos
          </h2>
          <p className="contact-intro">
            Cuéntanos qué necesitas. Respondemos en menos de 24 horas con una propuesta o una
            llamada para platicar.
          </p>

          <div className="channels">
            <a className="channel" href={whatsappUrl()} target="_blank" rel="noreferrer">
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

        {status === "success" && sent ? (
          <Success sent={sent} onReset={reset} />
        ) : (
          <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
            {/* Campo trampa anti-robots: escondido, las personas no lo ven ni lo llenan */}
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="nx-hp">No llenes este campo</label>
              <input id="nx-hp" type="text" name="nx_hp_8f3k" value={form.nx_hp_8f3k} onChange={handleChange} tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore="true" />
            </div>

            <div className={`field ${fieldErrors.name ? "has-error" : ""}`}>
              <label htmlFor="nx-name">Tu nombre</label>
              <input id="nx-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="¿Cómo te llamas?"
                autoComplete="name" aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? "nx-name-err" : undefined} />
              {fieldErrors.name && <span className="field-error" id="nx-name-err" role="alert">{fieldErrors.name}</span>}
            </div>

            <div className={`field ${fieldErrors.contact ? "has-error" : ""}`}>
              <label htmlFor="nx-contact">WhatsApp o correo</label>
              <input id="nx-contact" type="text" name="contact" value={form.contact} onChange={handleChange}
                placeholder="tu@correo.com o tu WhatsApp (10 dígitos)" autoComplete="email"
                aria-invalid={!!fieldErrors.contact} aria-describedby={fieldErrors.contact ? "nx-contact-err" : undefined} />
              {fieldErrors.contact && <span className="field-error" id="nx-contact-err" role="alert">{fieldErrors.contact}</span>}
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
              <textarea id="nx-msg" name="message" value={form.message} onChange={handleChange} maxLength={2000}
                placeholder="¿Qué problema quieres resolver? ¿Qué hace tu negocio?" />
            </div>

            <button type="submit" className="btn-primary" disabled={status === "sending"}>
              {status === "sending" ? (<><span className="spinner" aria-hidden="true"></span>Enviando…</>) : "Enviar mensaje →"}
            </button>

            <div className="form-status" role="alert">
              {status === "error" && <span className="form-status-err">{errorMsg}</span>}
            </div>
            <p className="form-privacy">Tus datos solo se usan para responderte. No hacemos spam.</p>
          </form>
        )}
      </div>
    </section>
  );
}

import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle, Send } from "lucide-react";
import { Button } from "./ui/Button";
import Modal from "./Modal";
import { sendContactMessage } from "../api";
import { validateFields, EMAIL_RE } from "../validate";
import { whatsapp } from "../content";

// Opciones del selector. Deben coincidir con las que acepta el servidor (server/src/utils/validateContact.js)
const OPTIONS = ["Chatbot para WhatsApp", "Automatización de procesos", "Software a medida", "Consultoría tecnológica", "App móvil", "Otro / No sé aún"];
const FROM_SERVICE = { "App móvil sencilla": "App móvil" };

const EMPTY = { name: "", contact: "", interest: "", message: "", nx_hp_8f3k: "" };

// Lluvia corta de confeti al enviar (puro CSS; se oculta con "reducir movimiento")
function Confetti() {
  const pieces = useMemo(
    () => Array.from({ length: 26 }, (_, i) => ({ left: 6 + Math.random() * 88, delay: Math.random() * 0.4, dur: 1.5 + Math.random() * 1.2, x: (Math.random() - 0.5) * 160, rot: Math.random() * 600, tone: i % 3 })),
    []
  );
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <i key={i} className={`c${p.tone}`} style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, "--x": `${p.x}px`, "--r": `${p.rot}deg` }} />
      ))}
    </div>
  );
}

// Lo que ve la persona después de enviar: confirmación clara de que su mensaje llegó
function Success({ sent, onClose }) {
  const viaEmail = EMAIL_RE.test(sent.contact);
  const firstName = sent.name.trim().split(/\s+/)[0];
  const date = sent.at.toLocaleDateString("es-MX", { day: "numeric", month: "long" });
  const time = sent.at.toLocaleTimeString("es-MX", { hour: "numeric", minute: "2-digit" });
  return (
    <div className="success-box" role="status" aria-live="polite">
      <Confetti />
      <div className="success-badge">
        <svg viewBox="0 0 52 52" aria-hidden="true"><circle className="sb-ring" cx="26" cy="26" r="23" fill="none" /><path className="sb-check" fill="none" d="M15 27.5l8 8 15-17" /></svg>
      </div>
      <h2 className="text-2xl font-bold">¡Gracias, {firstName}! Tu mensaje ya llegó</h2>
      <p className="section-copy mt-3">Lo recibimos correctamente y quedó guardado. Lo vamos a leer y a contestarte personalmente.</p>
      <ol className="success-steps">
        <li className="done"><span className="dot">✓</span><div><b>Mensaje recibido</b><small>{date}, {time}</small></div></li>
        <li><span className="dot">2</span><div><b>Lo revisamos</b><small>Leemos cada mensaje con atención</small></div></li>
        <li><span className="dot">3</span><div><b>Te respondemos en menos de 24 horas</b><small>{viaEmail ? `Por correo a ${sent.contact}` : `Por WhatsApp al ${sent.contact}`}</small></div></li>
      </ol>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild variant="studio" className="h-11 px-5"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle />¿Es urgente? Escríbenos por WhatsApp</a></Button>
        <Button variant="quiet" className="h-11 px-5" onClick={onClose}>Volver a la página</Button>
      </div>
    </div>
  );
}

export default function ContactModal({ service = "", onClose }) {
  const [form, setForm] = useState({ ...EMPTY, interest: FROM_SERVICE[service] || service });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [sent, setSent] = useState(null);

  function change(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  }

  async function submit(e) {
    e.preventDefault();
    setErrorMsg("");
    const problems = validateFields(form);
    if (Object.keys(problems).length) {
      setErrors(problems);
      document.getElementById(problems.name ? "cm-name" : "cm-contact")?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setSent({ name: form.name, contact: form.contact.trim(), at: new Date() });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "No se pudo enviar. Intenta por WhatsApp directo.");
    }
  }

  return (
    <Modal onClose={onClose} title="Platiquemos de tu negocio">
      {status === "success" && sent ? (
        <Success sent={sent} onClose={onClose} />
      ) : (
        <>
          <span className="eyebrow">El primer paso es una plática</span>
          <h2 className="mt-4 text-3xl font-bold">Cuéntanos de tu negocio.</h2>
          <p className="section-copy mt-3">No necesitas una idea terminada. Empecemos por lo que te gustaría hacer más fácil.</p>
          <Button variant="quiet" asChild className="mt-5 w-full h-11"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Prefiero escribir por WhatsApp<ArrowRight /></a></Button>

          <form onSubmit={submit} noValidate>
            {/* Campo trampa anti-robots: escondido, las personas no lo ven ni lo llenan */}
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="cm-hp">No llenes este campo</label>
              <input id="cm-hp" type="text" name="nx_hp_8f3k" value={form.nx_hp_8f3k} onChange={change} tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore="true" />
            </div>

            <label className={`form-field ${errors.name ? "has-error" : ""}`} htmlFor="cm-name">Tu nombre
              <input id="cm-name" name="name" autoComplete="name" value={form.name} onChange={change} placeholder="¿Cómo te llamas?" aria-invalid={!!errors.name} />
              {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
            </label>

            <label className={`form-field ${errors.contact ? "has-error" : ""}`} htmlFor="cm-contact">WhatsApp o correo
              <input id="cm-contact" name="contact" autoComplete="email" value={form.contact} onChange={change} placeholder="tu@correo.com o tu WhatsApp (10 dígitos)" aria-invalid={!!errors.contact} />
              {errors.contact && <span className="field-error" role="alert">{errors.contact}</span>}
            </label>

            <label className="form-field" htmlFor="cm-interest">¿Qué te gustaría resolver?
              <select id="cm-interest" name="interest" value={form.interest} onChange={change}>
                <option value="">Aún no sé, quiero orientación</option>
                {OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>

            <label className="form-field" htmlFor="cm-message">Un poquito sobre tu idea <span className="font-normal text-muted-foreground">(opcional)</span>
              <textarea id="cm-message" name="message" rows={3} maxLength={2000} value={form.message} onChange={change} placeholder="Por ejemplo: llevo mis citas en una libreta y quisiera organizarlas mejor…" />
            </label>

            <Button variant="studio" type="submit" className="w-full h-12 mt-6" disabled={status === "sending"}>
              {status === "sending" ? (<><span className="spinner" aria-hidden="true" />Enviando…</>) : (<>Enviar mensaje<Send /></>)}
            </Button>
            {status === "error" && <p className="form-error" role="alert">{errorMsg}</p>}
            <p className="text-xs text-muted-foreground text-center mt-3">Tus datos solo se usan para responderte. No hacemos spam.</p>
          </form>
        </>
      )}
    </Modal>
  );
}

// Botón que abre la ventana del formulario
export function ContactButton({ label = "Platiquemos", service = "", inverse = false, className = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={inverse ? "inverse" : "studio"} className={className} onClick={() => setOpen(true)}>{label}<ArrowRight /></Button>
      {open && <ContactModal service={service} onClose={() => setOpen(false)} />}
    </>
  );
}

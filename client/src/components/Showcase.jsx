import { useEffect, useRef, useState } from "react";
import { ICONS } from "./Icons";

// Explica los servicios MOSTRÁNDOLOS: tres maquetas animadas. Son ilustrativas (datos de ejemplo).
const TABS = [
  {
    id: "chatbot", label: "Chatbot de WhatsApp", icon: "chatbot",
    title: "Tu negocio contesta solo, a cualquier hora",
    text: "Tus clientes te escriben por WhatsApp a las 11 de la noche y reciben respuesta al instante: horarios, precios y citas, sin que tengas que estar pegado al teléfono.",
    points: ["Respuestas automáticas configuradas para tu negocio", "Agenda citas y reservaciones", "Conectado a WhatsApp Business"],
    chip: "Entrega en 48 horas", cta: "Quiero mi chatbot",
  },
  {
    id: "automatizacion", label: "Automatización", icon: "automation",
    title: "Lo repetitivo se hace solo",
    text: "Cuando alguien agenda, el sistema lo registra, lo confirma y avisa a tu equipo. Se acabó copiar y pegar información entre aplicaciones.",
    points: ["Envío automático de confirmaciones", "Sincronización entre WhatsApp y tus registros", "Conecta Google Sheets, correo y más"],
    chip: "Entrega en 3 a 5 días", cta: "Agendar demo gratis",
  },
  {
    id: "software", label: "Software a medida", icon: "software",
    title: "Un sistema que sí encaja con tu negocio",
    text: "Control de clientes, citas, inventario, ventas o membresías, hecho a la medida de cómo trabajas tú, y no al revés.",
    points: ["Panel de control hecho a tu medida", "Base de datos propia y segura", "Acompañamiento durante todo el proceso"],
    chip: "Soporte incluido", cta: "Cuéntanos tu negocio",
  },
];

const CHAT = [
  { from: "me", text: "Hola, ¿tienen lugar para mañana?" },
  { from: "bot", text: "¡Hola! 👋 Soy el asistente de Estética Luna. Mañana tenemos 10:00, 12:30 y 17:00. ¿Cuál te acomoda?" },
  { from: "me", text: "A las 12:30" },
  { from: "bot", text: "Listo ✅ Tu cita quedó para mañana a las 12:30. Te mando un recordatorio 2 horas antes." },
];

const prefersCalm = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function ChatDemo() {
  const [step, setStep] = useState(() => (prefersCalm() ? CHAT.length : 0));

  useEffect(() => {
    if (prefersCalm()) return;
    // Cada 1.6 s aparece el siguiente mensaje; al terminar espera y vuelve a empezar
    const id = setTimeout(() => setStep((s) => (s >= CHAT.length ? 0 : s + 1)), step >= CHAT.length ? 4500 : 1600);
    return () => clearTimeout(id);
  }, [step]);

  const typing = step < CHAT.length && CHAT[step].from === "bot";
  return (
    <div className="phone" aria-label="Ejemplo de conversación con un chatbot de WhatsApp">
      <div className="phone-bar">
        <span className="avatar">EL</span>
        <div><b>Estética Luna</b><small><i className="online"></i> en línea · responde en segundos</small></div>
      </div>
      <div className="chat">
        {CHAT.slice(0, step).map((m, i) => (
          <div key={i} className={`bubble bubble-${m.from}`}>{m.text}</div>
        ))}
        {typing && <div className="bubble bubble-bot typing" aria-hidden="true"><i></i><i></i><i></i></div>}
      </div>
    </div>
  );
}

const FLOW = [
  { icon: "chatbot", title: "Tu cliente agenda", sub: "por WhatsApp" },
  { icon: "software", title: "Se registra solo", sub: "en tu hoja de cálculo" },
  { icon: "check", title: "Recibe confirmación", sub: "automática" },
  { icon: "bell", title: "Tu equipo se entera", sub: "con un aviso" },
];

function FlowDemo() {
  return (
    <div className="flow" aria-label="Ejemplo de un proceso automatizado">
      {FLOW.map((n, i) => (
        <div className="flow-step" key={n.title} style={{ "--i": i }}>
          <div className="flow-node">{ICONS[n.icon]}</div>
          <b>{n.title}</b>
          <small>{n.sub}</small>
          {i < FLOW.length - 1 && <span className="flow-link" aria-hidden="true"></span>}
        </div>
      ))}
    </div>
  );
}

const BARS = [38, 52, 44, 70, 62, 88, 76];
const ROWS = [
  ["Ana P.", "Plan mensual", "Pagado"],
  ["Luis M.", "Visita suelta", "Pagado"],
  ["Sofía R.", "Plan trimestral", "Pendiente"],
];

function DashDemo() {
  return (
    <div className="dash" aria-label="Ejemplo de un panel de control a la medida">
      <div className="dash-kpis">
        <div><small>Ventas hoy</small><b>$12,480</b></div>
        <div><small>Miembros activos</small><b>134</b></div>
        <div><small>Citas hoy</small><b>18</b></div>
      </div>
      <div className="dash-chart" aria-hidden="true">
        {BARS.map((h, i) => <span key={i} style={{ "--h": `${h}%`, "--i": i }}></span>)}
      </div>
      <div className="dash-rows">
        {ROWS.map(([who, what, state]) => (
          <div key={who}><span>{who}</span><span>{what}</span><em className={state === "Pagado" ? "ok" : "wait"}>{state}</em></div>
        ))}
      </div>
    </div>
  );
}

export default function Showcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const tab = TABS[active];

  // Flechas izquierda/derecha para cambiar de pestaña con el teclado
  function onKeyDown(e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="accion" className="section">
      <div className="wrap">
        <div className="section-head-stack reveal">
          <div className="eyebrow num">Así funciona</div>
          <h2 className="sec-title" style={{ marginBottom: 18 }}>Míralo en acción,<br />sin tecnicismos</h2>
          <p className="sec-sub">Tres ejemplos de lo que hacemos, explicados con imágenes y no con párrafos.</p>
        </div>

        <div className="showcase reveal">
          <div className="tabs" role="tablist" aria-label="Servicios" onKeyDown={onKeyDown}>
            {TABS.map((t, i) => (
              <button
                key={t.id} id={`tab-${t.id}`} role="tab" type="button"
                aria-selected={i === active} aria-controls={`panel-${t.id}`} tabIndex={i === active ? 0 : -1}
                className={`tab ${i === active ? "on" : ""}`}
                ref={(el) => (tabRefs.current[i] = el)}
                onClick={() => setActive(i)}
              >
                <span className="tab-icon">{ICONS[t.icon]}</span>{t.label}
              </button>
            ))}
          </div>

          <div className="showcase-body" role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} key={tab.id}>
            <div className="showcase-copy">
              <h3>{tab.title}</h3>
              <p>{tab.text}</p>
              <ul>{tab.points.map((p) => <li key={p}><span className="tick">{ICONS.check}</span>{p}</li>)}</ul>
              <div className="showcase-cta">
                <a href="#contacto" className="btn-primary">{tab.cta} <span className="mono">→</span></a>
                <span className="chip">{tab.chip}</span>
              </div>
            </div>

            <div className="showcase-visual">
              {tab.id === "chatbot" && <ChatDemo />}
              {tab.id === "automatizacion" && <FlowDemo />}
              {tab.id === "software" && <DashDemo />}
              <p className="showcase-note">Maqueta ilustrativa con datos de ejemplo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

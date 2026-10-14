import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Check, CheckCheck, ChevronRight, MessageCircle, Users, Workflow } from "lucide-react";
import { Button } from "./ui/Button";
import Modal from "./Modal";
import { ContactButton } from "./ContactModal";
import { getPortfolioProjects } from "../api";
import { fallbackProjects, projectExtras, services } from "../content";

// ───────────── Demostración: tres pestañas con ejemplos ilustrativos ─────────────
const LABELS = ["WhatsApp", "Automatización", "A tu medida"];
const TITLES = ["Tu negocio responde. Tú sigues con tu día.", "Tus herramientas trabajan juntas.", "Todo lo importante, en un solo lugar."];
const DESCRIPTIONS = [
  "Un cliente pregunta por tus horarios y recibe una respuesta, incluso cuando estás ocupado. Así de sencillo.",
  "Una nueva cita puede registrarse en tu agenda y enviar una confirmación sin que tengas que copiar la información.",
  "Deja de buscar entre libretas y archivos. Consulta tus clientes, citas y ventas desde un sistema pensado para ti.",
];

export function DemoSection() {
  const [tab, setTab] = useState(0);
  const [replied, setReplied] = useState(false);
  return (
    <section className="studio-section" id="soluciones">
      <div className="studio-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-11">
          <div><span className="eyebrow">Menos complicado. Más útil.</span><h2 className="section-title mt-3">Tecnología que sí se entiende.</h2></div>
          <p className="section-copy max-w-sm">No necesitas saber de software.<br />Solo saber qué quieres hacer más fácil.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <div className="demo-tabs mb-7" role="tablist" aria-label="Ejemplos de soluciones">
              {LABELS.map((label, i) => (
                <Button key={label} variant="ghost" className="rounded-full px-5 h-9" role="tab" id={`demo-tab-${i}`} aria-selected={i === tab} aria-controls="demo-panel" onClick={() => { setTab(i); setReplied(false); }}>{label}</Button>
              ))}
            </div>
            <h3 className="text-[28px] leading-snug font-bold max-w-md">{TITLES[tab]}</h3>
            <p className="section-copy mt-4 max-w-md">{DESCRIPTIONS[tab]}</p>
            <div className="flex items-center gap-2 mt-5 text-sm"><Check className="w-4 h-4 text-primary" />Hecho para la forma en que trabajas.</div>
            <ContactButton label="Me interesa algo así" service={services[tab]?.title ?? ""} className="mt-7 h-11" />
          </div>
          <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${tab}`}>
            <div className={`demo-stage ${tab === 1 ? "bg-peach" : tab === 2 ? "bg-sky" : ""}`}>
              {tab === 0 && (
                <div className="demo-window">
                  <div className="demo-window-head">
                    <div className="rounded-full bg-primary-foreground/15 p-2"><MessageCircle className="w-5 h-5" /></div>
                    <div><p className="font-semibold text-sm">Estética Luna</p><p className="text-[10px] opacity-80">En línea · Asistente del negocio</p></div>
                    <span className="ml-auto text-[10px]">•••</span>
                  </div>
                  <div className="p-5 space-y-4">
                    <p className="text-[9px] text-center text-muted-foreground">HOY</p>
                    <div className="chat-bubble outgoing">¡Hola! ¿A qué hora abren mañana?<span className="flex justify-end items-center gap-1 text-[9px] text-muted-foreground mt-1">10:42<CheckCheck size={12} /></span></div>
                    <div className="chat-bubble">¡Hola! 👋 Mañana abrimos de 9:00 a 18:00. ¿Te gustaría agendar una cita?</div>
                    {replied && <div className="chat-bubble outgoing">¡Sí! Quisiera una cita mañana. ✨</div>}
                    <Button variant="quiet" size="sm" className="w-full" onClick={() => setReplied(!replied)}>{replied ? "Volver a empezar" : "Sí, quiero agendar"}<ChevronRight /></Button>
                  </div>
                </div>
              )}
              {tab === 1 && (
                <div className="demo-window p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold mb-6"><Workflow className="text-primary w-5" />De una tarea a todo resuelto</div>
                  {["Tu cliente agenda una cita", "Se registra en tu agenda", "Recibe su confirmación"].map((t, i) => (
                    <div key={t}>
                      <div className="flex items-center gap-3 p-3 bg-secondary rounded-md"><span className="service-icon h-8 w-8 text-xs">{i + 1}</span><span className="text-xs">{t}</span><Check className="ml-auto w-4 text-primary" /></div>
                      {i < 2 && <p className="text-center text-primary py-1">↓</p>}
                    </div>
                  ))}
                </div>
              )}
              {tab === 2 && (
                <div className="demo-window">
                  <div className="flex items-center gap-2 border-b border-border p-4 text-sm font-semibold"><CalendarDays className="w-4 text-primary" />Mi negocio<span className="ml-auto text-[10px] text-muted-foreground">Hoy</span></div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-mint p-3 rounded-md"><p className="text-[10px] text-muted-foreground">Citas de hoy</p><p className="font-bold text-2xl">8</p></div>
                      <div className="bg-peach p-3 rounded-md"><p className="text-[10px] text-muted-foreground">Clientes activos</p><p className="font-bold text-2xl">124</p></div>
                    </div>
                    <p className="text-xs font-semibold mb-3">Próximas citas</p>
                    {["Ana · 10:00", "Carlos · 11:30", "María · 12:00"].map((t) => (
                      <div key={t} className="border-t border-border py-3 flex items-center gap-2 text-xs"><Users className="w-3 text-primary" />{t}<span className="ml-auto text-primary text-[10px]">Confirmada</span></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="demo-note">Ejemplo ilustrativo · Datos de muestra, no de clientes reales.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────── Portafolio: los proyectos salen de la base de datos ─────────────
const THEMES = ["bg-mint", "bg-peach", "bg-sky"];
const asList = (stack) => {
  if (Array.isArray(stack)) return stack;
  try { return JSON.parse(stack) || []; } catch { return []; }
};

export function Portfolio({ refreshKey = 0 }) {
  const [projects, setProjects] = useState(fallbackProjects);
  const [selected, setSelected] = useState(null);
  const [all, setAll] = useState(false);

  useEffect(() => {
    getPortfolioProjects()
      .then((data) => { if (Array.isArray(data)) setProjects(data); }) // si el servidor responde, se muestra EXACTAMENTE lo que hay
      .catch(() => { /* sin servidor: se quedan los proyectos de respaldo */ });
  }, [refreshKey]);

  const items = projects.map((p, i) => {
    const extra = projectExtras[p.title];
    return { ...p, theme: THEMES[i % 3], heading: extra?.tagline ?? p.title, features: extra?.features ?? asList(p.stack) };
  });
  const shown = all ? items : items.slice(0, 3);
  const project = selected === null ? null : items[selected];

  return (
    <section className="studio-section border-t border-border" id="proyectos">
      <div className="studio-container">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-10">
          <div><span className="eyebrow">Del problema a la solución</span><h2 className="section-title mt-3">Ideas que ya están funcionando.</h2></div>
          {items.length > 3 && (
            <Button variant="link" className="self-start md:self-auto px-0" onClick={() => setAll(!all)}>{all ? "Ver proyectos destacados" : "Ver todos los proyectos"}<ArrowRight /></Button>
          )}
        </div>
        {items.length === 0 && <p className="section-copy">Pronto agregaremos proyectos nuevos.</p>}
        <div className={`grid gap-7 ${all ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {shown.map((p, i) => (
            <article className="project-card" key={p.id ?? p.title} onClick={() => setSelected(i)}>
              <div className={`project-image ${p.theme}`}>
                {p.image ? <img src={p.image} width={700} height={450} loading="lazy" alt={p.title} /> : <div className="project-emoji">{p.emoji || "💻"}</div>}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">{p.tag}</span>
                <Button variant="ghost" size="icon" aria-label={`Ver ${p.title}`} onClick={(e) => { e.stopPropagation(); setSelected(i); }}><ArrowRight /></Button>
              </div>
              <h3 className="mt-1">{p.heading}</h3>
              <p className="section-copy text-sm mt-2">{p.description}</p>
            </article>
          ))}
        </div>
      </div>
      {project && (
        <Modal title={project.title} onClose={() => setSelected(null)}>
          <p className="eyebrow pr-5">{project.tag}</p>
          <h2 className="text-2xl font-bold mt-4">{project.title}</h2>
          {project.image && <img src={project.image} className="w-full mt-6 rounded-md" alt={project.title} width={800} height={500} />}
          <p className="section-copy mt-5">{project.description}</p>
          {project.features.length > 0 && (
            <ul className="space-y-3 my-5">{project.features.map((f) => <li key={f} className="flex gap-2 text-sm"><Check size={16} className="text-primary shrink-0" />{f}</li>)}</ul>
          )}
          <Button variant="studio" asChild><a href="#contacto" onClick={() => setSelected(null)}>Tengo una idea parecida<ArrowRight /></a></Button>
        </Modal>
      )}
    </section>
  );
}

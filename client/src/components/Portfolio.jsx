import { useEffect, useState } from "react";
import { getPortfolioProjects } from "../api";

// Proyectos de respaldo — se muestran si el backend aún no responde,
// así la página nunca se ve vacía.
// Para mostrar una captura real, guárdala en client/public/ y pon
// su ruta en "shot" (ej: shot: "/proyecto-fisio.png").
const FALLBACK_PROJECTS = [
  {
    id: "fallback-1",
    title: "Sistema de gestión para fisioterapia",
    tag: "SaaS · Gestión clínica",
    description: "Plataforma SaaS completa para administrar pacientes, citas y tratamientos en clínicas de fisioterapia.",
    shot: null,
    emoji: "🏥",
    colorFrom: "#5B6EF5",
    colorTo: "#3d4bc4",
    stack: ["React", "Node.js", "MySQL"],
  },
  {
    id: "fallback-2",
    title: "Plataforma de comercio electrónico",
    tag: "E-commerce",
    description: "Tienda en línea completa con catálogo, carrito de compras, gestión de pedidos y panel administrativo.",
    shot: null,
    emoji: "🛒",
    colorFrom: "#A78BFA",
    colorTo: "#7c5cd6",
    stack: ["React", "Laravel", "MySQL"],
  },
  {
    id: "fallback-3",
    title: "Punto de venta para gimnasio",
    tag: "Sistema POS",
    description: "Sistema de punto de venta con control de membresías, cobros, inventario y reportes en tiempo real.",
    shot: null,
    emoji: "💪",
    colorFrom: "#0F6E56",
    colorTo: "#0a4d3d",
    stack: ["React", "Node.js", "ACID / MySQL"],
  },
];

function normalizeStack(stack) {
  if (Array.isArray(stack)) return stack;
  if (typeof stack === "string") {
    try { return JSON.parse(stack); } catch { return []; }
  }
  return [];
}

export default function Portfolio() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [apiFailed, setApiFailed] = useState(false);

  useEffect(() => {
    getPortfolioProjects()
      .then((data) => {
        if (data && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {
        console.log("Backend no disponible — mostrando proyectos de respaldo");
        setApiFailed(true);
      });
  }, []);

  return (
    <section id="trabajo" className="section">
      <div className="wrap">
        <div className="section-head-stack">
          <div className="eyebrow">02 — Portafolio</div>
          <h2 className="sec-title" style={{ marginBottom: 18 }}>Sistemas reales,<br />ya en producción</h2>
          <p className="sec-sub">No maquetas. Esto es lo que podemos construir para tu negocio.</p>
        </div>

        {apiFailed && (
          <p className="pf-loading">(Sin conexión con el servidor — mostrando proyectos de ejemplo)</p>
        )}

        <div className="portfolio-grid">
          {projects.map((p) => (
            <article className="pf-card" key={p.id || p.title}>
              <div className="pf-shot">
                {p.shot ? (
                  <img src={p.shot} alt={p.title} />
                ) : (
                  <div
                    className="pf-placeholder"
                    style={p.colorFrom ? { background: `linear-gradient(135deg, ${p.colorFrom}, ${p.colorTo || p.colorFrom})` } : undefined}
                  >
                    <span className="pf-emoji">{p.emoji || "💻"}</span>
                  </div>
                )}
              </div>
              <div className="pf-body">
                <span className="pf-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p className="pf-desc">{p.description}</p>
                <div className="pf-stack">
                  {normalizeStack(p.stack).map((s) => <span key={s}>{s}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

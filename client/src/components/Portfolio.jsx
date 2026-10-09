import { useEffect, useState } from "react";
import { getPortfolioProjects } from "../api";

// Proyectos de respaldo — se muestran si el backend aún no responde,
// así la página nunca se ve vacía.
// Las fotos viven en client/public/projects/ y se citan con su ruta en "image"
// (ej: image: "/projects/fisioterapia.jpg"). La base de datos usa el mismo campo.
const FALLBACK_PROJECTS = [
  {
    id: "fallback-1",
    title: "Sistema de gestión para fisioterapia",
    tag: "SaaS · Gestión clínica",
    description: "Plataforma SaaS completa para administrar pacientes, citas y tratamientos en clínicas de fisioterapia.",
    image: "/projects/fisioterapia.jpg",
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
    image: "/projects/ecommerce.jpg",
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
    image: "/projects/gimnasio.jpg",
    emoji: "💪",
    colorFrom: "#0F6E56",
    colorTo: "#0a4d3d",
    stack: ["React", "Node.js", "ACID / MySQL"],
  },
  {
    id: "fallback-4",
    title: "Nggigua App",
    tag: "PWA · Preservación cultural",
    description: "Videojuego educativo web para enseñar la lengua indígena Nggigua, pensado para preservar y acercar la lengua a nuevas generaciones.",
    image: "/projects/nggigua.jpg",
    emoji: "🎮",
    colorFrom: "#EF9F27",
    colorTo: "#b8760f",
    stack: ["React", "Tailwind CSS", "Node.js", "PostgreSQL", "Python"],
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
        <div className="section-head-stack reveal">
          <div className="eyebrow num">Portafolio</div>
          <h2 className="sec-title" style={{ marginBottom: 18 }}>Sistemas reales,<br />ya en producción</h2>
          <p className="sec-sub">No maquetas. Esto es lo que podemos construir para tu negocio.</p>
        </div>

        {apiFailed && (
          <p className="pf-loading">(Sin conexión con el servidor — mostrando proyectos de ejemplo)</p>
        )}

        <div className="portfolio-grid">
          {projects.map((p) => (
            <article className="pf-card reveal" key={p.id || p.title}>
              <div className="pf-shot">
                {p.image ? (
                  <img src={p.image} alt={p.title} loading="lazy" />
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

import { useEffect, useState } from "react";
import { getPortfolioProjects } from "../api";

// Proyectos de respaldo — se muestran si el backend aún no está corriendo
// Así la página nunca se ve vacía mientras conectas todo
const FALLBACK_PROJECTS = [
  {
    id: "fallback-1",
    title: "Sistema de gestión para fisioterapia",
    tag: "SaaS · Gestión clínica",
    description: "Plataforma SaaS completa para administrar pacientes, citas y tratamientos en clínicas de fisioterapia.",
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
    emoji: "💪",
    colorFrom: "#0F6E56",
    colorTo: "#0a4d3d",
    stack: ["React", "Node.js", "ACID / MySQL"],
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loadedFromApi, setLoadedFromApi] = useState(false);

  useEffect(() => {
    getPortfolioProjects()
      .then((data) => {
        if (data && data.length > 0) {
          setProjects(data);
          setLoadedFromApi(true);
        }
      })
      .catch(() => {
        // Si el backend no responde, nos quedamos con los proyectos de respaldo
        console.log("Backend no disponible — mostrando proyectos de respaldo");
      });
  }, []);

  return (
    <section id="portafolio">
      <div className="section-eyebrow">Portafolio</div>
      <h2 className="section-title">
        Proyectos que ya
        <br />
        construí
      </h2>
      <p className="section-sub">Sistemas reales, no maquetas. Esto es lo que puedo construir para tu negocio.</p>

      {!loadedFromApi && (
        <p style={{ fontSize: 12, color: "var(--text3)", marginTop: -40, marginBottom: 30 }}>
          (Conectando con el backend... por ahora viendo datos de ejemplo)
        </p>
      )}

      <div className="portfolio-grid">
        {projects.map((p) => {
          // El campo "stack" a veces llega como array y a veces como texto JSON
          // (depende de cómo MySQL/Sequelize lo devuelva). Esto lo normaliza siempre a array.
          let stackList = [];
          if (Array.isArray(p.stack)) {
            stackList = p.stack;
          } else if (typeof p.stack === "string") {
            try {
              stackList = JSON.parse(p.stack);
            } catch {
              stackList = [];
            }
          }

          return (
            <div className="portfolio-card" key={p.id || p.title}>
              <div
                className="portfolio-banner"
                style={{ background: `linear-gradient(135deg, ${p.colorFrom}, ${p.colorTo})` }}
              >
                {p.emoji}
              </div>
              <div className="portfolio-body">
                <span className="portfolio-tag">{p.tag}</span>
                <div className="portfolio-title">{p.title}</div>
                <p className="portfolio-desc">{p.description}</p>
                <div className="portfolio-stack">
                  {stackList.map((s) => (
                    <span className="stack-pill" key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
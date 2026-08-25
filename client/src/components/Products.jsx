const PRODUCTS = [
   {
    icon: "🧠", name: "Consultoría Tecnológica",
    desc: "Sesión 1 a 1 para evaluar qué tecnología necesita tu negocio y cómo empezar sin gastar de más.",
    price: "$500", note: "sesión de 60 min · se abona a cualquier proyecto",
    features: ["Análisis de tus procesos actuales", "Recomendación honesta — a veces no necesitas lo que crees", "Por videollamada o presencial (Tehuacán/Puebla)"],
    cta: "Agendar sesión →",
  },
  {
    icon: "💬", name: "Chatbot para WhatsApp",
    desc: "Tu negocio responde automáticamente en WhatsApp: preguntas frecuentes, horarios, precios y agenda de citas — sin que tengas que estar pegado al teléfono todo el día.",
    price: "$2,800", note: "instalación única + $500/mes mantenimiento",
    features: ["Respuestas automáticas configuradas para tu negocio", "Agenda citas y reservaciones", "Conectado a WhatsApp Business", "Entrega en 48 horas"],
    cta: "Quiero mi chatbot →",
  },
  {
    icon: "⚡", name: "Automatización de Procesos",
    desc: "Elimina tareas repetitivas conectando tus herramientas (WhatsApp, Google Sheets, correo) para que trabajen solas.",
    price: "$3,500", note: "desde + $400/mes mantenimiento",
    features: ["Envío automático de confirmaciones", "Sincronización entre WhatsApp y tus registros", "Entrega en 3-5 días"],
    cta: "Agendar demo gratis →",
  },
  {
    icon: "💻", name: "Software a Medida para tu Negocio", featured: true,
    desc: "Sistemas hechos específicamente para cómo trabaja tu negocio: control de clientes, citas, inventario, ventas o membresías. Tú me dices cómo trabajas, yo construyo la herramienta.",
    price: "Desde $6,000", note: "según alcance del proyecto + soporte incluido",
    features: ["Pensado para negocios micro, pequeños y medianos", "Panel de control hecho a tu medida", "Base de datos propia y segura", "Acompañamiento durante todo el proceso"],
    cta: "Cuéntame tu negocio →",
  },
  {
    icon: "📱", name: "App Móvil Sencilla",
    desc: "Apps funcionales para una necesidad puntual de tu negocio: catálogo, pedidos, registro de clientes. Pensada para negocios pequeños, no para aplicaciones de gran escala.",
    price: "Desde $9,000", note: "proyectos de alcance pequeño y mediano",
    features: ["Diseño simple y funcional", "Publicación en Google Play", "Ideal como primera versión de tu idea"],
    cta: "Platicamos tu idea →",
  },
];

export default function Products() {
  return (
    <section id="productos">
      <div className="section-eyebrow">Lo que construyo para ti</div>
      <h2 className="section-title">
        Servicios listos para
        <br />
        tu negocio
      </h2>
      <p className="section-sub">
        Soluciones reales para negocios micro, pequeños y medianos. Precio claro, sin promesas que no pueda cumplir.
      </p>

      <div className="products-grid">
        {PRODUCTS.map((p) => (
          <div className={`product-card ${p.featured ? "featured" : ""}`} key={p.name}>
            <span className="product-icon">{p.icon}</span>
            <div className="product-name">{p.name}</div>
            <p className="product-desc">{p.desc}</p>
            <div className="product-price">
              {p.price} <span style={{ fontSize: 16, color: "var(--text2)", fontWeight: 400 }}>MXN</span>
            </div>
            <div className="product-price-note">{p.note}</div>
            <ul className="product-features">
              {p.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <a href="#contacto" className={`btn-card ${p.featured ? "btn-card-solid" : ""}`}>{p.cta}</a>
          </div>
        ))}
      </div>
    </section>
  );
}
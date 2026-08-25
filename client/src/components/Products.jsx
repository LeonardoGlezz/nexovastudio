const PRODUCTS = [
  {
    id: "S/01", name: "Consultoría tecnológica",
    desc: "Sesión 1 a 1 para evaluar qué tecnología necesita tu negocio y cómo empezar sin gastar de más.",
    price: "$500", note: "sesión 60 min · se abona a tu proyecto",
    features: [
      "Análisis de tus procesos actuales",
      "Recomendación honesta — a veces no necesitas lo que crees",
      "Videollamada o presencial (Tehuacán / Puebla)",
    ],
    cta: "Agendar sesión",
  },
  {
    id: "S/02", name: "Chatbot para WhatsApp",
    desc: "Tu negocio responde automáticamente en WhatsApp: preguntas frecuentes, horarios, precios y agenda de citas — sin que tengas que estar pegado al teléfono todo el día.",
    price: "$2,800 – $4,500", note: "instalación única + $500/mes mantenimiento",
    features: [
      "Respuestas automáticas configuradas para tu negocio",
      "Agenda citas y reservaciones",
      "Conectado a WhatsApp Business",
      "Entrega en 48 horas",
    ],
    cta: "Quiero mi chatbot",
  },
  {
    id: "S/03", name: "Automatización de procesos",
    desc: "Elimina tareas repetitivas conectando tus herramientas (WhatsApp, Google Sheets, correo) para que trabajen solas.",
    price: "$3,500 – $7,000", note: "según integraciones + $400/mes mantenimiento",
    features: [
      "Envío automático de confirmaciones",
      "Sincronización entre WhatsApp y tus registros",
      "Entrega en 3 a 5 días",
    ],
    cta: "Agendar demo gratis",
  },
  {
    id: "S/04 · Más solicitado", name: "Software a medida", featured: true,
    desc: "Sistemas hechos específicamente para cómo trabaja tu negocio: control de clientes, citas, inventario, ventas o membresías. Tú nos dices cómo trabajas, nosotros construimos la herramienta.",
    price: "$6,000 – $25,000", note: "según alcance · soporte incluido",
    features: [
      "Pensado para negocios micro, pequeños y medianos",
      "Panel de control hecho a tu medida",
      "Base de datos propia y segura",
      "Acompañamiento durante todo el proceso",
    ],
    cta: "Cuéntanos tu negocio",
  },
  {
    id: "S/05", name: "App móvil sencilla",
    desc: "Apps funcionales para una necesidad puntual de tu negocio: catálogo, pedidos, registro de clientes. Pensada para negocios pequeños, no para aplicaciones de gran escala.",
    price: "$9,000 – $30,000", note: "proyectos de alcance pequeño y mediano",
    features: [
      "Diseño simple y funcional",
      "Publicación en Google Play",
      "Ideal como primera versión de tu idea",
    ],
    cta: "Platicamos tu idea",
  },
];

export default function Products() {
  return (
    <section id="servicios" className="section section-alt">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">01 — Servicios</div>
            <h2 className="sec-title">Lo que construimos<br />para tu negocio</h2>
          </div>
          <p className="sec-sub" style={{ maxWidth: 440 }}>
            Rangos de inversión reales según el alcance. La cotización exacta la definimos
            juntos en la primera llamada, por escrito y sin sorpresas.
          </p>
        </div>

        <div className="hairline-grid grid-services">
          {PRODUCTS.map((p) => (
            <div className={`svc ${p.featured ? "svc-featured" : ""}`} key={p.name}>
              <div className="svc-top">
                <span className="svc-id">{p.id}</span>
                <span className="svc-dot"></span>
              </div>
              <h3>{p.name}</h3>
              <p className="svc-desc">{p.desc}</p>
              <div className="svc-price-block">
                <div className="svc-price">{p.price} <em>MXN</em></div>
                <div className="svc-note">{p.note}</div>
              </div>
              <ul className="svc-feats">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a href="#contacto" className={`svc-btn ${p.featured ? "svc-btn-solid" : ""}`}>{p.cta}</a>
            </div>
          ))}

          <div className="svc-open">
            <div className="svc-open-label">¿No encaja en ninguno?</div>
            <p>Cuéntanos el problema y te decimos si podemos resolverlo — y si no, con quién sí.</p>
            <a href="#contacto">HABLEMOS →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

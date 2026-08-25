const REASONS = [
  { icon: "🇲🇽", title: "Hecho en México, para México", desc: "Entiendo el mercado local. Tehuacán, Puebla, CDMX. Sé cómo funciona el negocio mexicano." },
  { icon: "⚡", title: "Velocidad de entrega real", desc: "Un chatbot en 48 horas. Un sistema completo en 2 semanas. No meses de espera." },
  { icon: "🎯", title: "Enfocado en negocios como el tuyo", desc: "Trabajo con negocios micro, pequeños y medianos. Conozco sus necesidades reales — no vendo soluciones pensadas para corporativos." },
  { icon: "💬", title: "Comunicación directa", desc: "Hablas directamente conmigo. Sin intermediarios, sin perderte en la burocracia." },
  { icon: "🔒", title: "Precio fijo, sin sorpresas", desc: "Lo que cotizo es lo que pagas. Si algo cambia, te aviso antes." },
  { icon: "🛠️", title: "Uso las mejores herramientas disponibles", desc: "Trabajo con tecnología moderna que me permite entregar más rápido y a mejor precio, sin sacrificar calidad." },
];

export default function WhyUs() {
  return (
    <section id="nosotros">
      <div className="section-eyebrow">Por qué Nexova Studio</div>
      <h2 className="section-title">
        Tecnología real,
        <br />
        sin rollo
      </h2>
      <p className="section-sub">No soy una agencia enorme con tiempos de 6 meses. Soy un desarrollador donde cada proyecto importa de verdad.</p>

      <div className="why-grid">
        {REASONS.map((r) => (
          <div className="why-card" key={r.title}>
            <span className="why-icon">{r.icon}</span>
            <div className="why-title">{r.title}</div>
            <p className="why-desc">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
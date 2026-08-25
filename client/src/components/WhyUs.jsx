const REASONS = [
  { title: "Hecho en México, para México", desc: "Entendemos el mercado local. Tehuacán, Puebla, CDMX. Sabemos cómo funciona el negocio mexicano." },
  { title: "Velocidad de entrega real", desc: "Un chatbot en 48 horas. Un sistema completo en 2 semanas. No meses de espera." },
  { title: "Enfocado en negocios como el tuyo", desc: "Trabajamos con negocios micro, pequeños y medianos. Conocemos sus necesidades reales — no vendemos soluciones pensadas para corporativos." },
  { title: "Comunicación directa", desc: "Hablas directamente con quien construye. Sin intermediarios, sin perderte en la burocracia." },
  { title: "Precio fijo, sin sorpresas", desc: "Lo que cotizamos es lo que pagas. Si algo cambia, te avisamos antes." },
  { title: "Las mejores herramientas disponibles", desc: "Trabajamos con tecnología moderna que nos permite entregar más rápido y a mejor precio, sin sacrificar calidad." },
];

export default function WhyUs() {
  return (
    <section id="porque" className="section section-alt">
      <div className="wrap">
        <div className="section-head-stack">
          <div className="eyebrow">05 — Por qué Nexova</div>
          <h2 className="sec-title" style={{ marginBottom: 18 }}>Tecnología real,<br />sin rollo</h2>
          <p className="sec-sub" style={{ maxWidth: 520 }}>
            No somos una agencia enorme con tiempos de 6 meses. Somos un estudio donde cada proyecto
            importa de verdad.
          </p>
        </div>

        <div className="hairline-grid grid-why">
          {REASONS.map((r) => (
            <div className="why" key={r.title}>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

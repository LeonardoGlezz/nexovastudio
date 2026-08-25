const STEPS = [
  { num: "01", title: "Platicamos", desc: "Me cuentas de tu negocio y el problema que quieres resolver. Sin costo, sin compromiso." },
  { num: "02", title: "Definimos la solución juntos", desc: "Acordamos exactamente cómo mi desarrollo resuelve tu necesidad, con precio y tiempos claros por escrito." },
  { num: "03", title: "Desarrollo", desc: "Construyo tu solución. Te mantengo al tanto del avance durante todo el proceso." },
  { num: "04", title: "Pruebas", desc: "Antes de entregarte nada, lo pruebo a fondo para asegurarme de que funciona como se acordó." },
  { num: "05", title: "Entrega y mantenimiento", desc: "Te entrego, te explico cómo usarlo, y sigo dando soporte después — no desaparezco cuando terminas de pagar." },
];

export default function HowItWorks() {
  return (
    <section id="como">
      <div className="section-eyebrow">El proceso</div>
      <h2 className="section-title">
        Cómo trabajamos,
        <br />
        paso a paso
      </h2>
      <p className="section-sub">Sin burocracia. Sin sorpresas. Cada paso es claro y tú apruebas antes de avanzar.</p>

      <div className="steps-grid">
        {STEPS.map((s) => (
          <div className="step-card" key={s.num}>
            <div className="step-num">{s.num}</div>
            <div className="step-title">{s.title}</div>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
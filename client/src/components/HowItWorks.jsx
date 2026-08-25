const STEPS = [
  { num: "01", title: "Platicamos", desc: "Nos cuentas de tu negocio y el problema que quieres resolver. Sin costo, sin compromiso." },
  { num: "02", title: "Definimos la solución", desc: "Acordamos exactamente cómo el desarrollo resuelve tu necesidad, con precio y tiempos claros por escrito." },
  { num: "03", title: "Desarrollo", desc: "Construimos tu solución. Te mantenemos al tanto del avance durante todo el proceso." },
  { num: "04", title: "Pruebas", desc: "Antes de entregarte nada, lo probamos a fondo para asegurarnos de que funciona como se acordó." },
  { num: "05", title: "Entrega y soporte", desc: "Te entregamos, te explicamos cómo usarlo, y seguimos dando soporte después — no desaparecemos cuando terminas de pagar." },
];

export default function HowItWorks() {
  return (
    <section id="proceso" className="section section-alt">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">03 — Proceso</div>
            <h2 className="sec-title">Cómo trabajamos,<br />paso a paso</h2>
          </div>
          <p className="sec-sub" style={{ maxWidth: 440 }}>
            Sin burocracia. Sin sorpresas. Cada paso es claro y tú apruebas antes de avanzar.
          </p>
        </div>

        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.num}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

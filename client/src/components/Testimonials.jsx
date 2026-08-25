// 👉 REEMPLAZA estos textos con testimonios reales de tus clientes.
// Pídeles 2 líneas: qué problema tenían antes y qué cambió.
const TESTIMONIALS = [
  {
    quote: "Testimonio de la clínica de fisioterapia — qué problema tenían antes, qué cambió con el sistema, y cuánto tiempo les ahorra a la semana.",
    who: "Nombre del cliente",
    role: "Puesto · Clínica",
  },
  {
    quote: "Testimonio del gimnasio — cómo era cobrar y controlar membresías antes del punto de venta, y qué tan rápido se entregó.",
    who: "Nombre del cliente",
    role: "Puesto · Gimnasio",
  },
  {
    quote: "Testimonio de la tienda en línea — qué vendían antes por WhatsApp y cómo cambió tener catálogo y pedidos en un solo lugar.",
    who: "Nombre del cliente",
    role: "Puesto · Tienda",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="section">
      <div className="wrap">
        <div className="tst-head">
          <div>
            <div className="eyebrow">06 — Clientes</div>
            <h2 className="sec-title">Lo que dicen<br />de trabajar con nosotros</h2>
          </div>
          <div className="tst-note">
            PENDIENTE: pídele a tus 3 clientes 2 líneas y su puesto. Reemplaza el texto en Testimonials.jsx
          </div>
        </div>

        <div className="tst-grid">
          {TESTIMONIALS.map((t) => (
            <blockquote className="tst" key={t.role}>
              <p>{t.quote}</p>
              <div>
                <div className="tst-who">{t.who}</div>
                <div className="tst-role">{t.role}</div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

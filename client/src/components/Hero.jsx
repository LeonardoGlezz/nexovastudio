const STACK = ["React", "Node.js", "TypeScript", "Laravel", "React Native", "MySQL"];

const STATS = [
  { num: "3", suffix: "+", label: "Sistemas en producción" },
  { num: "48", suffix: "h", label: "Primer demo funcional" },
  { num: "8", suffix: "+", label: "Tecnologías dominadas" },
  { num: "100", suffix: "%", label: "Desarrollo directo, sin intermediarios" },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg"></div>
      <div className="hero-glow-a"></div>
      <div className="hero-glow-b"></div>

      <div className="hero-inner">
        <div>
          <div className="hero-badge">Estudio de software · Tehuacán, México</div>

          <h1>
            Tecnología que hace<br />
            crecer tu <em>negocio</em>
          </h1>

          <p className="hero-sub">
            En Nexova Studio construimos chatbots, sistemas a medida y automatizaciones para
            negocios locales. Soluciones reales, pensadas para negocios pequeños y medianos,
            no para grandes corporativos.
          </p>

          <div className="hero-actions">
            <a href="#trabajo" className="btn-primary">Ver nuestro trabajo <span className="mono">→</span></a>
            <a href="#contacto" className="btn-ghost">Cotizar mi proyecto</a>
          </div>

          <div className="stack-row">
            {STACK.map((s) => <span key={s}>{s}</span>)}
          </div>
        </div>

        <div className="brand-plate">
          <div className="brand-plate-top">
            <div className="brand-monogram">N</div>
            <div className="brand-meta">
              Est. 2025<br />Tehuacán · Puebla<br />MX
            </div>
          </div>

          <div className="brand-word">NEXOVA</div>
          <div className="brand-word-sub">Studio</div>
          <div className="brand-rule"></div>

          <div className="brand-stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="brand-stat-num">{s.num}<span>{s.suffix}</span></div>
                <div className="brand-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <div className="hero-symbol">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="16" fill="rgba(91,110,245,0.1)" stroke="rgba(91,110,245,0.3)" strokeWidth="1" />
            <line className="draw-line" x1="20" y1="58" x2="20" y2="22" stroke="#5B6EF5" strokeWidth="4" strokeLinecap="round" />
            <line className="draw-line" x1="20" y1="22" x2="60" y2="58" stroke="#A78BFA" strokeWidth="4" strokeLinecap="round" />
            <line className="draw-line" x1="60" y1="22" x2="60" y2="58" stroke="#5B6EF5" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        <div className="hero-eyebrow">Estudio de software · Tehuacán, México</div>

        <h1>
          Tecnología que hace
          <br />
          crecer tu <span className="accent-word">negocio</span>
        </h1>

        <p className="hero-sub">
          Desarrollo chatbots, sistemas a medida y automatizaciones para negocios locales.
          Soluciones reales, hechas por mí directamente — pensadas para negocios pequeños y medianos, no para grandes corporativos.
        </p>

        <div className="hero-actions">
          <a href="#portafolio" className="btn-primary">Ver mi trabajo →</a>
          <a href="#contacto" className="btn-ghost">Cotizar mi proyecto</a>
        </div>
      </div>
    </section>
  );
}

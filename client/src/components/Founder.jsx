const SKILLS = ["React", "Angular", "Node.js", "TypeScript", "Laravel", "React Native", "MySQL", "Java"];

// La foto vive en client/public/leo.jpg
export default function Founder() {
  return (
    <section id="fundador" className="section">
      <div className="wrap">
        <div className="eyebrow">04 — Quién está detrás</div>
        <h2 className="sec-title" style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
          El desarrollador,<br />no una agencia sin rostro
        </h2>

        <div className="founder-grid">
          <div className="founder-photo-wrap">
            <div className="founder-frame">
              <div className="founder-crop">
                <img src="/leo.jpg" alt="Leonardo González Cuevas, fundador de Nexova Studio" />
              </div>
            </div>
            <div className="founder-plate">
              <div className="founder-name">Leonardo González Cuevas</div>
              <div className="founder-role">Fundador · Full Stack Developer</div>
            </div>
          </div>

          <div>
            <p className="founder-quote">
              Cuando contratas Nexova Studio, hablas directo conmigo. Sin intermediarios, sin subcontratistas.
            </p>
            <p className="founder-bio">
              Estudiante de Ingeniería en Software en la Universidad Tecnológica de Tehuacán, con
              experiencia real construyendo sistemas completos: desde plataformas SaaS hasta sistemas
              de punto de venta.
            </p>
            <p className="founder-bio">
              Trabajo directamente en cada proyecto — desde entender tu negocio hasta entregarte una
              solución que funciona de verdad, con soporte continuo después de la entrega. Nexova Studio
              es hoy un estudio de una persona, y está construido para crecer sin perder eso.
            </p>
            <div className="founder-skills-label">Stack</div>
            <div className="founder-skills">
              {SKILLS.map((s) => <span key={s}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

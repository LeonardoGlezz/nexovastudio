const SKILLS = ["React", "Angular", "Node.js", "TypeScript", "Laravel", "React Native", "MySQL", "Java"];

export default function Founder() {
  return (
    <section id="fundador">
      <div className="section-eyebrow">Quién está detrás</div>
      <h2 className="section-title">
        El desarrollador,
        <br />
        no una agencia sin rostro
      </h2>
      <p className="section-sub">
        Cuando contratas Nexova Studio, hablas directo conmigo. Sin intermediarios, sin subcontratistas.
      </p>

      <div className="founder-wrap">
        <div className="founder-avatar">L</div>
        <div>
          <div className="founder-name">Leo — Fundador de Nexova Studio</div>
          <div className="founder-role">Full Stack Developer & Software Engineer</div>
          <p className="founder-bio">
            Estudiante de Ingeniería en Software en la Universidad Tecnológica de Tehuacán, con experiencia real
            construyendo sistemas completos: desde plataformas SaaS hasta sistemas de punto de venta. Trabajo
            directamente en cada proyecto — desde entender tu negocio hasta entregarte una solución que funciona
            de verdad, con soporte continuo después de la entrega.
          </p>
          <div className="founder-skills">
            {SKILLS.map((s) => (
              <span className="skill-tag" key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
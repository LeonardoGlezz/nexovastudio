const FAQS = [
  {
    q: "No sé qué necesito exactamente. ¿Puedo empezar así?",
    a: "Sí, es el caso más común. La primera llamada sirve para eso: nos cuentas cómo trabajas hoy y nosotros te decimos qué resolvería más con menos inversión. A veces la respuesta es que no necesitas software todavía.",
  },
  {
    q: "¿El precio que me cotizan puede subir después?",
    a: "No. La cotización se entrega por escrito con alcance y tiempos definidos. Si a medio proyecto pides algo fuera de ese alcance, te decimos cuánto cuesta antes de hacerlo — nunca aparece en la factura sin que lo hayas aprobado.",
  },
  {
    q: "¿Qué pasa después de la entrega?",
    a: "Te capacitamos en el uso del sistema y seguimos disponibles para soporte. Los servicios con mantenimiento mensual incluyen ajustes, respaldos y monitoreo; los proyectos a medida incluyen un periodo de acompañamiento después de entregar.",
  },
  {
    q: "¿Trabajan fuera de Tehuacán?",
    a: "Sí. El trabajo es remoto en su mayoría, con reuniones por videollamada. En Tehuacán y Puebla también podemos vernos en persona cuando el proyecto lo requiere.",
  },
  {
    q: "¿De quién es el código y los datos?",
    a: "Tuyos. Al liquidar el proyecto recibes el código y los accesos a tu base de datos y servicios. Ningún cliente queda amarrado a nosotros para poder seguir operando.",
  },
  {
    q: "¿Cómo son los pagos?",
    a: "Normalmente 50% para arrancar y 50% contra entrega. En proyectos más grandes se divide por etapas, cada una con su entregable revisable.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="section section-alt">
      <div className="faq-layout">
        <div>
          <div className="eyebrow">07 — Dudas frecuentes</div>
          <h2 className="sec-title" style={{ marginBottom: 20 }}>Lo que casi<br />siempre preguntan</h2>
          <p className="sec-sub" style={{ maxWidth: 360, fontSize: 15 }}>
            Si tu duda no está aquí, mándala por WhatsApp. Respondemos en menos de 24 horas.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

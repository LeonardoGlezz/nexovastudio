import { ArrowRight, Check, Code2, MessageCircle, Plus, Sparkles, Workflow } from "lucide-react";
import { Button } from "./ui/Button";
import { ContactButton } from "./ContactModal";
import { Brand } from "./Header";
import { CONTACT_INFO } from "../contactInfo";
import { faqs, processSteps, services, whatsapp } from "../content";

export function Services() {
  return (
    <section className="studio-section bg-secondary" id="servicios">
      <div className="studio-container">
        <div className="text-center mb-11">
          <span className="eyebrow">Cada negocio tiene su manera</span>
          <h2 className="section-title mt-3">¿Qué te gustaría hacer más fácil?</h2>
          <p className="section-copy mt-4 max-w-xl mx-auto">Empezamos por lo que necesitas, no por venderte más tecnología.<br className="hidden md:block" /> Lo sencillo tiene precio inicial; lo hecho a medida lo cotizamos contigo.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <article className="service-card" key={s.title}>
              <div className="flex justify-between items-center">
                <span className={`service-icon ${i === 1 ? "bg-peach text-copper" : i === 2 ? "bg-sky" : ""}`}>{i === 0 ? <MessageCircle size={21} /> : i === 1 ? <Workflow size={21} /> : <Code2 size={21} />}</span>
                <span className="text-[10px] font-medium text-muted-foreground">{s.tag}</span>
              </div>
              <h3 className="font-bold text-xl mt-6">{s.title}</h3>
              <p className="text-sm font-medium mt-3">{s.need}</p>
              <p className="section-copy text-sm mt-2 mb-5 md:min-h-[3.75rem]">{s.description}</p>
              <div className="border-t border-border pt-5">
                {s.price ? (
                  <p className="service-price"><span className="text-xs font-medium text-muted-foreground mr-1.5">Desde</span>{s.price}<span className="text-[10px] font-normal ml-1">MXN</span></p>
                ) : (
                  <p className="service-price !text-xl">{s.priceLabel}</p>
                )}
                <p className="text-[11px] font-medium text-foreground mt-1">{s.priceNote}</p>
                <p className="text-[11px] text-muted-foreground mt-2 md:min-h-[4.5rem]">{s.detail}</p>
              </div>
              <ul className="space-y-3 text-xs my-6 flex-1">{s.features.map((f) => <li className="flex gap-2" key={f}><Check size={14} className="text-primary shrink-0" />{f}</li>)}</ul>
              <ContactButton label="Platiquemos de esto" service={s.title} className="h-11 w-full" />
            </article>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-x-10 mt-10">
          <div className="small-offer flex gap-4">
            <Sparkles className="text-copper w-5 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-sm">¿Necesitas orientación primero?</h3>
              <p className="section-copy text-xs mt-2">Consultoría de 60 min · <strong className="text-foreground">$500 MXN</strong><br />Análisis y recomendaciones. Se abona a tu proyecto.</p>
              <ContactButton label="Consultar esta opción" service="Consultoría tecnológica" className="mt-4" />
            </div>
          </div>
          <div className="small-offer flex gap-4">
            <Code2 className="text-primary w-5 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-sm">¿Tu idea necesita una app móvil?</h3>
              <p className="section-copy text-xs mt-2">Apps sencillas · <strong className="text-foreground">Se cotiza según el alcance</strong><br />Catálogo, pedidos o registro de clientes. El plazo se define contigo.</p>
              <ContactButton label="Platicar mi idea" service="App móvil sencilla" className="mt-4" />
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-7">Los precios "desde" son el punto de partida. La cotización final y los plazos se entregan por escrito, según el alcance, antes de empezar.</p>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="studio-section border-b border-border" id="proceso">
      <div className="studio-container">
        <div className="flex flex-col md:flex-row justify-between gap-5 md:items-end mb-12">
          <div><span className="eyebrow">De tu idea a tu día a día</span><h2 className="section-title mt-3">Tú nos cuentas. Lo construimos juntos.</h2></div>
          <p className="section-copy max-w-xs">Siempre sabes qué sigue.<br />Y tú apruebas antes de avanzar.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {processSteps.map(([n, t, d]) => (
            <div key={n}>
              <p className="process-number">{n} <span className="float-right text-muted-foreground"><ArrowRight size={16} /></span></p>
              <h3 className="text-base font-bold mt-5">{t}</h3>
              <p className="section-copy text-sm mt-3">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="studio-section" id="dudas">
      <div className="studio-container grid md:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-24">
        <div>
          <span className="eyebrow">Vamos a hacerlo claro</span>
          <h2 className="section-title mt-3">Las dudas también<br />son un buen comienzo.</h2>
          <p className="section-copy mt-5">Es normal tener preguntas.<br />Aquí van algunas respuestas, sin rodeos.</p>
          <Button asChild variant="link" className="px-0 mt-5"><a href={whatsapp} target="_blank" rel="noreferrer">Tengo otra pregunta<ArrowRight /></a></Button>
        </div>
        <div>
          {faqs.map(([q, a]) => (
            <details className="faq-item" key={q}><summary>{q}<Plus className="shrink-0 w-4 h-4 text-primary transition-transform" /></summary><p>{a}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactBand() {
  return (
    <section className="contact-band" id="contacto">
      <div className="studio-container flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-xs mb-4 opacity-80">Un mensaje puede ser un buen comienzo.</p>
          <h2 className="section-title">Tu idea no tiene que estar lista.<br />Platiquémosla.</h2>
          <p className="section-copy mt-5 max-w-lg">Cuéntanos qué te gustaría resolver. Te respondemos en menos de 24 horas, sin tecnicismos y sin compromiso.</p>
        </div>
        <div className="flex flex-col gap-3 items-start md:items-center shrink-0">
          <Button variant="inverse" asChild className="h-12 px-6"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Escríbenos por WhatsApp<ArrowRight /></a></Button>
          <ContactButton label="Prefiero dejar un mensaje" inverse className="h-11" />
          <p className="text-[10px] opacity-75 mt-1">Hablas directamente con quienes construyen · Tomamos pocos proyectos a la vez.</p>
        </div>
      </div>
    </section>
  );
}

export function Footer({ onAccess }) {
  return (
    <footer className="studio-footer">
      <div className="studio-container flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><Brand /><p className="text-xs text-muted-foreground mt-3">Pequeño estudio. Grandes ganas de ayudarte.</p></div>
        <div className="text-xs text-muted-foreground flex flex-col md:items-end gap-3">
          <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary">{CONTACT_INFO.email}</a>
          <p>© {new Date().getFullYear()} Nexova Studio · Hecho en Tehuacán, México</p>
          <button type="button" className="hover:text-primary underline-offset-4 hover:underline" onClick={onAccess}>Acceso del equipo</button>
        </div>
      </div>
    </footer>
  );
}

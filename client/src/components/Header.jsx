import { useState } from "react";
import { ArrowRight, CheckCircle2, HeartHandshake, MapPin, Menu, MessageCircle, ShieldCheck, X } from "lucide-react";
import { Button } from "./ui/Button";
import { ContactButton } from "./ContactModal";
import { whatsapp } from "../content";
import workspace from "../assets/nexova-workspace.jpg";

export function Brand() {
  return (
    <a href="#inicio" className="brand" aria-label="Nexova Studio, inicio">
      <span className="brand-mark">
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M7 28V8h5l12 15V8h5v20h-5L12 13v15H7Z" fill="currentColor" /><path d="m25 4 5 4" stroke="currentColor" strokeWidth="2.5" /></svg>
      </span>
      <span>Nexova<span className="font-normal text-muted-foreground"> Studio</span><span className="text-copper">.</span></span>
    </a>
  );
}

const LINKS = [["Soluciones", "#soluciones"], ["Proyectos", "#proyectos"], ["Cómo trabajamos", "#proceso"], ["Dudas", "#dudas"]];

export function Header({ user, onPanel, onAccount }) {
  const [menu, setMenu] = useState(false);
  const isAdmin = user?.role === "admin";
  return (
    <header className="studio-header">
      <div className="studio-container h-full flex items-center justify-between gap-5">
        <Brand />
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
          {LINKS.map(([label, href]) => <a className="nav-link" key={href} href={href}>{label}</a>)}
        </nav>
        <div className="flex gap-2 items-center">
          {isAdmin && <Button variant="quiet" className="hidden sm:inline-flex h-10 px-4" onClick={onPanel}>Panel</Button>}
          <Button variant="ghost" className="hidden sm:inline-flex h-10 px-3 text-muted-foreground hover:text-primary" onClick={onAccount} aria-label={user ? "Mi cuenta" : "Iniciar sesión"}>
            {user ? <><span className="inline-block w-2 h-2 rounded-full bg-primary" />{user.name.split(" ")[0]}</> : "Acceso"}
          </Button>
          <ContactButton label="Platiquemos" className="hidden sm:inline-flex h-10 px-5" />
          <Button variant="ghost" size="icon" className="lg:hidden" aria-expanded={menu} aria-label={menu ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menu && (
        <nav className="mobile-menu" aria-label="Navegación móvil">
          {LINKS.map(([label, href]) => <a href={href} key={href} onClick={() => setMenu(false)}>{label}</a>)}
          {isAdmin && <a href="#inicio" onClick={(e) => { e.preventDefault(); setMenu(false); onPanel(); }} className="font-semibold">Panel de administración</a>}
          <a href="#inicio" onClick={(e) => { e.preventDefault(); setMenu(false); onAccount(); }}>{user ? `Mi cuenta (${user.name.split(" ")[0]})` : "Acceso del equipo"}</a>
          <a href="#contacto" onClick={() => setMenu(false)} className="text-primary font-semibold">Platiquemos →</a>
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <>
      <section className="studio-hero">
        <img className="hero-photo" src={workspace} width={1920} height={1024} alt="Espacio de trabajo con una computadora y una agenda digital, imagen conceptual" fetchPriority="high" />
        <div className="hero-wash" />
        <div className="studio-container hero-content fade-in">
          <div className="eyebrow"><span className="eyebrow-dot" />Software cercano. Hecho en México.</div>
          <h1 className="mt-6">Nexova Studio.<br />Tu negocio,<br /><span className="text-primary">un poco más fácil.</span></h1>
          <p className="hero-subtitle mt-6">Software a medida, chatbots y automatizaciones para que dediques menos tiempo a los pendientes y más a hacer crecer tu negocio.</p>
          <div className="flex flex-wrap items-center gap-4 mt-7">
            <Button asChild variant="studio" className="h-12 px-6"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Platiquemos por WhatsApp<ArrowRight /></a></Button>
            <Button asChild variant="ghost" className="px-1 h-12"><a href="#proyectos">Ver proyectos<ArrowRight /></a></Button>
          </div>
          <p className="flex items-center gap-2 text-[11px] text-muted-foreground mt-5"><CheckCircle2 size={13} className="text-primary" />Primera conversación sin costo y sin compromiso.</p>
        </div>
        <span className="hero-caption">Imagen conceptual del estudio</span>
      </section>
      <div className="trust-strip">
        <div className="studio-container grid grid-cols-2 md:grid-cols-4 gap-x-5">
          <div className="trust-item"><HeartHandshake />Trato directo, sin intermediarios</div>
          <div className="trust-item"><ShieldCheck />Precios claros desde el inicio</div>
          <div className="trust-item"><CheckCircle2 />Acompañamiento después de entregar</div>
          <div className="trust-item"><MapPin />Tehuacán, México · Trabajo remoto</div>
        </div>
      </div>
    </>
  );
}

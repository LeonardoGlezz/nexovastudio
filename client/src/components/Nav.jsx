import { useState } from "react";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#proceso", label: "Proceso" },
  { href: "#fundador", label: "Fundador" },
  { href: "#faq", label: "Dudas" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          <span className="logo-mark">N</span>
          <span className="logo-word">Nexova <span>Studio</span></span>
        </a>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Abrir menú">
          <span></span><span></span><span></span>
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#contacto" className="nav-cta" onClick={() => setOpen(false)}>Agendar llamada</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

import { useState, useEffect } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#fundador", label: "Fundador" },
    { href: "#portafolio", label: "Portafolio" },
    { href: "#productos", label: "Servicios" },
  ];

  return (
    <nav style={{ background: scrolled ? "rgba(9,14,26,0.95)" : "rgba(9,14,26,0.82)" }}>
      <a href="#" className="nav-logo">
        <div className="logo-mark">N</div>
        <span className="logo-wordmark">
          Nexova<span>Studio</span>
        </span>
      </a>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contacto" className="nav-cta" onClick={() => setOpen(false)}>
            Hablar con nosotros
          </a>
        </li>
      </ul>

      <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Abrir menú">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

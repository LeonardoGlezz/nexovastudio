import { useEffect, useState } from "react";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#proceso", label: "Proceso" },
  { href: "#faq", label: "Dudas" },
];

export default function Nav({ user, onAccount }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Resalta en el menú la sección que se está viendo
  useEffect(() => {
    const ids = [...LINKS.map((l) => l.href.slice(1)), "contacto"];
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

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
              <a href={l.href} className={active === l.href.slice(1) ? "active" : ""} aria-current={active === l.href.slice(1) ? "true" : undefined} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li>
            <button type="button" className="nav-login" onClick={() => { setOpen(false); onAccount(); }}>
              {user ? `● ${user.name.split(" ")[0]}` : "Acceso"}
            </button>
          </li>
          <li>
            <a href="#contacto" className="nav-cta" onClick={() => setOpen(false)}>Agendar llamada</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

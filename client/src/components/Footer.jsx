const NAV = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#proceso", label: "Proceso" },
  { href: "#faq", label: "Dudas frecuentes" },
];

const CONTACT = [
  { href: "https://wa.me/522226709233", label: "WhatsApp", ext: true },
  { href: "mailto:contacto.nexovastudio@gmail.com", label: "Correo" },
  { href: "https://www.instagram.com/nexovastudio_/", label: "Instagram", ext: true },
  { href: "https://www.linkedin.com/in/leonardo-gonz%C3%A1lez-cuevas-4ab742219/", label: "LinkedIn", ext: true },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="logo-mark">N</span>
              <span className="logo-word">Nexova <span>Studio</span></span>
            </div>
            <p className="footer-about">
              Estudio de software para negocios que quieren digitalizarse bien y a la primera.
            </p>
          </div>

          <div>
            <div className="footer-col-label">Navegación</div>
            <ul className="footer-col-links">
              {NAV.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </div>

          <div>
            <div className="footer-col-label">Contacto</div>
            <ul className="footer-col-links">
              {CONTACT.map((l) => (
                <li key={l.label}>
                  <a href={l.href} {...(l.ext ? { target: "_blank", rel: "noreferrer" } : {})}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-label">Base</div>
            <p className="footer-base">Tehuacán, Puebla<br />México</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Nexova Studio</span>
          <span>Hecho en México</span>
        </div>
      </div>
    </footer>
  );
}

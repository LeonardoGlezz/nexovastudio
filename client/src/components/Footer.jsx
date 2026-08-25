export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        © {new Date().getFullYear()} <strong>Nexova Studio</strong> — Tehuacán, Puebla · México
      </div>
      <ul className="footer-links">
        <li><a href="#portafolio">Portafolio</a></li>
        <li><a href="#productos">Servicios</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </footer>
  );
}

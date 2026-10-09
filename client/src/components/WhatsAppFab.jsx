import { useEffect, useState } from "react";
import { whatsappUrl } from "../contactInfo";

// Botón flotante de WhatsApp: aparece al bajar un poco y sigue a la persona por toda la página
export default function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className={`wa-fab ${show ? "show" : ""}`}
      href={whatsappUrl("Hola Nexova Studio, vi su página y quiero más información")}
      target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp" tabIndex={show ? 0 : -1}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C9.4 3 4 8.38 4 15.01c0 2.12.55 4.19 1.6 6.02L4 28l7.14-1.87a12.03 12.03 0 0 0 4.9 1.04h.01C22.7 27.17 28 21.8 28 15.17 28 8.5 22.68 3 16.04 3zm0 22.1h-.01a10 10 0 0 1-5.1-1.4l-.37-.22-3.8 1 1.02-3.7-.24-.38a9.9 9.9 0 0 1-1.52-5.3c0-5.5 4.5-9.97 10.04-9.97 5.5 0 9.96 4.47 9.96 9.98 0 5.5-4.45 9.99-9.98 9.99zm5.5-7.46c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.28-.47-2.43-1.5a9.1 9.1 0 0 1-1.68-2.1c-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.24-.58-.5-.5-.68-.5l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.1 3.2 5.1 4.5.72.3 1.28.5 1.7.63.72.23 1.37.2 1.88.12.58-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z" /></svg>
      <span className="wa-tip">¿Dudas? Escríbenos</span>
    </a>
  );
}

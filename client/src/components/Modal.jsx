import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/Button";

// Ventana emergente accesible: se cierra con Escape o al hacer clic afuera, bloquea el scroll de
// la página y mantiene el foco del teclado dentro de la ventana mientras está abierta.
export default function Modal({ children, onClose, title }) {
  const ref = useRef(null);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector("input, select, textarea, button, a")?.focus();

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const nodes = ref.current?.querySelectorAll("button, a[href], input, select, textarea");
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={ref} className="studio-modal" role="dialog" aria-modal="true" aria-label={title}>
        <Button variant="ghost" size="icon" className="absolute right-3 top-3" aria-label="Cerrar" onClick={onClose}><X /></Button>
        {children}
      </div>
    </div>
  );
}

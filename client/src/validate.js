// Validación del formulario de contacto en el navegador: avisa al visitante qué corregir
// ANTES de enviar. El servidor (server/src/utils/validateContact.js) vuelve a validar todo,
// así que si cambias las reglas aquí, cámbialas también allá.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isPhone(value) {
  if (!/^[\d\s\-().+]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

// Devuelve un texto de error, o "" si todo está bien
export function validateContactForm({ name, contact }) {
  const cleanName = name.trim();
  const letters = (cleanName.match(/\p{L}/gu) || []).length;
  if (cleanName.length < 2 || letters < 2) return "Escribe tu nombre (mínimo 2 letras)";

  const cleanContact = contact.trim();
  if (!EMAIL_RE.test(cleanContact) && !isPhone(cleanContact)) {
    return "Escribe un correo válido (ej. tu@correo.com) o un WhatsApp de 10 dígitos para poder responderte";
  }
  return "";
}

// Validación del formulario de contacto en el navegador: avisa al visitante qué corregir
// ANTES de enviar. El servidor (server/src/utils/validateContact.js) vuelve a validar todo,
// así que si cambias las reglas aquí, cámbialas también allá.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isPhone(value) {
  if (!/^[\d\s\-().+]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

// Devuelve un objeto con un texto de error por campo ({} si todo está bien)
export function validateFields({ name, contact }) {
  const errors = {};
  const cleanName = name.trim();
  const letters = (cleanName.match(/\p{L}/gu) || []).length;
  if (cleanName.length < 2 || letters < 2) errors.name = "Escribe tu nombre (mínimo 2 letras)";

  const cleanContact = contact.trim();
  if (!EMAIL_RE.test(cleanContact) && !isPhone(cleanContact)) {
    errors.contact = "Escribe un correo válido (tu@correo.com) o un WhatsApp de 10 dígitos para poder responderte";
  }
  return errors;
}

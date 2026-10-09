// Reglas del formulario de contacto. Esta es la validación que MANDA (la del navegador es
// solo para avisarle al visitante más rápido, y cualquiera puede saltársela).
// Si cambias las reglas aquí, cámbialas también en client/src/validate.js.

const INTERESTS = [
  "Consultoría tecnológica",
  "Chatbot para WhatsApp",
  "Automatización de procesos",
  "Software a medida",
  "App móvil",
  "Otro / No sé aún",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Teléfono: solo dígitos y separadores comunes (espacios, guiones, paréntesis, +), de 10 a 13 dígitos
function isPhone(value) {
  if (!/^[\d\s\-().+]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

const clean = (value, max) => String(value ?? "").trim().slice(0, max);

// Devuelve { error } si algo está mal, o { data } con los campos ya limpios
function validateContact(body = {}) {
  const name = clean(body.name, 100);
  const contact = clean(body.contact, 150);
  const interest = clean(body.interest, 100);
  const message = clean(body.message, 2000);

  const letters = (name.match(/\p{L}/gu) || []).length;
  if (name.length < 2 || letters < 2) {
    return { error: "Escribe tu nombre (mínimo 2 letras)" };
  }
  if (!EMAIL_RE.test(contact) && !isPhone(contact)) {
    return { error: "Escribe un correo válido (ej. tu@correo.com) o un WhatsApp de 10 dígitos para poder responderte" };
  }

  return {
    data: {
      name,
      contact,
      interest: INTERESTS.includes(interest) ? interest : null,
      message: message || null,
    },
  };
}

module.exports = { validateContact, INTERESTS, EMAIL_RE, isPhone };

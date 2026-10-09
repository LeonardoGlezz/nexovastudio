// Validación de un proyecto del portafolio. Solo la usan los admins (POST /api/portfolio),
// pero igual no confiamos en lo que llega: tipos, largos y formatos se revisan aquí.

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
// La imagen solo puede ser una ruta propia (/projects/foto.jpg) o una URL https.
// Así nadie puede guardar "javascript:..." ni "data:..." como imagen.
const IMAGE_PATH = /^(\/projects\/[\w.-]{1,100}\.(jpe?g|png|webp|avif)|https:\/\/[^\s"'<>]{1,240})$/i;

const text = (value, max) => String(value ?? "").trim().slice(0, max);

function validatePortfolio(body = {}) {
  const title = text(body.title, 150);
  const tag = text(body.tag, 100);
  const description = text(body.description, 2000);
  if (!title || !tag || !description) {
    return { error: "title, tag y description son obligatorios" };
  }

  const data = { title, tag, description };

  if (body.emoji !== undefined) data.emoji = text(body.emoji, 16);

  for (const field of ["colorFrom", "colorTo"]) {
    if (body[field] !== undefined) {
      if (!HEX_COLOR.test(String(body[field]))) return { error: `${field} debe ser un color como #5B6EF5` };
      data[field] = String(body[field]);
    }
  }

  if (body.image !== undefined && body.image !== null && body.image !== "") {
    if (!IMAGE_PATH.test(String(body.image))) {
      return { error: "image debe ser una ruta como /projects/foto.jpg o una URL https" };
    }
    data.image = String(body.image);
  }

  if (body.stack !== undefined) {
    if (!Array.isArray(body.stack) || body.stack.length > 12 || body.stack.some((s) => typeof s !== "string" || s.length > 40)) {
      return { error: "stack debe ser una lista de hasta 12 textos cortos" };
    }
    data.stack = body.stack.map((s) => s.trim()).filter(Boolean);
  }

  if (body.order !== undefined) {
    const order = Number(body.order);
    if (!Number.isInteger(order) || order < 0 || order > 1000) return { error: "order debe ser un entero entre 0 y 1000" };
    data.order = order;
  }

  if (body.published !== undefined) {
    if (typeof body.published !== "boolean") return { error: "published debe ser true o false" };
    data.published = body.published;
  }

  return { data };
}

module.exports = { validatePortfolio };

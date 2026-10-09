// Piezas de seguridad compartidas: cómo saber la IP real del visitante y cómo crear límites de peticiones.
const net = require("net");
const { rateLimit, ipKeyGenerator } = require("express-rate-limit");

// ── IP real del visitante ──
// Detrás de Render hay proxies (Cloudflare + el balanceador de Render). Si leemos mal la IP,
// todos los visitantes comparten el mismo "contador" o un atacante puede escaparse del límite.
// Cloudflare siempre REESCRIBE la cabecera CF-Connecting-IP con la IP real, así que el visitante no
// puede falsificarla (si un visitante la manda, Cloudflare responde 403: comprobado). Se usa
// SIEMPRE en producción; si por alguna razón no viene la cabecera, se usa req.ip normal.
// En tu computadora (sin Cloudflare) no se usa, porque ahí sí podría inventarla cualquiera.
// Para apagarla a propósito: USE_CF_IP_HEADER=false.
function clientIp(req) {
  const enabled = process.env.NODE_ENV === "production" && String(process.env.USE_CF_IP_HEADER).toLowerCase() !== "false";
  if (enabled) {
    const cf = req.headers["cf-connecting-ip"];
    if (typeof cf === "string" && net.isIP(cf.trim())) return cf.trim();
  }
  return req.ip;
}

// Crea un limitador de peticiones. Por defecto agrupa por IP; "key" permite agrupar por otra cosa
// (por ejemplo, por correo en el login).
function makeLimiter({ windowMs, limit, message, key, skipSuccessfulRequests = false }) {
  return rateLimit({
    windowMs,
    limit,
    skipSuccessfulRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: message },
    keyGenerator: (req) => (key ? key(req) : ipKeyGenerator(clientIp(req))),
  });
}

module.exports = { clientIp, makeLimiter };

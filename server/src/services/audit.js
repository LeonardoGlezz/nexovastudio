// Ayudas para escribir en la bitácora. Siempre se usan DENTRO de la misma transacción que la
// operación principal: o se guardan las dos cosas (el cambio y su registro) o no se guarda ninguna.
const AuditLog = require("../models/AuditLog");

const trunc = (v) => (typeof v === "string" && v.length > 120 ? v.slice(0, 117) + "..." : v);

// La columna "stack" puede venir como texto (algunas bases guardan JSON como texto): se normaliza
const norm = (v) => {
  if (typeof v === "string" && /^\s*[\[{]/.test(v)) {
    try { return JSON.parse(v); } catch { return v; }
  }
  return v ?? null;
};

// Compara dos versiones de un registro y devuelve solo lo que cambió: { campo: { de, a } }
function diff(before, after, fields) {
  const changes = {};
  for (const f of fields) {
    const a = norm(before[f]);
    const b = norm(after[f]);
    if (JSON.stringify(a) !== JSON.stringify(b)) changes[f] = { de: trunc(a), a: trunc(b) };
  }
  return changes;
}

function logChange({ action, entity, entityId = null, summary, details = null, user = null }, transaction) {
  return AuditLog.create(
    {
      action,
      entity,
      entityId,
      summary: String(summary).slice(0, 250),
      details,
      userId: user?.id ?? null,
      userEmail: user?.email ?? null,
    },
    { transaction }
  );
}

module.exports = { logChange, diff };

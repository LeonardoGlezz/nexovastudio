// Avisa por correo cuando llega un mensaje nuevo del formulario de contacto.
//
// Usa Resend (https://resend.com) con su API por HTTPS. No usamos SMTP/nodemailer porque
// Render bloquea los puertos de correo en el plan gratis.
//
// Variables de entorno (si falta alguna, simplemente no se manda el aviso):
//   RESEND_API_KEY  → la clave de tu cuenta de Resend
//   NOTIFY_EMAIL    → el correo donde quieres recibir los avisos
//   MAIL_FROM       → (opcional) remitente. Por defecto "Nexova Studio <onboarding@resend.dev>"

// Todo lo que escribe el visitante es texto NO confiable: se escapa antes de meterlo en el HTML
const escapeHtml = (text) =>
  String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const looksLikeEmail = (value) => /^\S+@\S+\.\S+$/.test(value);

// Si el contacto parece un teléfono, arma un link directo a WhatsApp (México por defecto)
function whatsappLink(contact) {
  const digits = String(contact).replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13 || looksLikeEmail(contact)) return null;
  const full = digits.length === 10 ? `52${digits}` : digits;
  return `https://wa.me/${full}`;
}

function buildEmail(msg) {
  const wa = whatsappLink(msg.contact);
  const rows = [
    ["Nombre", msg.name],
    ["Contacto", msg.contact],
    ["Le interesa", msg.interest || "—"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#1a1a1a">
      <h2 style="margin:0 0 4px;color:#9A5B1F">Nuevo mensaje en Nexova Studio</h2>
      <p style="margin:0 0 20px;color:#666;font-size:13px">Llegó desde el formulario de tu página.</p>
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        ${rows
          .map(
            ([label, value]) => `<tr>
          <td style="padding:8px 10px;border-bottom:1px solid #eee;color:#666;width:120px">${label}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #eee"><b>${escapeHtml(value)}</b></td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#666;font-size:13px">Mensaje:</p>
      <div style="padding:14px;background:#f6f3ee;border-left:3px solid #C6803D;white-space:pre-wrap;font-size:15px">${escapeHtml(msg.message || "(sin mensaje)")}</div>
      ${wa ? `<p style="margin-top:22px"><a href="${wa}" style="background:#25D366;color:#fff;padding:10px 16px;text-decoration:none;border-radius:4px;font-size:14px">Responder por WhatsApp</a></p>` : ""}
      <p style="margin-top:26px;color:#999;font-size:12px">Mensaje #${escapeHtml(msg.id)} · también queda guardado en tu base de datos.</p>
    </div>`;

  const text = [
    "Nuevo mensaje en Nexova Studio",
    "",
    `Nombre: ${msg.name}`,
    `Contacto: ${msg.contact}`,
    `Le interesa: ${msg.interest || "—"}`,
    "",
    `Mensaje: ${msg.message || "(sin mensaje)"}`,
    wa ? `\nWhatsApp: ${wa}` : "",
  ].join("\n");

  return { html, text };
}

// Devuelve true si se mandó, false si no está configurado. Lanza error si Resend rechaza el envío.
async function notifyNewContact(msg) {
  const { RESEND_API_KEY, NOTIFY_EMAIL } = process.env;
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) return false;

  const { html, text } = buildEmail(msg);
  const payload = {
    from: process.env.MAIL_FROM || "Nexova Studio <onboarding@resend.dev>",
    to: [NOTIFY_EMAIL],
    subject: `Nuevo mensaje de ${String(msg.name).replace(/[\r\n]+/g, " ").slice(0, 60)}`,
    html,
    text,
  };
  // Si dejó un correo, al pulsar "Responder" en tu bandeja le escribes directo a esa persona
  if (looksLikeEmail(msg.contact)) payload.reply_to = msg.contact;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend respondió ${res.status}: ${detail.slice(0, 200)}`);
  }
  return true;
}

module.exports = { notifyNewContact, buildEmail };

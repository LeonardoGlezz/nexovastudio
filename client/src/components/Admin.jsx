import { useCallback, useEffect, useState } from "react";
import {
  adminGetProjects, createProject, updateProject, deleteProject,
  getContactMessages, setMessageStatus, deleteMessage, getAudit,
} from "../api";

// Panel de administración: el sistema ABC (Altas, Bajas y Cambios).
//  - Proyectos del portafolio: alta (nuevo), cambio (editar), baja (eliminar)
//  - Mensajes de contacto: cambio de estado y baja (el alta la hace el formulario público)
//  - Bitácora: el registro automático de todo lo anterior (solo lectura)

const IMAGES = [
  { value: "", label: "Sin foto (se usa el emoji)" },
  { value: "/projects/fisioterapia.jpg", label: "Fisioterapia" },
  { value: "/projects/ecommerce.jpg", label: "Comercio electrónico" },
  { value: "/projects/gimnasio.jpg", label: "Gimnasio" },
  { value: "/projects/nggigua.jpg", label: "Nggigua (tableta)" },
];
const STATUSES = ["nuevo", "contactado", "cerrado"];
const EMPTY = { title: "", tag: "", description: "", emoji: "💻", image: "", colorFrom: "#5B6EF5", colorTo: "#3d4bc4", stack: "", order: 0, published: true };

const parseStack = (stack) => {
  if (Array.isArray(stack)) return stack;
  try { return JSON.parse(stack) || []; } catch { return []; }
};
const fmt = (iso) => new Date(iso).toLocaleString("es-MX", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
const short = (text, n = 60) => (text && text.length > n ? text.slice(0, n - 1) + "…" : text || "—");
const ACTION = { alta: "Alta", baja: "Baja", cambio: "Cambio" };

function ProjectForm({ initial, onSave, onCancel, saving, error }) {
  const [f, setF] = useState(() => ({ ...EMPTY, ...initial, image: initial?.image || "", stack: parseStack(initial?.stack).join(", ") }));
  const set = (e) => {
    const { name, value, type, checked } = e.target;
    setF({ ...f, [name]: type === "checkbox" ? checked : value });
  };
  const images = IMAGES.some((i) => i.value === f.image) ? IMAGES : [...IMAGES, { value: f.image, label: f.image }];

  function submit(e) {
    e.preventDefault();
    onSave({
      title: f.title, tag: f.tag, description: f.description, emoji: f.emoji, image: f.image,
      colorFrom: f.colorFrom, colorTo: f.colorTo, order: Number(f.order) || 0, published: !!f.published,
      stack: f.stack.split(",").map((s) => s.trim()).filter(Boolean),
    });
  }

  return (
    <form className="adm-form" onSubmit={submit}>
      <h3>{initial?.id ? `Editar proyecto #${initial.id}` : "Nuevo proyecto (alta)"}</h3>
      <div className="adm-grid">
        <label>Título<input name="title" value={f.title} onChange={set} maxLength={150} required /></label>
        <label>Etiqueta<input name="tag" value={f.tag} onChange={set} maxLength={100} placeholder="Ej. SaaS · Gestión clínica" required /></label>
      </div>
      <label>Descripción<textarea name="description" value={f.description} onChange={set} maxLength={2000} rows={3} required /></label>
      <div className="adm-grid adm-grid-4">
        <label>Emoji<input name="emoji" value={f.emoji} onChange={set} maxLength={16} /></label>
        <label>Color 1<input type="color" name="colorFrom" value={f.colorFrom} onChange={set} /></label>
        <label>Color 2<input type="color" name="colorTo" value={f.colorTo} onChange={set} /></label>
        <label>Orden<input type="number" name="order" value={f.order} onChange={set} min={0} max={1000} /></label>
      </div>
      <div className="adm-grid">
        <label>Foto
          <select name="image" value={f.image} onChange={set}>
            {images.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
          </select>
        </label>
        <label>Tecnologías (separadas por coma)<input name="stack" value={f.stack} onChange={set} placeholder="React, Node.js, MySQL" /></label>
      </div>
      <label className="adm-check"><input type="checkbox" name="published" checked={f.published} onChange={set} /> Publicado (visible en la página)</label>
      {error && <p className="adm-error" role="alert">{error}</p>}
      <div className="adm-actions">
        <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Guardando…" : initial?.id ? "Guardar cambios" : "Crear proyecto"}</button>
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

export default function Admin({ user, onClose, onChanged }) {
  const [tab, setTab] = useState("proyectos");
  const [projects, setProjects] = useState(null);
  const [messages, setMessages] = useState(null);
  const [logs, setLogs] = useState(null);
  const [editing, setEditing] = useState(null); // null | "new" | un proyecto
  const [confirm, setConfirm] = useState(null); // { type: "proyecto" | "mensaje", item }
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState("");
  const [loadError, setLoadError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoadError("");
      const [p, m, l] = await Promise.all([adminGetProjects(), getContactMessages(), getAudit()]);
      setProjects(p); setMessages(m); setLogs(l);
    } catch (err) {
      setLoadError(err.message);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !editing && !confirm && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, editing, confirm]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(id);
  }, [toast]);

  // Ejecuta una operación, avisa el resultado y vuelve a cargar todo (incluida la bitácora)
  async function run(operation, okText) {
    try {
      await operation();
      setToast(okText);
      onChanged();
      await load();
      return true;
    } catch (err) {
      setToast("⚠ " + err.message);
      return false;
    }
  }

  async function saveProject(data) {
    setSaving(true); setFormError("");
    try {
      if (editing?.id) await updateProject(editing.id, data);
      else await createProject(data);
      setEditing(null);
      setToast(editing?.id ? "Cambios guardados ✓" : "Proyecto creado ✓");
      onChanged();
      await load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function doDelete() {
    const { type, item } = confirm;
    setConfirm(null);
    if (type === "proyecto") await run(() => deleteProject(item.id), `Proyecto «${item.title}» eliminado ✓`);
    else await run(() => deleteMessage(item.id), `Mensaje #${item.id} eliminado ✓`);
  }

  const counts = { proyectos: projects?.length, mensajes: messages?.length, bitacora: logs?.length };

  return (
    <div className="admin" role="dialog" aria-modal="true" aria-label="Panel de administración">
      <div className="admin-bar">
        <div>
          <b>Panel de administración</b>
          <small>{user.email} · sistema ABC (altas, bajas y cambios)</small>
        </div>
        <button className="btn-ghost admin-close" onClick={onClose}>Cerrar panel ✕</button>
      </div>

      <div className="admin-body">
        <div className="tabs admin-tabs" role="tablist">
          {[["proyectos", "Proyectos"], ["mensajes", "Mensajes"], ["bitacora", "Bitácora"]].map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} className={`tab ${tab === id ? "on" : ""}`} onClick={() => { setTab(id); load(); }}>
              {label}{counts[id] != null && <span className="adm-count">{counts[id]}</span>}
            </button>
          ))}
        </div>

        {loadError && <p className="adm-error" role="alert">{loadError} <button className="adm-link" onClick={load}>Reintentar</button></p>}

        {/* ───────────── PROYECTOS ───────────── */}
        {tab === "proyectos" && (
          editing ? (
            <ProjectForm initial={editing === "new" ? null : editing} onSave={saveProject} onCancel={() => { setEditing(null); setFormError(""); }} saving={saving} error={formError} />
          ) : (
            <section>
              <div className="adm-head">
                <p>Los proyectos que se ven en el portafolio de la página. Los «ocultos» no aparecen al público.</p>
                <button className="btn-primary" onClick={() => setEditing("new")}>+ Alta de proyecto</button>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>#</th><th>Proyecto</th><th>Estado</th><th>Orden</th><th>Acciones</th></tr></thead>
                  <tbody>
                    {projects === null && <tr><td colSpan={5} className="adm-empty">Cargando…</td></tr>}
                    {projects?.length === 0 && <tr><td colSpan={5} className="adm-empty">No hay proyectos. Crea el primero con «Alta de proyecto».</td></tr>}
                    {projects?.map((p) => (
                      <tr key={p.id}>
                        <td className="adm-id">{p.id}</td>
                        <td><span className="adm-emoji">{p.emoji}</span> <b>{p.title}</b><small>{p.tag}</small></td>
                        <td><span className={`adm-pill ${p.published ? "ok" : "off"}`}>{p.published ? "Publicado" : "Oculto"}</span></td>
                        <td>{p.order}</td>
                        <td className="adm-row-actions">
                          <button onClick={() => setEditing(p)}>Editar</button>
                          <button className="danger" onClick={() => setConfirm({ type: "proyecto", item: p })}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {/* ───────────── MENSAJES ───────────── */}
        {tab === "mensajes" && (
          <section>
            <div className="adm-head"><p>Mensajes que llegan del formulario de contacto (altas hechas por los visitantes). Aquí cambias su estado o los eliminas.</p></div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>#</th><th>Recibido</th><th>Persona</th><th>Interés / mensaje</th><th>Estado</th><th></th></tr></thead>
                <tbody>
                  {messages === null && <tr><td colSpan={6} className="adm-empty">Cargando…</td></tr>}
                  {messages?.length === 0 && <tr><td colSpan={6} className="adm-empty">Aún no hay mensajes.</td></tr>}
                  {messages?.map((m) => (
                    <tr key={m.id}>
                      <td className="adm-id">{m.id}</td>
                      <td>{fmt(m.createdAt)}</td>
                      <td><b>{m.name}</b><small>{m.contact}</small></td>
                      <td>{m.interest && <em className="adm-int">{m.interest}</em>}<small>{short(m.message, 90)}</small></td>
                      <td>
                        <select className="adm-select" value={m.status} aria-label={`Estado del mensaje ${m.id}`}
                          onChange={(e) => run(() => setMessageStatus(m.id, e.target.value), `Mensaje #${m.id}: ${e.target.value} ✓`)}>
                          {STATUSES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="adm-row-actions"><button className="danger" onClick={() => setConfirm({ type: "mensaje", item: m })}>Eliminar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ───────────── BITÁCORA ───────────── */}
        {tab === "bitacora" && (
          <section>
            <div className="adm-head"><p>Registro automático de cada alta, baja y cambio. Solo se puede leer: nadie puede editar ni borrar la bitácora.</p></div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>#</th><th>Cuándo</th><th>Operación</th><th>Qué pasó</th><th>Quién</th></tr></thead>
                <tbody>
                  {logs === null && <tr><td colSpan={5} className="adm-empty">Cargando…</td></tr>}
                  {logs?.length === 0 && <tr><td colSpan={5} className="adm-empty">Aún no hay movimientos.</td></tr>}
                  {logs?.map((l) => (
                    <tr key={l.id}>
                      <td className="adm-id">{l.id}</td>
                      <td>{fmt(l.createdAt)}</td>
                      <td><span className={`adm-pill act-${l.action}`}>{ACTION[l.action]}</span></td>
                      <td>
                        {l.summary}
                        {l.details && Object.entries(l.details).map(([campo, v]) => (
                          <small key={campo} className="adm-diff"><code>{campo}</code>: {String(v.de ?? "—")} → {String(v.a ?? "—")}</small>
                        ))}
                      </td>
                      <td>{l.userEmail ? short(l.userEmail, 22) : <i>visitante</i>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {confirm && (
        <div className="adm-confirm-back" onMouseDown={(e) => e.target === e.currentTarget && setConfirm(null)}>
          <div className="adm-confirm" role="alertdialog" aria-modal="true">
            <h3>¿Eliminar {confirm.type === "proyecto" ? `«${confirm.item.title}»` : `el mensaje #${confirm.item.id}`}?</h3>
            <p>Esta baja no se puede deshacer. Quedará registrada en la bitácora.</p>
            <div className="adm-actions">
              <button className="btn-ghost" onClick={() => setConfirm(null)} autoFocus>Cancelar</button>
              <button className="adm-danger-btn" onClick={doDelete}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="adm-toast" role="status">{toast}</div>}
    </div>
  );
}

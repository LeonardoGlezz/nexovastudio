import { useEffect, useState } from "react";
import { login, logout, getContactMessages } from "../api";

// Ventana de acceso: inicia sesión con un usuario guardado en la base de datos.
// Si la sesión ya está iniciada, muestra los datos del usuario (y los mensajes si es admin).
export default function Account({ user, onUser, onClose }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [errorMsg, setErrorMsg] = useState("");
  const [messages, setMessages] = useState(null);
  const [messagesError, setMessagesError] = useState("");

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Si es admin, carga los mensajes de contacto
  useEffect(() => {
    if (user?.role !== "admin") return;
    setMessages(null);
    setMessagesError("");
    getContactMessages()
      .then(setMessages)
      .catch((err) => setMessagesError(err.message));
  }, [user]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const loggedUser = await login(form.email, form.password);
      setForm({ email: "", password: "" });
      setStatus("idle");
      onUser(loggedUser);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  function handleLogout() {
    logout();
    onUser(null);
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="acc-title">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>

        {!user ? (
          <form onSubmit={handleSubmit} className="acc-form">
            <div className="eyebrow">Acceso</div>
            <h2 id="acc-title" className="acc-title">Inicia sesión</h2>
            <p className="acc-sub">Entra con un usuario registrado en la base de datos de Nexova Studio.</p>

            <div className="field">
              <label htmlFor="acc-email">Correo</label>
              <input id="acc-email" type="email" name="email" value={form.email} onChange={handleChange}
                autoComplete="username" placeholder="tu@correo.com" required autoFocus />
            </div>
            <div className="field">
              <label htmlFor="acc-pass">Contraseña</label>
              <input id="acc-pass" type="password" name="password" value={form.password} onChange={handleChange}
                autoComplete="current-password" placeholder="••••••••" required />
            </div>

            <button type="submit" className="btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Verificando..." : "Entrar →"}
            </button>
            <div className="form-status">
              {status === "error" && <span className="form-status-err">{errorMsg}</span>}
            </div>
          </form>
        ) : (
          <div className="acc-user">
            <div className="eyebrow">Sesión iniciada</div>
            <h2 id="acc-title" className="acc-title">Hola, {user.name.split(" ")[0]}</h2>
            <dl className="acc-card">
              <div><dt>Nombre</dt><dd>{user.name}</dd></div>
              <div><dt>Correo</dt><dd>{user.email}</dd></div>
              <div><dt>Rol</dt><dd><span className={`acc-role acc-role-${user.role}`}>{user.role}</span></dd></div>
              <div><dt>Registrado</dt><dd>{new Date(user.createdAt).toLocaleDateString("es-MX", { dateStyle: "long" })}</dd></div>
            </dl>
            <p className="acc-note">Validado contra la tabla <code>Users</code> de la base de datos. Tu contraseña se guarda solo como hash bcrypt.</p>

            {user.role === "admin" && (
              <div className="acc-msgs">
                <div className="acc-msgs-label">Mensajes de contacto recibidos</div>
                {messagesError && <p className="form-status-err acc-msg-empty">{messagesError}</p>}
                {!messagesError && messages === null && <p className="acc-msg-empty">Cargando...</p>}
                {messages?.length === 0 && <p className="acc-msg-empty">Aún no hay mensajes.</p>}
                {messages?.map((m) => (
                  <div className="acc-msg" key={m.id}>
                    <strong>{m.name}</strong> <span>· {m.contact}</span>
                    {m.interest && <em> · {m.interest}</em>}
                    {m.message && <p>{m.message}</p>}
                  </div>
                ))}
              </div>
            )}

            <button className="btn-ghost acc-logout" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </div>
  );
}

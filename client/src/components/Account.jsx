import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";
import Modal from "./Modal";
import { login, logout } from "../api";

// Acceso del equipo: inicia sesión con un usuario guardado en la base de datos.
// Si la sesión ya está iniciada, muestra los datos y (si es admin) el acceso al panel ABC.
export default function Account({ user, onUser, onClose, onOpenPanel }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [errorMsg, setErrorMsg] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
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

  return (
    <Modal onClose={onClose} title="Acceso del equipo">
      {!user ? (
        <form onSubmit={submit}>
          <span className="eyebrow">Acceso</span>
          <h2 className="mt-4 text-3xl font-bold">Inicia sesión</h2>
          <p className="section-copy mt-3">Acceso para el equipo de Nexova Studio.</p>
          <label className="form-field" htmlFor="acc-email">Correo
            <input id="acc-email" type="email" name="email" value={form.email} onChange={change} autoComplete="username" placeholder="tu@correo.com" required />
          </label>
          <label className="form-field" htmlFor="acc-pass">Contraseña
            <input id="acc-pass" type="password" name="password" value={form.password} onChange={change} autoComplete="current-password" placeholder="••••••••" required />
          </label>
          <Button variant="studio" type="submit" className="w-full h-12 mt-6" disabled={status === "sending"}>
            {status === "sending" ? "Verificando…" : <>Entrar<ArrowRight /></>}
          </Button>
          {status === "error" && <p className="form-error" role="alert">{errorMsg}</p>}
        </form>
      ) : (
        <div>
          <span className="eyebrow">Sesión iniciada</span>
          <h2 className="mt-4 text-3xl font-bold">Hola, {user.name.split(" ")[0]}</h2>
          <dl className="acc-card">
            <div><dt>Nombre</dt><dd>{user.name}</dd></div>
            <div><dt>Correo</dt><dd>{user.email}</dd></div>
            <div><dt>Rol</dt><dd><span className={`acc-role acc-role-${user.role}`}>{user.role}</span></dd></div>
            <div><dt>Registrado</dt><dd>{new Date(user.createdAt).toLocaleDateString("es-MX", { dateStyle: "long" })}</dd></div>
          </dl>
          <p className="text-xs text-muted-foreground mt-3">Sesión protegida. Se cierra sola después de 2 horas.</p>
          {user.role === "admin" && (
            <Button variant="studio" className="w-full h-12 mt-5" onClick={onOpenPanel}>Abrir panel de administración<ArrowRight /></Button>
          )}
          <Button variant="quiet" className="w-full h-11 mt-3" onClick={() => { logout(); onUser(null); }}>Cerrar sesión</Button>
        </div>
      )}
    </Modal>
  );
}

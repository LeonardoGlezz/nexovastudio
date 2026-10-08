// Funciones para hablar con el backend de Nexova Studio
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const TOKEN_KEY = "nexova_token";

// ── Token de sesión (se guarda en el navegador para sobrevivir recargas) ──
export function getToken() {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}
function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch { /* modo privado: la sesión dura hasta recargar */ }
}

// Petición genérica: añade el token si existe y convierte cualquier error en un Error con mensaje legible
async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (auth && getToken()) headers.Authorization = `Bearer ${getToken()}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor. Intenta de nuevo en un momento.");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Algo salió mal. Intenta de nuevo.");
  return data;
}

// ── Contacto y portafolio ──
export const sendContactMessage = (formData) =>
  request("/contact", { method: "POST", body: formData });

export const getPortfolioProjects = () => request("/portfolio");

// ── Usuarios ──
export async function login(email, password) {
  const data = await request("/auth/login", { method: "POST", body: { email, password } });
  setToken(data.token);
  return data.user;
}

export async function getCurrentUser() {
  if (!getToken()) return null;
  try {
    const data = await request("/auth/me", { auth: true });
    return data.user;
  } catch {
    setToken(null); // token vencido o inválido
    return null;
  }
}

export function logout() {
  setToken(null);
}

// Solo funciona con un usuario admin con sesión iniciada
export const getContactMessages = () => request("/contact", { auth: true });

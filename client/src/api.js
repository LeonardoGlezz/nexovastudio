// Funciones para hablar con el backend de Nexova Studio
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function sendContactMessage(formData) {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al enviar el mensaje");
  }

  return res.json();
}

export async function getPortfolioProjects() {
  const res = await fetch(`${API_URL}/portfolio`);
  if (!res.ok) throw new Error("Error al cargar el portafolio");
  return res.json();
}

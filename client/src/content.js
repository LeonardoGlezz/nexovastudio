// Textos del rediseño: servicios, preguntas frecuentes y datos extra de los proyectos.
// 👉 Aquí se cambian los precios y los textos de la página.
import { whatsappUrl } from "./contactInfo";

export const whatsapp = whatsappUrl("Hola Nexova, tengo un negocio y quiero platicar sobre una idea.");

export const services = [
  {
    title: "Chatbot para WhatsApp", need: "Responde, incluso cuando no estás.",
    description: "Respuestas a preguntas, horarios y citas sin estar todo el día al teléfono.",
    price: "$3,500 – $5,500", detail: "Entrega en 2 a 3 semanas · + $500/mes de mantenimiento", tag: "Atención a clientes",
    features: ["Preguntas frecuentes de tu negocio", "Agenda de citas y reservaciones", "Conexión con WhatsApp Business", "Mantenimiento: hasta 2 ajustes al mes y monitoreo"],
  },
  {
    title: "Automatización de procesos", need: "Menos tareas. Más tiempo para ti.",
    description: "Conectamos tus herramientas para que la información no se capture dos veces.",
    price: "$4,500 – $8,000", detail: "Hasta 3 integraciones · + $400/mes de mantenimiento", tag: "Ahorra tiempo",
    features: ["Confirmaciones automáticas", "WhatsApp, registros y correo conectados", "Entrega en 1 a 2 semanas"],
  },
  {
    title: "Software a medida", need: "Tu negocio, mejor organizado.",
    description: "Clientes, inventario, citas o ventas en un sistema hecho para tu forma de trabajar.",
    price: "$8,000 – $30,000", detail: "Entrega en 4 a 10 semanas · 30 días de soporte incluidos", tag: "Hecho para ti",
    features: ["Panel hecho a tu medida", "Base de datos propia y segura", "Acompañamiento durante el proceso"],
  },
];

// Los proyectos del portafolio vienen de la base de datos. Estos textos extra solo se usan cuando
// el título coincide (los proyectos nuevos que crees en el panel usan su propio título y tecnologías).
export const projectExtras = {
  "Sistema de gestión para fisioterapia": { tagline: "Todo para tu clínica, en un lugar.", features: ["Gestión de pacientes", "Organización de citas", "Seguimiento de tratamientos"] },
  "Plataforma de comercio electrónico": { tagline: "Una tienda que sigue tu ritmo.", features: ["Catálogo de productos", "Carrito de compras", "Gestión de pedidos"] },
  "Punto de venta para gimnasio": { tagline: "Más control. Menos pendientes.", features: ["Control de membresías", "Cobros e inventario", "Reportes en tiempo real"] },
  "Nggigua App": { tagline: "Tecnología que conecta generaciones.", features: ["Aprendizaje de la lengua Nggigua", "Experiencia educativa interactiva", "Aplicación web"] },
};

// Proyectos de respaldo: se muestran si el servidor aún no responde (la página nunca queda vacía)
export const fallbackProjects = [
  { id: "f1", title: "Sistema de gestión para fisioterapia", tag: "Salud · Gestión de clínicas", description: "Plataforma para administrar pacientes, citas y tratamientos en clínicas de fisioterapia.", image: "/projects/fisioterapia.jpg", emoji: "🏥", stack: [] },
  { id: "f2", title: "Plataforma de comercio electrónico", tag: "Comercio · Tienda en línea", description: "Tienda en línea con catálogo, carrito de compras, gestión de pedidos y panel administrativo.", image: "/projects/ecommerce.jpg", emoji: "🛒", stack: [] },
  { id: "f3", title: "Punto de venta para gimnasio", tag: "Bienestar · Punto de venta", description: "Punto de venta con control de membresías, cobros, inventario y reportes en tiempo real.", image: "/projects/gimnasio.jpg", emoji: "💪", stack: [] },
  { id: "f4", title: "Nggigua App", tag: "Educación · Preservación cultural", description: "Videojuego educativo web para enseñar la lengua indígena Nggigua y acercarla a nuevas generaciones.", image: "/projects/nggigua.jpg", emoji: "🎮", stack: [] },
];

export const faqs = [
  ["No sé qué necesito. ¿Podemos empezar así?", "Claro. Me cuentas cómo trabajas hoy y qué te está quitando tiempo. La primera conversación es sin costo y sin compromiso; juntos vemos si una solución de software tiene sentido para tu negocio."],
  ["¿La primera conversación tiene costo?", "No. Platicar de tu idea es gratis. Si necesitas una consultoría tecnológica de 60 minutos con análisis de procesos y recomendaciones, cuesta $500 MXN y se abona a tu proyecto."],
  ["¿El precio puede cambiar después?", "La cotización se entrega por escrito con alcance y tiempos definidos. Si pides algo fuera de ese alcance, te explicamos su costo antes de hacerlo y tú decides si lo apruebas."],
  ["¿Qué pasa después de la entrega?", "Te explicamos cómo usar tu sistema y seguimos disponibles para soporte. El mantenimiento mensual incluye ajustes, respaldos y monitoreo; los proyectos a medida incluyen un periodo de acompañamiento."],
  ["¿Cuántos proyectos tomas a la vez?", "Pocos, a propósito. Nexova es un estudio de una sola persona: hablas directamente con quien diseña y programa tu proyecto. Por eso trabajo máximo con 2 o 3 proyectos al mismo tiempo, para darle atención real a cada uno."],
  ["¿Qué incluye el mantenimiento mensual?", "Monitoreo para que todo siga funcionando, respaldos, corrección de fallas y hasta 2 ajustes pequeños al mes (cambiar textos, horarios o respuestas). Funciones nuevas se cotizan aparte, siempre antes de hacerlas."],
  ["¿Trabajan fuera de Tehuacán?", "Sí. Trabajamos de forma remota con reuniones por videollamada. En Tehuacán y Puebla también podemos reunirnos en persona cuando el proyecto lo requiere."],
  ["¿De quién son el código y los datos?", "Tuyos. Al liquidar el proyecto recibes el código y los accesos a tu base de datos y servicios."],
  ["¿Cómo se realizan los pagos?", "Normalmente, 50% para arrancar y 50% contra entrega. En proyectos más grandes se divide por etapas, cada una con su entregable revisable."],
];

export const processSteps = [
  ["01", "Primero, platicamos", "Nos cuentas cómo funciona tu negocio y qué te gustaría mejorar. Sin costo ni compromiso."],
  ["02", "Una propuesta clara", "Definimos alcance, inversión y tiempos por escrito. Tú decides cuándo empezar."],
  ["03", "Construimos y probamos", "Te mostramos avances y probamos juntos que todo funcione como se acordó."],
  ["04", "Te acompañamos", "Te explicamos cómo usarlo y seguimos disponibles después de la entrega."],
];

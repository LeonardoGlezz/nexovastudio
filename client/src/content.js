// Textos del rediseño: servicios, preguntas frecuentes y datos extra de los proyectos.
// 👉 Aquí se cambian los precios y los textos de la página.
import { whatsappUrl } from "./contactInfo";

export const whatsapp = whatsappUrl("Hola Nexova, tengo un negocio y quiero platicar sobre una idea.");

// Política de precios: lo que se repite (chatbot, automatización) muestra un precio "desde" con su alcance
// escrito; lo hecho a medida NO muestra monto, se cotiza al platicar. Si dejas de mostrar un monto, pon
// `price: null` y escribe en `priceLabel` el texto que lo sustituye.
export const services = [
  {
    title: "Chatbot para WhatsApp", need: "Responde, incluso cuando no estás.",
    description: "Respuestas a preguntas, horarios y citas sin estar todo el día al teléfono.",
    price: "$3,500", priceNote: "Precio inicial para un chatbot sencillo",
    detail: "Plazo típico: de 2 a 4 semanas, según qué tan completo sea el flujo. Se confirma en tu propuesta. Mantenimiento opcional desde $500/mes.",
    tag: "Atención a clientes",
    features: ["Preguntas frecuentes de tu negocio", "Agenda de citas y reservaciones", "Conexión con WhatsApp Business", "Los cobros de mensajería de Meta (WhatsApp) se pagan aparte, directo a Meta"],
  },
  {
    title: "Automatización de procesos", need: "Menos tareas. Más tiempo para ti.",
    description: "Conectamos tus herramientas para que la información no se capture dos veces.",
    price: "$4,500", priceNote: "Precio inicial, incluye hasta 3 integraciones",
    detail: "Plazo típico: de 1 a 3 semanas, según las herramientas por conectar. Mantenimiento opcional desde $400/mes.",
    tag: "Ahorra tiempo",
    features: ["Confirmaciones automáticas", "WhatsApp, registros y correo conectados", "Más integraciones se cotizan según el caso"],
  },
  {
    title: "Software a medida", need: "Tu negocio, mejor organizado.",
    description: "Clientes, inventario, citas o ventas en un sistema hecho para tu forma de trabajar.",
    price: null, priceLabel: "Se cotiza según tu proyecto", priceNote: "Cada sistema es distinto, por eso no hay precio de lista",
    detail: "Plazo: desde 2 semanas hasta 2 meses o más, según el alcance. Lo definimos juntos y queda por escrito. Incluye 30 días de soporte.",
    tag: "Hecho para ti",
    features: ["El costo depende de módulos, usuarios e integraciones", "Panel hecho a tu medida y base de datos propia", "Si tu presupuesto es limitado, ajustamos el alcance contigo"],
  },
];

// Rangos del selector "¿Qué presupuesto tienes pensado?" del formulario (opcional).
// Deben ser idénticos a los de server/src/utils/validateContact.js
export const budgets = ["Menos de $5,000", "$5,000 a $10,000", "$10,000 a $25,000", "Más de $25,000", "Aún no lo sé"];

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

// ───────────── Proyectos del equipo ─────────────
// Trabajos de la trayectoria profesional de Alba Melissa, ahora parte del portafolio de Nexova. Se muestran en el
// mismo carrusel que los proyectos de la base de datos, con la etiqueta "Trayectoria del equipo", y SIN nombres de
// cliente (confidencialidad). Funcionan aunque el servidor esté dormido porque viven aquí, en el código.
export const teamNote = "Los proyectos con la etiqueta «Trayectoria del equipo» son trabajos previos de Alba Melissa May Pérez, parte de Nexova Studio. Se describen sin nombres de clientes por confidencialidad.";

export const teamProjects = [
  {
    id: "t1", emoji: "🏗️", team: true, title: "Gestión de compras y proveedores para una constructora", tag: "Construcción · Sistema interno",
    tagline: "Del pedido de material al pago de la factura.",
    description: "Sistema que lleva el ciclo de compras completo de una constructora: requisiciones, cotizaciones, órdenes de compra con autorización por monto, pagos y el expediente de cada contratista.",
    features: ["Autorización por niveles de monto y alertas automáticas", "Expediente de contratistas con semáforo de vigencias y descargas seguras", "Órdenes de compra exportables a Excel y PDF", "112 endpoints documentados y más de 1,100 pruebas automatizadas"],
    stack: ["React", "Node.js", "TypeScript", "Azure SQL", "Azure"],
  },
  {
    id: "t2", emoji: "📱", team: true, title: "App móvil para reportar incidencias en obra", tag: "Construcción · App móvil",
    tagline: "Reporta desde la obra, incluso sin internet.",
    description: "Los supervisores capturan incidencias con fotos y firmas desde la obra; todo se sincroniza solo cuando regresa la señal.",
    features: ["Funciona sin conexión y sincroniza después", "Folios consecutivos sin duplicados aunque varios capturen a la vez", "Evidencias fotográficas, firmas y cierre de incidencias"],
    stack: ["Ionic", "React", "Express", "SQL Server"],
  },
  {
    id: "t3", emoji: "🎁", team: true, title: "Portal de beneficios para empleados de varias empresas", tag: "Recursos humanos · Beneficios",
    tagline: "Compras a crédito con descuento por nómina.",
    description: "Rediseño completo de un portal donde los empleados compran a crédito con descuento por nómina y acumulan puntos.",
    features: ["Compras a crédito descontadas por nómina", "Sistema de puntos", "Catálogo de un mayorista integrado por FTP y API"],
    stack: ["Angular", "Node.js", "TypeScript", "MySQL"],
  },
  {
    id: "t4", emoji: "🎓", team: true, title: "Cursos en línea con pagos y membresías", tag: "Educación en línea · Pagos",
    tagline: "Vender cursos en línea, sin fricción.",
    description: "Lógica de compra con descuentos variables, pagos en línea y un panel flexible para administrar los cursos.",
    features: ["Cobros con PayPal y Apple Pay", "Descuentos y promociones configurables", "Más usuarios en membresías y mejor navegación"],
    stack: ["Web", "Pagos en línea", "Panel administrativo"],
  },
  {
    id: "t5", emoji: "🚗", team: true, title: "Plataforma para concesionarias de una armadora", tag: "Sector automotriz · Integraciones",
    tagline: "Integraciones que no se pueden caer.",
    description: "Mantenimiento y mejora de una plataforma usada por concesionarias: errores de integración, reportes y monitoreo en la nube.",
    features: ["Integración con distintos sistemas de agencias", "Mejora de reportes de uso para las concesionarias", "Monitoreo y funciones en AWS"],
    stack: ["Vue", "Node.js", "MariaDB", "AWS"],
  },
  {
    id: "t6", emoji: "🏫", team: true, title: "Pagos y plataforma de posgrado para una institución", tag: "Educación · Nube en AWS",
    tagline: "Dos sistemas completos en 5 meses.",
    description: "Un sistema que genera y guarda recibos de pago con comprobante digital, y una plataforma con grupos, material y foros para una maestría.",
    features: ["Recibos y comprobantes digitales de cada pago", "Grupos, material descargable y foros", "Infraestructura propia en AWS"],
    stack: ["Angular", "Node.js", "MySQL", "AWS"],
  },
];

export const faqs = [
  ["¿Cuánto cuesta un proyecto?", "Depende de lo que necesites. Un chatbot o una automatización sencilla tienen precio inicial a la vista; un software a medida no, porque cada uno es distinto (módulos, usuarios, integraciones). Después de platicar recibes una cotización por escrito. Si tu presupuesto es limitado, dímelo desde el principio y ajustamos el alcance para que tenga sentido."],
  ["¿Cuánto tarda?", "Un chatbot o una automatización sencilla suelen tomar de 1 a 4 semanas. Un software a medida puede ir desde 2 semanas hasta 2 meses o más, según el alcance. El plazo concreto queda escrito en tu propuesta antes de empezar."],
  ["No sé qué necesito. ¿Podemos empezar así?", "Claro. Me cuentas cómo trabajas hoy y qué te está quitando tiempo. La primera conversación es sin costo y sin compromiso; juntos vemos si una solución de software tiene sentido para tu negocio."],
  ["¿La primera conversación tiene costo?", "No. Platicar de tu idea es gratis. Si necesitas una consultoría tecnológica de 60 minutos con análisis de procesos y recomendaciones, cuesta $500 MXN y se abona a tu proyecto."],
  ["¿El precio puede cambiar después?", "La cotización se entrega por escrito con alcance y tiempos definidos. Si pides algo fuera de ese alcance, te explicamos su costo antes de hacerlo y tú decides si lo apruebas."],
  ["¿Qué pasa después de la entrega?", "Te explicamos cómo usar tu sistema y seguimos disponibles para soporte. El mantenimiento mensual incluye ajustes, respaldos y monitoreo; los proyectos a medida incluyen un periodo de acompañamiento."],
  ["¿Cuántos proyectos toman a la vez?", "Pocos, a propósito. Nexova es un estudio pequeño: hablas directamente con quienes diseñan y programan tu proyecto, sin intermediarios. Por eso tomamos pocos proyectos al mismo tiempo, para darle atención real a cada uno."],
  ["¿Qué incluye el mantenimiento mensual?", "Es opcional. Incluye monitoreo para que todo siga funcionando, respaldos, corrección de fallas y hasta 2 ajustes pequeños al mes (cambiar textos, horarios o respuestas). Funciones nuevas se cotizan aparte, siempre antes de hacerlas. En los chatbots de WhatsApp, el cobro por mensajes que hace Meta no está incluido: se paga directo a Meta."],
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

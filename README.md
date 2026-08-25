# 🚀 Nexova Studio — Proyecto completo (Frontend + Backend + Base de datos)

Este es tu proyecto real: React (frontend) + Node.js/Express (backend) + MySQL (base de datos).
Todo corre en tu computadora primero, y luego se despliega a internet.

## 📁 Estructura del proyecto

```
nexova-studio/
├── client/          → Frontend en React (lo que ve el visitante)
│   └── src/
│       ├── components/   → Cada sección de la página (Nav, Hero, Portfolio, etc.)
│       ├── App.jsx        → Arma todos los componentes juntos
│       ├── api.js         → Funciones que hablan con el backend
│       └── styles.css     → Todos los estilos visuales
│
└── server/          → Backend en Node.js + Express (la lógica y base de datos)
    └── src/
        ├── config/database.js    → Conexión a MySQL
        ├── models/                → Las "tablas" de tu base de datos
        ├── routes/                → Los endpoints de tu API
        └── index.js                → Arranca el servidor
```

---

## 🛠️ Paso 1 — Instala lo necesario en tu computadora

Necesitas 2 cosas instaladas antes de empezar:

1. **Node.js** (v18 o superior) → descárgalo de [nodejs.org](https://nodejs.org)
2. **MySQL** → la forma más fácil es instalar **XAMPP** ([apachefriends.org](https://www.apachefriends.org)), que trae MySQL con una interfaz visual (phpMyAdmin) para ver tu base de datos.

Verifica que Node esté instalado abriendo una terminal y corriendo:
```bash
node --version
npm --version
```

---

## 🗄️ Paso 2 — Crea la base de datos

1. Abre XAMPP y enciende el módulo **MySQL**.
2. Abre phpMyAdmin (normalmente en `http://localhost/phpmyadmin`).
3. Crea una base de datos nueva llamada exactamente: `nexova_studio`

Eso es todo — las tablas las crea automáticamente el backend cuando lo enciendas (gracias a Sequelize).

---

## ⚙️ Paso 3 — Configura y enciende el backend

Abre una terminal **en VS Code** dentro de la carpeta `server/`:

```bash
cd nexova-studio/server

# Instala las dependencias (esto descarga Express, Sequelize, etc.)
npm install

# Copia el archivo de configuración de ejemplo
# En Windows (PowerShell):
copy .env.example .env
# En Mac/Linux:
cp .env.example .env
```

Abre el archivo `.env` recién creado y ajusta si es necesario (si usas XAMPP con configuración default, normalmente no necesitas cambiar nada — usuario `root` sin contraseña).

Ahora enciende el servidor:
```bash
npm run dev
```

Si todo está bien verás en la terminal:
```
✅ Conectado a MySQL correctamente
✅ Tablas sincronizadas
🚀 Servidor Nexova Studio corriendo en http://localhost:4000
```

**Deja esta terminal abierta** — el backend debe seguir corriendo.

### Llena tu portafolio con tus 3 proyectos reales

En una **nueva** terminal (sin cerrar la anterior), corre:
```bash
cd nexova-studio/server
node src/config/seed.js
```

Esto mete tus 3 proyectos (fisioterapia, e-commerce, POS gimnasio) directo en la base de datos.

---

## 🎨 Paso 4 — Configura y enciende el frontend

Abre **otra terminal nueva** (la del backend debe seguir corriendo) dentro de `client/`:

```bash
cd nexova-studio/client

# Instala las dependencias
npm install

# Copia el archivo de configuración
copy .env.example .env      (Windows)
cp .env.example .env         (Mac/Linux)

# Enciende el frontend
npm run dev
```

Verás algo como:
```
VITE ready in 400ms
➜  Local: http://localhost:5173/
```

Abre ese link en tu navegador — **ahí está tu página funcionando de verdad**, con datos reales viniendo de tu base de datos MySQL.

---

## ✅ Cómo saber que todo está conectado

1. Ve a `http://localhost:5173` — deberías ver tu página.
2. Ve a la sección "Portafolio" — si ves tus 3 proyectos, el frontend está leyendo de tu backend y base de datos correctamente.
3. Llena el formulario de contacto y envíalo — si te sale el mensaje verde de "Mensaje enviado y guardado", significa que se guardó en tu base de datos MySQL.
4. Para confirmarlo, abre `http://localhost:4000/api/contact` en el navegador — deberías ver el mensaje que acabas de enviar, en formato JSON.

---

## ✏️ Cómo editar tu información real

### Cambiar tu WhatsApp, correo y redes sociales
Abre `client/src/components/Contact.jsx` y edita el objeto `CONTACT_INFO` al inicio del archivo:

```js
const CONTACT_INFO = {
  whatsapp: "522381234567",  // tu número real con código de país
  email: "hola.nexovastudio@gmail.com",
  instagram: "https://instagram.com/nexovastudio",
  facebook: "https://facebook.com/nexovastudio",
  linkedin: "https://linkedin.com/company/nexovastudio",
};
```

### Agregar un proyecto nuevo al portafolio
Tienes 2 opciones:

**Opción fácil (recomendada por ahora):** edita directamente `client/src/components/Portfolio.jsx`, el array `FALLBACK_PROJECTS`.

**Opción real (usando tu base de datos):** con el backend corriendo, mándale una petición POST a `http://localhost:4000/api/portfolio` con una herramienta como Postman o Thunder Client (extensión de VS Code), con un body como:
```json
{
  "title": "Mi nuevo proyecto",
  "tag": "Chatbot",
  "description": "Descripción del proyecto",
  "emoji": "🤖",
  "colorFrom": "#5B6EF5",
  "colorTo": "#3d4bc4",
  "stack": ["React", "Node.js"],
  "order": 4
}
```

### Cambiar precios o textos de servicios
Edita `client/src/components/Products.jsx`, el array `PRODUCTS`.

---

## ☁️ Paso 5 — Cuando estés listo para publicarlo en internet

Este paso lo hacemos juntos cuando tengas todo probado localmente. En resumen:

- **Backend + Base de datos:** se despliegan en un servicio como Railway o Render (tienen plan gratuito, soportan MySQL/PostgreSQL).
- **Frontend:** se despliega en Netlify o Vercel (gratis, se conecta directo a tu repositorio de GitHub).
- **Dominio:** compras `nexovastudio.com` o `.mx` y lo conectas a tu frontend desplegado.

Cuando llegues a este punto, dile a Claude "ya probé todo localmente, ayúdame a desplegarlo" y seguimos desde ahí.

---

## 🆘 Problemas comunes

**"Error: connect ECONNREFUSED" al encender el backend**
→ MySQL no está corriendo. Abre XAMPP y enciende el módulo MySQL.

**La página carga pero el portafolio muestra "Conectando con el backend..."**
→ El backend no está corriendo, o no corriste `node src/config/seed.js`. Revisa que la terminal del backend siga abierta y sin errores.

**"Access denied for user 'root'@'localhost'"**
→ Tu MySQL tiene contraseña configurada. Ponla en el archivo `.env` del backend, en `DB_PASSWORD`.

**El formulario de contacto no envía nada**
→ Abre la consola del navegador (F12) y revisa si hay errores de CORS o de conexión. Confirma que el backend esté corriendo en el puerto 4000.

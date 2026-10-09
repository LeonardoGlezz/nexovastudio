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
        ├── models/                → Las "tablas": ContactMessage, PortfolioProject, User
        ├── middleware/auth.js     → Revisa el token (JWT) de quien inicia sesión
        ├── routes/                → Los endpoints: /auth, /contact, /portfolio
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

Y para crear **tu usuario administrador** (el script te pide nombre, correo y contraseña en la terminal; la contraseña nunca se guarda en un archivo):
```bash
npm run admin:create
```

> En `server/.env` necesitas `JWT_SECRET` (mira `.env.example`). Sin él el servidor no arranca.

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
4. Para confirmarlo, pulsa **Acceso** en la barra de arriba, entra con un usuario `admin` (ver sección de usuarios) y verás el mensaje en "Mensajes de contacto recibidos". (`GET /api/contact` ya no es público: contiene datos de tus clientes.)

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

**Opción real (usando tu base de datos):** primero haz login (`POST /api/auth/login` con un usuario admin) para obtener el `token`. Luego manda una petición POST a `http://localhost:4000/api/portfolio` con el header `Authorization: Bearer <token>`, desde Postman o Thunder Client (extensión de VS Code), con un body como:
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

## 👤 Usuarios y login

La página tiene un botón **Acceso** (arriba a la derecha). Valida el correo y la contraseña contra la tabla `users` de la base de datos.

Los usuarios se crean con `npm run admin:create`. En la base de datos **solo se guarda el hash** (`$2b$10$...`), nunca la contraseña real.

Endpoints: `POST /api/auth/login` · `GET /api/auth/me` (con token). Solo los `admin` pueden ver `GET /api/contact` y crear proyectos con `POST /api/portfolio`.

---

## ☁️ Base de datos en la nube (TiDB Cloud)

El código ya soporta una base remota; solo cambia el `server/.env`:

1. Crea una cuenta en [tidbcloud.com](https://tidbcloud.com) → cluster **Serverless** (gratis, sin tarjeta). Ahí mismo crea la base `nexova_studio` (o usa `test` y pon ese nombre en `DB_NAME`).
2. Botón **Connect** → copia host, puerto, usuario y contraseña.
3. En `server/.env`:
   ```
   DB_HOST=gateway01.xxxx.prod.aws.tidbcloud.com
   DB_PORT=4000
   DB_NAME=nexova_studio
   DB_USER=xxxxxxxx.root
   DB_PASSWORD=la-contraseña-de-tidb
   DB_SSL=true
   ```
4. `cd server` y corre en orden:
   ```bash
   npm run admin:create # crea la tabla users y TU usuario administrador EN LA NUBE
   npm run seed         # (opcional) sube también el portafolio
   npm run db:show      # imprime todas las tablas y su contenido → captura para el profesor
   ```
5. `npm run dev`, abre la página, pulsa **Acceso** y entra con tu usuario: así pruebas que vive en la nube.

---

## 🔒 Seguridad

Lo que ya está protegido y por qué:

| Capa | Medida |
|---|---|
| **Base de datos** | Sequelize parametriza todas las consultas (no hay inyección SQL); conexión cifrada TLS; contraseñas con bcrypt |
| **API** | Cabeceras de seguridad (helmet), CORS solo para tu página, límite global de 120 peticiones/min, límite de 10 intentos fallidos de login por IP y por correo, cuerpos de máximo 20 KB, validación de todo lo que llega |
| **Sesión** | Token JWT firmado (HS256 fijo) que vence a las 2 horas; el login tarda lo mismo exista o no el correo |
| **Frontend** | `client/vercel.json`: CSP estricta (solo scripts propios), anti-clickjacking, nosniff, Referrer-Policy, Permissions-Policy y caché larga para los archivos con hash |
| **Secretos** | `.env` fuera de git; ninguna contraseña en el código |

### Opcional: usuario de base de datos con permisos mínimos
Hoy la API se conecta a TiDB con el usuario principal, que puede crear y borrar tablas. Si alguien lograra ejecutar una consulta, podría borrarlo todo. Lo ideal es un usuario que solo pueda leer y escribir filas. En el **SQL Editor** de TiDB Cloud (cambia la contraseña por una larga y propia; si TiDB te exige el prefijo de tu cluster en el nombre de usuario, ponlo igual que en tu usuario actual):

```sql
CREATE USER 'nexova_app'@'%' IDENTIFIED BY 'UNA-CONTRASEÑA-LARGA-Y-UNICA';
GRANT SELECT, INSERT, UPDATE, DELETE ON test.* TO 'nexova_app'@'%';
```

Luego, en Render → Environment: pon `DB_USER` y `DB_PASSWORD` de ese usuario nuevo y agrega `DB_AUTO_SYNC=false` (así la API ya no necesita permiso de crear o alterar tablas). Las tareas de mantenimiento (`admin:create`, `seed`) se siguen corriendo desde tu computadora con el usuario principal.

## 📧 Aviso por correo cuando llega un mensaje

Cuando alguien llena el formulario, el mensaje se guarda en la base de datos y, si está configurado, te llega un correo. Usa [Resend](https://resend.com) (plan gratis) por HTTPS, porque Render bloquea el correo SMTP en su plan gratis.

Variables en `server/.env` (o en Render → Environment):
```
RESEND_API_KEY=re_xxxxxxxx      # la clave de tu cuenta de Resend
NOTIFY_EMAIL=tu-correo@gmail.com # debe ser el MISMO correo con el que creaste la cuenta de Resend
```
Si no las pones, el formulario funciona igual, solo que no te avisa. El código está en `server/src/services/notify.js`.

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

**"Demasiados intentos" al hacer login**
→ Son 10 intentos *fallidos* por IP cada 15 min. Reinicia el backend o espera.

**"Falta JWT_SECRET en el archivo .env"**
→ Copia la línea `JWT_SECRET=` de `.env.example` a tu `.env`.

**Error SSL / "insecure connection" con una base en la nube**
→ Pon `DB_SSL=true` en el `.env`.

**"Access denied for user 'root'@'localhost'"**
→ Tu MySQL tiene contraseña configurada. Ponla en el archivo `.env` del backend, en `DB_PASSWORD`.

**El formulario de contacto no envía nada**
→ Abre la consola del navegador (F12) y revisa si hay errores de CORS o de conexión. Confirma que el backend esté corriendo en el puerto 4000.

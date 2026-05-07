# InCampus

Plataforma web académica para la gestión de tutorías, eventos y documentos entre alumnado y profesorado.

---

# Tecnologías utilizadas

## Frontend
- React
- React Router
- Vite
- JavaScript
- CSS

## Backend
- Node.js
- Express
- JWT Authentication
- Multer
- bcrypt

## Base de datos
- MySQL

---

# Funcionalidades principales

## Alumnos
- Iniciar sesión
- Consultar eventos
- Reservar tutorías
- Cancelar reservas
- Consultar documentos de asignaturas
- Visualizar PDFs

## Profesores
- Crear eventos
- Eliminar sus propios eventos
- Crear disponibilidades de tutorías
- Cancelar disponibilidades
- Subir documentos PDF
- Eliminar documentos

---

# Sistema de autenticación

La aplicación utiliza:
- JWT para autenticación
- Roles:
  - `ALUMNO`
  - `PROFESOR`

Las rutas protegidas requieren token válido.

---

# Estructura del proyecto

```bash
frontend/
backend/
```

---

# Instalación

## Clonar repositorio

```bash
git clone <URL_REPOSITORIO>
```

---

# Configuración backend

## Instalar dependencias

```bash
cd backend
npm install
```

## Crear archivo `.env`

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=webuser
DB_PASSWORD=web1234
DB_NAME=gestion_academica

JWT_SECRET=miclavesegura
JWT_EXPIRES_IN=1h

FRONTEND_URL=http://localhost:5173
```

## Ejecutar backend

```bash
npm run dev
```

---

# Configuración frontend

## Instalar dependencias

```bash
cd frontend
npm install
```

## Crear archivo `.env`

```env
VITE_API_URL=http://localhost:3000
```

## Ejecutar frontend

```bash
npm run dev
```

---

# Despliegue en máquina virtual

Para producción:
- Backend desplegado en VM Linux
- Frontend conectado mediante `VITE_API_URL`
- Base de datos MySQL externa
- Configuración CORS habilitada

Ejemplo:

```env
VITE_API_URL=http://34.57.35.197:3000
```

---

# Subida de archivos

Los documentos PDF se almacenan en:

```bash
uploads/documentos
```

Solo se permiten archivos `.pdf`.

---

# Seguridad implementada

- Contraseñas encriptadas con bcrypt
- Autenticación JWT
- Middleware de protección de rutas
- Restricción de permisos por rol
- Los profesores solo pueden eliminar sus propios eventos

---

# Autores

Proyecto desarrollado por:

- Nombre integrante 1
- Nombre integrante 2
- Nombre integrante 3

---

# Estado del proyecto

Proyecto funcional en desarrollo académico.
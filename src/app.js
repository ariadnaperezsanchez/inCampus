// iniicio del servidor y configuración de rutas
// cargar configuración y arrancar la API

/* app.js = recepción de un hotel
routes = recepcionistas
controllers = empleados que hacen el trabajo
database = archivo donde se guarda todo*/

const express = require("express");

const eventRoutes = require("./routes/eventRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const userRoutes = require("./routes/userRoutes"); // 👈 añadimos esto
const tutoriaRoutes = require("./routes/tutoriaRoutes");

const db = require("./config/db"); // 👈 conexión MySQL

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API inCampus funcionando");
});

// rutas que ya tenías
app.use("/events", eventRoutes);
app.use("/subjects", subjectRoutes);

// ruta nueva para probar MySQL
app.use("/usuarios", userRoutes);

app.use("/tutorias", tutoriaRoutes);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
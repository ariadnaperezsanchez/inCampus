require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Rutas
const eventRoutes = require("./routes/eventRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const userRoutes = require("./routes/userRoutes");
const tutoriaRoutes = require("./routes/tutorialRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware de errores
const { errorHandler } = require("./middlewares/errorMiddleware");

// Conexión a la BD
require("./config/db");

const app = express();

// ✅ CORS (IMPORTANTE para React)
app.use(cors({
  origin: "http://localhost:5174"
}));

// Middleware para JSON
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.send("API inCampus funcionando");
});

// Rutas principales
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/subjects", subjectRoutes);
app.use("/usuarios", userRoutes);
app.use("/tutorias", tutoriaRoutes);

// Middleware de errores
app.use(errorHandler);

module.exports = app;
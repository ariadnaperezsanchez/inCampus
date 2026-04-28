require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Rutas
const eventRoutes = require("./routes/eventRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const userRoutes = require("./routes/userRoutes");
const tutoriaRoutes = require("./routes/tutorialRoutes");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes"); // 👈 AÑADIDO

// Middleware de errores
const { errorHandler } = require("./middlewares/errorMiddleware");

// Conexión a la BD
require("./config/db");

const app = express();

// CORS
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5175"],
  })
);

// Middleware para JSON
app.use(express.json());

// 🔓 SERVIR ARCHIVOS (PDFs)
app.use("/uploads", express.static("uploads")); // 👈 CLAVE

// Ruta base
app.get("/", (req, res) => {
  res.send("API inCampus funcionando");
});

// Rutas principales
app.use("/auth", authRoutes);
app.use("/eventos", eventRoutes);
app.use("/subjects", subjectRoutes);
app.use("/usuarios", userRoutes);
app.use("/tutorias", tutoriaRoutes);
app.use("/documentos", documentRoutes); // 👈 AÑADIDO

// Middleware de errores
app.use(errorHandler);

module.exports = app;
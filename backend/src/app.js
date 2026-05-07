require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Rutas
const eventRoutes = require("./routes/eventRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const userRoutes = require("./routes/userRoutes");
const tutoriaRoutes = require("./routes/tutorialRoutes");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");

// Middleware de errores
const { errorHandler } = require("./middlewares/errorMiddleware");

// Conexión a la BD
require("./config/db");

const app = express();

// CORS
const allowedOrigins = [
  "http://34.57.35.197:5180",
  "http://34.57.35.197:5180",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors());

// Middleware para JSON
app.use(express.json());

// Servir archivos pdfs temarios
app.use("/uploads", express.static("uploads"));

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
app.use("/documentos", documentRoutes);

// Middleware de errores
app.use(errorHandler);

module.exports = app;
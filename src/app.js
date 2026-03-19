const express = require("express");

const eventRoutes = require("./routes/eventRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const userRoutes = require("./routes/userRoutes");
const tutoriaRoutes = require("./routes/tutorialRoutes");
const authRoutes = require("./routes/authRoutes");

const db = require("./config/db");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API inCampus funcionando");
});

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/subjects", subjectRoutes);
app.use("/usuarios", userRoutes);
app.use("/tutorias", tutoriaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
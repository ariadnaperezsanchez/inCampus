require("dotenv").config();
const express = require("express");


const eventRoutes = require("./routes/eventRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const userRoutes = require("./routes/userRoutes");
const tutoriaRoutes = require("./routes/tutorialRoutes");
const authRoutes = require("./routes/authRoutes");

const { errorHandler } = require("./middlewares/errorMiddleware");

require("./config/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API inCampus funcionando");
});

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/subjects", subjectRoutes);
app.use("/usuarios", userRoutes);
app.use("/tutorias", tutoriaRoutes);

app.use(errorHandler);

module.exports = app;
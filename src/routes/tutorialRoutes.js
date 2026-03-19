// src/routes/tutoriaRoutes.js

const express = require("express");
const router = express.Router();

const tutoriaController = require("../controllers/tutoriaController");

router.get("/", tutoriaController.getTutorias);

module.exports = router;
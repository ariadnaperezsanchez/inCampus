const express = require("express");
const router = express.Router();

const tutoriaController = require("../controllers/tutorialController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// GET todas las tutorías
router.get(
  "/",
  protect,
  authorize("ADMIN", "PROFESOR", "ALUMNO"),
  tutoriaController.getTutorias
);

// GET solo disponibilidades
router.get(
  "/disponibles",
  protect,
  authorize("ADMIN", "PROFESOR", "ALUMNO"),
  tutoriaController.getAvailableTutorias
);

// GET solo para las reservas propias del alumno
router.get(
  "/mis-reservas",
  protect,
  authorize("ALUMNO"),
  tutoriaController.getMyReservations
);

// GET reservas que le han hecho al profe
router.get(
  "/profesor",
  protect,
  authorize("PROFESOR"),
  tutoriaController.getReservadasProfesor
);

// POST crear disponibilidad (PROFESOR)
router.post(
  "/",
  protect,
  authorize("PROFESOR"),
  tutoriaController.createAvailability
);

// POST reservar tutoría (ALUMNO)
router.post(
  "/:id/reservar",
  protect,
  authorize("ALUMNO"),
  tutoriaController.reservar
);

// PUT para cancelar tutoria
router.put(
  "/:id/cancelar",
  protect,
  authorize("ALUMNO"),
  tutoriaController.cancelReservation
);


module.exports = router;
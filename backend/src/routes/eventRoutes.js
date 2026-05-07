const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

const { protect, authorize } = require("../middlewares/authMiddleware");

// ver los eventos
router.get("/", protect, eventController.getEvents);
router.get("/:id", protect, eventController.getEventById);

// crear editar y borrar solo puede hacerlo profe
router.post("/", protect, authorize("PROFESOR"), eventController.createEvent);
router.put("/:id", protect, authorize("PROFESOR"), eventController.updateEvent);
router.delete("/:id", protect, authorize("PROFESOR"), eventController.deleteEvent);

module.exports = router;
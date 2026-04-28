const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

const { protect, authorize } = require("../middlewares/authMiddleware");

// VER eventos (cualquier usuario logado)
router.get("/", protect, eventController.getEvents);
router.get("/:id", protect, eventController.getEventById);

// CREAR / EDITAR / BORRAR → SOLO PROFESOR
router.post("/", protect, authorize("PROFESOR"), eventController.createEvent);
router.put("/:id", protect, authorize("PROFESOR"), eventController.updateEvent);
router.delete("/:id", protect, authorize("PROFESOR"), eventController.deleteEvent);

module.exports = router;
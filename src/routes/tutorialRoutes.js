const express = require("express");
const router = express.Router();

const tutoriaController = require("../controllers/tutorialController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.get(
  "/",
  protect,
  authorize("admin", "profesor", "alumno"),
  tutoriaController.getTutorias
);

module.exports = router;
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// Ruta pública
router.get("/", userController.getUsuarios);

// Ruta protegida para cualquier usuario autenticado
router.get("/perfil", protect, (req, res) => {
  res.json({
    message: "Acceso permitido",
    user: req.user,
  });
});

// Solo profesor
router.get("/profesor", protect, authorize("PROFESOR"), (req, res) => {
  res.json({
    message: "Bienvenido profesor",
    user: req.user,
  });
});

// Profesor o alumno
router.get(
  "/gestion-profesores",
  protect,
  authorize("PROFESOR", "ALUMNO"),
  (req, res) => {
    res.json({
      message: "Acceso permitido a profesor o alumno",
      user: req.user,
    });
  }
);

// Solo alumno
router.get("/zona-alumno", protect, authorize("ALUMNO"), (req, res) => {
  res.json({
    message: "Acceso permitido solo a alumno",
    user: req.user,
  });
});

module.exports = router;
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

// Solo admin
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    message: "Bienvenido admin",
    user: req.user,
  });
});

// Admin o profesor
router.get(
  "/gestion-profesores",
  protect,
  authorize("admin", "profesor"),
  (req, res) => {
    res.json({
      message: "Acceso permitido a admin o profesor",
      user: req.user,
    });
  }
);

// Solo alumno
router.get(
  "/zona-alumno",
  protect,
  authorize("alumno"),
  (req, res) => {
    res.json({
      message: "Acceso permitido solo a alumno",
      user: req.user,
    });
  }
);

module.exports = router;
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

//ruta publica
router.get("/", userController.getUsuarios);

// 🔒 Ruta protegida
router.get("/perfil", protect, (req, res) => {
    res.json({
      message: "Acceso permitido",
      user: req.user
    });
  });
  

module.exports = router;
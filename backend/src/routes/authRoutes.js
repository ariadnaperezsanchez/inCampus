const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Test
router.get("/", (req, res) => {
  res.json({ message: "Ruta auth funcionando" });
});

// REGISTER 
router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);

module.exports = router;

/*const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


// GET 
router.get("/", (req, res) => {
    res.json({ message: "Ruta auth funcionando" });
  });

// POST /auth/login
router.post("/login", authController.login);

module.exports = router;
*/
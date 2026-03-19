const authModel = require("../models/Auth");

const login = (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email y password son obligatorios" });
  }

  authModel.buscarUsuarioPorEmail(email, (err, results) => {
    if (err) {
      console.error("ERROR LOGIN:", err);
      return res.status(500).json({ error: "Error en la consulta" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuario = results[0];

    if (usuario.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    return res.json({
      message: "Login correcto",
      usuario,
    });
  });
};

module.exports = { login };
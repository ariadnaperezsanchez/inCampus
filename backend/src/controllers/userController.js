const userModel = require("../models/User");

const getUsuarios = (req, res) => {
  userModel.obtenerUsuarios((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en la consulta" });
    }

    res.json(results);
  });
};

module.exports = { getUsuarios };
const tutoriaModel = require("../models/Tutorial");

const getTutorias = (req, res) => {
  tutoriaModel.getAllTutorias((err, results) => {
    if (err) {
      console.error("Error al obtener tutorías:", err);
      return res.status(500).json({
        message: "Error al obtener tutorías",
      });
    }

    return res.status(200).json({
      message: "Tutorías obtenidas correctamente",
      user: req.user,
      data: results,
    });
  });
};

module.exports = {
  getTutorias,
};
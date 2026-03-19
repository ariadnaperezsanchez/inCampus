const tutoriaModel = require("../models/Tutorial");

const getTutorias = (req, res) => {
  tutoriaModel.getAllTutorias((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener tutorias" });
    }

    res.json(results);
  });
};

module.exports = {
  getTutorias,
};
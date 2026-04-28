const subjectModel = require("../models/Subject");

const getSubjects = (req, res) => {
  subjectModel.obtenerSubjects((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener asignaturas" });
    }

    res.json(results);
  });
};

module.exports = { getSubjects };
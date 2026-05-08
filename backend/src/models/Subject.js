const db = require("../config/db");

// Función para obtener todas las asignaturas disponibles en la base de datos
const obtenerSubjects = (callback) => {
    const sql = "SELECT * FROM asignatura";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR EN MYSQL:", err);
      return callback(err, null);
    }

    callback(null, results);
  });
};

module.exports = { obtenerSubjects };
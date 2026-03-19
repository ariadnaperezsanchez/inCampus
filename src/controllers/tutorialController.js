const db = require("../config/db");

const getTutorias = (req, res) => {
  const sql = "SELECT * FROM tutoria";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener tutorias" });
    }

    res.json(results);
  });
};

module.exports = { getTutorias };
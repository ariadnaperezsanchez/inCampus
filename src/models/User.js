const db = require("../config/db");

const obtenerUsuarios = (callback) => {
  const sql = "SELECT * FROM usuario";

  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = { obtenerUsuarios };
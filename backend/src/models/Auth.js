const db = require("../config/db");

const buscarUsuarioPorEmail = (email, callback) => {
  const sql = "SELECT * FROM usuario WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = { buscarUsuarioPorEmail };
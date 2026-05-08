const db = require("../config/db");
// Función para buscar un usuario por su email
const buscarUsuarioPorEmail = (email, callback) => {
  const sql = "SELECT * FROM usuario WHERE email = ?";
  
// Ejecutar la consulta SQL para buscar el usuario por email
  db.query(sql, [email], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = { buscarUsuarioPorEmail };
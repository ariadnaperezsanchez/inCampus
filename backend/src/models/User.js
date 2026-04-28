const db = require("../config/db");

const obtenerUsuarios = (callback) => {
  const sql = "SELECT * FROM usuario";
  db.query(sql, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

const obtenerUsuarioPorEmail = (email, callback) => {
  const sql = "SELECT * FROM usuario WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

const crearUsuario = (
  nombre,
  apellido1,
  apellido2,
  email,
  password_hash,
  rol,
  activo,
  callback
) => {

  console.log("CREANDO USUARIO EN USER.JS NUEVO"); //prueba
  const sql = `
    INSERT INTO usuario
    (nombre, apellido1, apellido2, email, password_hash, rol, activo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, apellido1, apellido2, email, password_hash, rol, activo],
    (err, result) => {
      if (err) return callback(err, null);

      callback(null, {
        id: result.insertId,
        nombre,
        apellido1,
        apellido2,
        email,
        rol,
        activo,
      });
    }
  );
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorEmail,
  crearUsuario,
};
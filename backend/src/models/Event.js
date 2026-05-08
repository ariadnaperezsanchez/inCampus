const db = require("../config/db");

// funciones para manejar eventos en la base de datos
const obtenerEventos = (callback) => {
  const sql = "SELECT * FROM evento";

  db.query(sql, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// obtener un evento por su ID
const obtenerEventoPorId = (id, callback) => {
  const sql = "SELECT * FROM evento WHERE id_evento = ?";

// solo el profesor que creó el evento puede verlo
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

// SOLO puede crear eventos el profesor que está logueado
const crearEvento = (
  titulo,
  descripcion,
  fecha,
  ubicacion,
  id_profesor,
  callback
) => {
  const sql = `
    INSERT INTO evento (titulo, descripcion, fecha, ubicacion, id_profesor)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [titulo, descripcion, fecha, ubicacion, id_profesor],
    (err, result) => {
      if (err) return callback(err, null);

      callback(null, {
        id_evento: result.insertId,
        titulo,
        descripcion,
        fecha,
        ubicacion,
        id_profesor,
      });
    }
  );
};

// SOLO puede actualizar el profesor que creó el evento
const actualizarEvento = (
  id,
  titulo,
  descripcion,
  fecha,
  ubicacion,
  callback
) => {
  const sql = `
    UPDATE evento
    SET titulo = ?, descripcion = ?, fecha = ?, ubicacion = ?
    WHERE id_evento = ?
  `;

  db.query(
    sql,
    [titulo, descripcion, fecha, ubicacion, id],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

// SOLO puede eliminar el profesor que creó el evento
const eliminarEvento = (id, id_profesor, callback) => {
  const sql = `
    DELETE FROM evento
    WHERE id_evento = ?
    AND id_profesor = ?
  `;

  db.query(sql, [id, id_profesor], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

module.exports = {
  obtenerEventos,
  obtenerEventoPorId,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
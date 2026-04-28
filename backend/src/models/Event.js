const db = require("../config/db");

const obtenerEventos = (callback) => {
  const sql = "SELECT * FROM evento";
  db.query(sql, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

const obtenerEventoPorId = (id, callback) => {
  const sql = "SELECT * FROM evento WHERE id_evento = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

const crearEvento = (titulo, descripcion, fecha, ubicacion, id_profesor, callback) => {
  const sql = `
    INSERT INTO evento (titulo, descripcion, fecha, ubicacion, id_profesor)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [titulo, descripcion, fecha, ubicacion, id_profesor], (err, result) => {
    if (err) return callback(err, null);

    callback(null, {
      id_evento: result.insertId,
      titulo,
      descripcion,
      fecha,
      ubicacion,
      id_profesor
    });
  });
};

const actualizarEvento = (id, titulo, descripcion, fecha, ubicacion, callback) => {
  const sql = `
    UPDATE evento
    SET titulo = ?, descripcion = ?, fecha = ?, ubicacion = ?
    WHERE id_evento = ?
  `;

  db.query(sql, [titulo, descripcion, fecha, ubicacion, id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

const eliminarEvento = (id, callback) => {
  const sql = "DELETE FROM evento WHERE id_evento = ?";
  db.query(sql, [id], (err, result) => {
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
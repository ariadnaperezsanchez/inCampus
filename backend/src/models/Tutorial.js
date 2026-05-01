const db = require("../config/db");

const getAllTutorias = (callback) => {
  const sql = `
    SELECT 
      t.id_tutoria,
      t.fecha_inicio,
      t.fecha_fin,
      t.ubicacion,
      t.estado_slot,
      t.id_profesor,
      t.id_alumno,
      CONCAT(p.nombre, ' ', p.apellido1) AS profesor,
      CONCAT(a.nombre, ' ', a.apellido1) AS alumno
    FROM tutoria t
    LEFT JOIN usuario p ON t.id_profesor = p.id_usuario
    LEFT JOIN usuario a ON t.id_alumno = a.id_usuario
    ORDER BY t.fecha_inicio ASC
  `;

  db.query(sql, callback);
};

const getTutoriasByProfesor = (id_profesor, callback) => {
  const sql = `
    SELECT 
      t.id_tutoria,
      t.fecha_inicio,
      t.fecha_fin,
      t.ubicacion,
      t.estado_slot,
      t.id_profesor,
      t.id_alumno,
      CONCAT(a.nombre, ' ', a.apellido1) AS alumno
    FROM tutoria t
    LEFT JOIN usuario a ON t.id_alumno = a.id_usuario
    WHERE t.id_profesor = ?
    ORDER BY t.fecha_inicio ASC
  `;

  db.query(sql, [id_profesor], callback);
};

const getReservationsByStudent = (id_alumno, callback) => {
  const sql = `
    SELECT 
      t.id_tutoria,
      t.fecha_inicio,
      t.fecha_fin,
      t.ubicacion,
      t.estado_slot,
      t.id_profesor,
      t.id_alumno,
      CONCAT(p.nombre, ' ', p.apellido1) AS profesor
    FROM tutoria t
    LEFT JOIN usuario p ON t.id_profesor = p.id_usuario
    WHERE t.id_alumno = ?
    ORDER BY t.fecha_inicio ASC
  `;

  db.query(sql, [id_alumno], callback);
};

const getReservadasByProfesor = (id_profesor, callback) => {
  const sql = `
    SELECT 
      t.id_tutoria,
      t.fecha_inicio,
      t.fecha_fin,
      t.ubicacion,
      t.estado_slot,
      t.id_profesor,
      t.id_alumno,
      CONCAT(a.nombre, ' ', a.apellido1) AS alumno
    FROM tutoria t
    LEFT JOIN usuario a ON t.id_alumno = a.id_usuario
    WHERE t.id_profesor = ?
      AND t.estado_slot = 'RESERVADA'
    ORDER BY t.fecha_inicio ASC
  `;

  db.query(sql, [id_profesor], callback);
};

const getAvailableTutorias = (callback) => {
  const sql = `
    SELECT 
      t.id_tutoria,
      t.fecha_inicio,
      t.fecha_fin,
      t.ubicacion,
      t.estado_slot,
      t.id_profesor,
      CONCAT(p.nombre, ' ', p.apellido1) AS profesor
    FROM tutoria t
    LEFT JOIN usuario p ON t.id_profesor = p.id_usuario
    WHERE t.estado_slot = 'DISPONIBLE'
    ORDER BY t.fecha_inicio ASC
  `;

  db.query(sql, callback);
};

const createAvailability = (
  fecha_inicio,
  fecha_fin,
  ubicacion,
  id_profesor,
  callback
) => {
  const sql = `
    INSERT INTO tutoria 
    (fecha_inicio, fecha_fin, ubicacion, estado_slot, id_profesor)
    VALUES (?, ?, ?, 'DISPONIBLE', ?)
  `;

  db.query(sql, [fecha_inicio, fecha_fin, ubicacion, id_profesor], callback);
};

const getTutoriaById = (id, callback) => {
  const sql = "SELECT * FROM tutoria WHERE id_tutoria = ?";
  db.query(sql, [id], callback);
};

const reservarTutoria = (id, id_alumno, callback) => {
  const sql = `
    UPDATE tutoria 
    SET id_alumno = ?, estado_slot = 'RESERVADA'
    WHERE id_tutoria = ?
      AND estado_slot = 'DISPONIBLE'
  `;

  db.query(sql, [id_alumno, id], callback);
};

const cancelReservation = (id, callback) => {
  const sql = `
    UPDATE tutoria
    SET id_alumno = NULL, estado_slot = 'DISPONIBLE'
    WHERE id_tutoria = ?
  `;

  db.query(sql, [id], callback);
};

const cancelAvailability = (id, callback) => {
  const sql = `
    UPDATE tutoria
    SET estado_slot = 'CANCELADA',
        id_alumno = NULL
    WHERE id_tutoria = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  getAllTutorias,
  getTutoriasByProfesor,
  createAvailability,
  getTutoriaById,
  reservarTutoria,
  getReservationsByStudent,
  getReservadasByProfesor,
  getAvailableTutorias,
  cancelReservation,
  cancelAvailability,
};
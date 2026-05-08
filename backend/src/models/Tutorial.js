const db = require("../config/db");

// Función para obtener todas las tutorías, incluyendo el nombre del profesor y del alumno (si hay reserva)
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

// Función para obtener las tutorías de un profesor específico, incluyendo el nombre del alumno (si hay reserva)
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

// Función para obtener las reservas de un alumno específico, incluyendo el nombre del profesor
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

// Función para obtener las tutorías reservadas de un profesor específico, incluyendo el nombre del alumno
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

// Función para obtener todas las tutorías disponibles, incluyendo el nombre del profesor
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

// Función para crear una nueva disponibilidad de tutoría
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

// Función para obtener una tutoría por su ID, incluyendo el nombre del profesor y del alumno (si hay reserva)
const getTutoriaById = (id, callback) => {
  const sql = "SELECT * FROM tutoria WHERE id_tutoria = ?";
  db.query(sql, [id], callback);
};

// Función para reservar una tutoría
const reservarTutoria = (id, id_alumno, callback) => {
  const sql = `
    UPDATE tutoria 
    SET id_alumno = ?, estado_slot = 'RESERVADA'
    WHERE id_tutoria = ?
      AND estado_slot = 'DISPONIBLE'
  `;

  db.query(sql, [id_alumno, id], callback);
};

// Función para cancelar una reserva, dejando la tutoría disponible nuevamente
const cancelReservation = (id, callback) => {
  const sql = `
    UPDATE tutoria
    SET id_alumno = NULL, estado_slot = 'DISPONIBLE'
    WHERE id_tutoria = ?
  `;

  db.query(sql, [id], callback);
};

// Función para cancelar una disponibilidad, dejando la tutoría cancelada y sin alumno asignado
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
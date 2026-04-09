const db = require("../config/db");

// GET todas las tutorías
const getAllTutorias = (callback) => {
  const sql = "SELECT * FROM tutoria";
  db.query(sql, callback);
};

// Obtener reservas del alumno
const getReservationsByStudent = (id_alumno, callback) => {
  const sql = `
    SELECT *
    FROM tutoria
    WHERE id_alumno = ?
    ORDER BY fecha_inicio ASC
  `;

  db.query(sql, [id_alumno], callback);
};

// GET resersvas al profe hechas por alumnos
const getReservadasByProfesor = (id_profesor, callback) => {
  const sql = `
    SELECT *
    FROM tutoria
    WHERE id_profesor = ?
    AND estado_slot = 'RESERVADA'
    ORDER BY fecha_inicio ASC
  `;

  db.query(sql, [id_profesor], callback);
};

const getAvailableTutorias = (callback) => {
  const sql = `
    SELECT *
    FROM tutoria
    WHERE estado_slot = 'DISPONIBLE'
    ORDER BY fecha_inicio ASC
  `;

  db.query(sql, callback);
};


// Crear disponibilidad (PROFESOR)
const createAvailability = (
  fecha_inicio,
  fecha_fin,
  ubicacion,
  id_profesor,
  callback
) => {
  const sql = `
    INSERT INTO tutoria (fecha_inicio, fecha_fin, ubicacion, estado_slot, id_profesor)
    VALUES (?, ?, ?, 'DISPONIBLE', ?)
  `;

  db.query(sql, [fecha_inicio, fecha_fin, ubicacion, id_profesor], callback);
};

// Obtener tutoría por ID
const getTutoriaById = (id, callback) => {
  const sql = "SELECT * FROM tutoria WHERE id_tutoria = ?";
  db.query(sql, [id], callback);
};

// Reservar tutoría
const reservarTutoria = (id, id_alumno, callback) => {
  const sql = `
    UPDATE tutoria 
    SET id_alumno = ?, estado_slot = 'RESERVADA'
    WHERE id_tutoria = ?
  `;

  db.query(sql, [id_alumno, id], callback);
};


module.exports = {
  getAllTutorias,
  createAvailability,
  getTutoriaById,
  reservarTutoria,
  getReservationsByStudent,
  getReservadasByProfesor,
  getAvailableTutorias,
};
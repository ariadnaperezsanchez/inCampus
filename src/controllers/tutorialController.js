const tutoriaModel = require("../models/Tutorial");

// ============================
// GET - Tutorías
// ============================

// Obtener todas las tutorías
const getTutorias = (req, res) => {
  tutoriaModel.getAllTutorias((err, results) => {
    if (err) {
      console.error("Error al obtener tutorías:", err);
      return res.status(500).json({
        message: "Error al obtener tutorías",
      });
    }

    return res.status(200).json({
      message: "Tutorías obtenidas correctamente",
      user: req.user,
      data: results,
    });
  });
};

// Obtener solo tutorías disponibles
const getAvailableTutorias = (req, res) => {
  tutoriaModel.getAvailableTutorias((err, results) => {
    if (err) {
      console.error("Error al obtener disponibilidades:", err);
      return res.status(500).json({
        message: "Error al obtener disponibilidades",
      });
    }

    return res.status(200).json({
      message: "Disponibilidades obtenidas correctamente",
      data: results,
    });
  });
};

// ============================
// ALUMNO - Reservas
// ============================

// Obtener reservas propias del alumno
const getMyReservations = (req, res) => {
  const id_alumno = req.user.id;

  tutoriaModel.getReservationsByStudent(id_alumno, (err, results) => {
    if (err) {
      console.error("Error al obtener mis reservas:", err);
      return res.status(500).json({
        message: "Error al obtener mis reservas",
      });
    }

    return res.status(200).json({
      message: "Mis reservas obtenidas correctamente",
      data: results,
    });
  });
};

// Reservar una tutoría
const reservar = (req, res) => {
  const id = req.params.id;
  const id_alumno = req.user.id;

  tutoriaModel.getTutoriaById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error servidor",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Tutoría no encontrada",
      });
    }

    const tutoria = results[0];

    if (tutoria.estado_slot !== "DISPONIBLE") {
      return res.status(400).json({
        message: "La tutoría ya está reservada",
      });
    }

    tutoriaModel.reservarTutoria(id, id_alumno, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error al reservar",
        });
      }

      return res.status(200).json({
        message: "Tutoría reservada correctamente",
      });
    });
  });
};

// Cancelar una reserva propia
const cancelReservation = (req, res) => {
  const id = req.params.id;
  const id_alumno = req.user.id;

  tutoriaModel.getTutoriaById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error servidor",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Tutoría no encontrada",
      });
    }

    const tutoria = results[0];

    if (tutoria.id_alumno !== id_alumno) {
      return res.status(403).json({
        message: "No puedes cancelar una tutoría que no es tuya",
      });
    }

    tutoriaModel.cancelReservation(id, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error al cancelar",
        });
      }

      return res.status(200).json({
        message: "Reserva cancelada correctamente",
      });
    });
  });
};

// ============================
// PROFESOR - Disponibilidades
// ============================

// Crear disponibilidad
const createAvailability = (req, res) => {
  const { fecha_inicio, fecha_fin, ubicacion } = req.body;
  const id_profesor = req.user.id;

  if (!fecha_inicio || !fecha_fin || !ubicacion) {
    return res.status(400).json({
      message: "Faltan campos obligatorios",
    });
  }

  tutoriaModel.createAvailability(
    fecha_inicio,
    fecha_fin,
    ubicacion,
    id_profesor,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error al crear disponibilidad",
        });
      }

      return res.status(201).json({
        message: "Disponibilidad creada correctamente",
        data: result,
      });
    }
  );
};

// Obtener tutorías reservadas al profesor
const getReservadasProfesor = (req, res) => {
  const id_profesor = req.user.id;

  tutoriaModel.getReservadasByProfesor(id_profesor, (err, results) => {
    if (err) {
      console.error("Error al obtener tutorías del profesor:", err);
      return res.status(500).json({
        message: "Error al obtener tutorías",
      });
    }

    return res.status(200).json({
      message: "Tutorías reservadas del profesor",
      data: results,
    });
  });
};

// Cancelar disponibilidad propia
const cancelAvailability = (req, res) => {
  const id = req.params.id;
  const id_profesor = req.user.id;

  tutoriaModel.getTutoriaById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error servidor",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Tutoría no encontrada",
      });
    }

    const tutoria = results[0];

    if (tutoria.id_profesor !== id_profesor) {
      return res.status(403).json({
        message: "No puedes cancelar una disponibilidad que no es tuya",
      });
    }

    tutoriaModel.cancelAvailability(id, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error al cancelar disponibilidad",
        });
      }

      return res.status(200).json({
        message: "Disponibilidad cancelada correctamente",
      });
    });
  });
};

// ============================
// Exportaciones
// ============================

module.exports = {
  getTutorias,
  getAvailableTutorias,
  getMyReservations,
  reservar,
  cancelReservation,
  createAvailability,
  getReservadasProfesor,
  cancelAvailability,
};
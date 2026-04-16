const tutoriaModel = require("../models/Tutorial");

// GET todas las tutorías
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

// Funcion para obtener reservas propias del alumno
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

// GET  de tutorias que le han reservado al profesor los alumnos
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


// PROFESOR crea disponibilidad
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

//  ALUMNO reserva tutoría
const reservar = (req, res) => {
  const id = req.params.id;
  const id_alumno = req.user.id;

  tutoriaModel.getTutoriaById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error servidor" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Tutoría no encontrada" });
    }

    const tutoria = results[0];

    if (tutoria.estado_slot !== "DISPONIBLE") { //estado_slot es el estado de la tutoría, si no es disponible no se puede reservar
      return res.status(400).json({
        message: "La tutoría ya está reservada",
      });
    }

    tutoriaModel.reservarTutoria(id, id_alumno, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al reservar" });
      }

      return res.status(200).json({
        message: "Tutoría reservada correctamente",
      });
    });
  });
};

// GET solo disponibilidades
const getAvailableTutorias = (req, res) => { //tutorias disponibles avaiable
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


// EXPORTAMOS LAS FUNCIONES PARA USARLAS EN LAS RUTAS 
module.exports = {
  getTutorias,
  createAvailability,
  reservar,
  getMyReservations,
  getReservadasProfesor,
  getAvailableTutorias,
  cancelReservation
};
const tutoriaModel = require("../models/Tutorial");
// función para obtener el id del usuario, compatible con ambos formatos de token
const getUserId = (req) => req.user.id || req.user.id_usuario;

// controladores para tutorías, con lógica para profesores y alumnos según el rol del usuario
const getTutorias = (req, res) => {
  const userId = getUserId(req);

  if (req.user.rol === "PROFESOR") {
    return tutoriaModel.getTutoriasByProfesor(userId, (err, results) => {
      if (err) {
        console.error("Error al obtener tutorías del profesor:", err);
        return res.status(500).json({
          message: "Error al obtener tutorías del profesor",
        });
      }

      return res.status(200).json({
        message: "Tutorías del profesor obtenidas correctamente",
        data: results,
      });
    });
  }

// si es alumno, se obtienen todas las tutorías para mostrar disponibilidad y reservas
  tutoriaModel.getAllTutorias((err, results) => {
    if (err) {
      console.error("Error al obtener tutorías:", err);
      return res.status(500).json({
        message: "Error al obtener tutorías",
      });
    }

    return res.status(200).json({
      message: "Tutorías obtenidas correctamente",
      data: results,
    });
  });
};

// función para obtener solo las tutorías disponibles para reservar, usada en la página de reservas del alumno
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

// función para obtener las reservas del alumno, usada en la página de mis reservas del alumno
const getMyReservations = (req, res) => {
  const id_alumno = getUserId(req);

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

// función para reservar tutoria
const reservar = (req, res) => {
  const id = req.params.id;
  const id_alumno = getUserId(req);

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


// validar que la tutoria esté disponible antes de reservar, para evitar conflictos si varios alumnos intentan reservar al mismo tiempo
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

// función para cancelar la reserva
const cancelReservation = (req, res) => {
  const id = req.params.id;
  const id_alumno = getUserId(req);

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

  // validar que la tutoria esté reservada por el alumno que intenta cancelar
    const tutoria = results[0];

    if (Number(tutoria.id_alumno) !== Number(id_alumno)) {
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

// función para crear disponibilidad, solo para P validando campos obligatorios y manejando errores
const createAvailability = (req, res) => {
  const { fecha_inicio, fecha_fin, ubicacion } = req.body;
  const id_profesor = getUserId(req);

  if (!fecha_inicio || !fecha_fin || !ubicacion) {
    return res.status(400).json({
      message: "Faltan campos obligatorios",
    });
  }

// validar que fecha_inicio sea anterior a fecha_fin
  tutoriaModel.createAvailability(
    fecha_inicio,
    fecha_fin,
    ubicacion,
    id_profesor,
    (err, result) => {
      if (err) {
        console.error("Error al crear disponibilidad:", err);
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
// función para obtener las tutorías reservadas del profesor, usada en la página de mis reservas del profesor
const getReservadasProfesor = (req, res) => {
  const id_profesor = getUserId(req);

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

// función para cancelar dispo
const cancelAvailability = (req, res) => {
  const id = req.params.id;
  const id_profesor = getUserId(req);

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

    if (Number(tutoria.id_profesor) !== Number(id_profesor)) {
      return res.status(403).json({
        message: "No puedes cancelar una disponibilidad que no es tuya",
      });
    }

    if (tutoria.estado_slot === "RESERVADA") {
      return res.status(400).json({
        message: "No puedes cancelar una disponibilidad ya reservada",
      });
    }
    
// validar que la tutoria no este reservada antes de cancelar
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
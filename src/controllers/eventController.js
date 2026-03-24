const eventModel = require("../models/Event");

const getEvents = (req, res) => {
  eventModel.obtenerEventos((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener eventos" });
    }

    res.json(results);
  });
};

const getEventById = (req, res) => {
  const { id } = req.params;

  eventModel.obtenerEventoPorId(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener el evento" });
    }

    if (!result) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    res.json(result);
  });
};

const createEvent = (req, res) => {
  const { titulo, descripcion, fecha, ubicacion } = req.body;

  if (!titulo || !fecha) {
    return res.status(400).json({
      error: "Los campos titulo y fecha son obligatorios",
    });
  }

  eventModel.crearEvento(titulo, descripcion, fecha, ubicacion, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al crear el evento" });
    }

    res.status(201).json({
      message: "Evento creado correctamente",
      evento: result,
    });
  });
};

const updateEvent = (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha, ubicacion } = req.body;

  eventModel.actualizarEvento(
    id,
    titulo,
    descripcion,
    fecha,
    ubicacion,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al actualizar el evento" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }

      res.json({ message: "Evento actualizado correctamente" });
    }
  );
};

const deleteEvent = (req, res) => {
  const { id } = req.params;

  eventModel.eliminarEvento(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al eliminar el evento" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    res.json({ message: "Evento eliminado correctamente" });
  });
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
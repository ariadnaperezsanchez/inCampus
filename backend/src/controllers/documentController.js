const Document = require("../models/Document");

// función para subir doc
const uploadDocument = (req, res) => {
  const { titulo, tipo, id_asignatura } = req.body;

  if (!titulo || !tipo || !id_asignatura) {
    return res.status(400).json({
      message: "Faltan campos obligatorios",
    });
  }
// validar que se ha subido un archivo
  if (!req.file) {
    return res.status(400).json({
      message: "No se ha subido ningún archivo",
    });
  }
// crear objeto documento con los datos recibidos y la url del archivo subido
  const documento = {
    titulo,
    tipo,
    id_asignatura,
    id_profesor: req.user.id,
    url_archivo: `uploads/documentos/${req.file.filename}`,
  };

  Document.createDocument(documento, (err, result) => {
    if (err) {
      console.error("Error al guardar documento:", err);

      return res.status(500).json({
        message: "Error al guardar documento",
      });
    }

    return res.status(201).json({
      message: "Documento subido correctamente",
      documento: {
        id_documento: result.insertId,
        ...documento,
      },
    });
  });
};

// función para obtener documentos de una asignatura, disponible para alumnos y profesores
const getDocumentsBySubject = (req, res) => {
  const { id_asignatura } = req.params;

  Document.getDocumentsBySubject(id_asignatura, (err, results) => {
    if (err) {
      console.error("Error al obtener documentos:", err);

      return res.status(500).json({
        message: "Error al obtener documentos",
      });
    }

    return res.status(200).json({
      message: "Documentos obtenidos correctamente",
      data: results,
    });
  });
};

// funcion para eliminar doc solo P
const deleteDocument = (req, res) => {
  const { id } = req.params;
// validar que el doc existe y que el P es el propietario del doc antes de eliminar
  Document.deleteDocument(id, (err, result) => {
    if (err) {
      console.error("Error al eliminar documento:", err);

      return res.status(500).json({
        message: "Error al eliminar documento",
      });
    }

    return res.status(200).json({
      message: "Documento eliminado correctamente",
    });
  });
};

module.exports = {
  uploadDocument,
  getDocumentsBySubject,
  deleteDocument,
};
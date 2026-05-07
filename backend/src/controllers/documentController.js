// controllers/documentController.js

const Document = require("../models/Document");

const uploadDocument = (req, res) => {
  const { titulo, tipo, id_asignatura } = req.body;

  if (!titulo || !tipo || !id_asignatura) {
    return res.status(400).json({
      message: "Faltan campos obligatorios",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "No se ha subido ningún archivo",
    });
  }

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

const deleteDocument = (req, res) => {
  const { id } = req.params;

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
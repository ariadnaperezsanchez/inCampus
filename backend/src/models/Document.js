const db = require("../config/db");

// Función para crear un nuevo documento
const createDocument = (documento, callback) => {
  const sql = `
    INSERT INTO documento 
    (titulo, url_archivo, tipo, id_profesor, id_asignatura)
    VALUES (?, ?, ?, ?, ?)
  `;

// Ejecutar la consulta SQL para insertar un nuevo documento en la base de datos
  db.query(
    sql,
    [
      documento.titulo,
      documento.url_archivo,
      documento.tipo,
      documento.id_profesor,
      documento.id_asignatura,
    ],
    callback
  );
};

// Función para obtener los documentos de una asignatura específica, ordenados por fecha de subida (más recientes primero)
const getDocumentsBySubject = (id_asignatura, callback) => {
  const sql = `
    SELECT *
    FROM documento
    WHERE id_asignatura = ?
    ORDER BY fecha_subida DESC
  `;

  db.query(sql, [id_asignatura], callback);
};

// Función para eliminar un documento por su ID
const deleteDocument = (id, callback) => {
  const sql = `
    DELETE FROM documento
    WHERE id_documento = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  createDocument,
  getDocumentsBySubject,
  deleteDocument,
};
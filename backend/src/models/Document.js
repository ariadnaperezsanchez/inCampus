const db = require("../config/db");

const createDocument = (documento, callback) => {
  const sql = `
    INSERT INTO documento 
    (titulo, url_archivo, tipo, id_profesor, id_asignatura)
    VALUES (?, ?, ?, ?, ?)
  `;

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

const getDocumentsBySubject = (id_asignatura, callback) => {
  const sql = `
    SELECT *
    FROM documento
    WHERE id_asignatura = ?
    ORDER BY fecha_subida DESC
  `;

  db.query(sql, [id_asignatura], callback);
};

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
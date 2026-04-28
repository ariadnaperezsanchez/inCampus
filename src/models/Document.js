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

module.exports = {
  createDocument,
  getDocumentsBySubject,
};
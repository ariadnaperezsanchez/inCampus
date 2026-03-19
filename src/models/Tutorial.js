const db = require("../config/db");

const getAllTutorias = (callback) => {
  const sql = "SELECT * FROM tutoria";

  db.query(sql, callback);
};

module.exports = {
  getAllTutorias,
};
const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const documentController = require("../controllers/documentController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/documentos");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PDF"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

// Profesor sube PDF
router.post(
  "/",
  protect,
  authorize("PROFESOR"),
  upload.single("archivo"),
  documentController.uploadDocument
);

// Alumno/profesor ve documentos de una asignatura
router.get(
  "/asignatura/:id_asignatura",
  protect,
  authorize("ALUMNO", "PROFESOR"),
  documentController.getDocumentsBySubject
);

module.exports = router;
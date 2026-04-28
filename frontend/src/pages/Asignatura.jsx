import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Asignatura() {
  const usuario = {
    nombre: "Ariadna",
    rol: "profesor", // cambia a "alumno" para probar
  };

  const [documentos, setDocumentos] = useState([]);

  const subirDocumento = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const tiposPermitidos = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    if (!tiposPermitidos.includes(archivo.type)) {
      alert("Solo se permiten archivos PDF, DOCX o PPTX.");
      e.target.value = "";
      return;
    }

    const nuevoDocumento = {
      nombre: archivo.name,
      fecha: new Date().toLocaleDateString(),
      url: URL.createObjectURL(archivo),
      tipo: archivo.name.split(".").pop().toUpperCase(),
    };

    setDocumentos([...documentos, nuevoDocumento]);
    e.target.value = "";
  };

  return (
    <>
      <Navbar />

      <main className="asignatura-page">
        <section className="asignatura-header">
          <span>Asignatura</span>
          <h1>Matemáticas</h1>
          <p>
            Consulta apuntes, ejercicios, presentaciones y documentos
            compartidos por el profesorado.
          </p>
        </section>

        {usuario.rol === "profesor" && (
          <section className="upload-box">
            <h2>Subir material</h2>
            <p>
              Añade apuntes, ejercicios, presentaciones o material de apoyo para
              el alumnado.
            </p>

            <label className="upload-btn">
              Seleccionar archivo
              <input
                type="file"
                accept=".pdf,.docx,.pptx"
                onChange={subirDocumento}
                hidden
              />
            </label>
          </section>
        )}

        {usuario.rol === "alumno" && (
          <section className="student-info">
            <p>Puedes consultar documentos subidos por el profesorado.</p>
          </section>
        )}

        <section className="docs-section">
          <h2>Documentos de la asignatura</h2>

          {documentos.length === 0 ? (
            <p className="empty-docs">
              Todavía no hay documentos subidos. Cuando el profesorado añada
              material, aparecerá aquí.
            </p>
          ) : (
            <div className="docs-grid">
              {documentos.map((doc, index) => (
                <div className="doc-card" key={index}>
                  <div>
                    <span className="doc-type">{doc.tipo}</span>
                    <h3>{doc.nombre}</h3>
                    <p>Subido el {doc.fecha}</p>
                  </div>

                  <a href={doc.url} download={doc.nombre} className="doc-link">
                    Descargar
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Asignatura;
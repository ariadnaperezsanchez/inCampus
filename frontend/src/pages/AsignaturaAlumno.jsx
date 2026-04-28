import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiUrl, authHeaders } from "../api";

function AsignaturaAlumno() {
  const [asignaturas, setAsignaturas] = useState([]);
  const [idAsignatura, setIdAsignatura] = useState("");
  const [documentos, setDocumentos] = useState([]);

  const cargarDocumentos = async (id) => {
    try {
      const res = await fetch(apiUrl(`/documentos/asignatura/${id}`), {
        headers: authHeaders(),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        setDocumentos([]);
        return;
      }

      setDocumentos(data.data || []);
    } catch (error) {
      console.error("Error cargando documentos:", error);
      setDocumentos([]);
    }
  };

  useEffect(() => {
    const cargarAsignaturas = async () => {
      try {
        const res = await fetch(apiUrl("/subjects"));
        const data = await res.json();

        setAsignaturas(data);

        if (data.length > 0) {
          const id = data[0].id_asignatura || data[0].id;
          setIdAsignatura(id);
          cargarDocumentos(id);
        }
      } catch (error) {
        console.error("Error cargando asignaturas:", error);
      }
    };

    cargarAsignaturas();
  }, []);

  const cambiarAsignatura = (e) => {
    const id = e.target.value;
    setIdAsignatura(id);
    cargarDocumentos(id);
  };

  return (
    <>
      <Navbar />

      <main className="asignatura-page">
        <section className="asignatura-header">
          <span>Asignatura</span>
          <h1>Mis asignaturas</h1>
          <p>Consulta los PDFs subidos por el profesorado.</p>
        </section>

        <section className="student-info">
          <p>Puedes consultar documentos subidos por el profesorado.</p>

          <select value={idAsignatura} onChange={cambiarAsignatura}>
            {asignaturas.map((asignatura) => {
              const id = asignatura.id_asignatura || asignatura.id;

              return (
                <option key={id} value={id}>
                  {asignatura.nombre}
                </option>
              );
            })}
          </select>
        </section>

        <section className="docs-section">
          <h2>Documentos de la asignatura</h2>

          {documentos.length === 0 ? (
            <p className="empty-docs">
              Todavía no hay documentos subidos. Cuando el profesorado añada
              material, aparecerá aquí.
            </p>
          ) : (
            <div className="docs-grid">
              {documentos.map((doc) => (
                <div className="doc-card" key={doc.id_documento}>
                  <div>
                    <span className="doc-type">{doc.tipo}</span>
                    <h3>{doc.titulo}</h3>
                    <p>Subido el {doc.fecha_subida}</p>
                  </div>

                  <a
                    href={apiUrl(`/${doc.url_archivo}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="doc-link"
                  >
                    Ver PDF
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

export default AsignaturaAlumno;
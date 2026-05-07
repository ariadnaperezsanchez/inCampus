import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from "../api";

function AsignaturaAlumno() {
  const [asignaturas, setAsignaturas] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [idAsignatura, setIdAsignatura] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const cargarDocumentos = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/documentos/asignatura/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error cargando documentos");
        return;
      }

      setDocumentos(data.data || data);
    } catch (err) {
      console.error(err);
      setError("Error conectando con backend");
    }
  };

  const cargarAsignaturas = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/subjects`);
      const data = await res.json();

      setAsignaturas(data);

      if (data.length > 0) {
        const id = data[0].id_asignatura || data[0].id;
        setIdAsignatura(id);
        await cargarDocumentos(id);
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar asignaturas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAsignaturas();
  }, []);

  const cambiarAsignatura = async (e) => {
    const id = e.target.value;
    setIdAsignatura(id);
    await cargarDocumentos(id);
  };

  return (
    <>
      <main className="asignatura-page">
        <section className="asignatura-header">
          <span>Asignaturas</span>
          <h1>Mis asignaturas</h1>
          <p>Consulta los documentos disponibles de tus asignaturas.</p>
        </section>

        {error && (
          <p style={{ color: "red", maxWidth: "1100px", margin: "0 auto 20px" }}>
            {error}
          </p>
        )}

        {loading ? (
          <p style={{ maxWidth: "1100px", margin: "0 auto" }}>
            Cargando asignaturas...
          </p>
        ) : (
          <>
            <section className="student-info">
              <p>Selecciona una asignatura para ver sus documentos.</p>

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
              <h2>Documentos</h2>

              {documentos.length === 0 ? (
                <p className="empty-docs">No hay documentos disponibles.</p>
              ) : (
                <div className="docs-grid">
                  {documentos.map((doc) => (
                    <article className="doc-card" key={doc.id_documento}>
                      <div>
                        <span className="doc-type">{doc.tipo || "PDF"}</span>
                        <h3>{doc.titulo}</h3>
                        <p>{doc.fecha_subida}</p>
                      </div>

                      <a
                        className="doc-link"
                        href={`${API_URL}/${doc.url_archivo}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ver PDF
                      </a>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default AsignaturaAlumno;
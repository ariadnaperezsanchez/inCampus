import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import API_URL from "../api";

// función para mostrar asignaturas y documentos, con opción de subir PDF para profesores
function Asignatura() {
  const [asignaturas, setAsignaturas] = useState([]);
  const [idAsignatura, setIdAsignatura] = useState("");
  const [titulo, setTitulo] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [error, setError] = useState("");

  const rol = localStorage.getItem("rol"); // obtener rol del usuario para mostrar opciones según sea alumno o profesor

  const cargarAsignaturas = async () => {
    const res = await fetch(`${API_URL}/subjects`);
    const data = await res.json();

// si la respuesta no es ok, mostrar error
    setAsignaturas(data);

    if (data.length > 0) {
      const id = data[0].id_asignatura || data[0].id;
      setIdAsignatura(id);
      cargarDocumentos(id);
    }
  };

// función para cargar documentos de una asignatura específica
  const cargarDocumentos = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/documentos/asignatura/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json(); 
    setDocumentos(data.data || data);
  };

// cargar asignaturas al montar el componente
  useEffect(() => {
    cargarAsignaturas();
  }, []);

  const subirPDF = async (e) => {
    e.preventDefault();
    setError("");

    if (!archivo) {
      setError("Selecciona un PDF");
      return;
    }

    const token = localStorage.getItem("token"); // obtener token para autenticación

// crear FormData para enviar el archivo y los datos del documento al backend
    const formData = new FormData();
    formData.append("titulo", titulo || archivo.name);
    formData.append("tipo", "PDF");
    formData.append("id_asignatura", idAsignatura);
    formData.append("archivo", archivo);

    const res = await fetch(`${API_URL}/documentos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Error al subir PDF");
      return;
    }

    setTitulo("");
    setArchivo(null);

    await cargarDocumentos(idAsignatura);
  };

// función para eliminar un documento, solo disponible para profesores
  const eliminarDocumento = async (idDocumento) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este documento?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/documentos/${idDocumento}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("DELETE DOCUMENTO:", res.status, data);

      if (!res.ok) {
        alert(data.message || "Error al eliminar documento");
        return;
      }

      alert("Documento eliminado correctamente");
      await cargarDocumentos(idAsignatura);
    } catch (err) {
      console.error(err);
      alert("Error de conexión al eliminar");
    }
  };

  return (
  // estructura de la página con secciones para mostrar asignaturas, subir documentos y listar documentos disponibles, con opciones según el rol del usuario
    <>
      <main className="asignatura-page">
        <section className="asignatura-header">
          <span>Asignaturas</span>
          <h1>Mis asignaturas</h1>
          <p>
            Consulta documentos de tus asignaturas y accede al material
            académico disponible.
          </p>
        </section>

        {error && (
          <p style={{ color: "red", maxWidth: "1100px", margin: "0 auto 20px" }}>
            {error}
          </p>
        )}

        <section className="student-info">
          <p>Selecciona una asignatura para ver sus documentos.</p>

          <select
            value={idAsignatura}
            onChange={(e) => {
              setIdAsignatura(e.target.value);
              cargarDocumentos(e.target.value);
            }}
          >
            {asignaturas.map((a) => {
              const id = a.id_asignatura || a.id;
              return (
                <option key={id} value={id}>
                  {a.nombre}
                </option>
              );
            })}
          </select>
        </section>

        {rol === "PROFESOR" && (
          <section className="upload-box">
            <h2>Subir documento</h2>
            <p>Sube un PDF para que los alumnos puedan consultarlo.</p>

            <form onSubmit={subirPDF}>
              <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setArchivo(e.target.files[0])}
              />

              <button className="upload-btn" type="submit">
                Subir PDF
              </button>
            </form>
          </section>
        )}

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
                  </div>

                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <a
                      className="doc-link"
                      href={`${API_URL}/${doc.url_archivo}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver PDF
                    </a>

                    {rol === "PROFESOR" && (
                      <button
                        className="doc-link"
                        type="button"
                        onClick={() => eliminarDocumento(doc.id_documento)}
                        style={{ border: "none", cursor: "pointer" }}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </article>
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
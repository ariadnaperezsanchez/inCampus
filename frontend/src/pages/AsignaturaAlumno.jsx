import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AsignaturaAlumno() {
  const [asignaturas, setAsignaturas] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [idAsignatura, setIdAsignatura] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const cargarAsignaturas = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:3000/subjects");
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

  const cargarDocumentos = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/documentos/asignatura/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  useEffect(() => {
    cargarAsignaturas();
  }, []);

  const cambiarAsignatura = async (e) => {
    const id = e.target.value;
    setIdAsignatura(id);
    await cargarDocumentos(id);
  };

  if (loading) return <p>Cargando asignaturas...</p>;

  return (
    <>
      <Navbar />

      <main className="asignatura-page">
        <h1>Mis asignaturas</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

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

        <h2>Documentos</h2>

        {documentos.length === 0 ? (
          <p>No hay documentos</p>
        ) : (
          <ul>
            {documentos.map((doc) => (
              <li key={doc.id_documento}>
                <strong>{doc.titulo}</strong>
                <br />
                {doc.fecha_subida}
                <br />
                <a
                  href={`http://localhost:3000/${doc.url_archivo}`}
                  target="_blank"
                >
                  Ver PDF
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </>
  );
}

export default AsignaturaAlumno;
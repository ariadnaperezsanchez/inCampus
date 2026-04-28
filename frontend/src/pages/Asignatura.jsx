import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Asignatura() {
  const [asignaturas, setAsignaturas] = useState([]);
  const [idAsignatura, setIdAsignatura] = useState("");
  const [titulo, setTitulo] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [error, setError] = useState("");

  const rol = localStorage.getItem("rol");

  const cargarAsignaturas = async () => {
    const res = await fetch("http://localhost:3000/subjects");
    const data = await res.json();

    setAsignaturas(data);

    if (data.length > 0) {
      const id = data[0].id_asignatura || data[0].id;
      setIdAsignatura(id);
      cargarDocumentos(id);
    }
  };

  const cargarDocumentos = async (id) => {
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
    setDocumentos(data.data || data);
  };

  useEffect(() => {
    cargarAsignaturas();
  }, []);

  const subirPDF = async (e) => {
    e.preventDefault();

    if (!archivo) {
      setError("Selecciona un PDF");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("titulo", titulo || archivo.name);
    formData.append("tipo", "PDF");
    formData.append("id_asignatura", idAsignatura);
    formData.append("archivo", archivo);

    const res = await fetch("http://localhost:3000/documentos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setTitulo("");
    setArchivo(null);

    await cargarDocumentos(idAsignatura);
  };

  return (
    <>
      <Navbar />

      <main className="asignatura-page">
        <h1>Asignaturas</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <select
          value={idAsignatura}
          onChange={(e) => {
            setIdAsignatura(e.target.value);
            cargarDocumentos(e.target.value);
          }}
        >
          {asignaturas.map((a) => {
            const id = a.id_asignatura || a.id;
            return <option key={id}>{a.nombre}</option>;
          })}
        </select>

        {rol === "PROFESOR" && (
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

            <button>Subir PDF</button>
          </form>
        )}

        <h2>Documentos</h2>

        {documentos.length === 0 ? (
          <p>No hay documentos</p>
        ) : (
          <ul>
            {documentos.map((doc) => (
              <li key={doc.id_documento}>
                {doc.titulo}
                <a
                  href={`http://localhost:3000/${doc.url_archivo}`}
                  target="_blank"
                >
                  Ver
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

export default Asignatura;
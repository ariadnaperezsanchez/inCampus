import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function Tutorias() {
  const [tutorias, setTutorias] = useState([]);
  const [tutoriaReservada, setTutoriaReservada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarTutorias = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/tutorias/disponibles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Error al cargar tutorías");
          return;
        }

        setTutorias(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    cargarTutorias();
  }, []);

  const reservarTutoria = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/tutorias/${id}/reservar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al reservar tutoría");
        return;
      }

      setTutoriaReservada(id);
      alert("Tutoría reservada correctamente");
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  };

  const cancelarTutoria = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/tutorias/${id}/cancelar`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al cancelar tutoría");
        return;
      }

      setTutoriaReservada(null);
      alert("Tutoría cancelada correctamente");
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <>
      <Navbar />

      <main className="tutorias-page">
        <section className="tutorias-hero">
          <span className="badge">Tutorías académicas</span>
          <h1>Reserva una tutoría con tus profesores</h1>
          <p>
            Consulta la disponibilidad de los profesores y reserva una tutoría
            de forma rápida y sencilla.
          </p>
        </section>

        {loading && <p>Cargando tutorías...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <section className="tutorias-grid">
            {tutorias.length === 0 ? (
              <p>No hay tutorías disponibles</p>
            ) : (
              tutorias.map((tutoria) => (
                <article className="tutoria-card" key={tutoria.id}>
                  <h2>{tutoria.profesor || tutoria.nombre}</h2>

                  <p>
                    <strong>Asignatura:</strong>{" "}
                    {tutoria.asignatura || "Sin asignatura"}
                  </p>

                  <p>
                    <strong>Horario:</strong>{" "}
                    {tutoria.horario ||
                      tutoria.fecha ||
                      "Horario no disponible"}
                  </p>

                  {tutoriaReservada === tutoria.id ? (
                    <button
                      className="btn secondary"
                      onClick={() => cancelarTutoria(tutoria.id)}
                    >
                      Cancelar tutoría
                    </button>
                  ) : (
                    <button
                      className="btn primary"
                      onClick={() => reservarTutoria(tutoria.id)}
                    >
                      Reservar tutoría
                    </button>
                  )}
                </article>
              ))
            )}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Tutorias;
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from "../api";

function Events() {
  const [eventos, setEventos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const rol = localStorage.getItem("rol");

  const cargarEventos = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/eventos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || data.error || "Error al cargar eventos");
        return;
      }

      setEventos(data.data || data);
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const crearEvento = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/eventos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          fecha,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || data.error || "Error al crear evento");
        return;
      }

      setTitulo("");
      setDescripcion("");
      setFecha("");

      await cargarEventos();
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    }
  };

  const eliminarEvento = async (idEvento) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este evento?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/eventos/${idEvento}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || data.error || "Error al eliminar evento");
        return;
      }

      alert("Evento eliminado correctamente");
      await cargarEventos();
    } catch (err) {
      console.error(err);
      alert("Error de conexión al eliminar evento");
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
    return new Date(fecha).toLocaleString("es-ES");
  };

  return (
    <>
      <main className="events-page">
        <section className="events-hero">
          <span className="badge">Eventos</span>
          <h1>Eventos académicos</h1>

          {rol === "PROFESOR" ? (
            <p>Crea eventos para que los alumnos puedan consultarlos.</p>
          ) : (
            <p>Consulta los eventos creados por tus profesores.</p>
          )}
        </section>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {rol === "PROFESOR" && (
          <section
            className="event-detail"
            style={{ maxWidth: "850px", margin: "0 auto 40px" }}
          >
            <h2>Crear evento</h2>

            <form onSubmit={crearEvento} className="login-form">
              <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />

              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />

              <button type="submit">Crear evento</button>
            </form>
          </section>
        )}

        {loading ? (
          <p style={{ textAlign: "center" }}>Cargando eventos...</p>
        ) : (
          <section className="tutorias-grid">
            {eventos.length === 0 ? (
              <p>No hay eventos disponibles</p>
            ) : (
              eventos.map((evento) => {
                const idEvento = evento.id_evento || evento.id;

                return (
                  <article className="tutoria-card" key={idEvento}>
                    <h2>{evento.titulo}</h2>
                    <p>{evento.descripcion}</p>
                    <p>
                      <strong>Fecha:</strong> {formatearFecha(evento.fecha)}
                    </p>

                    {rol === "PROFESOR" && (
                      <button
                        className="btn secondary"
                        type="button"
                        onClick={() => eliminarEvento(idEvento)}
                      >
                        Eliminar evento
                      </button>
                    )}
                  </article>
                );
              })
            )}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Events;
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from "../api";

// función para mostrar eventos académicos, con opción de crear y eliminar eventos para profesores y solo consulta para alumnos
function Events() {
  const [eventos, setEventos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const rol = localStorage.getItem("rol");
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

// función para cargar eventos
  const cargarEventos = async () => {
    try {
      setLoading(true);
      setError("");

// obtener token para autenticación
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/eventos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
// obtener datos de la respuesta y manejar errores
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
// cargar eventos al montar el componente
  useEffect(() => {
    cargarEventos();
  }, []);

// función para crear evento, solo disponible para profesores, con validación de campos y manejo de errores
  const crearEvento = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

// enviar datos del nuevo evento al backend para crear el evento, con manejo de errores
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

// obtener datos de la respuesta y manejar errores
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

// función para eliminar evento, solo disponible para profesores, con confirmación antes de eliminar y manejo de errores
  const eliminarEvento = async (idEvento) => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este evento?"
    );

    if (!confirmar) return;

  // obtener token para autenticación y enviar solicitud al backend para eliminar el evento, con manejo de errores
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
  
// función para formatear la fecha de los eventos en formato legible, con manejo de casos sin fecha
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

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            {error}
          </p>
        )}

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

              <button type="submit">
                Crear evento
              </button>
            </form>
          </section>
        )}

        {loading ? (
          <p style={{ textAlign: "center" }}>
            Cargando eventos...
          </p>
        ) : (
          <section className="tutorias-grid">
            {eventos.length === 0 ? (
              <p>No hay eventos disponibles</p>
            ) : (
              eventos.map((evento) => {
                const idEvento = evento.id_evento || evento.id;

                return (
                  <article
                    className="tutoria-card"
                    key={idEvento}
                  >
                    <h2>{evento.titulo}</h2>

                    <p>{evento.descripcion}</p>

                    <p>
                      <strong>Fecha:</strong>{" "}
                      {formatearFecha(evento.fecha)}
                    </p>

                    {rol === "PROFESOR" &&
                      evento.id_profesor === usuario.id && (
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
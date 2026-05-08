import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from "../api";

// funcion para mostrar tutorias d
function Tutorias() {
  const [disponibles, setDisponibles] = useState([]);
  const [misReservas, setMisReservas] = useState([]);
  const [tutoriasProfesor, setTutoriasProfesor] = useState([]);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const rol = localStorage.getItem("rol"); // "ALUMNO" o "PROFESOR"

// función para hacer fetch con autenticación
  const fetchAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
  };


  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError("");

      if (rol === "PROFESOR") {
        const res = await fetchAuth(`${API_URL}/tutorias`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Error al cargar tutorías");
          return;
        }

        setTutoriasProfesor(data.data || data);
      }

      if (rol === "ALUMNO") {
        const [resDisponibles, resReservas] = await Promise.all([
          fetchAuth(`${API_URL}/tutorias/disponibles`),
          fetchAuth(`${API_URL}/tutorias/mis-reservas`),
        ]);

        const dataDisponibles = await resDisponibles.json();
        const dataReservas = await resReservas.json();

        if (!resDisponibles.ok) {
          setError(dataDisponibles.message || "Error al cargar disponibilidades");
          return;
        }

        if (!resReservas.ok) {
          setError(dataReservas.message || "Error al cargar tus reservas");
          return;
        }

        setDisponibles(dataDisponibles.data || dataDisponibles);
        setMisReservas(dataReservas.data || dataReservas);
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

// cargar datos al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  const crearDisponibilidad = async (e) => {
    e.preventDefault();

    try {
      const res = await fetchAuth(`${API_URL}/tutorias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          ubicacion,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al crear disponibilidad");
        return;
      }

      setFechaInicio("");
      setFechaFin("");
      setUbicacion("");

      await cargarDatos();
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  };
  // funciones para reservar, cancelar reserva y cancelar disponibilidad
  const reservarTutoria = async (id) => {
    try {
      const res = await fetchAuth(`${API_URL}/tutorias/${id}/reservar`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al reservar tutoría");
        return;
      }
      // recargar datos para actualizar la lista de tutorías disponibles y mis reservas
      await cargarDatos();
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  };

  const cancelarReserva = async (id) => {
    try {
      const res = await fetchAuth(`${API_URL}/tutorias/${id}/cancelar`, {
        method: "PUT",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al cancelar tutoría");
        return;
      }

      await cargarDatos(); // recargar datos para mostrar la tutoria dispo
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  };

  // P - cancelar disponibilidad
  const cancelarDisponibilidad = async (id) => {
    try {
      const res = await fetchAuth(
        `${API_URL}/tutorias/${id}/cancelar-disponibilidad`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al cancelar disponibilidad");
        return;
      }

      await cargarDatos();
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
    return new Date(fecha).toLocaleString("es-ES"); // formatear fecha a formato en español
  };

  return (
    <>
      <main className="tutorias-page">
        <section className="tutorias-hero">
          <span className="badge">Tutorías académicas</span>

          {rol === "PROFESOR" ? (
            <>
              <h1>Gestionar tutorías</h1>
              <p>Crea disponibilidades y revisa las reservas de tus alumnos.</p>
            </>
          ) : (
            <>
              <h1>Reservar tutorías</h1>
              <p>Reserva una disponibilidad y consulta tus tutorías reservadas.</p>
            </>
          )}
        </section>

        {loading && <p>Cargando tutorías...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && rol === "PROFESOR" && (
          <>
            <section className="tutoria-card">
              <h2>Crear disponibilidad</h2>

              <form onSubmit={crearDisponibilidad}>
                <input
                  type="datetime-local"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  required
                />

                <input
                  type="datetime-local"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  required
                />

                <input
                  type="text"
                  placeholder="Ubicación"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  required
                />

                <button className="btn primary" type="submit">
                  Crear disponibilidad
                </button>
              </form>
            </section>

            <section className="tutorias-grid">
              {tutoriasProfesor.length === 0 ? (
                <p>No tienes disponibilidades creadas.</p>
              ) : (
                tutoriasProfesor.map((t) => (
                  <article className="tutoria-card" key={t.id_tutoria}>
                    <h2>Disponibilidad #{t.id_tutoria}</h2>

                    <p>
                      <strong>Inicio:</strong> {formatearFecha(t.fecha_inicio)}
                    </p>

                    <p>
                      <strong>Fin:</strong> {formatearFecha(t.fecha_fin)}
                    </p>

                    <p>
                      <strong>Ubicación:</strong> {t.ubicacion}
                    </p>

                    <p>
                      <strong>Estado:</strong> {t.estado_slot}
                    </p>

                    {t.estado_slot === "RESERVADA" && (
                      <p>
                        <strong>Alumno:</strong>{" "}
                        {t.alumno || `ID alumno ${t.id_alumno}`}
                      </p>
                    )}

                    {t.estado_slot === "DISPONIBLE" && (
                      <button
                        className="btn secondary"
                        onClick={() => cancelarDisponibilidad(t.id_tutoria)}
                      >
                        Cancelar disponibilidad
                      </button>
                    )}
                  </article>
                ))
              )}
            </section>
          </>
        )}

        {!loading && !error && rol === "ALUMNO" && (
          <>
            <section className="tutorias-dispo">
            <h2>Tutorías disponibles:</h2>
            </section>

            <section className="tutorias-grid">
              {disponibles.length === 0 ? (
                <p>No hay tutorías disponibles.</p>
              ) : (
                disponibles.map((t) => (
                  <article className="tutoria-card" key={t.id_tutoria}>
                    <h2>{t.profesor || "Profesor"}</h2>

                    <p>
                      <strong>Inicio:</strong> {formatearFecha(t.fecha_inicio)}
                    </p>

                    <p>
                      <strong>Fin:</strong> {formatearFecha(t.fecha_fin)}
                    </p>

                    <p>
                      <strong>Ubicación:</strong> {t.ubicacion}
                    </p>

                    <button
                      className="btn primary"
                      onClick={() => reservarTutoria(t.id_tutoria)}
                    >
                      Reservar tutoría
                    </button>
                  </article>
                ))
              )}
            </section>
            <section className="tutorias-dispo">
            <h2>Mis tutorías reservadas</h2>
            </section>

            <section className="tutorias-grid">
              {misReservas.length === 0 ? (
                <p>No tienes tutorías reservadas.</p>
              ) : (
                misReservas.map((t) => (
                  <article className="tutoria-card" key={t.id_tutoria}>
                    <h2>{t.profesor || "Profesor"}</h2>

                    <p>
                      <strong>Inicio:</strong> {formatearFecha(t.fecha_inicio)}
                    </p>

                    <p>
                      <strong>Fin:</strong> {formatearFecha(t.fecha_fin)}
                    </p>

                    <p>
                      <strong>Ubicación:</strong> {t.ubicacion}
                    </p>

                    <p>
                      <strong>Estado:</strong> {t.estado_slot}
                    </p>

                    <button
                      className="btn secondary"
                      onClick={() => cancelarReserva(t.id_tutoria)}
                    >
                      Cancelar reserva
                    </button>
                  </article>
                ))
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Tutorias;
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MisTutorias() {
  const [tutorias, setTutorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarMisTutorias = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/tutorias/mis-reservas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al cargar tutorías");
        return;
      }

      setTutorias(data.data || data);
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMisTutorias();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <h1>Mis tutorías</h1>

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <>
            {tutorias.length === 0 ? (
              <p>No tienes tutorías reservadas</p>
            ) : (
              <ul>
                {tutorias.map((t) => {
                  const id = t.id_tutoria || t.id;

                  return (
                    <li key={id}>
                      <h3>{t.profesor || t.nombre_profesor || t.nombre}</h3>
                      <p>{t.asignatura || t.nombre_asignatura}</p>
                      <p>{t.fecha || t.horario}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default MisTutorias;
/*import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function MisTutorias() {
  const [tutorias, setTutorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarMisTutorias = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/tutorias/mis-reservas", {
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

    cargarMisTutorias();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <h1>Mis tutorías</h1>

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <>
            {tutorias.length === 0 ? (
              <p>No tienes tutorías reservadas</p>
            ) : (
              <ul>
                {tutorias.map((t) => (
                  <li key={t.id}>
                    <h3>{t.profesor || t.nombre}</h3>
                    <p>{t.asignatura}</p>
                    <p>{t.fecha || t.horario}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default MisTutorias;

*/
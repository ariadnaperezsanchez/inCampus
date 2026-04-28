import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/asignaturas";

export default function Asignatura() {
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setAsignaturas(data))
      .catch((error) => console.error("Error cargando asignaturas:", error));
  }, []);

  return (
    <div>
      <h1>Asignaturas</h1>

      {asignaturas.length === 0 ? (
        <p>No hay asignaturas</p>
      ) : (
        asignaturas.map((asignatura) => (
          <div key={asignatura.id}>
            <h3>{asignatura.nombre}</h3>
            <p>{asignatura.descripcion}</p>
            <p>Curso: {asignatura.curso}</p>
          </div>
        ))
      )}
    </div>
  );
}
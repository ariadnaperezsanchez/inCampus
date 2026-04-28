import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/asignaturaAlumno";

export default function AsignaturaAlumno() {
  const [asignaturasAlumno, setAsignaturasAlumno] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setAsignaturasAlumno(data))
      .catch((error) =>
        console.error("Error cargando asignaturas del alumno:", error)
      );
  }, []);

  return (
    <div>
      <h1>Asignaturas del alumno</h1>

      {asignaturasAlumno.length === 0 ? (
        <p>No tienes asignaturas asignadas</p>
      ) : (
        asignaturasAlumno.map((item) => (
          <div key={item.id}>
            <h3>{item.asignatura?.nombre || item.nombre}</h3>
            <p>{item.asignatura?.descripcion || item.descripcion}</p>
            <p>Curso: {item.asignatura?.curso || item.curso}</p>
          </div>
        ))
      )}
    </div>
  );
}
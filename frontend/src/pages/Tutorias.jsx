import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

function Tutorias() {
  const [tutoriaReservada, setTutoriaReservada] = useState(null);

  const profesores = [
    {
      id: 1,
      nombre: "María López",
      asignatura: "Matemáticas",
      horario: "Lunes 10:00 - 11:00",
    },
    {
      id: 2,
      nombre: "Carlos García",
      asignatura: "Historia",
      horario: "Miércoles 12:00 - 13:00",
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      asignatura: "Lengua",
      horario: "Viernes 09:00 - 10:00",
    },
  ];

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

        <section className="tutorias-grid">
          {profesores.map((profesor) => (
            <article className="tutoria-card" key={profesor.id}>
              <h2>{profesor.nombre}</h2>
              <p>
                <strong>Asignatura:</strong> {profesor.asignatura}
              </p>
              <p>
                <strong>Horario:</strong> {profesor.horario}
              </p>

              {tutoriaReservada === profesor.id ? (
                <button
                  className="btn secondary"
                  onClick={() => setTutoriaReservada(null)}
                >
                  Cancelar tutoría
                </button>
              ) : (
                <button
                  className="btn primary"
                  onClick={() => setTutoriaReservada(profesor.id)}
                >
                  Reservar tutoría
                </button>
              )}
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Tutorias;
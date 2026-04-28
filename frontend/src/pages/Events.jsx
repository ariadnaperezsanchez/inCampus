import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

function Events() {
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const eventos = [
    {
      id: 1,
      titulo: "Charla de orientación",
      dia: 8,
      mes: "Enero",
      hora: "10:00",
      lugar: "Aula Magna",
      descripcion: "Sesión informativa para alumnos sobre salidas académicas.",
    },
    {
      id: 2,
      titulo: "Taller de programación",
      dia: 14,
      mes: "Enero",
      hora: "12:00",
      lugar: "Aula 204",
      descripcion: "Taller práctico de introducción a desarrollo web.",
    },
    {
      id: 3,
      titulo: "Reunión de delegados",
      dia: 22,
      mes: "Enero",
      hora: "09:30",
      lugar: "Sala de reuniones",
      descripcion: "Encuentro mensual con representantes de alumnos.",
    },
  ];

  const diasCalendario = Array.from({ length: 31 }, (_, i) => i + 1);

  const obtenerEventoPorDia = (dia) => {
    return eventos.find((evento) => evento.dia === dia);
  };

  return (
    <>
      <Navbar />

      <main className="events-page">
        <section className="events-hero">
          <span className="badge">Eventos académicos</span>
          <h1>Calendario de eventos</h1>
          <p>
            Consulta las actividades, charlas y eventos importantes del centro.
          </p>
        </section>

        <section className="calendar-layout">
          <div className="calendar-card">
            <div className="calendar-header">
              <h2>Enero 2026</h2>
            </div>

            <div className="calendar-weekdays">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mié</span>
              <span>Jue</span>
              <span>Vie</span>
              <span>Sáb</span>
              <span>Dom</span>
            </div>

            <div className="calendar-grid">
              <div className="empty-day"></div>
              <div className="empty-day"></div>
              <div className="empty-day"></div>

              {diasCalendario.map((dia) => {
                const evento = obtenerEventoPorDia(dia);

                return (
                  <button
                    key={dia}
                    className={`calendar-day ${evento ? "has-event" : ""}`}
                    onClick={() => evento && setEventoSeleccionado(evento)}
                  >
                    <span>{dia}</span>
                    {evento && <small>{evento.titulo}</small>}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="event-detail">
            {eventoSeleccionado ? (
              <>
                <h2>{eventoSeleccionado.titulo}</h2>
                <p>
                  <strong>Fecha:</strong> {eventoSeleccionado.dia}{" "}
                  {eventoSeleccionado.mes}
                </p>
                <p>
                  <strong>Hora:</strong> {eventoSeleccionado.hora}
                </p>
                <p>
                  <strong>Lugar:</strong> {eventoSeleccionado.lugar}
                </p>
                <p>{eventoSeleccionado.descripcion}</p>

                <button className="btn primary">Inscribirme</button>
              </>
            ) : (
              <>
                <h2>Selecciona un evento</h2>
                <p>
                  Haz clic en un día marcado del calendario para ver los
                  detalles del evento.
                </p>
              </>
            )}
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Events;
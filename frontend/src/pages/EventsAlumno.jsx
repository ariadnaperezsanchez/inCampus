import { useEffect, useState } from 'react'

function EventsAlumno() {
  const [eventos, setEventos] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const token = localStorage.getItem('token')

        const res = await fetch('http://localhost:3000/eventos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.message || 'Error al cargar eventos')
          return
        }

        setEventos(data)
      } catch (err) {
        console.error(err)
        setError('No se pudo conectar con el servidor')
      } finally {
        setLoading(false)
      }
    }

    cargarEventos()
  }, [])

  if (loading) return <p>Cargando eventos...</p>

  return (
    <main>
      <h1>Eventos</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {eventos.length === 0 ? (
        <p>No hay eventos disponibles</p>
      ) : (
        <ul>
          {eventos.map((evento) => (
            <li key={evento.id}>
              <h3>{evento.titulo}</h3>
              <p>{evento.descripcion}</p>
              <p>
                <strong>Fecha:</strong> {evento.fecha}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default EventsAlumno
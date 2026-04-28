import { useEffect, useState } from 'react'

function Events() {
  const [eventos, setEventos] = useState([])
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fecha, setFecha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const rol = localStorage.getItem('rol')

  const cargarEventos = async () => {
    try {
      setLoading(true)
      setError('')

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

      // 🔥 soporta data.data o data directo
      setEventos(data.data || data)

    } catch (err) {
      console.error(err)
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarEventos()
  }, [])

  const crearEvento = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const token = localStorage.getItem('token')

      const res = await fetch('http://localhost:3000/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          fecha
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Error al crear evento')
        return
      }

      setTitulo('')
      setDescripcion('')
      setFecha('')

      await cargarEventos()

    } catch (err) {
      console.error(err)
      setError('No se pudo conectar con el servidor')
    }
  }

  if (loading) return <p>Cargando eventos...</p>

  return (
    <main>

      <h1>Eventos</h1>

      {/* 🔥 CAMBIO SEGÚN ROL */}
      {rol === 'PROFESOR' && <h2>Panel de profesor</h2>}
      {rol === 'ALUMNO' && <h2>Eventos disponibles</h2>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 🔥 SOLO PROFESOR VE FORMULARIO */}
      {rol === 'PROFESOR' && (
        <section>
          <h2>Crear evento</h2>

          <form onSubmit={crearEvento}>
            <div>
              <label>Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>

            <button type="submit">Crear evento</button>
          </form>
        </section>
      )}

      {/* 🔥 LISTA PARA AMBOS */}
      <section>
        <h2>Eventos</h2>

        {eventos.length === 0 ? (
          <p>No hay eventos disponibles</p>
        ) : (
          <ul>
            {eventos.map((evento) => (
              <li key={evento.id_evento || evento.id}>
                <h3>{evento.titulo}</h3>
                <p>{evento.descripcion}</p>
                <p>
                  <strong>Fecha:</strong> {evento.fecha}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

    </main>
  )
}

export default Events
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      // Si hay error del backend
      if (!res.ok) {
        setError(data.message || 'Error al iniciar sesión')
        return
      }

      // Guardar datos correctamente
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.user))

      // Redirigir
      navigate('/dashboard')

    } catch (err) {
      console.error(err)
      setError('No se pudo conectar con el servidor')
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Iniciar sesión</h1>

        <p>Accede a tu cuenta para gestionar tutorías, eventos y documentos.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>
        </form>

        {/* Mostrar error */}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <Link to="/" className="back-home">
          Volver a inicio
        </Link>
      </section>
    </main>
  )
}

export default Login
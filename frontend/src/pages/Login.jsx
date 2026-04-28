import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      // guardas usuario 
      localStorage.setItem('usuario', JSON.stringify(data.usuario))

      // rediriges al dashboard
      navigate('/dashboard')

    } catch {
      console.error('Error al iniciar sesión')
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
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>

        <Link to="/" className="back-home">
          Volver a inicio
        </Link>
      </section>
    </main>
  )
}

export default Login
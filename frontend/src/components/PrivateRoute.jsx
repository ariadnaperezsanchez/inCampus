import { Navigate } from 'react-router-dom'

// proteger routas privadas
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token') // verificar si el token de autenticación existe en localStorage

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
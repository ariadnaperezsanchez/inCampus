import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Login from './pages/Login'
import Events from './pages/Events'
import Dashboard from './pages/Dashboard'
import Tutorias from './pages/Tutorias'
import Asignatura from './pages/Asignatura'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/events"
          element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }
        />

        <Route
          path="/tutorias"
          element={
            <PrivateRoute>
              <Tutorias />
            </PrivateRoute>
          }
        />

        <Route
          path="/asignatura"
          element={
            <PrivateRoute>
              <Asignatura />
            </PrivateRoute>
          }
        />

        <Route
        path="/mis-tutorias"
        element={
        <PrivateRoute>
        <MisTutorias />
      </PrivateRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
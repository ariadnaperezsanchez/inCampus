import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Login from './pages/Login'
import Events from './pages/Events'
import EventsAlumno from './pages/EventsAlumno'
import Dashboard from './pages/Dashboard'
import Tutorias from './pages/Tutorias'
import MisTutorias from './pages/Mistutorias'
import Asignatura from './pages/Asignatura'
import AsignaturaAlumno from './pages/AsignaturaAlumno'
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
          path="/events-alumno"
          element={
            <PrivateRoute>
              <EventsAlumno />
            </PrivateRoute>
          }
        />

        <Route
          path="/Tutorias"
          element={
            <PrivateRoute>
              <Tutorias />
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

        <Route
          path="/asignatura"
          element={
            <PrivateRoute>
              <Asignatura />
            </PrivateRoute>
          }
        />

        <Route
          path="/asignatura-alumno"
          element={
            <PrivateRoute>
              <AsignaturaAlumno />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
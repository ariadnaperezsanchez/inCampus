import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Login from './pages/Login'
import Events from './pages/Events'
import Dashboard from "./pages/Dashboard";
import Tutorias from "./pages/Tutorias";
import Asignatura from "./pages/Asignatura";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/tutorias" element={<Tutorias />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/asignatura" element={<Asignatura />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
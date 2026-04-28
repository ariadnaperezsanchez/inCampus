import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="navbar">
      <div className="logo">InCampus</div>

      {isHome ? (
        <Link to="/login" className="login-btn">
          Iniciar sesión
        </Link>
      ) : (
        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/events">Eventos</Link>
          <Link to="/tutorias">Tutorías</Link>
          <Link to="/Asignatura">Asignaturas</Link>
          <Link to="/Dashboard">Inicio</Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
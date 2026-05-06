import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <header className="navbar">
      <Link to={token ? "/dashboard" : "/"} className="logo">
        <span className="logo-in">In</span>
        <span className="logo-campus">Campus</span>
      </Link>

      {!token ? (
        <Link to="/login" className="login-btn">
          Iniciar sesión
        </Link>
      ) : (
        <nav className="nav-links">
          <Link to="/dashboard">Inicio</Link>
          <Link to="/events">Eventos</Link>
          <Link to="/tutorias">Tutorías</Link>
          <Link to="/asignatura">Asignaturas</Link>

          <button
          className="logout-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Cerrar sesión
          </button>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
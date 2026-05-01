import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <header className="navbar">
     <div className="logo">
  <span className="logo-in">In</span>
  <span className="logo-campus">Campus</span>
</div>
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
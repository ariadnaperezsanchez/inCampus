import dashboardImg from "../assets/dashboard1.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const usuarioGuardado = localStorage.getItem("usuario");
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <section className="dashboard-header">
          <span>
            Bienvenida, {usuario.nombre || usuario.email || "usuario"}
          </span>

          <h1>Tu lugar en InCampus</h1>
          <h2>Organiza tu vida académica de forma sencilla</h2>

          <p>
            Accede a tus tutorías, eventos y recursos académicos de forma rápida
            y sencilla.
          </p>

          <button onClick={handleLogout}>Cerrar sesión</button>
        </section>

        <section className="dashboard-grid">
          <Link to="/Tutorias" className="dashboard-card">
            <h2>Tutorías</h2>
            <p>Reserva o consulta tus próximas tutorías.</p>
          </Link>

          <Link to="/Mis-tutorias" className="dashboard-card">
            <h2>Mis tutorías</h2>
            <p>Consulta tus tutorías reservadas.</p>
          </Link>

          <Link to="/events" className="dashboard-card">
            <h2>Eventos</h2>
            <p>Consulta el calendario académico e inscríbete.</p>
          </Link>

          <Link to="/Asignatura" className="dashboard-card">
            <h2>Asignaturas</h2>
            <p>Gestiona tus asignaturas y mantente al día.</p>
          </Link>
        </section>

        <section className="dashboard-footer">
          <h3>Sigue construyendo tu futuro en InCampus</h3>
        </section>

        <div className="img-container">
          <img src={dashboardImg} alt="Dashboard" className="dashboard-img" />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;
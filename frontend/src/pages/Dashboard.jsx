import dashboardImg from "../assets/dashboard1.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Dashboard() {
  const USUARIO = {
    nombre: "Ariadna",
    rol: "Alumno",
  };

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
      <section className="dashboard-header">
  <span>Bienvenida, Ariadna</span>

  <h1>Tu lugar en InCampus</h1>
  <h2>Organiza tu vida académica de forma sencilla</h2>

  <p>
    Accede a tus tutorías, eventos y recursos académicos de forma rápida y sencilla.
  </p>
</section>

        <section className="dashboard-grid">
          <Link to="/tutorias" className="dashboard-card">
            <h2>Tutorías</h2>
            <p>Reserva o consulta tus próximas tutorías.</p>
          </Link>

          <Link to="/events" className="dashboard-card">
            <h2>Eventos</h2>
            <p>Consulta el calendario académico e inscríbete.</p>
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
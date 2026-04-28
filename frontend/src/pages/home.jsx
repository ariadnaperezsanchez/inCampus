import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import home from '../assets/home.jpg' 

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />

      <main className="home">
        <section className="hero">
          <div className="hero-content">
            <span className="badge">Plataforma educativa</span>

            <h1>Organiza la vida académica de tu centro con InCampus</h1>

            <p>
              InCampus centraliza tutorías, eventos, anuncios y documentos
              académicos en una única plataforma para toda la comunidad educativa.
            </p>

            <div className="hero-actions">
              <button
                className="btn primary"
                onClick={() => navigate('/login')}
              >
                Iniciar sesión
              </button>

              <button
                className="btn secondary"
                onClick={() => navigate('/contact')} /*crear ruta de contacto*/
              >
                Contáctanos
              </button>
            </div>
          </div>

          <div className="hero-card">
            <h2>¿Qué puedes hacer en InCampus?</h2>

            <ul>
              <li>Reservar tutorías con el profesorado</li>
              <li>Consultar eventos del centro</li>
              <li>Leer anuncios importantes</li>
              <li>Acceder a documentos académicos</li>
            </ul>
          </div>
        </section>
        <img src={home} alt="Home" className="home-img" />
        </main>
<Footer />
</>
  )
}

export default Home
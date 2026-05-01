import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'


function Home() {
  const navigate = useNavigate()

  return (
    <>

      <main className="home">
        <section className="hero">
          <div className="hero-content">
            <span className="badge">Plataforma educativa</span>

            <h1>Organiza la vida académica de tu centro con InCampus</h1>

            <p>
              InCampus centraliza tutorías, eventos, anuncios y documentos
              académicos en una única plataforma para toda la comunidad educativa.
            </p>
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
        </main>
<Footer />
</>
  )
}

export default Home
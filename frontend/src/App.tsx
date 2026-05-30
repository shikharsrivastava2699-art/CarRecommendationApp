import './App.css'
import heroImg from './assets/hero.png'
import Quiz from './components/Quiz'
import Header from './components/Header'
import CarDetailPage from './components/CarDetailPage'
import { Routes, Route, useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div id="app-root">
      <main id="home">
        <section className="landing">
          <div className="landing-card">
            <img src={heroImg} alt="cars" className="hero-img" />
            <h1 className="title">Find the Best Car for You</h1>
            <p className="subtitle">Take a short quiz and get tailored car recommendations.</p>
            <div className="actions">
              <button className="primary" onClick={() => navigate('/quiz')}>
                Start Recommendation Quiz
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
      </Routes>
    </>
  )
}

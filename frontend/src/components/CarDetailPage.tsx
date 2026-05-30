import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ICar } from '../interfaces/Car'
import { getCarInfoById } from '../services/carService'

export default function CarDetailPage() {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const carId = params.id ? Number(params.id) : NaN

  const [car, setCar] = useState<ICar | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (Number.isNaN(carId)) {
      setError('Invalid car id')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    getCarInfoById(carId)
      .then(result => {
        if (!result) {
          setError('Car not found')
        } else {
          setCar(result)
        }
      })
      .catch(() => {
        setError('Unable to load car details.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [carId])

  return (
    <div className="quiz-root">
      <header className="quiz-header">
        <button className="secondary" onClick={() => navigate(-1)}>
          Back
        </button>
        <h2>Car Details</h2>
      </header>

      <section className="quiz-body">
        {loading ? (
          <div className="quiz-step">
            <h3>Loading car details...</h3>
          </div>
        ) : error ? (
          <div className="quiz-step">
            <h3>{error}</h3>
            <p>Please go back and try another selection.</p>
          </div>
        ) : car ? (
          <div className="car-detail-page">
            <div className="car-detail-card">
              <img className="car-detail-image" src={car.imageUrl} alt={car.name} />
              <header className="car-detail-header">
                <div>
                  <h3>{car.name}</h3>
                  <p className="muted">Ex-showroom price: ₹{car.exShowroomPrice} Lakh</p>
                </div>
                <div className="car-badge">ID {car.id}</div>
              </header>

              <div className="car-detail-info">
                <div>
                  <strong>Hybrid</strong>
                  <p>{car.hybrid ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <strong>Safety Rating</strong>
                  <p>{car.safetyRating} / 5</p>
                </div>
                <div>
                  <strong>Color variants</strong>
                  <p>{car.colorVariantsAvailable.join(', ')}</p>
                </div>
              </div>

              <div className="car-detail-description">
                <strong>Description</strong>
                <p>{car.description}</p>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}

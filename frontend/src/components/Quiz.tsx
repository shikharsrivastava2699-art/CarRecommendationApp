import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CarInfoCard from './CarInfoCard'
import { fetchRecommendation } from '../services/quizService'
import type { QuizAnswers, Recommendation, StepDefinition } from '../interfaces/Quiz'

type Props = {
  onClose?: () => void
}

const steps: StepDefinition[] = [
  {
    key: 'use',
    question: "What's your primary use for the car?",
    options: [
      { label: 'Daily commute', value: 'commute' },
      { label: 'Family / spacious', value: 'family' },
      { label: 'Weekend fun', value: 'weekend' },
    ],
  },
  {
    key: 'goal',
    question: 'What is your main goal?',
    options: [
      { label: 'Fuel mileage', value: 'mileage' },
      { label: 'Lowest running cost', value: 'economy' },
      { label: 'Strong resale value', value: 'resale' },
      { label: 'Comfort & luxury', value: 'comfort' },
      { label: 'Performance', value: 'performance' },
    ],
  },
  {
    key: 'mode',
    question: 'Preferred transmission mode?',
    options: [
      { label: 'Automatic', value: 'automatic' },
      { label: 'Manual', value: 'manual' },
    ],
  },
  {
    key: 'sunroof',
    question: 'Do you want a sunroof?',
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
  {
    key: 'budget',
    question: 'What is your budget? (in lakhs)',
    options: [
      { label: 'Under ₹10 Lakh', value: '<10' },
      { label: '₹10 - ₹20 Lakh', value: '10-20' },
      { label: '₹20 - ₹35 Lakh', value: '20-35' },
      { label: 'Above ₹35 Lakh', value: '>35' },
    ],
  },
]

export default function Quiz({ onClose }: Props) {
  const navigate = useNavigate()
  const close = onClose ?? (() => navigate('/'))

  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    if (step <= steps.length) {
      return () => {
        active = false
      }
    }

    setLoading(true)
    setError(null)

    fetchRecommendation(answers)
      .then(rec => {
        if (!active) return
        setRecommendation(rec)
      })
      .catch(() => {
        if (!active) return
        setError('Unable to load recommendation. Please try again.')
      })
      .finally(() => {
        if (!active) return
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [step, answers])

  function handleAnswer(key: string, value: string) {
    setAnswers(prev => ({ ...prev, [key]: value }))
    setStep(s => Math.min(steps.length + 1, s + 1))
  }

  function handleSkip() {
    setStep(s => Math.min(steps.length + 1, s + 1))
  }

  function handleCarSelect(id: number) {
    navigate(`/car/${id}`)
  }

  const currentQuestion = steps[step - 1]
  const progress = Math.round(((step - 1) / steps.length) * 100)

  return (
    <div className="quiz-root">
      <header className="quiz-header">
        <button className="secondary" onClick={close}>
          Back
        </button>
        <h2>Recommendation Quiz</h2>
      </header>

      <section className="quiz-progress">
        <span>
          Step {Math.min(step, steps.length)} / {steps.length}
        </span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className="quiz-body">
        {step <= steps.length ? (
          <div className="quiz-step">
            <h3>{currentQuestion.question}</h3>
            <div className="options">
              {currentQuestion.options.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.key, option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-step">
            <h3>Your Recommendation</h3>
            {loading ? (
              <div className="recommendation-card">
                <p>Loading recommendation...</p>
              </div>
            ) : error ? (
              <div className="recommendation-card">
                <p>{error}</p>
              </div>
            ) : recommendation ? (
              <div className="recommendation-card" role="region" aria-label="Recommendation">
                <div className="recommendation-inline">
                  <div className="recommendation-badge">
                    {recommendation.title
                      .split(' ')
                      .map(word => word[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div>
                    <h4>{recommendation.title}</h4>
                    <p>{recommendation.description}</p>
                  </div>
                </div>

                {recommendation.examples.length > 0 ? (
                  <div className="car-list">
                    <strong>Example cars</strong>
                    <div className="car-list-grid">
                      {recommendation.examples.map(car => (
                        <CarInfoCard key={car.id} car={car} onSelect={handleCarSelect} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="recommendation-card">
                    <p>No matching cars are available from the current recommendation.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="recommendation-card">
                <p>No recommendation available.</p>
              </div>
            )}

            <div className="options">
              <button className="primary" onClick={close}>Finish</button>
            </div>
          </div>
        )}
      </section>

      <footer className="quiz-footer">
        <div className="pager">
          {step > 1 && step <= steps.length + 1 && (
            <button onClick={() => setStep(s => Math.max(1, s - 1))}>Previous</button>
          )}
          {step <= steps.length && (
            <button className="secondary" onClick={handleSkip}>
              Skip
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}

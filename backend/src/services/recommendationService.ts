import type { QuizAnswers, Recommendation } from '../interfaces/Quiz'
import { getAllCars } from './carService'

function includesAny(value: string, terms: string[]) {
  const normalized = value.toLowerCase()
  return terms.some(term => normalized.includes(term.toLowerCase()))
}

function matchesBudget(car: { exShowroomPrice: number }, budget?: string) {
  if (!budget) return true
  if (budget === '<10') return car.exShowroomPrice <= 10
  if (budget === '10-20') return car.exShowroomPrice > 10 && car.exShowroomPrice <= 20
  if (budget === '20-35') return car.exShowroomPrice > 20 && car.exShowroomPrice <= 35
  if (budget === '>35') return car.exShowroomPrice > 35
  return true
}

function matchesUse(car: { name: string; exShowroomPrice: number }, use?: string) {
  if (!use) return true

  if (use === 'commute') {
    const familyModels = ['Ertiga', 'Carens', 'Alcazar', 'Innova', 'Creta']
    return car.exShowroomPrice <= 13 && !includesAny(car.name, familyModels)
  }

  if (use === 'family') {
    const familyModels = ['Ertiga', 'Carens', 'Alcazar', 'Innova', 'Creta']
    return includesAny(car.name, familyModels) || car.exShowroomPrice >= 13
  }

  if (use === 'weekend') {
    const sportModels = ['Venue', 'Nexon', 'XUV300', 'Polo GT', 'Slavia', 'i20 N Line']
    return includesAny(car.name, sportModels)
  }

  return true
}

function matchesGoal(car: { name: string; hybrid: boolean; exShowroomPrice: number; safetyRating: number }, goal?: string) {
  if (!goal) return true

  if (goal === 'mileage' || goal === 'economy') {
    return car.hybrid || car.exShowroomPrice <= 12
  }

  if (goal === 'resale') {
    const reliableBrands = ['Toyota', 'Maruti', 'Hyundai', 'Tata']
    return includesAny(car.name, reliableBrands)
  }

  if (goal === 'performance') {
    const performanceModels = ['GT', 'N Line', 'XUV300', 'Polo', 'Slavia']
    return includesAny(car.name, performanceModels) || car.exShowroomPrice >= 11
  }

  if (goal === 'comfort') {
    return car.safetyRating >= 4 && car.exShowroomPrice >= 13
  }

  return true
}

export function computeRecommendation(answers: QuizAnswers): Recommendation {
  const use = answers.use
  const goal = answers.goal
  const budget = answers.budget
  const sunroof = answers.sunroof === 'true'
  const mode = answers.mode

  const allCars = getAllCars()
  const filteredCars = allCars.filter(
    car => matchesBudget(car, budget) && matchesUse(car, use) && matchesGoal(car, goal)
  )

  let title = 'Versatile Choice'
  let description = 'A good option based on the details you shared.'

  if (use === 'commute') {
    title = 'Daily Commuter'
    description = 'A reliable, efficient car for everyday city travel.'
  }

  if (use === 'family') {
    title = 'Family-Friendly Ride'
    description = 'A spacious car with the comfort and safety features families need.'
  }

  if (use === 'weekend') {
    title = 'Weekend Fun'
    description = 'A sporty or stylish car for enjoyable weekend drives.'
  }

  if (goal === 'mileage' || goal === 'economy') {
    title = 'Mileage-Focused Choice'
    description = 'Prioritize a high-efficiency model with low fuel consumption.'
  }

  if (goal === 'resale') {
    title = 'Resale Value Winner'
    description = 'A reliable brand with strong retention and low depreciation.'
  }

  if (goal === 'performance') {
    title = 'Performance-Oriented'
    description = 'A more exciting drive with a sharper engine and handling.'
  }

  if (goal === 'comfort') {
    title = 'Comfort & Luxury'
    description = 'A roomy and premium-feel car for a refined travel experience.'
  }

  if (mode === 'manual') {
    description += ' Manual transmission is available for a more engaging drive.'
  }

  if (sunroof) {
    description += ' A sunroof adds premium appeal and extra comfort.'
  }

  if (budget === '<10') {
    description += ' Great value in the sub-₹10 lakh range.'
  }
  if (budget === '10-20') {
    description += ' Strong options are available between ₹10 and ₹20 lakhs.'
  }
  if (budget === '20-35') {
    description += ' Premium hatchbacks and compact SUVs work well in this range.'
  }
  if (budget === '>35') {
    description += ' You can choose from luxury and high-end models in this budget.'
  }

  const examples = filteredCars.length > 0 ? filteredCars.slice(0, 6) : allCars.slice(0, 6)

  return {
    title,
    description,
    examples,
  }
}

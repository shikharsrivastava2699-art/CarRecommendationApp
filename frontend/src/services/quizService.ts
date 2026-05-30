import axios from 'axios'
import type { QuizAnswers, Recommendation } from '../interfaces/Quiz'

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5000'
const api = axios.create({ baseURL: API_BASE })

export async function fetchRecommendation(answers: QuizAnswers): Promise<Recommendation> {
  const response = await api.get<Recommendation>('/api/recommendations', {
    params: answers,
  })
  return response.data
}

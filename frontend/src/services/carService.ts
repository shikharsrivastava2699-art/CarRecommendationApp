import axios from 'axios'
import type { ICar } from '../interfaces/Car'

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5000'
const api = axios.create({ baseURL: API_BASE })

export async function getAllCars(): Promise<ICar[]> {
  const response = await api.get<ICar[]>('/api/cars')
  return response.data
}

export async function getCarInfoById(id: number): Promise<ICar | null> {
  try {
    const response = await api.get<ICar>(`/api/cars/${id}`)
    return response.data
  } catch (error) {
    return null
  }
}

export async function getCarsByIds(ids: number[]): Promise<ICar[]> {
  const response = await api.get<ICar[]>('/api/cars', {
    params: { ids: ids.join(',') },
  })
  return response.data
}

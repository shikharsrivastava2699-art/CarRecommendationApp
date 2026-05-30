import type { ICar } from '../interfaces/Car'
import { cars } from '../data/cars'

export function getAllCars(): ICar[] {
  return cars
}

export function getCarById(id: number): ICar | null {
  return cars.find(car => car.id === id) ?? null
}

export function getCarsByIds(ids: number[]): ICar[] {
  return cars.filter(car => ids.includes(car.id))
}

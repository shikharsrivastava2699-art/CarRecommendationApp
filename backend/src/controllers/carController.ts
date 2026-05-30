import { Router } from 'express'
import { getAllCars, getCarById, getCarsByIds } from '../services/carService'

const router = Router()

router.get('/cars', (req, res) => {
  const idsQuery = req.query.ids

  if (typeof idsQuery === 'string' && idsQuery.trim()) {
    const ids = idsQuery
      .split(',')
      .map(item => Number(item.trim()))
      .filter(id => !Number.isNaN(id))

    return res.json(getCarsByIds(ids))
  }

  res.json(getAllCars())
})

router.get('/cars/:id', (req, res) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid car ID' })
  }

  const car = getCarById(id)

  if (!car) {
    return res.status(404).json({ error: 'Car not found' })
  }

  res.json(car)
})

export default router

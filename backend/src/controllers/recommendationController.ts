import { Router } from 'express'
import { computeRecommendation } from '../services/recommendationService'

const router = Router()

router.get('/recommendations', (req, res) => {
  const recommendation = computeRecommendation({
    use: typeof req.query.use === 'string' ? req.query.use : undefined,
    goal: typeof req.query.goal === 'string' ? req.query.goal : undefined,
    budget: typeof req.query.budget === 'string' ? req.query.budget : undefined,
    sunroof: typeof req.query.sunroof === 'string' ? req.query.sunroof : undefined,
    mode: typeof req.query.mode === 'string' ? req.query.mode : undefined,
  })

  res.json(recommendation)
})

export default router

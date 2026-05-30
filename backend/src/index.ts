import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import carRouter from './controllers/carController'
import recommendationRouter from './controllers/recommendationController'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.get('/', (_req, res) => {
  res.send('Backend running with TypeScript 🚀')
})

app.use('/api', carRouter)
app.use('/api', recommendationRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
  
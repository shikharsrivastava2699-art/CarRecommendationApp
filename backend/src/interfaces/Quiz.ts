import type { ICar } from './Car'

export type QuizAnswers = {
  use?: string
  goal?: string
  budget?: string
  sunroof?: string
  mode?: string
}

export type Recommendation = {
  title: string
  description: string
  examples: ICar[]
}

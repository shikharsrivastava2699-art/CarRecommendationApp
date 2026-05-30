import type { ICar } from './Car'

export type QuizAnswerOption = {
  label: string
  value: string
}

export type StepDefinition = {
  key: string
  question: string
  options: QuizAnswerOption[]
}

export type QuizAnswers = Record<string, string>

export type Recommendation = {
  title: string
  description: string
  examples: ICar[]
}

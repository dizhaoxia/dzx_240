export type GameState = "idle" | "playing" | "gameOver"

export interface Question {
  id: number
  question: string
  options: string[]
  answer: string
  difficulty: 1 | 2 | 3
}

export interface GameData {
  state: GameState
  questions: Question[]
  currentIndex: number
  score: number
  correctCount: number
  currentLevel: number
  timeLeft: number
  maxTime: number
  answered: boolean
  selectedAnswer: string | null
  isCorrect: boolean | null
  showLevelComplete: boolean
}

export type GameAction =
  | { type: "START_GAME"; payload: Question[] }
  | { type: "ANSWER_QUESTION"; payload: string }
  | { type: "TIME_UP" }
  | { type: "NEXT_QUESTION" }
  | { type: "CONTINUE_NEXT_LEVEL" }
  | { type: "RESTART_GAME" }
  | { type: "TICK" }

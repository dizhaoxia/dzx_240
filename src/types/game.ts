export type GameState = "idle" | "playing" | "levelComplete" | "gameOver"

export interface Question {
  id: number
  question: string
  options: string[]
  answer: string
  difficulty: 1 | 2 | 3
}

export interface ScoreBreakdown {
  base: number
  combo: number
  timeBonus: number
  levelMultiplier: number
  total: number
}

export interface GameData {
  state: GameState
  questions: Question[]
  currentIndex: number
  score: number
  correctCount: number
  levelCorrectCount: number
  currentLevel: number
  timeLeft: number
  maxTime: number
  answered: boolean
  selectedAnswer: string | null
  isCorrect: boolean | null
  combo: number
  maxCombo: number
  lastScoreBreakdown: ScoreBreakdown | null
}

export type GameAction =
  | { type: "START_GAME"; payload: Question[] }
  | { type: "ANSWER_QUESTION"; payload: string }
  | { type: "TIME_UP" }
  | { type: "NEXT_QUESTION" }
  | { type: "COMPLETE_LEVEL" }
  | { type: "NEXT_LEVEL" }
  | { type: "RESTART_GAME" }
  | { type: "TICK" }

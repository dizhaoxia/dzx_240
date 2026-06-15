import type { GameData, GameAction } from "@/types/game"
import {
  QUESTIONS_PER_LEVEL,
  TOTAL_LEVELS,
  TIME_PER_QUESTION,
  POINTS_PER_CORRECT,
} from "@/data/questions"

const initialState: GameData = {
  state: "idle",
  questions: [],
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  currentLevel: 1,
  timeLeft: TIME_PER_QUESTION,
  maxTime: TIME_PER_QUESTION,
  answered: false,
  selectedAnswer: null,
  isCorrect: null,
  showLevelComplete: false,
}

function isLevelEnd(index: number): boolean {
  return (index + 1) % QUESTIONS_PER_LEVEL === 0
}

function isLastLevel(level: number): boolean {
  return level >= TOTAL_LEVELS
}

export function gameReducer(state: GameData, action: GameAction): GameData {
  switch (action.type) {
    case "START_GAME":
      return {
        ...initialState,
        state: "playing",
        questions: action.payload,
      }

    case "ANSWER_QUESTION": {
      if (state.answered || state.state !== "playing" || state.showLevelComplete)
        return state

      const currentQuestion = state.questions[state.currentIndex]
      const isCorrect = currentQuestion.answer === action.payload
      const newScore = isCorrect ? state.score + POINTS_PER_CORRECT : state.score
      const newCorrectCount = isCorrect
        ? state.correctCount + 1
        : state.correctCount

      return {
        ...state,
        answered: true,
        selectedAnswer: action.payload,
        isCorrect,
        score: newScore,
        correctCount: newCorrectCount,
      }
    }

    case "TIME_UP": {
      if (state.answered || state.state !== "playing" || state.showLevelComplete)
        return state

      return {
        ...state,
        answered: true,
        selectedAnswer: null,
        isCorrect: false,
        timeLeft: 0,
      }
    }

    case "NEXT_QUESTION": {
      if (!state.answered || state.state !== "playing") return state
      if (state.showLevelComplete) return state

      const isLastQuestion = state.currentIndex >= state.questions.length - 1
      if (isLastQuestion) {
        return { ...state, state: "gameOver" }
      }

      const levelEnd = isLevelEnd(state.currentIndex)
      if (levelEnd && !isLastLevel(state.currentLevel)) {
        return { ...state, showLevelComplete: true }
      }

      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        timeLeft: TIME_PER_QUESTION,
        answered: false,
        selectedAnswer: null,
        isCorrect: null,
      }
    }

    case "CONTINUE_NEXT_LEVEL": {
      if (!state.showLevelComplete || state.state !== "playing") return state

      const nextLevel = state.currentLevel + 1

      return {
        ...state,
        currentLevel: nextLevel,
        currentIndex: state.currentIndex + 1,
        timeLeft: TIME_PER_QUESTION,
        answered: false,
        selectedAnswer: null,
        isCorrect: null,
        showLevelComplete: false,
      }
    }

    case "TICK": {
      if (state.answered || state.state !== "playing" || state.showLevelComplete)
        return state
      if (state.timeLeft <= 1) {
        return { ...state, timeLeft: 0 }
      }
      return { ...state, timeLeft: state.timeLeft - 1 }
    }

    case "RESTART_GAME":
      return { ...initialState }

    default:
      return state
  }
}

export { initialState }

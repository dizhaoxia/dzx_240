import type { GameData, GameAction, ScoreBreakdown } from "@/types/game"
import {
  QUESTIONS_PER_LEVEL,
  TOTAL_LEVELS,
  getLevelTimeLimit,
  getLevelMultiplier,
  POINTS_PER_CORRECT,
} from "@/data/questions"

const initialState: GameData = {
  state: "idle",
  questions: [],
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  levelCorrectCount: 0,
  currentLevel: 1,
  timeLeft: getLevelTimeLimit(1),
  maxTime: getLevelTimeLimit(1),
  answered: false,
  selectedAnswer: null,
  isCorrect: null,
  combo: 0,
  maxCombo: 0,
  lastScoreBreakdown: null,
}

function isLevelEnd(index: number): boolean {
  return (index + 1) % QUESTIONS_PER_LEVEL === 0
}

function isLastLevel(level: number): boolean {
  return level >= TOTAL_LEVELS
}

function calculateScore(
  isCorrect: boolean,
  combo: number,
  currentLevel: number,
  timeLeft: number,
  maxTime: number
): { newCombo: number; breakdown: ScoreBreakdown | null } {
  if (!isCorrect) {
    return { newCombo: 0, breakdown: null }
  }

  const newCombo = combo + 1
  const base = POINTS_PER_CORRECT
  const comboBonus = Math.min((newCombo - 1) * 2, 10)
  const timeBonus = Math.floor(timeLeft * (maxTime > 0 ? 1 : 0))
  const levelMultiplier = getLevelMultiplier(currentLevel)
  const total = Math.floor((base + comboBonus + timeBonus) * levelMultiplier)

  return {
    newCombo,
    breakdown: {
      base,
      combo: comboBonus,
      timeBonus,
      levelMultiplier,
      total,
    },
  }
}

export function gameReducer(state: GameData, action: GameAction): GameData {
  switch (action.type) {
    case "START_GAME":
      return {
        ...initialState,
        state: "playing",
        questions: action.payload,
        timeLeft: getLevelTimeLimit(1),
        maxTime: getLevelTimeLimit(1),
      }

    case "ANSWER_QUESTION": {
      if (state.answered || state.state !== "playing") return state

      const currentQuestion = state.questions[state.currentIndex]
      const isCorrect = currentQuestion.answer === action.payload
      const { newCombo, breakdown } = calculateScore(
        isCorrect,
        state.combo,
        state.currentLevel,
        state.timeLeft,
        state.maxTime
      )
      const newScore = isCorrect
        ? state.score + (breakdown?.total ?? 0)
        : state.score
      const newCorrectCount = isCorrect
        ? state.correctCount + 1
        : state.correctCount
      const newLevelCorrectCount = isCorrect
        ? state.levelCorrectCount + 1
        : state.levelCorrectCount
      const newMaxCombo = Math.max(state.maxCombo, newCombo)

      return {
        ...state,
        answered: true,
        selectedAnswer: action.payload,
        isCorrect,
        score: newScore,
        correctCount: newCorrectCount,
        levelCorrectCount: newLevelCorrectCount,
        combo: newCombo,
        maxCombo: newMaxCombo,
        lastScoreBreakdown: breakdown,
      }
    }

    case "TIME_UP": {
      if (state.answered || state.state !== "playing") return state

      return {
        ...state,
        answered: true,
        selectedAnswer: null,
        isCorrect: false,
        timeLeft: 0,
        combo: 0,
        lastScoreBreakdown: null,
      }
    }

    case "NEXT_QUESTION": {
      if (!state.answered || state.state !== "playing") return state
      if (isLevelEnd(state.currentIndex)) return state

      const nextLevel = Math.floor((state.currentIndex + 1) / QUESTIONS_PER_LEVEL) + 1
      const newTime = getLevelTimeLimit(nextLevel)

      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        timeLeft: newTime,
        maxTime: newTime,
        answered: false,
        selectedAnswer: null,
        isCorrect: null,
        lastScoreBreakdown: null,
      }
    }

    case "COMPLETE_LEVEL": {
      if (!state.answered || state.state !== "playing") return state
      if (!isLevelEnd(state.currentIndex)) return state

      if (isLastLevel(state.currentLevel)) {
        return { ...state, state: "gameOver" }
      }

      return { ...state, state: "levelComplete" }
    }

    case "NEXT_LEVEL": {
      if (state.state !== "levelComplete") return state

      const nextLevel = state.currentLevel + 1
      const newTime = getLevelTimeLimit(nextLevel)

      return {
        ...state,
        state: "playing",
        currentLevel: nextLevel,
        currentIndex: state.currentIndex + 1,
        timeLeft: newTime,
        maxTime: newTime,
        answered: false,
        selectedAnswer: null,
        isCorrect: null,
        levelCorrectCount: 0,
        lastScoreBreakdown: null,
      }
    }

    case "TICK": {
      if (state.answered || state.state !== "playing") return state
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

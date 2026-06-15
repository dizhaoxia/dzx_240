import { useCallback, useEffect, useRef } from "react"
import { useReducer } from "react"
import { gameReducer, initialState } from "./useGameReducer"
import { getRandomQuestions } from "@/data/questions"

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const clearFeedbackTimer = useCallback(() => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current)
      feedbackTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (
      state.state === "playing" &&
      !state.answered &&
      !state.showLevelComplete
    ) {
      clearTimer()
      timerRef.current = setInterval(() => {
        dispatch({ type: "TICK" })
      }, 1000)
    } else {
      clearTimer()
    }
    return clearTimer
  }, [state.state, state.answered, state.showLevelComplete, clearTimer])

  useEffect(() => {
    if (
      state.state === "playing" &&
      !state.answered &&
      !state.showLevelComplete &&
      state.timeLeft <= 0
    ) {
      dispatch({ type: "TIME_UP" })
    }
  }, [state.timeLeft, state.state, state.answered, state.showLevelComplete])

  useEffect(() => {
    if (state.answered && state.state === "playing" && !state.showLevelComplete) {
      clearFeedbackTimer()
      feedbackTimerRef.current = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" })
      }, 1500)
    }
    return clearFeedbackTimer
  }, [state.answered, state.state, state.showLevelComplete, clearFeedbackTimer])

  const startGame = useCallback(() => {
    const questions = getRandomQuestions()
    dispatch({ type: "START_GAME", payload: questions })
  }, [])

  const answerQuestion = useCallback(
    (answer: string) => {
      if (state.answered || state.showLevelComplete) return
      dispatch({ type: "ANSWER_QUESTION", payload: answer })
    },
    [state.answered, state.showLevelComplete]
  )

  const continueNextLevel = useCallback(() => {
    dispatch({ type: "CONTINUE_NEXT_LEVEL" })
  }, [])

  const restartGame = useCallback(() => {
    clearFeedbackTimer()
    clearTimer()
    dispatch({ type: "RESTART_GAME" })
  }, [clearFeedbackTimer, clearTimer])

  return {
    state,
    startGame,
    answerQuestion,
    continueNextLevel,
    restartGame,
  }
}

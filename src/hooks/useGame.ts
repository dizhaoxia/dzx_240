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
    if (state.state === "playing" && !state.answered) {
      clearTimer()
      timerRef.current = setInterval(() => {
        dispatch({ type: "TICK" })
      }, 1000)
    } else {
      clearTimer()
    }
    return clearTimer
  }, [state.state, state.answered, clearTimer])

  useEffect(() => {
    if (state.state === "playing" && !state.answered && state.timeLeft <= 0) {
      dispatch({ type: "TIME_UP" })
    }
  }, [state.timeLeft, state.state, state.answered])

  useEffect(() => {
    if (state.answered && state.state === "playing") {
      clearFeedbackTimer()
      feedbackTimerRef.current = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" })
        dispatch({ type: "COMPLETE_LEVEL" })
      }, 1500)
    }
    return clearFeedbackTimer
  }, [state.answered, state.state, clearFeedbackTimer])

  const startGame = useCallback(() => {
    const questions = getRandomQuestions()
    dispatch({ type: "START_GAME", payload: questions })
  }, [])

  const answerQuestion = useCallback(
    (answer: string) => {
      if (state.answered) return
      dispatch({ type: "ANSWER_QUESTION", payload: answer })
    },
    [state.answered]
  )

  const nextLevel = useCallback(() => {
    dispatch({ type: "NEXT_LEVEL" })
  }, [])

  const restartGame = useCallback(() => {
    clearFeedbackTimer()
    dispatch({ type: "RESTART_GAME" })
  }, [clearFeedbackTimer])

  return {
    state,
    startGame,
    answerQuestion,
    nextLevel,
    restartGame,
  }
}

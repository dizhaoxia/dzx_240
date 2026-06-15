import { useGame } from "@/hooks/useGame"
import StarBackground from "@/components/StarBackground"
import StartScreen from "@/components/StartScreen"
import PlayingScreen from "@/components/PlayingScreen"
import GameOverScreen from "@/components/GameOverScreen"

export default function Home() {
  const { state, startGame, answerQuestion, continueNextLevel, restartGame } =
    useGame()

  return (
    <div className="relative min-h-screen bg-cosmic-900 font-body">
      <StarBackground />

      <div className="relative z-10">
        {state.state === "idle" && <StartScreen onStart={startGame} />}

        {state.state === "playing" && (
          <PlayingScreen
            state={state}
            onAnswer={answerQuestion}
            onContinueNextLevel={continueNextLevel}
          />
        )}

        {state.state === "gameOver" && (
          <GameOverScreen state={state} onRestart={restartGame} />
        )}
      </div>
    </div>
  )
}

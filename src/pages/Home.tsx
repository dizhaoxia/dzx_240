import { useGame } from "@/hooks/useGame"
import StarBackground from "@/components/StarBackground"
import StartScreen from "@/components/StartScreen"
import PlayingScreen from "@/components/PlayingScreen"
import LevelComplete from "@/components/LevelComplete"
import GameOverScreen from "@/components/GameOverScreen"

export default function Home() {
  const { state, startGame, answerQuestion, nextLevel, restartGame } = useGame()

  return (
    <div className="relative min-h-screen bg-cosmic-900 font-body">
      <StarBackground />

      <div className="relative z-10">
        {state.state === "idle" && <StartScreen onStart={startGame} />}

        {state.state === "playing" && (
          <PlayingScreen state={state} onAnswer={answerQuestion} />
        )}

        {state.state === "levelComplete" && (
          <LevelComplete
            level={state.currentLevel}
            score={state.score}
            correctInLevel={state.levelCorrectCount}
            combo={state.combo}
            maxCombo={state.maxCombo}
            onNextLevel={nextLevel}
          />
        )}

        {state.state === "gameOver" && (
          <GameOverScreen state={state} onRestart={restartGame} />
        )}
      </div>
    </div>
  )
}

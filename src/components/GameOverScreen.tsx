import { RotateCcw, Trophy, Star } from "lucide-react"
import type { GameData } from "@/types/game"
import { TOTAL_QUESTIONS } from "@/data/questions"

interface GameOverScreenProps {
  state: GameData
  onRestart: () => void
}

function getGrade(score: number): {
  label: string
  color: string
  stars: number
} {
  const maxPossibleScore = TOTAL_QUESTIONS * 10
  const ratio = score / maxPossibleScore
  if (ratio >= 0.8)
    return { label: "天才大师", color: "text-neon-cyan neon-text-cyan", stars: 5 }
  if (ratio >= 0.6)
    return { label: "智慧达人", color: "text-neon-purple", stars: 4 }
  if (ratio >= 0.4)
    return { label: "思维能手", color: "text-neon-orange", stars: 3 }
  if (ratio >= 0.2)
    return { label: "初级挑战者", color: "text-yellow-400", stars: 2 }
  return { label: "继续加油", color: "text-gray-400", stars: 1 }
}

export default function GameOverScreen({
  state,
  onRestart,
}: GameOverScreenProps) {
  const grade = getGrade(state.score)

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-md w-full animate-scale-in">
        <div className="mb-4">
          <Trophy className="w-16 h-16 text-neon-orange mx-auto animate-float" />
        </div>

        <h2 className="font-display text-3xl text-white mb-2">游戏结束</h2>

        <div className="flex justify-center gap-1.5 my-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`w-7 h-7 transition-all duration-300 ${
                i <= grade.stars
                  ? "text-neon-orange fill-neon-orange"
                  : "text-gray-600"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        <p className={`font-display text-2xl mb-6 ${grade.color}`}>
          {grade.label}
        </p>

        <div className="glass-card rounded-xl p-5 mb-8 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-body">总得分</span>
            <span className="text-neon-cyan font-display text-2xl">
              {state.score}
            </span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-body">答对题数</span>
            <span className="text-neon-orange font-display text-xl">
              {state.correctCount}/{TOTAL_QUESTIONS}
            </span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-body">正确率</span>
            <span className="text-neon-purple font-display text-xl">
              {Math.round((state.correctCount / TOTAL_QUESTIONS) * 100)}%
            </span>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full px-8 py-3.5 bg-neon-cyan/10 border-2 border-neon-cyan rounded-full text-neon-cyan font-display text-lg transition-all duration-300 hover:bg-neon-cyan/20 hover:scale-105 active:scale-95 animate-pulse-glow"
        >
          <RotateCcw className="w-5 h-5 inline-block mr-2" />
          再来一局
        </button>
      </div>
    </div>
  )
}

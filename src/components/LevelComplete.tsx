import { ChevronRight, PartyPopper, TrendingUp, Flame, Clock } from "lucide-react"
import { TOTAL_LEVELS, QUESTIONS_PER_LEVEL, getLevelMultiplier, getLevelTimeLimit } from "@/data/questions"

interface LevelCompleteProps {
  level: number
  score: number
  correctInLevel: number
  combo: number
  maxCombo: number
  onNextLevel: () => void
}

export default function LevelComplete({
  level,
  score,
  correctInLevel,
  maxCombo,
  onNextLevel,
}: LevelCompleteProps) {
  const stars = correctInLevel >= 4 ? 3 : correctInLevel >= 3 ? 2 : 1
  const nextLevel = level + 1
  const nextMultiplier = getLevelMultiplier(nextLevel)
  const nextTimeLimit = getLevelTimeLimit(nextLevel)

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-md w-full animate-scale-in">
        <div className="mb-6">
          <PartyPopper className="w-16 h-16 text-neon-cyan mx-auto animate-float" />
        </div>

        <h2 className="font-display text-3xl text-neon-cyan neon-text-cyan mb-2">
          恭喜过关！
        </h2>

        <p className="font-body text-gray-400 mb-6">
          第 {level} 关完成
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`text-3xl transition-all duration-300 ${
                i <= stars ? "scale-110" : "scale-75 opacity-30"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              ⭐
            </span>
          ))}
        </div>

        <div className="glass-card rounded-xl p-4 mb-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-body text-sm">本关正确</span>
            <span className="text-neon-cyan font-display">
              {correctInLevel}/{QUESTIONS_PER_LEVEL}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-body text-sm">累计得分</span>
            <span className="text-neon-orange font-display">{score}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-body text-sm">最高连击</span>
            <span className="text-neon-orange font-display flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              x{maxCombo}
            </span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-3 mb-8 border-neon-purple/30">
          <p className="text-xs text-gray-400 font-body mb-2">下一关预告</p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-neon-purple font-display text-sm flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              系数 x{nextMultiplier}
            </span>
            <span className="text-neon-orange font-display text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              限时 {nextTimeLimit}s
            </span>
          </div>
        </div>

        <button
          onClick={onNextLevel}
          className="w-full px-8 py-3.5 bg-neon-cyan/10 border-2 border-neon-cyan rounded-full text-neon-cyan font-display text-lg transition-all duration-300 hover:bg-neon-cyan/20 hover:scale-105 active:scale-95"
        >
          进入第 {nextLevel} 关
          <ChevronRight className="w-5 h-5 inline-block ml-1" />
        </button>

        <p className="mt-4 text-xs text-gray-500 font-body">
          还有 {TOTAL_LEVELS - level} 关等你挑战
        </p>
      </div>
    </div>
  )
}

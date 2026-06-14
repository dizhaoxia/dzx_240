import { Sparkles, Play, Clock, Target, Trophy, Flame, TrendingUp } from "lucide-react"

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="animate-slide-up text-center max-w-lg">
        <div className="mb-6 animate-float">
          <Sparkles className="w-16 h-16 text-neon-cyan mx-auto neon-text-cyan" />
        </div>

        <h1 className="font-display text-5xl md:text-6xl text-neon-cyan neon-text-cyan mb-4">
          脑筋急转弯
        </h1>

        <p className="font-body text-lg text-gray-400 mb-10">
          挑战你的思维极限，看看你能闯过几关！
        </p>

        <button
          onClick={onStart}
          className="group relative px-12 py-4 bg-neon-cyan/10 border-2 border-neon-cyan rounded-full text-neon-cyan font-display text-xl transition-all duration-300 hover:bg-neon-cyan/20 hover:scale-105 active:scale-95 animate-pulse-glow"
        >
          <Play className="w-5 h-5 inline-block mr-2 group-hover:translate-x-1 transition-transform" />
          开始游戏
        </button>

        <div className="mt-12 grid grid-cols-2 gap-3">
          <div className="glass-card rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-neon-orange mx-auto mb-2" />
            <div className="text-sm text-gray-400">每题限时</div>
            <div className="text-neon-orange font-bold">15s → 10s</div>
            <div className="text-xs text-gray-500 mt-1">逐关递减</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Target className="w-6 h-6 text-neon-purple mx-auto mb-2" />
            <div className="text-sm text-gray-400">每关题数</div>
            <div className="text-neon-purple font-bold">5题</div>
            <div className="text-xs text-gray-500 mt-1">共5关</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Trophy className="w-6 h-6 text-neon-cyan mx-auto mb-2" />
            <div className="text-sm text-gray-400">基础得分</div>
            <div className="text-neon-cyan font-bold">+10分</div>
            <div className="text-xs text-gray-500 mt-1">答对即得</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Flame className="w-6 h-6 text-neon-orange mx-auto mb-2" />
            <div className="text-sm text-gray-400">连击加成</div>
            <div className="text-neon-orange font-bold">Combo</div>
            <div className="text-xs text-gray-500 mt-1">连续答对</div>
          </div>
        </div>

        <div className="mt-4 glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 justify-center">
            <TrendingUp className="w-5 h-5 text-neon-purple" />
            <span className="text-sm text-gray-400 font-body">关卡系数加成：</span>
            <span className="text-neon-purple font-display text-sm">第2关x1.2</span>
            <span className="text-gray-600">·</span>
            <span className="text-neon-purple font-display text-sm">第3关x1.5</span>
            <span className="text-gray-600">·</span>
            <span className="text-neon-purple font-display text-sm">第5关x2.0</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 font-body">
            剩余时间越多，额外加分越高！
          </p>
        </div>
      </div>
    </div>
  )
}

import { Trophy, Star, Zap, Flame, Timer, TrendingUp } from "lucide-react"
import type { GameData } from "@/types/game"
import { TOTAL_QUESTIONS, QUESTIONS_PER_LEVEL, TOTAL_LEVELS, getLevelMultiplier, getLevelTimeLimit } from "@/data/questions"
import CountdownTimer from "./CountdownTimer"
import OptionButton from "./OptionButton"

interface PlayingScreenProps {
  state: GameData
  onAnswer: (answer: string) => void
}

const OPTION_LABELS = ["A", "B", "C", "D"]

export default function PlayingScreen({ state, onAnswer }: PlayingScreenProps) {
  const currentQuestion = state.questions[state.currentIndex]
  const questionInLevel =
    (state.currentIndex % QUESTIONS_PER_LEVEL) + 1

  if (!currentQuestion) return null

  const multiplier = getLevelMultiplier(state.currentLevel)
  const timeLimit = getLevelTimeLimit(state.currentLevel)

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 animate-slide-in">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="glass-card rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-neon-orange" />
            <span className="font-display text-neon-orange text-sm">
              {state.score}
            </span>
          </div>
          <div className="glass-card rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-neon-purple" />
            <span className="font-body text-sm text-neon-purple">
              第 {state.currentLevel}/{TOTAL_LEVELS} 关
            </span>
          </div>
          {state.combo >= 2 && (
            <div className="glass-card rounded-lg px-3 py-1.5 flex items-center gap-1.5 animate-scale-in combo-badge">
              <Flame className="w-4 h-4 text-neon-orange" />
              <span className="font-display text-sm text-neon-orange">
                x{state.combo} 连击
              </span>
            </div>
          )}
        </div>
        <CountdownTimer timeLeft={state.timeLeft} maxTime={timeLimit} />
      </div>

      <div className="w-full bg-white/5 rounded-full h-1.5 mb-6">
        <div
          className="bg-gradient-to-r from-neon-cyan to-neon-purple h-1.5 rounded-full transition-all duration-500"
          style={{
            width: `${(state.currentIndex / TOTAL_QUESTIONS) * 100}%`,
          }}
        />
      </div>

      <div className="glass-card rounded-2xl p-6 md:p-8 mb-6 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs text-gray-400 font-body">
              第 {state.currentLevel} 关 · 第 {questionInLevel}/{QUESTIONS_PER_LEVEL} 题
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-body flex items-center gap-1">
              <Timer className="w-3 h-3" />
              {timeLimit}s
            </span>
            {multiplier > 1 && (
              <span className="text-xs text-neon-purple font-body flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                x{multiplier}
              </span>
            )}
          </div>
        </div>
        <h2 className="font-display text-2xl md:text-3xl text-white leading-relaxed">
          {currentQuestion.question}
        </h2>
      </div>

      <div className="grid gap-3 animate-slide-up">
        {currentQuestion.options.map((option, index) => {
          const isCorrectAnswer =
            state.answered && option === currentQuestion.answer
          const isWrong =
            state.answered &&
            state.selectedAnswer === option &&
            !state.isCorrect

          return (
            <OptionButton
              key={index}
              label={OPTION_LABELS[index]}
              text={option}
              isSelected={state.selectedAnswer === option}
              isCorrectAnswer={isCorrectAnswer}
              isWrong={isWrong}
              disabled={state.answered}
              onClick={() => onAnswer(option)}
            />
          )
        })}
      </div>

      {state.answered && state.isCorrect && state.lastScoreBreakdown && (
        <div className="mt-4 text-center animate-scale-in">
          <div className="inline-flex flex-col items-center gap-1">
            <span className="text-green-400 font-display text-lg">
              🎉 答对了！
            </span>
            <div className="flex items-center gap-3 text-sm font-body">
              <span className="text-green-300">基础 +{state.lastScoreBreakdown.base}</span>
              {state.lastScoreBreakdown.combo > 0 && (
                <span className="text-neon-orange">连击 +{state.lastScoreBreakdown.combo}</span>
              )}
              {state.lastScoreBreakdown.timeBonus > 0 && (
                <span className="text-neon-cyan">时间 +{state.lastScoreBreakdown.timeBonus}</span>
              )}
              {state.lastScoreBreakdown.levelMultiplier > 1 && (
                <span className="text-neon-purple">x{state.lastScoreBreakdown.levelMultiplier}</span>
              )}
            </div>
            <span className="text-yellow-300 font-display text-xl score-fly">
              +{state.lastScoreBreakdown.total}
            </span>
          </div>
        </div>
      )}
      {state.answered && !state.isCorrect && (
        <div className="mt-4 text-center animate-scale-in">
          <span className="text-red-400 font-display text-lg">
            😅 答错了！正确答案：{currentQuestion.answer}
          </span>
          {state.combo > 0 && (
            <div className="text-red-300/60 text-sm font-body mt-1">
              连击中断 😢
            </div>
          )}
        </div>
      )}
    </div>
  )
}

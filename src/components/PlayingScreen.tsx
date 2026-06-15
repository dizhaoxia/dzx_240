import { Trophy, Star, Timer, ChevronRight, PartyPopper } from "lucide-react"
import type { GameData } from "@/types/game"
import {
  TOTAL_QUESTIONS,
  QUESTIONS_PER_LEVEL,
  TOTAL_LEVELS,
  TIME_PER_QUESTION,
} from "@/data/questions"
import CountdownTimer from "./CountdownTimer"
import OptionButton from "./OptionButton"

interface PlayingScreenProps {
  state: GameData
  onAnswer: (answer: string) => void
  onContinueNextLevel: () => void
}

const OPTION_LABELS = ["A", "B", "C", "D"]

export default function PlayingScreen({
  state,
  onAnswer,
  onContinueNextLevel,
}: PlayingScreenProps) {
  const currentQuestion = state.questions[state.currentIndex]
  const questionInLevel =
    (state.currentIndex % QUESTIONS_PER_LEVEL) + 1

  if (!currentQuestion) return null

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
            <Star className="w-4 h-4 text-neon-purple" />
            <span className="font-body text-sm text-neon-purple">
              第 {state.currentLevel}/{TOTAL_LEVELS} 关
            </span>
          </div>
        </div>
        <CountdownTimer timeLeft={state.timeLeft} maxTime={TIME_PER_QUESTION} />
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
            <span className="text-xs text-gray-400 font-body">
              第 {state.currentLevel} 关 · 第 {questionInLevel}/{QUESTIONS_PER_LEVEL} 题
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-body flex items-center gap-1">
              <Timer className="w-3 h-3" />
              {TIME_PER_QUESTION}s
            </span>
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
              isCorrectAnswer={isCorrectAnswer}
              isWrong={isWrong}
              disabled={state.answered}
              onClick={() => onAnswer(option)}
            />
          )
        })}
      </div>

      {state.answered && state.isCorrect && (
        <div className="mt-4 text-center animate-scale-in">
          <span className="text-green-400 font-display text-lg">
            🎉 答对了！+10分
          </span>
        </div>
      )}
      {state.answered && !state.isCorrect && (
        <div className="mt-4 text-center animate-scale-in">
          <span className="text-red-400 font-display text-lg">
            😅 答错了！正确答案：{currentQuestion.answer}
          </span>
        </div>
      )}

      {state.showLevelComplete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="glass-card rounded-3xl p-8 md:p-10 text-center max-w-md w-full animate-scale-in">
            <div className="mb-6">
              <PartyPopper className="w-16 h-16 text-neon-cyan mx-auto animate-float" />
            </div>

            <h2 className="font-display text-3xl text-neon-cyan neon-text-cyan mb-2">
              恭喜过关！
            </h2>

            <p className="font-body text-gray-400 mb-6">
              第 {state.currentLevel} 关完成
            </p>

            <div className="glass-card rounded-xl p-4 mb-8 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-body text-sm">
                  累计得分
                </span>
                <span className="text-neon-orange font-display text-xl">
                  {state.score}
                </span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-body text-sm">
                  答对数
                </span>
                <span className="text-neon-cyan font-display">
                  {state.correctCount}/{TOTAL_QUESTIONS}
                </span>
              </div>
            </div>

            <button
              onClick={onContinueNextLevel}
              className="w-full px-8 py-3.5 bg-neon-cyan/10 border-2 border-neon-cyan rounded-full text-neon-cyan font-display text-lg transition-all duration-300 hover:bg-neon-cyan/20 hover:scale-105 active:scale-95"
            >
              进入下一关
              <ChevronRight className="w-5 h-5 inline-block ml-1" />
            </button>

            <p className="mt-4 text-xs text-gray-500 font-body">
              还有 {TOTAL_LEVELS - state.currentLevel} 关等你挑战
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

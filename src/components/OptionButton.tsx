interface OptionButtonProps {
  label: string
  text: string
  isSelected: boolean
  isCorrectAnswer: boolean
  isWrong: boolean
  disabled: boolean
  onClick: () => void
}

export default function OptionButton({
  label,
  text,
  isSelected,
  isCorrectAnswer,
  isWrong,
  disabled,
  onClick,
}: OptionButtonProps) {
  let borderClass = "border-white/20 hover:border-neon-cyan/50"
  let bgClass = "bg-cosmic-700/50 hover:bg-cosmic-600/50"
  let textClass = "text-gray-200"

  if (isCorrectAnswer) {
    borderClass = "border-green-400"
    bgClass = "bg-green-500/20"
    textClass = "text-green-300"
  } else if (isWrong) {
    borderClass = "border-red-400"
    bgClass = "bg-red-500/20"
    textClass = "text-red-300"
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl border-2 ${borderClass} ${bgClass} ${textClass} transition-all duration-200 ${
        !disabled ? "hover:scale-[1.02] active:scale-[0.98]" : ""
      } ${isCorrectAnswer ? "scale-[1.02] neon-border-cyan" : ""} ${
        isWrong ? "animate-shake" : ""
      }`}
    >
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
          isCorrectAnswer
            ? "bg-green-500/30 text-green-300"
            : isWrong
              ? "bg-red-500/30 text-red-300"
              : "bg-white/10 text-gray-400"
        }`}
      >
        {label}
      </span>
      <span className="font-body text-left">{text}</span>
      {isCorrectAnswer && (
        <span className="ml-auto text-green-400 text-lg">✓</span>
      )}
      {isWrong && <span className="ml-auto text-red-400 text-lg">✗</span>}
    </button>
  )
}

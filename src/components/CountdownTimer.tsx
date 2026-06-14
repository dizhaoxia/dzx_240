interface CountdownTimerProps {
  timeLeft: number
  maxTime: number
}

export default function CountdownTimer({ timeLeft, maxTime }: CountdownTimerProps) {
  const percentage = (timeLeft / maxTime) * 100
  const isLow = timeLeft <= Math.floor(maxTime * 0.33)
  const isCritical = timeLeft <= Math.floor(maxTime * 0.2)

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={
            isCritical
              ? "#ff2d78"
              : isLow
                ? "#ff6b35"
                : "#00f5d4"
          }
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-linear"
          style={
            isLow
              ? {
                  filter: `drop-shadow(0 0 6px ${
                    isCritical ? "rgba(255,45,120,0.6)" : "rgba(255,107,53,0.6)"
                  })`,
                }
              : { filter: "drop-shadow(0 0 4px rgba(0,245,212,0.4))" }
          }
        />
      </svg>
      <span
        className={`absolute font-display text-2xl font-bold transition-colors duration-300 ${
          isCritical
            ? "text-neon-pink animate-shake"
            : isLow
              ? "text-neon-orange"
              : "text-neon-cyan"
        }`}
      >
        {timeLeft}
      </span>
    </div>
  )
}

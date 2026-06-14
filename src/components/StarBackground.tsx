import { useMemo } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export default function StarBackground() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl" />
    </div>
  )
}

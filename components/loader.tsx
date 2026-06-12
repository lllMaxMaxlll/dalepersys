'use client'

import { useEffect, useState } from 'react'

export function Loader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame = 0
    const interval = setInterval(() => {
      frame += 1
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 12 + 4)
        return next
      })
    }, 130)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setDone(true), 650)
      return () => clearTimeout(t)
    }
  }, [progress])

  if (done) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        progress >= 100 ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex items-end gap-1.5 h-16">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <span
            key={i}
            className="eq-bar w-1.5 h-full rounded-full bg-neon"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      <div className="mt-10 w-56 max-w-[70vw]">
        <div className="flex items-center justify-between text-xs tracking-[0.3em] text-muted-foreground mb-2 font-mono">
          <span>CARGANDO</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="h-px w-full bg-border overflow-hidden">
          <div
            className="h-full bg-neon transition-all duration-200 ease-out glow-neon"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

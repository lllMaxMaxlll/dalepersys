'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let particles: Particle[] = []

    const count = Math.min(90, Math.floor(window.innerWidth / 16))

    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      }))
    }
    init()

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      init()
    }
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    const onLeave = () => {
      mouse.current.x = -9999
      mouse.current.y = -9999
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)

    let raf = 0
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // cursor attraction
        const dx = mouse.current.x - p.x
        const dy = mouse.current.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < 160) {
          const force = (160 - dist) / 160
          p.x += (dx / dist) * force * 0.6
          p.y += (dy / dist) * force * 0.6
        }

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 102, ${p.alpha})`
        ctx.fill()
      }
      raf = requestAnimationFrame(render)
    }

    if (!prefersReduced) render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
    />
  )
}

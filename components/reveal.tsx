'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Reveals direct children (or [data-reveal] elements) with a staggered
 * upward fade as the element scrolls into view.
 */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 40,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  y?: number
  as?: 'div' | 'section' | 'ul' | 'header'
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]')
    const items = targets.length ? targets : (Array.from(el.children) as HTMLElement[])

    const ctx = gsap.context(() => {
      gsap.from(items, {
        y,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [stagger, y])

  // @ts-expect-error dynamic tag
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

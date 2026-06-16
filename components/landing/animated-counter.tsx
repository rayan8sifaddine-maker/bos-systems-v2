'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `value` once it scrolls into view.
 * `prefix`/`suffix` are rendered around the number (e.g. "+", "%", "×").
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1400,
  decimals = 0,
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            function tick(now: number) {
              const progress = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setDisplay(value * eased)
              if (progress < 1) requestAnimationFrame(tick)
              else setDisplay(value)
            }
            requestAnimationFrame(tick)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref}>
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  )
}

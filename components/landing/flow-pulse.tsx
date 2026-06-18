'use client'
import { useEffect, useRef } from 'react'

export function FlowPulse() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, raf = 0, t = 0
    const c = canvas

    function resize() {
      W = c.width = c.offsetWidth
      H = c.height = c.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const trail: { x: number; y: number; a: number }[] = []

    function draw() {
      ctx.clearRect(0, 0, W, H)
      const y = H / 2

      // base track
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
      ctx.strokeStyle = 'rgba(12,14,18,0.07)'
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 6])
      ctx.stroke()
      ctx.setLineDash([])

      t += 0.006
      const progress = (t % 1)
      const x = progress * W

      trail.unshift({ x, y, a: 1 })
      if (trail.length > 26) trail.pop()

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i]
        const alpha = p.a * (1 - i / trail.length)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3.2 * (1 - i / trail.length) + 0.5, 0, Math.PI * 2)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 8)
        grad.addColorStop(0, `rgba(26,86,255,${alpha})`)
        grad.addColorStop(1, 'rgba(26,86,255,0)')
        ctx.fillStyle = grad
        ctx.fill()
      }

      // glow head
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      const headGrad = ctx.createRadialGradient(x, y, 0, x, y, 16)
      headGrad.addColorStop(0, 'rgba(124,58,237,0.9)')
      headGrad.addColorStop(1, 'rgba(124,58,237,0)')
      ctx.fillStyle = headGrad
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x, y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = '#fff'
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-3 -translate-y-1/2 pointer-events-none hidden md:block" aria-hidden />
}

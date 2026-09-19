'use client'
import { useRef, useState, type ReactNode, type MouseEvent } from 'react'

export function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 })

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({
      rx: (0.5 - py) * 14,
      ry: (px - 0.5) * 18,
      mx: px * 100,
      my: py * 100,
    })
  }

  function handleLeave() {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: '1400px' }}
      className="relative"
    >
      <div
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.35) 0%, transparent 55%)`,
            mixBlendMode: 'overlay',
            transition: 'background 0.1s linear',
          }}
        />
        <div
          aria-hidden
          className="absolute -inset-3 rounded-3xl pointer-events-none -z-10"
          style={{
            background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(26,86,255,0.25) 0%, transparent 60%)`,
            filter: 'blur(20px)',
            transition: 'background 0.15s linear',
          }}
        />
      </div>
    </div>
  )
}

'use client'
import Link, { LinkProps } from 'next/link'
import { useRef, useState, type ReactNode, type MouseEvent, type CSSProperties } from 'react'

interface MagneticButtonProps extends LinkProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
}

export function MagneticButton({ href, className, style, children, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    setOffset({ x: x * 0.3, y: y * 0.4 })
  }

  function handleLeave() {
    setOffset({ x: 0, y: 0 })
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0 ? 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' : 'transform 0.12s ease-out',
        display: 'inline-flex',
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}

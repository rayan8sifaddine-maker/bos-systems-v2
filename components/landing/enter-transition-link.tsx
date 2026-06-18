'use client'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type ReactNode, type MouseEvent, type CSSProperties } from 'react'

interface EnterTransitionLinkProps extends LinkProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
}

export function EnterTransitionLink({ href, className, style, children, ...rest }: EnterTransitionLinkProps) {
  const router = useRouter()
  const [zooming, setZooming] = useState(false)

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    setZooming(true)
    setTimeout(() => router.push(href.toString()), 480)
  }

  return (
    <>
      <Link href={href} className={className} style={style} onClick={handleClick} {...rest}>
        {children}
      </Link>
      {zooming && (
        <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center overflow-hidden" aria-hidden>
          <div
            className="w-[200vmax] h-[200vmax] animate-portal-zoom flex items-center justify-center"
            style={{ background: 'radial-gradient(circle, #1e2330 0%, #0C0E12 70%)' }}
          >
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5" />
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

const LAST_SEEN_KEY = 'bos-comm-last-seen'

const TABS = [
  {
    href: '/dashboard',
    label: 'Accueil',
    exact: true,
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}/>
      </svg>
    ),
  },
  {
    href: '/dashboard/rendez-vous',
    label: 'RDV',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.1 : 0}/>
        <path d="M5 1v3M11 1v3M1 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/crm',
    label: 'Clients',
    icon: (_active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M1 13c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 11c0-1.657-1.343-3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/communication',
    label: 'Messages',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
        <path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 2V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.1 : 0}/>
      </svg>
    ),
    badge: true,
  },
  {
    href: '/dashboard/assistant',
    label: 'IA',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.1 : 0}/>
        <path d="M6 7c0-.552.672-1 1.5-1S9 6.448 9 7c0 .74-.9 1.3-1.35 1.65-.45.35-.65.6-.65 1.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8" cy="11.5" r=".5" fill="currentColor"/>
      </svg>
    ),
  },
]

export function MobileNav() {
  const pathname = usePathname()
  const [unread, setUnread] = useState(0)

  function isActive(href: string, exact = false) {
    return exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')
  }

  useEffect(() => {
    let cancelled = false
    async function poll() {
      try {
        const lastSeen = localStorage.getItem(LAST_SEEN_KEY) || new Date(0).toISOString()
        const res = await fetch(`/api/notifications?since=${encodeURIComponent(lastSeen)}`)
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled) setUnread(data.count || 0)
      } catch {}
    }
    poll()
    const interval = setInterval(poll, 15000)
    return () => { cancelled = true; clearInterval(interval) }
  }, [])

  useEffect(() => {
    if (pathname.startsWith('/dashboard/communication')) {
      localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString())
      setUnread(0)
    }
  }, [pathname])

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#13151A] border-t border-[rgba(12,14,18,0.08)] dark:border-white/10" style={{ paddingBottom: 'env(safe-area-inset-bottom)', boxShadow: '0 -4px 24px rgba(12,14,18,0.08)' }}>
      <div className="flex items-stretch h-16">
        {TABS.map(tab => {
          const active = isActive(tab.href, tab.exact)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'relative flex-1 flex flex-col items-center justify-center gap-1 transition-colors',
                active ? 'text-[#1A56FF] dark:text-[#5B8DFF]' : 'text-[#B0B5C3] dark:text-[#5A5F6B]'
              )}
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#1A56FF] dark:bg-[#5B8DFF]" />
              )}
              <span className="relative">
                {tab.icon(active)}
                {tab.badge && unread > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-0.5 rounded-full bg-[#FF3B30] text-white text-[8px] font-bold flex items-center justify-center">
                    {unread > 9 ? '9+' : unread}
                  </span>
                )}
              </span>
              <span className={cn('text-[10px] font-medium leading-none', active ? 'font-semibold' : '')}>{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const LAST_SEEN_KEY = 'bos-comm-last-seen'

const NAV = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    exact: true,
  },
  {
    href: '/dashboard/rendez-vous',
    label: 'Rendez-vous',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 1v3M11 1v3M1 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/crm',
    label: 'CRM Clients',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M1 13c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 11c0-1.657-1.343-3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/communication',
    label: 'Communication',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 2V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1 12l4-4 3 3 4-5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/automatisation',
    label: 'Automatisation',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13 8A5 5 0 113 8a5 5 0 0110 0z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 5.5v3l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/assistant',
    label: 'Assistant IA',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 7c0-.552.672-1 1.5-1S9 6.448 9 7c0 .74-.9 1.3-1.35 1.65-.45.35-.65.6-.65 1.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8" cy="11.5" r=".5" fill="currentColor"/>
      </svg>
    ),
  },
]

const BOTTOM_NAV = [
  {
    href: '/dashboard/equipe',
    label: 'Équipe',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 13c0-2.209 1.791-4 4-4h4c2.209 0 4 1.791 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/parametres',
    label: 'Paramètres',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.929 2.929l1.414 1.414M11.657 11.657l1.414 1.414M2.929 13.071l1.414-1.414M11.657 4.343l1.414-1.414" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

interface SidebarProps {
  clinicName: string
  plan: string
}

export function Sidebar({ clinicName, plan }: SidebarProps) {
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
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (pathname.startsWith('/dashboard/communication')) {
      localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString())
      setUnread(0)
    }
  }, [pathname])

  return (
    <aside className="w-[220px] bg-white border-r border-[rgba(12,14,18,0.06)] flex flex-col sticky top-0 h-screen flex-shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-[rgba(12,14,18,0.06)] flex-shrink-0">
        <div className="w-7 h-7 bg-[#0C0E12] rounded-lg flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0 2px 6px rgba(12,14,18,0.25)' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
          </svg>
        </div>
        <span className="font-bold text-sm tracking-wide text-[#0C0E12] font-display">BOS</span>
      </div>

      {/* Clinic info */}
      <div className="px-3 py-3 border-b border-[rgba(12,14,18,0.06)] flex-shrink-0">
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#F7F8FA]/0 hover:bg-[#F7F8FA] transition-colors">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg,#1A56FF,#7C3AED)', boxShadow: '0 2px 6px rgba(26,86,255,0.3)' }}>
            {clinicName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-[#0C0E12] truncate">{clinicName}</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="text-[10px] text-[#1A56FF] font-medium">{plan}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn('nav-item', isActive(item.href, item.exact) && 'nav-item-active')}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="truncate flex-1">{item.label}</span>
            {item.href === '/dashboard/communication' && unread > 0 && (
              <span className="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF3B30] text-white text-[10px] font-bold flex items-center justify-center">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </Link>
        ))}

        <div className="pt-3 pb-1">
          <div className="px-3 text-[10px] font-semibold text-[#B0B5C3] uppercase tracking-wider">Gestion</div>
        </div>

        {BOTTOM_NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn('nav-item', isActive(item.href) && 'nav-item-active')}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Signout */}
      <div className="p-3 border-t border-[rgba(12,14,18,0.06)] flex-shrink-0">
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-2 px-3 py-2 text-xs text-[#7A7F8E] hover:text-[#0C0E12] rounded-xl hover:bg-[#F7F8FA] transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 12H3a1 1 0 01-1-1V3a1 1 0 011-1h2M9 10l3-3-3-3M12 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Se déconnecter
        </Link>
      </div>
    </aside>
  )
}

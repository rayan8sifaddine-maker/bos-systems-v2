'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

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
    href: '/dashboard/facturation',
    label: 'Facturation',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="1" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 5h6M5 8h6M5 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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

  function isActive(href: string, exact = false) {
    return exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="w-[220px] bg-white border-r border-[rgba(12,14,18,0.06)] flex flex-col sticky top-0 h-screen flex-shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-[rgba(12,14,18,0.06)] flex-shrink-0">
        <Image src="/logo.png" alt="BOS Systems" width={32} height={32} className="flex-shrink-0" />
        <span className="font-bold text-sm tracking-wide text-[#0C0E12] font-display">BOS SYSTEMS</span>
      </div>

      {/* Clinic info */}
      <div className="px-3 py-3 border-b border-[rgba(12,14,18,0.06)] flex-shrink-0">
        <div className="flex items-center gap-2.5 p-2 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#1A56FF] text-xs font-bold flex-shrink-0">
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
            <span className="truncate">{item.label}</span>
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

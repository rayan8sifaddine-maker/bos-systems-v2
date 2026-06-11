import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: 'grid' },
  { href: '/dashboard/rendez-vous', label: 'Rendez-vous', icon: 'cal' },
  { href: '/dashboard/crm', label: 'CRM', icon: 'users' },
  { href: '/dashboard/whatsapp', label: 'Assistant IA', icon: 'chat' },
  { href: '/dashboard/parametres', label: 'Paramètres', icon: 'settings' },
]

function Icon({ name }: { name: string }) {
  if (name === 'grid') return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
  if (name === 'cal') return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 1v3M11 1v3M1 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  if (name === 'users') return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M1 13c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  if (name === 'chat') return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 2V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')
  const clinicName = session.user.name || 'Ma Clinique'
  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      <aside className="w-[220px] bg-white border-r border-[rgba(12,14,18,0.06)] flex flex-col sticky top-0 h-screen flex-shrink-0">
        <div className="h-14 flex items-center gap-2.5 px-4 border-b border-[rgba(12,14,18,0.06)]">
          <div className="w-7 h-7 bg-[#0C0E12] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-sm tracking-wide text-[#0C0E12]">BOS</span>
        </div>
        <div className="px-3 py-3 border-b border-[rgba(12,14,18,0.06)]">
          <div className="flex items-center gap-2.5 p-2 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#1A56FF] text-sm font-bold flex-shrink-0">
              {clinicName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#0C0E12] truncate">{clinicName}</div>
              <div className="text-[10px] text-[#1A56FF] font-medium">PRO</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {NAV.map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#3A3D45] hover:bg-[#F7F8FA] hover:text-[#0C0E12] transition-all">
              <span className="text-[#7A7F8E]"><Icon name={item.icon} /></span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-[rgba(12,14,18,0.06)]">
          <Link href="/api/auth/signout" className="flex items-center gap-2 px-3 py-2 text-xs text-[#7A7F8E] hover:text-[#0C0E12] rounded-xl hover:bg-[#F7F8FA] transition-all">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 12H3a1 1 0 01-1-1V3a1 1 0 011-1h2M9 10l3-3-3-3M12 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Se déconnecter
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
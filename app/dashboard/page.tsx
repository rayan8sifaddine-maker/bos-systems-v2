import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { formatTime, formatCurrency, STATUS_COLORS, STATUS_LABELS } from '@/lib/utils'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Dashboard' }

function TrendBadge({ value }: { value: number }) {
  const positive = value >= 0
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
      {positive ? (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2v6M2 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
      {Math.abs(value)}% vs mois dernier
    </span>
  )
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) redirect('/inscription')

  const now = new Date()
  const todayStart = new Date(now); todayStart.setHours(0,0,0,0)
  const todayEnd   = new Date(now); todayEnd.setHours(23,59,59,999)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth()-1, 1)
  const lastMonthEnd   = new Date(now.getFullYear(), now.getMonth(), 0)

  const [
    totalClients,
    newThisMonth,
    newLastMonth,
    todayAppts,
    monthAppts,
    lastMonthAppts,
    noShowThisMonth,
    recentAppts,
    clientsByStatus,
    paidRevenue,
  ] = await Promise.all([
    prisma.client.count({ where: { clinicId: clinic.id } }),
    prisma.client.count({ where: { clinicId: clinic.id, createdAt: { gte: monthStart } } }),
    prisma.client.count({ where: { clinicId: clinic.id, createdAt: { gte: lastMonthStart, lte: lastMonthEnd } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: todayStart, lte: todayEnd } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: monthStart } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: lastMonthStart, lte: lastMonthEnd } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: monthStart }, status: 'NO_SHOW' } }),
    prisma.appointment.findMany({
      where: { clinicId: clinic.id, datetime: { gte: todayStart, lte: todayEnd } },
      orderBy: { datetime: 'asc' },
      take: 8,
    }),
    prisma.client.groupBy({ by: ['status'], where: { clinicId: clinic.id }, _count: true }),
    prisma.invoice.aggregate({ where: { clinicId: clinic.id, status: 'PAID' }, _sum: { amount: true } }),
  ])

  const clientGrowth = newLastMonth > 0 ? Math.round(((newThisMonth - newLastMonth) / newLastMonth) * 100) : 0
  const apptGrowth = lastMonthAppts > 0 ? Math.round(((monthAppts - lastMonthAppts) / lastMonthAppts) * 100) : 0
  const noShowRate = monthAppts > 0 ? Math.round((noShowThisMonth / monthAppts) * 100) : 0
  const revenue = paidRevenue._sum.amount ?? 0

  const stats = [
    {
      label: 'Clients totaux',
      value: totalClients.toString(),
      sub: `+${newThisMonth} ce mois`,
      trend: clientGrowth,
      color: '#1A56FF',
      bg: '#EEF2FF',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M1 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="14" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M17 11c0-2.21-1.343-4-3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: 'RDV aujourd\'hui',
      value: todayAppts.toString(),
      sub: 'planifiés',
      trend: null,
      color: '#7C3AED',
      bg: '#F5F3FF',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M6 1v4M12 1v4M2 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 12h2v2H6z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      label: 'RDV ce mois',
      value: monthAppts.toString(),
      sub: `absence ${noShowRate}%`,
      trend: apptGrowth,
      color: '#10B981',
      bg: '#ECFDF5',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 13l4-5 3 3 4-6 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: 'Chiffre d\'affaires',
      value: formatCurrency(revenue),
      sub: 'total facturé payé',
      trend: null,
      color: '#F59E0B',
      bg: '#FFFBEB',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 5v1.5M9 11.5V13M6.5 8.5c0-1.1.895-2 2-2h1a1.5 1.5 0 010 3h-1a1.5 1.5 0 000 3h1c1.105 0 2-.9 2-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      ),
    },
  ]

  const dateLabel = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Bonjour, {clinic.name.split(' ')[0]}</h1>
          <p className="page-subtitle capitalize">{dateLabel}</p>
        </div>
        <Link href="/dashboard/rendez-vous" className="btn-primary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Nouveau RDV
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="stat-card animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between">
              <span className="stat-label">{s.label}</span>
              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </span>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="flex flex-col gap-0.5">
              <div className="stat-sub">{s.sub}</div>
              {s.trend !== null && <TrendBadge value={s.trend} />}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's appointments */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[rgba(12,14,18,0.06)]">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#0C0E12]">Rendez-vous du jour</h2>
              {recentAppts.length > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF2FF] text-[#1A56FF]">
                  {recentAppts.length}
                </span>
              )}
            </div>
            <Link href="/dashboard/rendez-vous" className="text-xs text-[#1A56FF] hover:underline font-medium">Voir tout →</Link>
          </div>
          <div>
            {recentAppts.length === 0 ? (
              <div className="empty-state">
                <div className="w-14 h-14 rounded-2xl bg-[#F7F8FA] flex items-center justify-center mb-4 text-[#B0B5C3]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 15h4M8 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="empty-title">Aucun rendez-vous aujourd&apos;hui</div>
                <div className="empty-desc mt-1">
                  <Link href="/dashboard/rendez-vous" className="text-[#1A56FF] hover:underline font-medium">Planifier un RDV →</Link>
                </div>
              </div>
            ) : (
              recentAppts.map((a, i) => (
                <div key={a.id} className={`flex items-center gap-4 px-6 py-3.5 hover:bg-[#F7F8FA] transition-colors ${i < recentAppts.length - 1 ? 'border-b border-[rgba(12,14,18,0.04)]' : ''}`}>
                  <div className="w-12 text-center flex-shrink-0">
                    <div className="text-sm font-bold text-[#0C0E12]">{formatTime(a.datetime)}</div>
                  </div>
                  <div className="w-px h-8 bg-[rgba(12,14,18,0.06)]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#0C0E12] truncate">{a.patientName}</div>
                    <div className="text-xs text-[#7A7F8E]">{a.type}</div>
                  </div>
                  <span className={`badge text-[10px] ${STATUS_COLORS[a.status] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {STATUS_LABELS[a.status] ?? a.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Client pipeline */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-[#0C0E12] mb-4">Pipeline clients</h3>
            <div className="space-y-3.5">
              {[
                { label: 'Prospects', status: 'LEAD', color: '#7C3AED', bg: '#7C3AED' },
                { label: 'Actifs', status: 'ACTIVE', color: '#10B981', bg: '#10B981' },
                { label: 'Inactifs', status: 'INACTIVE', color: '#D1D5DB', bg: '#D1D5DB' },
              ].map(({ label, status, bg }) => {
                const count = clientsByStatus.find(s => s.status === status)?._count ?? 0
                const pct = totalClients > 0 ? Math.round((count / totalClients) * 100) : 0
                return (
                  <div key={status}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#3A3D45] font-medium">{label}</span>
                      <span className="font-semibold text-[#0C0E12]">{count} <span className="text-[#B0B5C3] font-normal">({pct}%)</span></span>
                    </div>
                    <div className="h-1.5 bg-[#F0F2F5] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: bg }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-[#0C0E12] mb-3">Actions rapides</h3>
            <div className="space-y-1">
              {[
                {
                  label: 'Ajouter un client',
                  href: '/dashboard/crm',
                  icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 12c0-2.761 2.239-5 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M10 8v4M8 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                  color: 'text-blue-500 bg-blue-50',
                },
                {
                  label: 'Créer une facture',
                  href: '/dashboard/facturation',
                  icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M4 5h6M4 7.5h6M4 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                  color: 'text-teal-500 bg-teal-50',
                },
                {
                  label: 'Configurer l\'IA',
                  href: '/dashboard/assistant',
                  icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5.5 6c0-.553.672-1 1.5-1s1.5.447 1.5 1c0 .74-.9 1.3-1.35 1.65-.45.35-.65.6-.65 1.35" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="7" cy="10.5" r=".5" fill="currentColor"/></svg>,
                  color: 'text-violet-500 bg-violet-50',
                },
                {
                  label: 'Voir l\'analytics',
                  href: '/dashboard/analytics',
                  icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 10l3-4 2.5 2.5 3-5 2.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  color: 'text-amber-500 bg-amber-50',
                },
              ].map(a => (
                <Link key={a.href} href={a.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F7F8FA] transition-colors group">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${a.color}`}>{a.icon}</span>
                  <span className="text-sm text-[#3A3D45] group-hover:text-[#0C0E12] transition-colors">{a.label}</span>
                  <svg className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#B0B5C3]" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Plan card */}
          <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C0E12 0%, #1A2040 100%)' }}>
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10" aria-hidden>
              <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, #1A56FF, transparent)', borderRadius: '50%' }} />
            </div>
            <div className="relative">
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">Plan actuel</div>
              <div className="text-lg font-bold text-white mb-1">{clinic.plan}</div>
              <div className="text-xs text-white/40 mb-4">
                {clinic.trialEndsAt && new Date(clinic.trialEndsAt) > now
                  ? `Essai jusqu'au ${new Date(clinic.trialEndsAt).toLocaleDateString('fr-FR')}`
                  : 'Abonnement actif'
                }
              </div>
              <Link href="/dashboard/parametres" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-medium rounded-lg transition-all">
                Gérer le plan →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

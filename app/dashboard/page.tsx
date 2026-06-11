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
    <span className={`text-xs font-medium ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
      {positive ? '↑' : '↓'} {Math.abs(value)}% vs mois dernier
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
  const activeClients = clientsByStatus.find(s => s.status === 'ACTIVE')?._count ?? 0
  const revenue = paidRevenue._sum.amount ?? 0

  const stats = [
    { label: 'Clients totaux', value: totalClients.toString(), sub: `+${newThisMonth} ce mois`, trend: clientGrowth, icon: '👥', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'RDV aujourd\'hui', value: todayAppts.toString(), sub: 'planifiés', trend: null, icon: '📅', color: 'text-violet-500', bg: 'bg-violet-50' },
    { label: 'RDV ce mois', value: monthAppts.toString(), sub: `taux d'absence ${noShowRate}%`, trend: apptGrowth, icon: '📊', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Chiffre d\'affaires', value: formatCurrency(revenue), sub: 'total facturé payé', trend: null, icon: '💰', color: 'text-amber-500', bg: 'bg-amber-50' },
  ]

  const dateLabel = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Bonjour 👋</h1>
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
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${s.bg}`}>{s.icon}</span>
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
            <h2 className="text-sm font-semibold text-[#0C0E12]">Rendez-vous du jour</h2>
            <Link href="/dashboard/rendez-vous" className="text-xs text-[#1A56FF] hover:underline font-medium">Voir tout →</Link>
          </div>
          <div>
            {recentAppts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <div className="empty-title">Aucun rendez-vous aujourd'hui</div>
                <div className="empty-desc mt-1">
                  <Link href="/dashboard/rendez-vous" className="text-[#1A56FF] hover:underline">Planifier un RDV</Link>
                </div>
              </div>
            ) : (
              recentAppts.map((a, i) => (
                <div key={a.id} className={`flex items-center gap-4 px-6 py-3 hover:bg-[#F7F8FA] transition-colors ${i < recentAppts.length - 1 ? 'border-b border-[rgba(12,14,18,0.04)]' : ''}`}>
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

        {/* Sidebar stats */}
        <div className="space-y-4">
          {/* Client pipeline */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-[#0C0E12] mb-4">Pipeline clients</h3>
            <div className="space-y-3">
              {[
                { label: 'Prospects', status: 'LEAD', color: 'bg-purple-400' },
                { label: 'Actifs', status: 'ACTIVE', color: 'bg-emerald-400' },
                { label: 'Inactifs', status: 'INACTIVE', color: 'bg-gray-300' },
              ].map(({ label, status, color }) => {
                const count = clientsByStatus.find(s => s.status === status)?._count ?? 0
                const pct = totalClients > 0 ? Math.round((count / totalClients) * 100) : 0
                return (
                  <div key={status}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#3A3D45]">{label}</span>
                      <span className="font-medium text-[#0C0E12]">{count} <span className="text-[#B0B5C3]">({pct}%)</span></span>
                    </div>
                    <div className="h-1.5 bg-[#F0F2F5] rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-[#0C0E12] mb-3">Actions rapides</h3>
            <div className="space-y-1.5">
              {[
                { label: 'Ajouter un client', href: '/dashboard/crm', icon: '👤' },
                { label: 'Créer une facture', href: '/dashboard/facturation', icon: '📄' },
                { label: 'Configurer l\'IA', href: '/dashboard/assistant', icon: '🤖' },
                { label: 'Voir l\'analytics', href: '/dashboard/analytics', icon: '📈' },
              ].map(a => (
                <Link key={a.href} href={a.href} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F7F8FA] transition-colors text-sm text-[#3A3D45] hover:text-[#0C0E12]">
                  <span>{a.icon}</span>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Plan info */}
          <div className="card p-5 bg-gradient-to-br from-[#0C0E12] to-[#1e2330] border-0">
            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Plan actuel</div>
            <div className="text-lg font-bold text-white mb-1">{clinic.plan}</div>
            <div className="text-xs text-white/40 mb-4">
              {clinic.trialEndsAt && new Date(clinic.trialEndsAt) > now
                ? `Essai gratuit jusqu'au ${new Date(clinic.trialEndsAt).toLocaleDateString('fr-FR')}`
                : 'Abonnement actif'
              }
            </div>
            <Link href="/dashboard/parametres" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs rounded-lg transition-all">
              Gérer →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

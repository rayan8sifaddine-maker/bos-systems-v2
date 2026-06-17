import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { formatTime, formatCurrency, STATUS_COLORS, STATUS_LABELS } from '@/lib/utils'
import Link from 'next/link'
import { PlanModalTrigger } from '@/components/dashboard/plan-modal-trigger'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Dashboard' }

function DonutStat({ pct, color, bg, label, sub }: { pct: number; color: string; bg: string; label: string; sub: string }) {
  const r = 15.5
  const circumference = 2 * Math.PI * r
  const offset = circumference - (Math.min(Math.max(pct, 0), 100) / 100) * circumference
  return (
    <div className="stat-card animate-slide-up hover:-translate-y-0.5 hover:shadow-md transition-all" style={{ animationDelay: '240ms' }}>
      <div className="flex items-center justify-between">
        <span className="stat-label">{label}</span>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <svg width="48" height="48" viewBox="0 0 36 36" className="-rotate-90 flex-shrink-0">
          <circle cx="18" cy="18" r={r} fill="none" stroke={bg} strokeWidth="4" />
          <circle
            cx="18" cy="18" r={r} fill="none" stroke={color} strokeWidth="4"
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)' }}
          />
        </svg>
        <div>
          <div className="stat-value text-2xl">{pct}%</div>
          <div className="stat-sub">{sub}</div>
        </div>
      </div>
    </div>
  )
}

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
  ])

  const clientGrowth = newLastMonth > 0 ? Math.round(((newThisMonth - newLastMonth) / newLastMonth) * 100) : 0
  const apptGrowth = lastMonthAppts > 0 ? Math.round(((monthAppts - lastMonthAppts) / lastMonthAppts) * 100) : 0
  const noShowRate = monthAppts > 0 ? Math.round((noShowThisMonth / monthAppts) * 100) : 0

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
  ]

  const dateLabel = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 lg:p-7 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ background: 'linear-gradient(135deg, #0C0E12 0%, #1A2040 100%)', boxShadow: '0 12px 28px rgba(12,14,18,0.16)' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position: 'absolute', top: '-40%', right: '-5%', width: 320, height: 320, background: 'radial-gradient(ellipse, rgba(26,86,255,0.25) 0%, transparent 60%)', borderRadius: '50%' }} />
          <div className="absolute inset-0 bg-grid-watermark-dark" style={{ maskImage: 'linear-gradient(to right, transparent, black 40%, black 100%)' }} />
        </div>
        <div className="relative">
          <h1 className="text-2xl font-bold tracking-tight text-white font-display">Bonjour, {clinic.name.split(' ')[0]} 👋</h1>
          <p className="text-sm text-white/40 mt-1 capitalize">{dateLabel}</p>
        </div>
        <Link href="/dashboard/rendez-vous" className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#0C0E12] bg-white hover:bg-gray-50 transition-all hover:-translate-y-0.5 flex-shrink-0 w-fit">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Nouveau RDV
        </Link>
      </div>

      {/* Trial countdown */}
      {clinic.trialEndsAt && new Date(clinic.trialEndsAt) > now && (() => {
        const daysLeft = Math.max(1, Math.ceil((new Date(clinic.trialEndsAt).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
        const urgent = daysLeft <= 3
        return (
          <div className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5 mb-8 border ${urgent ? 'bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20' : 'bg-[#EEF2FF] border-[rgba(26,86,255,0.15)] dark:bg-[#1A56FF]/10 dark:border-[#1A56FF]/20'}`}>
            <div className="flex items-center gap-3">
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${urgent ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/15' : 'bg-white text-[#1A56FF] dark:bg-white/5'}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </span>
              <div>
                <div className={`text-sm font-semibold ${urgent ? 'text-amber-800 dark:text-amber-400' : 'text-[#0C0E12] dark:text-[#F1F2F4]'}`}>
                  {daysLeft === 1 ? 'Dernier jour de votre essai gratuit' : `${daysLeft} jours restants sur votre essai gratuit`}
                </div>
                <div className={`text-xs ${urgent ? 'text-amber-700/70 dark:text-amber-400/70' : 'text-[#7A7F8E] dark:text-[#9CA3AF]'}`}>Passez au plan Pro pour garder l&apos;accès à toutes les fonctionnalités.</div>
              </div>
            </div>
            <PlanModalTrigger className={`flex-shrink-0 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${urgent ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-[#0C0E12] text-white hover:bg-[#1A1D24] dark:bg-[#1A56FF] dark:hover:bg-[#1444DD]'}`}>
              Choisir un plan
            </PlanModalTrigger>
          </div>
        )
      })()}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="stat-card animate-slide-up hover:-translate-y-0.5 hover:shadow-md transition-all" style={{ animationDelay: `${i * 60}ms` }}>
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
        <DonutStat
          pct={100 - noShowRate}
          color={noShowRate > 15 ? '#F59E0B' : '#10B981'}
          bg="#F0F2F5"
          label="Taux de présence"
          sub={`${noShowRate}% d'absences ce mois`}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's appointments */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[rgba(12,14,18,0.06)] dark:border-white/10">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#0C0E12] dark:text-[#F1F2F4]">Rendez-vous du jour</h2>
              {recentAppts.length > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF2FF] text-[#1A56FF] dark:bg-[#1A56FF]/10 dark:text-[#5B8DFF]">
                  {recentAppts.length}
                </span>
              )}
            </div>
            <Link href="/dashboard/rendez-vous" className="text-xs text-[#1A56FF] hover:underline font-medium">Voir tout →</Link>
          </div>
          <div>
            {recentAppts.length === 0 ? (
              <div className="empty-state">
                <div className="w-14 h-14 rounded-2xl bg-[#F7F8FA] flex items-center justify-center mb-4 text-[#B0B5C3] dark:bg-[#13151A] dark:text-[#5A5F6B]">
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
                <div key={a.id} className={`flex items-center gap-4 px-6 py-3.5 hover:bg-[#F7F8FA] dark:hover:bg-white/5 transition-colors duration-150 ${i < recentAppts.length - 1 ? 'border-b border-[rgba(12,14,18,0.04)] dark:border-white/5' : ''}`}>
                  <div className="w-12 text-center flex-shrink-0">
                    <div className="text-sm font-bold text-[#0C0E12] dark:text-[#F1F2F4]">{formatTime(a.datetime)}</div>
                  </div>
                  <div className="w-px h-8 bg-[rgba(12,14,18,0.06)] dark:bg-white/10" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#0C0E12] dark:text-[#F1F2F4] truncate">{a.patientName}</div>
                    <div className="text-xs text-[#7A7F8E] dark:text-[#9CA3AF]">{a.type}</div>
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
            <h3 className="text-sm font-semibold text-[#0C0E12] dark:text-[#F1F2F4] mb-4">Pipeline clients</h3>
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
                      <span className="text-[#3A3D45] dark:text-[#9CA3AF] font-medium">{label}</span>
                      <span className="font-semibold text-[#0C0E12] dark:text-[#F1F2F4]">{count} <span className="text-[#B0B5C3] dark:text-[#5A5F6B] font-normal">({pct}%)</span></span>
                    </div>
                    <div className="h-1.5 bg-[#F0F2F5] dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: bg }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-[#0C0E12] dark:text-[#F1F2F4] mb-3">Actions rapides</h3>
            <div className="space-y-1">
              {[
                {
                  label: 'Ajouter un client',
                  href: '/dashboard/crm',
                  icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 12c0-2.761 2.239-5 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M10 8v4M8 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                  color: 'text-blue-500 bg-blue-50',
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
                <Link key={a.href} href={a.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F7F8FA] dark:hover:bg-white/5 transition-colors group">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${a.color}`}>{a.icon}</span>
                  <span className="text-sm text-[#3A3D45] dark:text-[#9CA3AF] group-hover:text-[#0C0E12] dark:group-hover:text-[#F1F2F4] transition-colors">{a.label}</span>
                  <svg className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#B0B5C3] dark:text-[#5A5F6B]" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Plan card */}
          <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C0E12 0%, #1A2040 100%)', boxShadow: '0 12px 28px rgba(12,14,18,0.18)' }}>
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10" aria-hidden>
              <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, #1A56FF, transparent)', borderRadius: '50%' }} />
            </div>
            {/* Logo-grid watermark */}
            <div className="absolute -bottom-3 -right-3 opacity-[0.07]" aria-hidden>
              <svg width="64" height="64" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
              </svg>
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
              <PlanModalTrigger className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-medium rounded-lg transition-all">
                Gérer le plan →
              </PlanModalTrigger>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

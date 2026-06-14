import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { formatCurrency, STATUS_LABELS } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Analytics' }

/* ─── Mini line chart ─────────────────────────────────────── */
function Sparkline({ values, color = '#1A56FF' }: { values: number[]; color?: string }) {
  if (values.length < 2) return null
  const W = 100, H = 40
  const safe = Math.max(...values, 1)
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * W,
    H - (v / safe) * H * 0.8 - 4,
  ])
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${d} L${W},${H} L0,${H} Z`
  const id = `spark-${color.replace('#', '')}`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: 40 }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`}/>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ─── Bar chart ───────────────────────────────────────────── */
function BarChart({ data, max }: { data: { label: string; value: number; clients: number }[]; max: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2 px-1" style={{ height: 120 }}>
        {data.map((m, i) => {
          const pct = max > 0 ? Math.max((m.value / max) * 100, 2) : 2
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
              <span className="text-[10px] font-bold text-[#0C0E12]">{m.value}</span>
              <div
                className="w-full rounded-t-lg"
                style={{
                  height: `${pct}%`,
                  maxHeight: 85,
                  minHeight: 4,
                  background: i === data.length - 1
                    ? 'linear-gradient(to top, #1A56FF, #6BA3FF)'
                    : 'linear-gradient(to top, rgba(26,86,255,0.3), rgba(107,163,255,0.3))',
                }}
              />
            </div>
          )
        })}
      </div>
      <div className="flex gap-2 px-1">
        {data.map((m, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[10px] text-[#B0B5C3] capitalize">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Stat card ───────────────────────────────────────────── */
function KpiCard({ label, value, sub, trend, color, bg, icon }: {
  label: string; value: string; sub?: string; trend?: number | null
  color: string; bg: string
  icon: React.ReactNode
}) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <span className="stat-label">{label}</span>
        <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg, color }}>
          {icon}
        </span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="flex flex-col gap-0.5">
        {sub && <div className="stat-sub">{sub}</div>}
        {trend !== undefined && trend !== null && (
          <span className={`inline-flex items-center gap-1 text-xs font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend >= 0
              ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2v6M2 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            }
            {Math.abs(trend)}% vs mois précédent
          </span>
        )}
      </div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────── */
export default async function AnalyticsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) redirect('/inscription')

  const now = new Date()
  const monthStart     = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth()-1, 1)
  const lastMonthEnd   = new Date(now.getFullYear(), now.getMonth(), 0)
  const last6Months    = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    return { year: d.getFullYear(), month: d.getMonth(), label: d.toLocaleDateString('fr-FR', { month: 'short' }) }
  })

  const [
    totalClients, newThisMonth, newLastMonth,
    totalAppts, monthAppts, lastMonthAppts,
    confirmedMonth, noShowMonth, canceledMonth,
    clientsByStatus, apptsByType,
    paidRevenue, draftRevenue,
    invoicesByStatus,
  ] = await Promise.all([
    prisma.client.count({ where: { clinicId: clinic.id } }),
    prisma.client.count({ where: { clinicId: clinic.id, createdAt: { gte: monthStart } } }),
    prisma.client.count({ where: { clinicId: clinic.id, createdAt: { gte: lastMonthStart, lte: lastMonthEnd } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: monthStart } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: lastMonthStart, lte: lastMonthEnd } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: monthStart }, status: 'CONFIRMED' } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: monthStart }, status: 'NO_SHOW' } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: monthStart }, status: 'CANCELED' } }),
    prisma.client.groupBy({ by: ['status'], where: { clinicId: clinic.id }, _count: true }),
    prisma.appointment.groupBy({ by: ['type'], where: { clinicId: clinic.id }, _count: true, orderBy: { _count: { type: 'desc' } } }),
    prisma.invoice.aggregate({ where: { clinicId: clinic.id, status: 'PAID' }, _sum: { amount: true } }),
    prisma.invoice.aggregate({ where: { clinicId: clinic.id, status: { not: 'PAID' } }, _sum: { amount: true } }),
    prisma.invoice.groupBy({ by: ['status'], where: { clinicId: clinic.id }, _count: true }),
  ])

  const monthlyData = await Promise.all(
    last6Months.map(async m => {
      const start = new Date(m.year, m.month, 1)
      const end   = new Date(m.year, m.month + 1, 0)
      const [count, clients] = await Promise.all([
        prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: start, lte: end } } }),
        prisma.client.count({ where: { clinicId: clinic.id, createdAt: { gte: start, lte: end } } }),
      ])
      return { ...m, value: count, clients }
    })
  )

  const clientGrowth = newLastMonth > 0 ? Math.round(((newThisMonth - newLastMonth) / newLastMonth) * 100) : 0
  const apptGrowth   = lastMonthAppts > 0 ? Math.round(((monthAppts - lastMonthAppts) / lastMonthAppts) * 100) : 0
  const noShowRate   = monthAppts > 0 ? Math.round((noShowMonth / monthAppts) * 100) : 0
  const confirmRate  = monthAppts > 0 ? Math.round((confirmedMonth / monthAppts) * 100) : 0
  const activeCount  = clientsByStatus.find(s => s.status === 'ACTIVE')?._count ?? 0
  const convRate     = totalClients > 0 ? Math.round((activeCount / totalClients) * 100) : 0
  const maxAppts     = Math.max(...monthlyData.map(m => m.value), 1)
  const maxClients   = Math.max(...monthlyData.map(m => m.clients), 1)
  const paidAmt      = paidRevenue._sum.amount ?? 0
  const pendingAmt   = draftRevenue._sum.amount ?? 0

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Performance et statistiques de {clinic.name}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#7A7F8E] bg-white border border-[rgba(12,14,18,0.08)] rounded-xl px-4 py-2" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.05)' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1.5" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          {now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard
          label="Clients totaux"
          value={totalClients.toString()}
          sub={`+${newThisMonth} ce mois`}
          trend={clientGrowth}
          color="#1A56FF" bg="#EEF2FF"
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M1 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="14" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M17 11c0-2.21-1.343-4-3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        />
        <KpiCard
          label="RDV ce mois"
          value={monthAppts.toString()}
          sub={`${totalAppts} au total`}
          trend={apptGrowth}
          color="#7C3AED" bg="#F5F3FF"
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2.5" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 1v3M12 1v3M2 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="5" y="11" width="2.5" height="2.5" rx="0.5" fill="currentColor"/></svg>}
        />
        <KpiCard
          label="Taux de conversion"
          value={`${convRate}%`}
          sub={`${activeCount} clients actifs`}
          color="#10B981" bg="#ECFDF5"
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 13l4-5 3 3 4-6 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        />
        <KpiCard
          label="CA encaissé"
          value={formatCurrency(paidAmt)}
          sub={`${formatCurrency(pendingAmt)} en attente`}
          color="#F59E0B" bg="#FFFBEB"
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5v1.5M9 11.5V13M6.5 8.5c0-1.1.895-2 2-2h1a1.5 1.5 0 010 3h-1a1.5 1.5 0 000 3h1c1.105 0 2-.9 2-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>}
        />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">

        {/* RDV bar chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-[#0C0E12]">Rendez-vous — 6 derniers mois</h3>
              <p className="text-xs text-[#B0B5C3] mt-0.5">Nombre de RDV par mois</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              {apptGrowth >= 0 ? '+' : ''}{apptGrowth}%
            </div>
          </div>
          <div className="mt-6">
            <BarChart data={monthlyData} max={maxAppts} />
          </div>
          {/* Sparkline clients */}
          <div className="mt-4 pt-4 border-t border-[rgba(12,14,18,0.06)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#7A7F8E]">Nouveaux clients / mois</span>
              <span className="text-xs font-semibold text-[#0C0E12]">+{newThisMonth} ce mois</span>
            </div>
            <Sparkline values={monthlyData.map(m => m.clients)} color="#10B981" />
          </div>
        </div>

        {/* Quality metrics */}
        <div className="card p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#0C0E12]">Qualité des RDV ce mois</h3>
            <p className="text-xs text-[#B0B5C3] mt-0.5">{monthAppts} rendez-vous analysés</p>
          </div>

          {/* Donut-style summary */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Confirmés', count: confirmedMonth, rate: confirmRate, color: '#10B981', bg: '#ECFDF5' },
              { label: 'Absences', count: noShowMonth, rate: noShowRate, color: '#EF4444', bg: '#FEF2F2' },
              { label: 'Annulés', count: canceledMonth, rate: monthAppts > 0 ? Math.round((canceledMonth/monthAppts)*100) : 0, color: '#F59E0B', bg: '#FFFBEB' },
            ].map(m => (
              <div key={m.label} className="rounded-xl p-3 text-center" style={{ background: m.bg }}>
                <div className="text-xl font-bold" style={{ color: m.color }}>{m.rate}%</div>
                <div className="text-xs font-medium text-[#0C0E12] mt-0.5">{m.label}</div>
                <div className="text-[10px] text-[#B0B5C3]">{m.count} RDV</div>
              </div>
            ))}
          </div>

          <div className="space-y-3.5">
            {[
              { label: 'Taux de confirmation', value: confirmRate, color: '#10B981', bg: '#ECFDF5' },
              { label: 'Taux d\'absence', value: noShowRate, color: '#EF4444', bg: '#FEF2F2' },
              { label: 'Taux d\'annulation', value: monthAppts > 0 ? Math.round((canceledMonth/monthAppts)*100) : 0, color: '#F59E0B', bg: '#FFFBEB' },
            ].map(m => (
              <div key={m.label}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#3A3D45]">{m.label}</span>
                  <span className="font-bold" style={{ color: m.color }}>{m.value}%</span>
                </div>
                <div className="h-2 bg-[#F0F2F5] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width:`${m.value}%`, background: m.color }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Client pipeline */}
        <div className="card p-6">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-[#0C0E12]">Pipeline clients</h3>
            <p className="text-xs text-[#B0B5C3] mt-0.5">{totalClients} clients au total</p>
          </div>
          <div className="space-y-4">
            {[
              { status: 'LEAD', label: 'Prospects', color: '#7C3AED', bg: '#F5F3FF' },
              { status: 'ACTIVE', label: 'Actifs', color: '#10B981', bg: '#ECFDF5' },
              { status: 'INACTIVE', label: 'Inactifs', color: '#94A3B8', bg: '#F8FAFC' },
            ].map(({ status, label, color, bg }) => {
              const count = clientsByStatus.find(s => s.status === status)?._count ?? 0
              const pct = totalClients > 0 ? Math.round((count / totalClients) * 100) : 0
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: color }}/>
                      <span className="text-xs text-[#3A3D45] font-medium">{label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#0C0E12]">{count}</span>
                      <span className="text-xs text-[#B0B5C3] ml-1">({pct}%)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-[#F0F2F5] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width:`${pct}%`, background: color }}/>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-[rgba(12,14,18,0.06)] flex items-center justify-between">
            <span className="text-xs text-[#7A7F8E]">Conversion globale</span>
            <span className="text-2xl font-bold text-[#0C0E12]">{convRate}%</span>
          </div>
        </div>

        {/* Top types */}
        <div className="card p-6">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-[#0C0E12]">Types de RDV</h3>
            <p className="text-xs text-[#B0B5C3] mt-0.5">Les plus fréquents</p>
          </div>
          <div className="space-y-3">
            {apptsByType.slice(0, 5).map((t, i) => {
              const pct = totalAppts > 0 ? Math.round((t._count / totalAppts) * 100) : 0
              const colors = ['#1A56FF','#7C3AED','#10B981','#F59E0B','#EF4444']
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 text-white" style={{ background: colors[i] }}>
                    {i+1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#3A3D45] truncate font-medium">{t.type}</span>
                      <span className="text-xs font-bold text-[#0C0E12] ml-2">{t._count}</span>
                    </div>
                    <div className="h-1.5 bg-[#F0F2F5] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width:`${pct}%`, background: colors[i] }}/>
                    </div>
                  </div>
                </div>
              )
            })}
            {apptsByType.length === 0 && (
              <div className="text-center py-6 text-xs text-[#B0B5C3]">Aucun rendez-vous enregistré</div>
            )}
          </div>
        </div>

        {/* Revenue */}
        <div className="card p-6">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-[#0C0E12]">Facturation</h3>
            <p className="text-xs text-[#B0B5C3] mt-0.5">Synthèse financière</p>
          </div>

          <div className="space-y-1 mb-5">
            {invoicesByStatus.map(s => {
              const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
                PAID:    { label: 'Payées', color: '#10B981', bg: '#ECFDF5' },
                SENT:    { label: 'Envoyées', color: '#1A56FF', bg: '#EEF2FF' },
                DRAFT:   { label: 'Brouillons', color: '#94A3B8', bg: '#F8FAFC' },
                OVERDUE: { label: 'En retard', color: '#EF4444', bg: '#FEF2F2' },
              }
              const cfg = statusConfig[s.status] ?? { label: s.status, color: '#94A3B8', bg: '#F8FAFC' }
              return (
                <div key={s.status} className="flex items-center justify-between p-3 rounded-xl" style={{ background: cfg.bg }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }}/>
                    <span className="text-xs font-medium text-[#3A3D45]">{cfg.label}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: cfg.color }}>{s._count} facture{s._count > 1 ? 's' : ''}</span>
                </div>
              )
            })}
            {invoicesByStatus.length === 0 && (
              <div className="text-center py-4 text-xs text-[#B0B5C3]">Aucune facture</div>
            )}
          </div>

          <div className="pt-4 border-t border-[rgba(12,14,18,0.06)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#7A7F8E]">Total encaissé</span>
              <span className="text-lg font-bold text-emerald-600">{formatCurrency(paidAmt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#7A7F8E]">En attente</span>
              <span className="text-sm font-semibold text-amber-600">{formatCurrency(pendingAmt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

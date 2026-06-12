import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { formatCurrency, STATUS_LABELS } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Analytics' }

function StatCard({ label, value, sub, trend }: { label: string; value: string; sub?: string; trend?: number | null }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
      {trend !== undefined && trend !== null && (
        <span className={`text-xs font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs mois précédent
        </span>
      )}
    </div>
  )
}

export default async function AnalyticsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) redirect('/inscription')

  const now = new Date()
  const monthStart      = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastMonthStart  = new Date(now.getFullYear(), now.getMonth()-1, 1)
  const lastMonthEnd    = new Date(now.getFullYear(), now.getMonth(), 0)
  const last6Months     = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    return { year: d.getFullYear(), month: d.getMonth(), label: d.toLocaleDateString('fr-FR', { month: 'short' }) }
  })

  const [
    totalClients, newThisMonth, newLastMonth,
    totalAppts, monthAppts, lastMonthAppts,
    confirmedMonth, noShowMonth, canceledMonth,
    clientsByStatus, apptsByType, apptsBySource,
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
    prisma.appointment.groupBy({ by: ['source'], where: { clinicId: clinic.id }, _count: true }),
    prisma.invoice.aggregate({ where: { clinicId: clinic.id, status: 'PAID' }, _sum: { amount: true } }),
    prisma.invoice.aggregate({ where: { clinicId: clinic.id, status: { not: 'PAID' } }, _sum: { amount: true } }),
    prisma.invoice.groupBy({ by: ['status'], where: { clinicId: clinic.id }, _count: true }),
  ])

  // Monthly appointment data for last 6 months
  const monthlyData = await Promise.all(
    last6Months.map(async m => {
      const start = new Date(m.year, m.month, 1)
      const end   = new Date(m.year, m.month + 1, 0)
      const [count, clients] = await Promise.all([
        prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: start, lte: end } } }),
        prisma.client.count({ where: { clinicId: clinic.id, createdAt: { gte: start, lte: end } } }),
      ])
      return { ...m, count, clients }
    })
  )

  const clientGrowth = newLastMonth > 0 ? Math.round(((newThisMonth - newLastMonth) / newLastMonth) * 100) : 0
  const apptGrowth   = lastMonthAppts > 0 ? Math.round(((monthAppts - lastMonthAppts) / lastMonthAppts) * 100) : 0
  const noShowRate   = monthAppts > 0 ? Math.round((noShowMonth / monthAppts) * 100) : 0
  const confirmRate  = monthAppts > 0 ? Math.round((confirmedMonth / monthAppts) * 100) : 0
  const activeCount  = clientsByStatus.find(s => s.status === 'ACTIVE')?._count ?? 0
  const convRate     = totalClients > 0 ? Math.round((activeCount / totalClients) * 100) : 0
  const maxAppts     = Math.max(...monthlyData.map(m => m.count), 1)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Performance et statistiques de votre établissement</p>
        </div>
        <div className="text-xs text-[#7A7F8E] bg-white border border-[rgba(12,14,18,0.08)] rounded-lg px-3 py-1.5">
          {now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Clients totaux" value={totalClients.toString()} sub={`+${newThisMonth} ce mois`} trend={clientGrowth} />
        <StatCard label="RDV ce mois" value={monthAppts.toString()} sub={`${totalAppts} au total`} trend={apptGrowth} />
        <StatCard label="Taux de conversion" value={`${convRate}%`} sub={`${activeCount} clients actifs`} />
        <StatCard label="CA facturé payé" value={formatCurrency(paidRevenue._sum.amount ?? 0)} sub={formatCurrency(draftRevenue._sum.amount ?? 0) + ' en attente'} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* RDV trend chart */}
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-[#0C0E12] mb-6">Tendance des rendez-vous</h3>
          <div className="flex items-end gap-2 h-32">
            {monthlyData.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F7F8FA] rounded-t-lg overflow-hidden" style={{ height: '96px' }}>
                  <div
                    className="w-full bg-[#1A56FF] rounded-t-lg transition-all mt-auto"
                    style={{ height: `${(m.count / maxAppts) * 100}%`, marginTop: 'auto' }}
                  />
                </div>
                <div className="w-full relative" style={{ height: '96px', position: 'absolute', bottom: 0 }}>
                </div>
                <span className="text-[10px] text-[#B0B5C3]">{m.label}</span>
                <span className="text-xs font-semibold text-[#0C0E12]">{m.count}</span>
              </div>
            ))}
          </div>
          {/* Better chart rendering */}
          <div className="flex items-end gap-2" style={{ height: '120px' }}>
            {monthlyData.map((m, i) => {
              const pct = Math.max((m.count / maxAppts) * 100, 2)
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                  <span className="text-xs font-bold text-[#0C0E12]">{m.count}</span>
                  <div
                    className="w-full bg-gradient-to-t from-[#1A56FF] to-[#4B7BFF] rounded-t-lg transition-all"
                    style={{ height: `${pct}px`, maxHeight: '80px', minHeight: '4px' }}
                  />
                  <span className="text-[10px] text-[#B0B5C3]">{m.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quality metrics */}
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-[#0C0E12] mb-6">Qualité des RDV (ce mois)</h3>
          <div className="space-y-4">
            {[
              { label: 'Taux de confirmation', value: confirmRate, color: 'bg-emerald-400', count: confirmedMonth },
              { label: 'Taux d\'absence', value: noShowRate, color: 'bg-red-400', count: noShowMonth },
              { label: 'Taux d\'annulation', value: monthAppts > 0 ? Math.round((canceledMonth / monthAppts) * 100) : 0, color: 'bg-amber-400', count: canceledMonth },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#3A3D45]">{m.label}</span>
                  <span className="font-semibold text-[#0C0E12]">{m.value}% <span className="text-[#B0B5C3] font-normal">({m.count} RDV)</span></span>
                </div>
                <div className="h-2 bg-[#F0F2F5] rounded-full overflow-hidden">
                  <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-[rgba(12,14,18,0.06)]">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-[#0C0E12]">{confirmedMonth}</div>
                <div className="text-[10px] text-[#7A7F8E]">Confirmés</div>
              </div>
              <div>
                <div className="text-lg font-bold text-[#0C0E12]">{noShowMonth}</div>
                <div className="text-[10px] text-[#7A7F8E]">Absents</div>
              </div>
              <div>
                <div className="text-lg font-bold text-[#0C0E12]">{canceledMonth}</div>
                <div className="text-[10px] text-[#7A7F8E]">Annulés</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Client pipeline */}
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-[#0C0E12] mb-4">Pipeline clients</h3>
          <div className="space-y-3">
            {clientsByStatus.map(s => {
              const pct = totalClients > 0 ? Math.round((s._count / totalClients) * 100) : 0
              const colors: Record<string, string> = { LEAD: 'bg-purple-400', ACTIVE: 'bg-emerald-400', INACTIVE: 'bg-gray-300' }
              return (
                <div key={s.status}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#3A3D45]">{STATUS_LABELS[s.status]}</span>
                    <span className="font-semibold text-[#0C0E12]">{s._count} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-[#F0F2F5] rounded-full">
                    <div className={`h-full ${colors[s.status] ?? 'bg-gray-300'} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-[rgba(12,14,18,0.06)]">
            <div className="text-xs text-[#7A7F8E]">Conversion globale</div>
            <div className="text-2xl font-bold text-[#0C0E12]">{convRate}%</div>
          </div>
        </div>

        {/* Top types */}
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-[#0C0E12] mb-4">Types de RDV</h3>
          <div className="space-y-2.5">
            {apptsByType.slice(0, 5).map((t, i) => {
              const pct = totalAppts > 0 ? Math.round((t._count / totalAppts) * 100) : 0
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#EEF2FF] flex items-center justify-center text-[10px] font-bold text-[#1A56FF]">{i+1}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#3A3D45] truncate">{t.type}</span>
                      <span className="font-semibold text-[#0C0E12] ml-2">{t._count}</span>
                    </div>
                    <div className="h-1 bg-[#F0F2F5] rounded-full">
                      <div className="h-full bg-[#1A56FF] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
            {apptsByType.length === 0 && <p className="text-xs text-[#B0B5C3] text-center py-4">Aucune donnée</p>}
          </div>
        </div>

        {/* Revenue breakdown */}
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-[#0C0E12] mb-4">Facturation</h3>
          <div className="space-y-3">
            {invoicesByStatus.map(s => {
              const colors: Record<string, string> = { PAID: 'text-emerald-600', SENT: 'text-blue-600', DRAFT: 'text-gray-500', OVERDUE: 'text-red-600' }
              return (
                <div key={s.status} className="flex items-center justify-between py-2 border-b border-[rgba(12,14,18,0.04)] last:border-0">
                  <span className="text-sm text-[#3A3D45]">{STATUS_LABELS[s.status] ?? s.status}</span>
                  <span className={`text-sm font-semibold ${colors[s.status] ?? 'text-[#0C0E12]'}`}>{s._count} facture{s._count > 1 ? 's' : ''}</span>
                </div>
              )
            })}
            {invoicesByStatus.length === 0 && <p className="text-xs text-[#B0B5C3] text-center py-4">Aucune facture</p>}
          </div>
          <div className="mt-4 pt-4 border-t border-[rgba(12,14,18,0.06)]">
            <div className="text-xs text-[#7A7F8E] mb-1">Total encaissé</div>
            <div className="text-xl font-bold text-emerald-600">{formatCurrency(paidRevenue._sum.amount ?? 0)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

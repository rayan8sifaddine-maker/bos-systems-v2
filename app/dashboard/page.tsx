notepad app\dashboard\crm\page.tsx

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { formatDate, formatTime, STATUS_COLORS, STATUS_LABELS } from '@/lib/utils'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) redirect('/inscription')

  const now = new Date()
  const todayStart = new Date(now); todayStart.setHours(0,0,0,0)
  const todayEnd = new Date(now); todayEnd.setHours(23,59,59,999)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const [totalClients, todayAppts, monthAppts, recentAppts] = await Promise.all([
    prisma.client.count({ where: { clinicId: clinic.id } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: todayStart, lte: todayEnd } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: monthStart } } }),
    prisma.appointment.findMany({
      where: { clinicId: clinic.id, datetime: { gte: todayStart, lte: todayEnd } },
      orderBy: { datetime: 'asc' },
      take: 6,
    }),
  ])

  const stats = [
    { label: 'Total clients', value: totalClients.toString(), sub: 'enregistrés' },
    { label: 'RDV aujourd\'hui', value: todayAppts.toString(), sub: 'planifiés' },
    { label: 'RDV ce mois', value: monthAppts.toString(), sub: 'ce mois-ci' },
    { label: 'Clinique', value: clinic.plan, sub: 'plan actuel' },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0C0E12]">Tableau de bord</h1>
          <p className="text-sm text-[#7A7F8E] mt-1">{new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</p>
        </div>
        <Link href="/dashboard/rendez-vous" className="btn-primary text-sm px-5 py-2.5">+ Nouveau RDV</Link>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="card p-5">
            <div className="text-xs font-medium text-[#7A7F8E] uppercase tracking-wider mb-3">{s.label}</div>
            <div className="text-3xl font-bold tracking-tight text-[#0C0E12] mb-1">{s.value}</div>
            <div className="text-xs text-[#B0B5C3]">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-[#0C0E12]">Rendez-vous du jour</h2>
          <Link href="/dashboard/rendez-vous" className="text-xs text-[#1A56FF] hover:underline">Voir tout →</Link>
        </div>
        {recentAppts.length === 0 ? (
          <div className="text-center py-12 text-sm text-[#B0B5C3]">
            Aucun rendez-vous aujourd&apos;hui
            <div className="mt-3"><Link href="/dashboard/rendez-vous" className="text-[#1A56FF] hover:underline">Ajouter un RDV</Link></div>
          </div>
        ) : (
          <div className="space-y-2">
            {recentAppts.map(a => (
              <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl border border-[rgba(12,14,18,0.06)] hover:bg-[#F7F8FA] transition-colors">
                <div className="text-sm font-semibold text-[#0C0E12] w-12 flex-shrink-0">{formatTime(a.datetime)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#0C0E12] truncate">{a.patientName}</div>
                  <div className="text-xs text-[#7A7F8E]">{a.type}</div>
                </div>
                <span className={`badge text-[10px] ${STATUS_COLORS[a.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  {STATUS_LABELS[a.status] || a.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

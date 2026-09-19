import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, formatTime, formatRelative, STATUS_COLORS, STATUS_LABELS, initials, avatarColor } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id }, select: { id: true } })
  if (!clinic) redirect('/inscription')

  const client = await prisma.client.findFirst({
    where: { id: params.id, clinicId: clinic.id },
    include: {
      appointments: {
        orderBy: { datetime: 'desc' },
      },
    },
  })

  if (!client) redirect('/dashboard/crm')

  const now = new Date()
  const total = client.appointments.length
  const completed = client.appointments.filter(a => a.status === 'DONE').length
  const noShows = client.appointments.filter(a => a.status === 'NO_SHOW').length
  const upcoming = client.appointments.find(a => new Date(a.datetime) > now && a.status !== 'CANCELED')

  const avatarCls = avatarColor(client.name)
  const statusColor = STATUS_COLORS[client.status] ?? 'bg-gray-50 text-gray-600 border-gray-200'

  const APT_STATUS_COLOR: Record<string, string> = {
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
    CONFIRMED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    CANCELED: 'bg-red-50 text-red-700 border-red-200',
    DONE: 'bg-blue-50 text-blue-700 border-blue-200',
    NO_SHOW: 'bg-gray-50 text-gray-600 border-gray-200',
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="page-header mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/crm"
            className="flex items-center gap-1.5 text-sm text-[#7A7F8E] dark:text-[#9CA3AF] hover:text-[#0C0E12] dark:hover:text-white transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" clipRule="evenodd"/>
            </svg>
            CRM
          </Link>
          <span className="text-[#B0B5C3] dark:text-[#5A5F6B]">/</span>
          <span className="text-sm font-medium text-[#0C0E12] dark:text-white">{client.name}</span>
        </div>
        <Link
          href={`/dashboard/crm?edit=${client.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border border-[#E5E7EB] dark:border-white/10 text-[#3A3D45] dark:text-[#D1D5DB] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
          Modifier
        </Link>
      </div>

      {/* Client profile card */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0 ${avatarCls}`}>
            {initials(client.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="text-xl font-bold text-[#0C0E12] dark:text-white">{client.name}</h1>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusColor}`}>
                {STATUS_LABELS[client.status] ?? client.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-[#7A7F8E] dark:text-[#9CA3AF]">
              {client.phone && (
                <a href={`tel:${client.phone}`} className="flex items-center gap-1.5 hover:text-[#0C0E12] dark:hover:text-white transition-colors">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" clipRule="evenodd"/>
                  </svg>
                  {client.phone}
                </a>
              )}
              {client.email && (
                <a href={`mailto:${client.email}`} className="flex items-center gap-1.5 hover:text-[#0C0E12] dark:hover:text-white transition-colors">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
                  </svg>
                  {client.email}
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-[#B0B5C3] dark:text-[#5A5F6B]">
              <span>Source: <span className="font-medium text-[#7A7F8E] dark:text-[#9CA3AF]">{client.source}</span></span>
              <span>·</span>
              <span>Client depuis <span className="font-medium text-[#7A7F8E] dark:text-[#9CA3AF]">{formatDate(client.createdAt)}</span></span>
              {client.lastContactAt && (
                <>
                  <span>·</span>
                  <span>Dernier contact <span className="font-medium text-[#7A7F8E] dark:text-[#9CA3AF]">{formatRelative(client.lastContactAt)}</span></span>
                </>
              )}
            </div>
            {/* Tags */}
            {client.tags && client.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {client.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#EEF2FF] dark:bg-[#1A56FF]/10 text-[#1A56FF] dark:text-[#93AFFF] border border-[#C7D7FE] dark:border-[#1A56FF]/20">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {client.notes && (
          <div className="mt-5 pt-5 border-t border-[#E5E7EB] dark:border-white/8">
            <div className="text-xs font-semibold text-[#7A7F8E] dark:text-[#9CA3AF] uppercase tracking-wider mb-2">Notes</div>
            <p className="text-sm text-[#3A3D45] dark:text-[#D1D5DB] whitespace-pre-wrap">{client.notes}</p>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total RDV</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-emerald-600 dark:text-emerald-400">{completed}</div>
          <div className="stat-label">Terminés</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-red-500 dark:text-red-400">{noShows}</div>
          <div className="stat-label">No-shows</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-[#1A56FF] dark:text-[#93AFFF]">
            {upcoming ? formatDate(upcoming.datetime) : '—'}
          </div>
          <div className="stat-label">Prochain RDV</div>
        </div>
      </div>

      {/* Upcoming appointment highlight */}
      {upcoming && (
        <div className="card p-4 mb-6 border-l-2 border-l-[#1A56FF] flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1A56FF]/10 text-[#1A56FF] dark:text-[#93AFFF] flex-shrink-0">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M6 2a1 1 0 0 0-1 1v1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1V3a1 1 0 1 0-2 0v1H7V3a1 1 0 0 0-1-1zm0 5a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H6z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-[#1A56FF] dark:text-[#93AFFF] mb-0.5">Prochain rendez-vous</div>
            <div className="text-sm font-medium text-[#0C0E12] dark:text-white">
              {upcoming.type} — {formatDate(upcoming.datetime)} à {formatTime(upcoming.datetime)}
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${APT_STATUS_COLOR[upcoming.status] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
            {STATUS_LABELS[upcoming.status] ?? upcoming.status}
          </span>
        </div>
      )}

      {/* Appointment history */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E5E7EB] dark:border-white/8 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#0C0E12] dark:text-white">Historique des rendez-vous</h2>
          <span className="text-xs text-[#7A7F8E] dark:text-[#9CA3AF]">{total} au total</span>
        </div>

        {client.appointments.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-[#7A7F8E] dark:text-[#9CA3AF]">
            Aucun rendez-vous enregistré
          </div>
        ) : (
          <div className="divide-y divide-[#E5E7EB] dark:divide-white/8">
            {client.appointments.map(apt => (
              <div key={apt.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/50 dark:hover:bg-white/2 transition-colors">
                {/* Date column */}
                <div className="w-24 flex-shrink-0 text-right">
                  <div className="text-sm font-semibold text-[#0C0E12] dark:text-white">{formatDate(apt.datetime)}</div>
                  <div className="text-xs text-[#7A7F8E] dark:text-[#9CA3AF]">{formatTime(apt.datetime)}</div>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-[#E5E7EB] dark:bg-white/8 flex-shrink-0" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#0C0E12] dark:text-white">{apt.type}</div>
                  {apt.notes && (
                    <div className="text-xs text-[#7A7F8E] dark:text-[#9CA3AF] truncate mt-0.5">{apt.notes}</div>
                  )}
                </div>

                {/* Duration */}
                <div className="text-xs text-[#B0B5C3] dark:text-[#5A5F6B] flex-shrink-0 hidden sm:block">
                  {apt.duration} min
                </div>

                {/* Status badge */}
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${APT_STATUS_COLOR[apt.status] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  {STATUS_LABELS[apt.status] ?? apt.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

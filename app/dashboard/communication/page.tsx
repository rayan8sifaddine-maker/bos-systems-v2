import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { formatRelative } from '@/lib/utils'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Communication' }

export default async function CommunicationPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) redirect('/inscription')

  const conversations = await prisma.conversation.findMany({
    where: { clinicId: clinic.id },
    orderBy: { updatedAt: 'desc' },
    include: {
      messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      _count: { select: { messages: true } },
    },
    take: 50,
  })

  const platforms = [
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', active: true },
    { id: 'sms', label: 'SMS', icon: '📱', color: 'bg-blue-50 text-blue-700 border-blue-200', active: false },
    { id: 'email', label: 'Email', icon: '✉️', color: 'bg-purple-50 text-purple-700 border-purple-200', active: false },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Communication</h1>
          <p className="page-subtitle">Centre de messagerie centralisé</p>
        </div>
        <Link href="/dashboard/assistant" className="btn-primary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 2V4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
          Tester l'IA
        </Link>
      </div>

      {/* Channel status */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {platforms.map(p => (
          <div key={p.id} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">{p.icon}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${p.active ? p.color : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                {p.active ? 'Actif' : 'Bientôt'}
              </span>
            </div>
            <div className="text-sm font-semibold text-[#0C0E12]">{p.label}</div>
            <div className="text-xs text-[#B0B5C3] mt-0.5">
              {p.id === 'whatsapp' ? `${conversations.length} conversation${conversations.length !== 1 ? 's' : ''}` : 'Intégration prochaine'}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conversations */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(12,14,18,0.06)]">
            <h3 className="text-sm font-semibold text-[#0C0E12]">Conversations WhatsApp</h3>
          </div>
          <div className="divide-y divide-[rgba(12,14,18,0.04)]">
            {conversations.length === 0 ? (
              <div className="empty-state py-12">
                <div className="empty-icon">💬</div>
                <div className="empty-title">Aucune conversation</div>
                <div className="empty-desc mt-1">Les conversations WhatsApp apparaîtront ici</div>
              </div>
            ) : conversations.map(conv => {
              const lastMsg = conv.messages[0]
              return (
                <div key={conv.id} className="flex items-start gap-3 px-6 py-4 hover:bg-[#F7F8FA] transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-sm flex-shrink-0">💬</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-medium text-[#0C0E12] truncate">{conv.clientName ?? conv.phone ?? 'Inconnu'}</div>
                      <div className="text-[10px] text-[#B0B5C3] flex-shrink-0">{lastMsg ? formatRelative(lastMsg.createdAt) : ''}</div>
                    </div>
                    {lastMsg && (
                      <div className="text-xs text-[#7A7F8E] truncate mt-0.5">
                        {lastMsg.role === 'ASSISTANT' ? '🤖 ' : ''}{lastMsg.content}
                      </div>
                    )}
                    <div className="text-[10px] text-[#B0B5C3] mt-1">{conv._count.messages} message{conv._count.messages !== 1 ? 's' : ''}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-[#0C0E12] mb-4">Modèles de messages</h3>
            <div className="space-y-3">
              {[
                { label: 'Rappel RDV', text: 'Bonjour, nous vous rappelons votre rendez-vous demain à [HEURE]. Répondez OUI pour confirmer.', icon: '🔔' },
                { label: 'Confirmation', text: 'Votre rendez-vous du [DATE] à [HEURE] est bien confirmé. À bientôt !', icon: '✅' },
                { label: 'Relance inactif', text: 'Bonjour [NOM], cela fait un moment que nous n\'avons pas eu de vos nouvelles. Souhaitez-vous reprendre rendez-vous ?', icon: '🔄' },
                { label: 'Satisfaction', text: 'Bonjour [NOM], comment s\'est passée votre visite ? Votre avis nous aide à améliorer nos services.', icon: '⭐' },
              ].map(t => (
                <div key={t.label} className="p-3 card-inset rounded-xl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span>{t.icon}</span>
                    <span className="text-xs font-semibold text-[#0C0E12]">{t.label}</span>
                  </div>
                  <p className="text-xs text-[#7A7F8E] leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-semibold text-[#0C0E12] mb-4">Statistiques</h3>
            <div className="space-y-3">
              {[
                { label: 'Conversations totales', value: conversations.length.toString() },
                { label: 'Messages échangés', value: conversations.reduce((a, c) => a + c._count.messages, 0).toString() },
                { label: 'Taux de réponse IA', value: '< 3 sec' },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-center py-2 border-b border-[rgba(12,14,18,0.04)] last:border-0">
                  <span className="text-sm text-[#7A7F8E]">{s.label}</span>
                  <span className="text-sm font-semibold text-[#0C0E12]">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { formatRelative } from '@/lib/utils'
import Link from 'next/link'
import TemplatesPanel from './templates-panel'

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

  const totalMessages = conversations.reduce((a, c) => a + c._count.messages, 0)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Communication</h1>
          <p className="page-subtitle">Centre de messagerie centralisé</p>
        </div>
        <Link href="/dashboard/assistant" className="btn-primary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5.5 6c0-.55.672-1 1.5-1s1.5.45 1.5 1c0 .74-.9 1.3-1.35 1.65S6.5 8.25 6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="7" cy="10.5" r=".5" fill="currentColor"/></svg>
          Tester l&apos;IA
        </Link>
      </div>

      {/* Channel card */}
      <div className="mb-8">
        <div className="card p-5 hover:-translate-y-0.5 hover:shadow-md transition-all max-w-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#ECFDF5', color: '#10B981' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 18l1.2-4.4A7.9 7.9 0 012 10a8 8 0 108 8 7.9 7.9 0 01-3.6-.8L2 18z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M7.5 7.5c.5 1 1.5 2.5 2.5 3.5s2.5 2 3.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200">
              ● Actif
            </span>
          </div>
          <div className="text-sm font-semibold text-[#0C0E12]">WhatsApp</div>
          <div className="text-xs text-[#B0B5C3] mt-0.5">{conversations.length} conversation{conversations.length !== 1 ? 's' : ''}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Conversations */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(12,14,18,0.06)]">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#0C0E12]">Conversations WhatsApp</h3>
              {conversations.length > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#1A56FF]">{conversations.length}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              IA active
            </div>
          </div>

          {conversations.length === 0 ? (
            <div className="empty-state py-16">
              <div className="w-14 h-14 rounded-2xl bg-[#F7F8FA] flex items-center justify-center mb-4 text-[#B0B5C3]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M2 22l1.5-5.5A9.9 9.9 0 012 12a10 10 0 1010 10 9.9 9.9 0 01-4.5-1L2 22z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="empty-title">Aucune conversation</div>
              <div className="empty-desc mt-1">Les échanges WhatsApp de vos clients apparaîtront ici</div>
            </div>
          ) : (
            <div className="divide-y divide-[rgba(12,14,18,0.04)]">
              {conversations.map(conv => {
                const lastMsg = conv.messages[0]
                const isAI = lastMsg?.role === 'ASSISTANT'
                return (
                  <div key={conv.id} className="flex items-start gap-3 px-6 py-4 hover:bg-[#F7F8FA] transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1.5 14.5l1-3.5a6 6 0 111.5 1.5l-2.5 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-[#0C0E12] truncate">{conv.clientName ?? conv.phone ?? 'Inconnu'}</span>
                        <span className="text-[10px] text-[#B0B5C3] flex-shrink-0">{lastMsg ? formatRelative(lastMsg.createdAt) : ''}</span>
                      </div>
                      {lastMsg && (
                        <div className="flex items-center gap-1 mt-0.5">
                          {isAI && (
                            <span className="text-[9px] font-bold text-[#1A56FF] bg-[#EEF2FF] px-1.5 py-0.5 rounded-full flex-shrink-0">IA</span>
                          )}
                          <span className="text-xs text-[#7A7F8E] truncate">{lastMsg.content}</span>
                        </div>
                      )}
                      <div className="text-[10px] text-[#B0B5C3] mt-1">{conv._count.messages} message{conv._count.messages !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="space-y-4">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Conversations', value: conversations.length.toString(), color: '#10B981', bg: '#ECFDF5', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1.5 12.5l.8-3A5.5 5.5 0 1013.5 8a5.5 5.5 0 00-5.5-5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { label: 'Messages', value: totalMessages.toString(), color: '#1A56FF', bg: '#EEF2FF', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 2V4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
              { label: 'Tps réponse', value: '< 3s', color: '#F59E0B', bg: '#FFFBEB', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
            ].map(s => (
              <div key={s.label} className="card p-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                <div className="text-xl font-bold text-[#0C0E12]" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] text-[#B0B5C3] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Templates */}
          <TemplatesPanel />

          {/* WhatsApp connection banner */}
          <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0C0E12,#1A2040)' }}>
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10" aria-hidden>
              <div style={{ width:'100%', height:'100%', background:'radial-gradient(circle, #10B981, transparent)', borderRadius:'50%' }}/>
            </div>
            <div className="relative flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1.5 14.5l1-3.5a6 6 0 111.5 1.5l-2.5 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Connecter WhatsApp Business</h3>
                <p className="text-xs text-white/40 mb-3 leading-relaxed">Activez l&apos;envoi automatique de messages pour tous vos clients.</p>
                <a href="mailto:support@bossystems.ma?subject=WhatsApp%20Integration" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-medium rounded-lg transition-all">
                  Demander l&apos;intégration →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

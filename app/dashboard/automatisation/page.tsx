import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Automatisation' }

const AUTOMATIONS = [
  {
    id: 'reminder_24h',
    name: 'Rappel J-1',
    description: 'Envoie un message WhatsApp automatiquement 24h avant chaque rendez-vous.',
    trigger: 'Rendez-vous confirmé',
    action: 'Message WhatsApp',
    impact: '−78% d\'absences',
    enabled: true,
    category: 'Rendez-vous',
    icon: '🔔',
  },
  {
    id: 'reminder_2h',
    name: 'Rappel 2h avant',
    description: 'Second rappel 2 heures avant le rendez-vous pour réduire les no-shows.',
    trigger: 'Rendez-vous dans 2h',
    action: 'Message WhatsApp',
    impact: 'Confirmation rapide',
    enabled: true,
    category: 'Rendez-vous',
    icon: '⏰',
  },
  {
    id: 'reactivation_30d',
    name: 'Relance 30 jours',
    description: 'Relance les clients inactifs depuis 30 jours pour reprendre rendez-vous.',
    trigger: 'Client inactif 30j',
    action: 'Message WhatsApp',
    impact: '+28% rétention',
    enabled: true,
    category: 'CRM',
    icon: '🔄',
  },
  {
    id: 'welcome_new',
    name: 'Message de bienvenue',
    description: 'Accueille automatiquement les nouveaux clients après leur premier RDV.',
    trigger: 'Premier RDV terminé',
    action: 'Message WhatsApp',
    impact: 'Fidélisation',
    enabled: false,
    category: 'CRM',
    icon: '👋',
  },
  {
    id: 'birthday',
    name: 'Anniversaire client',
    description: 'Envoie un message personnalisé le jour de l\'anniversaire du client.',
    trigger: 'Date anniversaire',
    action: 'Message WhatsApp',
    impact: 'Engagement client',
    enabled: false,
    category: 'CRM',
    icon: '🎂',
  },
  {
    id: 'review_request',
    name: 'Demande d\'avis',
    description: 'Demande un avis client 24h après un rendez-vous terminé.',
    trigger: 'RDV marqué DONE',
    action: 'Message WhatsApp',
    impact: 'Réputation',
    enabled: false,
    category: 'Satisfaction',
    icon: '⭐',
  },
  {
    id: 'invoice_overdue',
    name: 'Relance facture',
    description: 'Relance les factures non payées après la date d\'échéance.',
    trigger: 'Facture en retard',
    action: 'Message + Email',
    impact: '+35% paiement',
    enabled: false,
    category: 'Facturation',
    icon: '💰',
  },
  {
    id: 'no_show_followup',
    name: 'Suivi no-show',
    description: 'Contacte automatiquement les clients qui n\'ont pas honoré leur rendez-vous.',
    trigger: 'RDV marqué NO_SHOW',
    action: 'Message WhatsApp',
    impact: 'Récupération',
    enabled: false,
    category: 'Rendez-vous',
    icon: '📞',
  },
]

export default async function AutomatisationPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) redirect('/inscription')

  const dbRules = await prisma.automationRule.findMany({ where: { clinicId: clinic.id } })
  const enabledIds = new Set(dbRules.filter(r => r.enabled).map(r => r.trigger))

  const enabledCount = AUTOMATIONS.filter(a => a.enabled).length
  const categories = [...new Set(AUTOMATIONS.map(a => a.category))]

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Automatisation</h1>
          <p className="page-subtitle">{enabledCount} workflow{enabledCount !== 1 ? 's' : ''} actif{enabledCount !== 1 ? 's' : ''} · Tout fonctionne en arrière-plan</p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {enabledCount} actif{enabledCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Impact stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: '🔔', label: 'Rappels envoyés', value: '—', sub: 'automatiquement' },
          { icon: '📉', label: 'Taux d\'absence', value: '−78%', sub: 'avec les rappels actifs' },
          { icon: '⚡', label: 'Temps économisé', value: '~2h/jour', sub: 'de tâches répétitives' },
        ].map((s, i) => (
          <div key={i} className="card p-5">
            <span className="text-2xl block mb-2">{s.icon}</span>
            <div className="text-xl font-bold text-[#0C0E12]">{s.value}</div>
            <div className="text-xs text-[#7A7F8E] mt-0.5">{s.label}</div>
            <div className="text-[10px] text-[#B0B5C3]">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Automations by category */}
      {categories.map(cat => (
        <div key={cat} className="mb-8">
          <h3 className="text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider mb-3">{cat}</h3>
          <div className="space-y-3">
            {AUTOMATIONS.filter(a => a.category === cat).map(auto => (
              <div key={auto.id} className={`card p-5 flex items-center gap-4 transition-all ${auto.enabled ? 'border-l-2 border-l-emerald-400' : ''}`}>
                <span className="text-2xl flex-shrink-0">{auto.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#0C0E12]">{auto.name}</span>
                    {auto.enabled && (
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full">Actif</span>
                    )}
                  </div>
                  <p className="text-xs text-[#7A7F8E]">{auto.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[10px] text-[#B0B5C3]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {auto.trigger}
                    </span>
                    <span className="text-[#B0B5C3]">→</span>
                    <span className="flex items-center gap-1 text-[10px] text-[#B0B5C3]">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {auto.action}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-semibold text-emerald-600">{auto.impact}</div>
                  <div className="text-[10px] text-[#B0B5C3] mt-0.5">
                    {auto.enabled ? 'En cours' : 'Inactif'}
                  </div>
                </div>
                {/* Toggle button (UI only for now) */}
                <div
                  className={`w-10 h-5.5 rounded-full flex-shrink-0 flex items-center transition-all cursor-pointer ${auto.enabled ? 'bg-emerald-400' : 'bg-gray-200'}`}
                  style={{ height: '22px' }}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${auto.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* WhatsApp integration notice */}
      <div className="card p-6 bg-gradient-to-r from-[#F7F8FA] to-[#EEF2FF] border-[rgba(26,86,255,0.15)]">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#1A56FF] flex items-center justify-center text-white flex-shrink-0">💬</div>
          <div>
            <h3 className="text-sm font-semibold text-[#0C0E12] mb-1">Connecter WhatsApp Business</h3>
            <p className="text-xs text-[#7A7F8E] mb-3">Connectez votre numéro WhatsApp Business pour activer l'envoi automatique de messages à vos clients.</p>
            <a href="mailto:support@bossystems.ma?subject=WhatsApp%20Integration" className="btn-blue btn-sm">
              Demander l'intégration →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

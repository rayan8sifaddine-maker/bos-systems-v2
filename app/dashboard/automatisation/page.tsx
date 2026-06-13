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
    bg: '#ECFDF5', color: '#059669',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M10 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 4 14h12a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6zm0 16a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 10 18z"/>
      </svg>
    ),
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
    bg: '#FFF7ED', color: '#EA580C',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-12a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l2.828 2.829a1 1 0 1 0 1.415-1.415L11 9.586V6z" clipRule="evenodd"/>
      </svg>
    ),
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
    bg: '#EEF2FF', color: '#1A56FF',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M4 2a1 1 0 0 1 1 1v2.101a7.002 7.002 0 0 1 11.601 2.566 1 1 0 1 1-1.885.666A5.002 5.002 0 0 0 5.999 7H9a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm.008 9.057a1 1 0 0 1 1.276.61A5.002 5.002 0 0 0 14.001 13H11a1 1 0 1 1 0-2h5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-2.101a7.002 7.002 0 0 1-11.601-2.566 1 1 0 0 1 .61-1.276z" clipRule="evenodd"/>
      </svg>
    ),
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
    bg: '#F5F3FF', color: '#7C3AED',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M2 10.5a1.5 1.5 0 1 1 3 0v5a1.5 1.5 0 0 1-3 0v-5zM6 10.333v5.43a2 2 0 0 0 1.106 1.79l.05.025A4 4 0 0 0 8.943 18h5.416a2 2 0 0 0 1.962-1.608l1.2-6A2 2 0 0 0 15.56 8H12V4a2 2 0 0 0-2-2 1 1 0 0 0-1 1v.667a4 4 0 0 1-.8 2.4L6.8 7.933a4 4 0 0 0-.8 2.4z"/>
      </svg>
    ),
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
    bg: '#FFF1F2', color: '#E11D48',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 0 1 5.656 0L10 6.343l1.172-1.171a4 4 0 1 1 5.656 5.656L10 17.657l-6.828-6.829a4 4 0 0 1 0-5.656z" clipRule="evenodd"/>
      </svg>
    ),
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
    bg: '#FFFBEB', color: '#D97706',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z"/>
      </svg>
    ),
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
    bg: '#ECFDF5', color: '#059669',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M4 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2V6h10a2 2 0 0 0-2-2H4zm2 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4zm6 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
      </svg>
    ),
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
    bg: '#F0F9FF', color: '#0284C7',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
      </svg>
    ),
  },
]

const STAT_ICONS = [
  // Bell
  <svg key="bell" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 4 14h12a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6zm0 16a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 10 18z"/>
  </svg>,
  // Chart down
  <svg key="chart" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M3 3a1 1 0 0 0 0 2h11l-4 4H7a1 1 0 0 0-.707 1.707l3 3a1 1 0 0 0 1.414 0l3-3A1 1 0 0 0 13 9h-1.586l4-4H17a1 1 0 1 0 0-2H3z" clipRule="evenodd"/>
  </svg>,
  // Lightning
  <svg key="lightning" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0 1 12 2v5h4a1 1 0 0 1 .82 1.573l-7 10A1 1 0 0 1 8 18v-5H4a1 1 0 0 1-.82-1.573l7-10a1 1 0 0 1 1.12-.38z" clipRule="evenodd"/>
  </svg>,
]

export default async function AutomatisationPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) redirect('/inscription')

  await prisma.automationRule.findMany({ where: { clinicId: clinic.id } })

  const enabledCount = AUTOMATIONS.filter(a => a.enabled).length
  const categories = [...new Set(AUTOMATIONS.map(a => a.category))]

  const stats = [
    { icon: STAT_ICONS[0], label: 'Rappels envoyés', value: '—', sub: 'automatiquement', bg: '#EEF2FF', color: '#1A56FF' },
    { icon: STAT_ICONS[1], label: 'Taux d\'absence', value: '−78%', sub: 'avec les rappels actifs', bg: '#ECFDF5', color: '#059669' },
    { icon: STAT_ICONS[2], label: 'Temps économisé', value: '~2h/j', sub: 'de tâches répétitives', bg: '#FFFBEB', color: '#D97706' },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Automatisation</h1>
          <p className="page-subtitle">{enabledCount} workflow{enabledCount !== 1 ? 's' : ''} actif{enabledCount !== 1 ? 's' : ''} · Tout fonctionne en arrière-plan</p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          {enabledCount} actif{enabledCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Impact stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="card p-5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <div className="text-xl font-bold text-[#0C0E12]">{s.value}</div>
              <div className="text-xs font-medium text-[#3A3D45] mt-0.5">{s.label}</div>
              <div className="text-[10px] text-[#B0B5C3]">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Automations by category */}
      {categories.map(cat => (
        <div key={cat} className="mb-8">
          <h3 className="text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider mb-3">{cat}</h3>
          <div className="space-y-3">
            {AUTOMATIONS.filter(a => a.category === cat).map(auto => (
              <div
                key={auto.id}
                className={`card p-5 flex items-center gap-4 transition-all ${auto.enabled ? 'border-l-2 border-l-emerald-400' : ''}`}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: auto.bg, color: auto.color }}
                >
                  {auto.icon}
                </div>

                {/* Info */}
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
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-[#B0B5C3]">
                      <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" clipRule="evenodd"/>
                    </svg>
                    <span className="flex items-center gap-1 text-[10px] text-[#B0B5C3]">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {auto.action}
                    </span>
                  </div>
                </div>

                {/* Impact */}
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-semibold text-emerald-600">{auto.impact}</div>
                  <div className="text-[10px] text-[#B0B5C3] mt-0.5">
                    {auto.enabled ? 'En cours' : 'Inactif'}
                  </div>
                </div>

                {/* Toggle */}
                <div
                  className={`flex-shrink-0 flex items-center transition-all cursor-pointer rounded-full ${auto.enabled ? 'bg-emerald-400' : 'bg-gray-200'}`}
                  style={{ width: 40, height: 22 }}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${auto.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* WhatsApp integration banner */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0C0E12,#141A30)' }}
      >
        {/* Orb */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-20" style={{ background: 'radial-gradient(circle,#25D366,transparent)' }} />
        <div className="relative flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.512A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 0 1-5.034-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.861 9.861 0 0 1 2.118 12C2.118 6.539 6.539 2.118 12 2.118S21.882 6.539 21.882 12 17.461 21.882 12 21.882z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Connecter WhatsApp Business</h3>
            <p className="text-xs text-white/60 mb-4 max-w-md">Connectez votre numéro WhatsApp Business pour activer l'envoi automatique de messages à vos clients.</p>
            <a
              href="mailto:support@bossystems.ma?subject=WhatsApp%20Integration"
              className="inline-flex items-center gap-2 text-xs font-semibold bg-[#25D366] text-white px-4 py-2 rounded-xl hover:bg-[#1ebe5a] transition-colors"
            >
              Demander l'intégration
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

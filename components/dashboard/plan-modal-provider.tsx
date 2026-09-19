'use client'
import { createContext, useContext, useState, useCallback } from 'react'
import { useToast } from '@/components/ui/toast'

const PLANS = [
  {
    key: 'STARTER',
    name: 'Starter',
    price: '749',
    desc: 'Pour démarrer et valider',
    features: ['1 utilisateur', '200 conversations/mois', 'Rendez-vous + rappels', 'CRM basique'],
    featured: false,
  },
  {
    key: 'PRO',
    name: 'Pro',
    price: '2 749',
    desc: 'Pour les équipes actives',
    features: ['3 utilisateurs', 'Conversations illimitées', 'CRM complet', 'Relances automatiques', 'Support prioritaire'],
    featured: true,
  },
  {
    key: 'ENTERPRISE',
    name: 'Enterprise',
    price: '4 489',
    desc: 'Pour les grandes structures',
    features: ['Équipe illimitée', 'Config sur mesure', 'API dédiée', 'Account manager dédié'],
    featured: false,
  },
]

interface PlanModalContextValue {
  open: () => void
}

const PlanModalContext = createContext<PlanModalContextValue | undefined>(undefined)

export function usePlanModal() {
  const ctx = useContext(PlanModalContext)
  if (!ctx) throw new Error('usePlanModal must be used within a PlanModalProvider')
  return ctx
}

export function PlanModalProvider({ clinicName, children }: { clinicName: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [requested, setRequested] = useState<string | null>(null)
  const { toast } = useToast()

  const open = useCallback(() => {
    setRequested(null)
    setIsOpen(true)
  }, [])
  const close = useCallback(() => setIsOpen(false), [])

  function choosePlan(planName: string) {
    const subject = encodeURIComponent(`Activation du plan ${planName} — ${clinicName}`)
    const body = encodeURIComponent(
      `Bonjour,\n\nJe suis ${clinicName} et je souhaite activer le plan ${planName} sur BOS Systems.\n\nMerci de me recontacter pour finaliser l'activation et le paiement.`
    )
    setRequested(planName)
    toast(`Demande envoyée pour le plan ${planName}. Notre équipe vous contacte sous peu pour finaliser l'activation et le paiement.`, 'success')
    window.open(`mailto:sales@bossystems.ma?subject=${subject}&body=${body}`, '_blank')
  }

  return (
    <PlanModalContext.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={close} />
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#16181D] p-6 md:p-8 animate-slide-up" style={{ boxShadow: '0 24px 60px rgba(12,14,18,0.35)' }}>
            <div className="flex items-start justify-between mb-1">
              <div>
                <h2 className="text-xl font-bold text-[#0C0E12] dark:text-white font-display">Choisissez votre plan</h2>
                <p className="text-sm text-[#7A7F8E] dark:text-[#9CA3AF] mt-1">
                  Le paiement en ligne arrive bientôt. Pour l&apos;instant, sélectionnez un plan et notre équipe vous contacte pour l&apos;activer — aucun montant n&apos;est prélevé automatiquement.
                </p>
              </div>
              <button onClick={close} aria-label="Fermer" className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#7A7F8E] hover:bg-[#F7F8FA] dark:hover:bg-white/5 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {PLANS.map(p => (
                <div
                  key={p.key}
                  className={`rounded-2xl p-5 flex flex-col transition-all ${p.featured ? 'ring-2 ring-[#1A56FF]' : 'border border-[rgba(12,14,18,0.08)] dark:border-white/10'}`}
                  style={p.featured ? { background: 'linear-gradient(180deg,#0C0E12,#1A1D24)' } : {}}
                >
                  {p.featured && (
                    <div className="self-start mb-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(26,86,255,0.18)', color: '#6BA3FF' }}>
                      ⭐ Populaire
                    </div>
                  )}
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${p.featured ? 'text-white/50' : 'text-[#7A7F8E] dark:text-[#9CA3AF]'}`}>{p.name}</div>
                  <div className={`text-[11px] mb-4 ${p.featured ? 'text-white/35' : 'text-[#B0B5C3]'}`}>{p.desc}</div>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className={`text-2xl font-bold font-display ${p.featured ? 'text-white' : 'text-[#0C0E12] dark:text-white'}`}>{p.price}</span>
                    <span className={`text-xs ${p.featured ? 'text-white/35' : 'text-[#B0B5C3]'}`}>DH/mois</span>
                  </div>
                  <ul className="space-y-2 mb-5 flex-1">
                    {p.features.map(f => (
                      <li key={f} className={`flex items-center gap-2 text-xs ${p.featured ? 'text-white/70' : 'text-[#3A3D45] dark:text-[#9CA3AF]'}`}>
                        <svg className="flex-shrink-0" width="13" height="13" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" fill={p.featured ? 'rgba(26,86,255,0.25)' : '#EEF2FF'} />
                          <path d="M5 8l2 2 4-4" stroke={p.featured ? '#6BA3FF' : '#1A56FF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => choosePlan(p.name)}
                    className={`w-full text-center py-2.5 rounded-xl text-xs font-semibold transition-all ${p.featured ? 'text-white hover:opacity-90' : 'bg-[#0C0E12] text-white hover:bg-[#1e2330] dark:bg-white dark:text-[#0C0E12]'}`}
                    style={p.featured ? { background: 'linear-gradient(135deg,#1A56FF,#7C3AED)' } : {}}
                  >
                    {requested === p.name ? 'Demande envoyée ✓' : 'Choisir ce plan'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </PlanModalContext.Provider>
  )
}

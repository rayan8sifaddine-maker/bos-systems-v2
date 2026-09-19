'use client'

import { useEffect, useState, useCallback } from 'react'
import { useToast } from '@/components/ui/toast'

interface AutomationRule {
  id: string
  name: string
  description: string
  trigger: string
  action: string
  impact: string
  enabled: boolean
  category: string
  bg: string
  color: string
  runCount: number
}

const ICON_MAP: Record<string, JSX.Element> = {
  // keyed by a stable slug derived from name
  'Rappel J-1': (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M10 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 4 14h12a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6zm0 16a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 10 18z"/>
    </svg>
  ),
  'Rappel 2h avant': (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-12a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l2.828 2.829a1 1 0 1 0 1.415-1.415L11 9.586V6z" clipRule="evenodd"/>
    </svg>
  ),
  'Relance 30 jours': (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M4 2a1 1 0 0 1 1 1v2.101a7.002 7.002 0 0 1 11.601 2.566 1 1 0 1 1-1.885.666A5.002 5.002 0 0 0 5.999 7H9a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm.008 9.057a1 1 0 0 1 1.276.61A5.002 5.002 0 0 0 14.001 13H11a1 1 0 1 1 0-2h5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-2.101a7.002 7.002 0 0 1-11.601-2.566 1 1 0 0 1 .61-1.276z" clipRule="evenodd"/>
    </svg>
  ),
  'Message de bienvenue': (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M2 10.5a1.5 1.5 0 1 1 3 0v5a1.5 1.5 0 0 1-3 0v-5zM6 10.333v5.43a2 2 0 0 0 1.106 1.79l.05.025A4 4 0 0 0 8.943 18h5.416a2 2 0 0 0 1.962-1.608l1.2-6A2 2 0 0 0 15.56 8H12V4a2 2 0 0 0-2-2 1 1 0 0 0-1 1v.667a4 4 0 0 1-.8 2.4L6.8 7.933a4 4 0 0 0-.8 2.4z"/>
    </svg>
  ),
  'Anniversaire client': (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 0 1 5.656 0L10 6.343l1.172-1.171a4 4 0 1 1 5.656 5.656L10 17.657l-6.828-6.829a4 4 0 0 1 0-5.656z" clipRule="evenodd"/>
    </svg>
  ),
  "Demande d'avis": (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z"/>
    </svg>
  ),
  'Suivi no-show': (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
    </svg>
  ),
}

const DEFAULT_ICON = (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0 1 12 2v5h4a1 1 0 0 1 .82 1.573l-7 10A1 1 0 0 1 8 18v-5H4a1 1 0 0 1-.82-1.573l7-10a1 1 0 0 1 1.12-.38z" clipRule="evenodd"/>
  </svg>
)

const STAT_ICONS = [
  <svg key="bell" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 4 14h12a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6zm0 16a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 10 18z"/>
  </svg>,
  <svg key="chart" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M3 3a1 1 0 0 0 0 2h11l-4 4H7a1 1 0 0 0-.707 1.707l3 3a1 1 0 0 0 1.414 0l3-3A1 1 0 0 0 13 9h-1.586l4-4H17a1 1 0 1 0 0-2H3z" clipRule="evenodd"/>
  </svg>,
  <svg key="lightning" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0 1 12 2v5h4a1 1 0 0 1 .82 1.573l-7 10A1 1 0 0 1 8 18v-5H4a1 1 0 0 1-.82-1.573l7-10a1 1 0 0 1 1.12-.38z" clipRule="evenodd"/>
  </svg>,
]

export default function AutomatisationPage() {
  const { toast } = useToast()
  const [automations, setAutomations] = useState<AutomationRule[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAutomations = useCallback(async () => {
    try {
      const res = await fetch('/api/automations')
      if (!res.ok) throw new Error('Erreur de chargement')
      const data = await res.json()
      setAutomations(data)
    } catch {
      toast('Impossible de charger les automatisations', 'error')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => { fetchAutomations() }, [fetchAutomations])

  const handleToggle = async (id: string, currentEnabled: boolean) => {
    const newEnabled = !currentEnabled
    // Optimistic update
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, enabled: newEnabled } : a))

    try {
      const res = await fetch(`/api/automations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: newEnabled }),
      })
      if (!res.ok) throw new Error()
      const updated = await res.json()
      setAutomations(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a))
      toast(newEnabled ? 'Automatisation activée' : 'Automatisation désactivée', 'success')
    } catch {
      // Revert
      setAutomations(prev => prev.map(a => a.id === id ? { ...a, enabled: currentEnabled } : a))
      toast('Erreur lors de la mise à jour', 'error')
    }
  }

  const enabledCount = automations.filter(a => a.enabled).length
  const totalRunCount = automations.reduce((sum, a) => sum + (a.runCount ?? 0), 0)
  const categories = [...new Set(automations.map(a => a.category))]

  const stats = [
    { icon: STAT_ICONS[0], label: 'Rappels envoyés', value: totalRunCount > 0 ? totalRunCount.toString() : '—', sub: 'automatiquement', bg: '#EEF2FF', color: '#1A56FF' },
    { icon: STAT_ICONS[1], label: 'Taux d\'absence', value: '−78%', sub: 'avec les rappels actifs', bg: '#ECFDF5', color: '#059669' },
    { icon: STAT_ICONS[2], label: 'Temps économisé', value: '~2h/j', sub: 'de tâches répétitives', bg: '#FFFBEB', color: '#D97706' },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Automatisation</h1>
          <p className="page-subtitle">
            {loading ? 'Chargement…' : `${enabledCount} workflow${enabledCount !== 1 ? 's' : ''} actif${enabledCount !== 1 ? 's' : ''} · Tout fonctionne en arrière-plan`}
          </p>
        </div>
        {!loading && (
          <div className="flex items-center gap-2 text-xs bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-lg font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            {enabledCount} actif{enabledCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Impact stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="card p-5 flex items-start gap-3 hover:-translate-y-0.5 hover:shadow-md transition-all">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <div className="text-xl font-bold text-[#0C0E12] dark:text-white">{s.value}</div>
              <div className="text-xs font-medium text-[#3A3D45] dark:text-[#D1D5DB] mt-0.5">{s.label}</div>
              <div className="text-[10px] text-[#B0B5C3] dark:text-[#5A5F6B]">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-3 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-5 h-20 animate-pulse bg-gray-100 dark:bg-white/5" />
          ))}
        </div>
      )}

      {/* Automations by category */}
      {!loading && categories.map(cat => (
        <div key={cat} className="mb-8">
          <h3 className="text-xs font-semibold text-[#7A7F8E] dark:text-[#9CA3AF] uppercase tracking-wider mb-3">{cat}</h3>
          <div className="space-y-3">
            {automations.filter(a => a.category === cat).map(auto => (
              <div
                key={auto.id}
                className={`card p-5 flex items-center gap-4 transition-all hover:shadow-md ${auto.enabled ? 'border-l-2 border-l-emerald-400' : ''}`}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: auto.bg, color: auto.color }}
                >
                  {ICON_MAP[auto.name] ?? DEFAULT_ICON}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#0C0E12] dark:text-white">{auto.name}</span>
                    {auto.enabled && (
                      <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-1.5 py-0.5 rounded-full">Actif</span>
                    )}
                  </div>
                  <p className="text-xs text-[#7A7F8E] dark:text-[#9CA3AF]">{auto.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[10px] text-[#B0B5C3] dark:text-[#5A5F6B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {auto.trigger}
                    </span>
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-[#B0B5C3] dark:text-[#5A5F6B]">
                      <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" clipRule="evenodd"/>
                    </svg>
                    <span className="flex items-center gap-1 text-[10px] text-[#B0B5C3] dark:text-[#5A5F6B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {auto.action}
                    </span>
                  </div>
                </div>

                {/* Impact */}
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{auto.impact}</div>
                  <div className="text-[10px] text-[#B0B5C3] dark:text-[#5A5F6B] mt-0.5">
                    {auto.enabled ? 'En cours' : 'Inactif'}
                  </div>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => handleToggle(auto.id, auto.enabled)}
                  className={`flex-shrink-0 flex items-center transition-all cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400 ${auto.enabled ? 'bg-emerald-400' : 'bg-gray-200 dark:bg-white/10'}`}
                  style={{ width: 40, height: 22 }}
                  aria-label={auto.enabled ? 'Désactiver' : 'Activer'}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${auto.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
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
            <h3 className="text-sm font-semibold text-white mb-1 dark:text-white">Connecter WhatsApp Business</h3>
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

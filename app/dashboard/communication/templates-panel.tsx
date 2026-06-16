'use client'
import { useEffect, useState } from 'react'

interface Template { id: string; label: string; text: string; color: string; bg: string }

const DEFAULT_TEMPLATES: Template[] = [
  { id: 'rappel', label: 'Rappel RDV', text: 'Bonjour, nous vous rappelons votre rendez-vous demain à [HEURE]. Répondez OUI pour confirmer.', color: '#F59E0B', bg: '#FFFBEB' },
  { id: 'confirmation', label: 'Confirmation', text: 'Votre rendez-vous du [DATE] à [HEURE] est bien confirmé. À bientôt !', color: '#10B981', bg: '#ECFDF5' },
  { id: 'relance', label: 'Relance inactif', text: 'Bonjour [NOM], cela fait un moment que nous n\'avons pas eu de vos nouvelles. Souhaitez-vous reprendre rendez-vous ?', color: '#1A56FF', bg: '#EEF2FF' },
  { id: 'avis', label: 'Demande d\'avis', text: 'Bonjour [NOM], comment s\'est passée votre visite ? Votre avis nous aide à améliorer nos services.', color: '#7C3AED', bg: '#F5F3FF' },
]

const STORAGE_KEY = 'bos-message-templates'

export default function TemplatesPanel() {
  const [templates, setTemplates] = useState<Template[]>(DEFAULT_TEMPLATES)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try { setTemplates(JSON.parse(saved)) } catch { /* ignore corrupt storage */ }
    }
  }, [])

  function startEdit(t: Template) {
    setEditingId(t.id)
    setDraft(t.text)
  }

  function save(id: string) {
    const next = templates.map(t => t.id === id ? { ...t, text: draft } : t)
    setTemplates(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setEditingId(null)
  }

  function reset(id: string) {
    const original = DEFAULT_TEMPLATES.find(t => t.id === id)
    if (!original) return
    const next = templates.map(t => t.id === id ? { ...t, text: original.text } : t)
    setTemplates(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-[#0C0E12] mb-4">Modèles de messages</h3>
      <div className="space-y-3">
        {templates.map(t => (
          <div key={t.id} className="p-4 rounded-xl border border-[rgba(12,14,18,0.06)] hover:border-[rgba(12,14,18,0.12)] transition-all" style={{ background: t.bg }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#0C0E12]">{t.label}</span>
              {editingId !== t.id && (
                <div className="flex items-center gap-2">
                  <button onClick={() => reset(t.id)} className="text-[10px] text-[#B0B5C3] hover:text-[#7A7F8E] transition-colors">
                    Réinitialiser
                  </button>
                  <button onClick={() => startEdit(t)} className="text-[10px] font-semibold transition-colors" style={{ color: t.color }}>
                    Modifier
                  </button>
                </div>
              )}
            </div>

            {editingId === t.id ? (
              <div className="space-y-2">
                <textarea
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  rows={3}
                  className="w-full text-xs text-[#0C0E12] rounded-lg border border-[rgba(12,14,18,0.12)] p-2 bg-white focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': t.color } as React.CSSProperties}
                  maxLength={300}
                />
                <div className="flex items-center gap-2">
                  <button onClick={() => save(t.id)} className="text-[11px] font-semibold px-3 py-1 rounded-lg text-white" style={{ background: t.color }}>
                    Enregistrer
                  </button>
                  <button onClick={() => setEditingId(null)} className="text-[11px] text-[#7A7F8E] px-3 py-1 rounded-lg hover:bg-white/60 transition-colors">
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#7A7F8E] leading-relaxed">{t.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

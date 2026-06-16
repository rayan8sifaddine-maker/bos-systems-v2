'use client'
import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/toast'

interface Clinic {
  id: string
  name: string
  sector: string
  phone: string
  email: string
  address: string
  city: string
  hours: string
  price: string
  plan: string
  trialEndsAt?: string
  createdAt: string
}

const SECTORS = [
  { value: 'clinique', label: 'Clinique / Cabinet médical' },
  { value: 'garage', label: 'Garage automobile' },
  { value: 'ecole', label: 'École / Centre de formation' },
  { value: 'salon', label: 'Salon de beauté / Coiffure' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'autre', label: 'Autre' },
]

export default function ParamsPage() {
  const { toast } = useToast()
  const [clinic, setClinic] = useState<Clinic | null>(null)
  const [form, setForm] = useState<Partial<Clinic>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [edited, setEdited] = useState(false)

  useEffect(() => {
    fetch('/api/clinic').then(r => r.json()).then(data => {
      setClinic(data)
      setForm(data)
      setLoading(false)
    })
  }, [])

  function upd(k: keyof Clinic, v: string) {
    setForm(f => ({...f, [k]: v}))
    setEdited(true)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/clinic', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setClinic(data)
      setEdited(false)
      toast('Paramètres sauvegardés', 'success')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Erreur', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="h-8 w-48 skeleton rounded-lg mb-8" />
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="card p-6 space-y-4">
              {[...Array(5)].map((_, j) => <div key={j} className="h-10 skeleton rounded-xl" />)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const planColors: Record<string, string> = {
    STARTER: 'bg-gray-100 text-gray-700',
    PRO: 'bg-[#EEF2FF] text-[#1A56FF]',
    ENTERPRISE: 'bg-amber-50 text-amber-700',
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Paramètres</h1>
          <p className="page-subtitle">Configuration de votre compte et de votre établissement</p>
        </div>
        {edited && (
          <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg animate-fade-in">
            Modifications non sauvegardées
          </span>
        )}
      </div>

      <form onSubmit={save}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Clinic profile */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-[#0C0E12] mb-5 pb-4 border-b border-[rgba(12,14,18,0.06)]">Profil établissement</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Nom de l'établissement</label>
                <input className="input" value={form.name ?? ''} onChange={e => upd('name', e.target.value)} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Secteur d'activité</label>
                <select className="select" value={form.sector ?? ''} onChange={e => upd('sector', e.target.value)}>
                  {SECTORS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Ville</label>
                  <input className="input" value={form.city ?? ''} onChange={e => upd('city', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Téléphone</label>
                  <input className="input" placeholder="05 22 00 00 00" value={form.phone ?? ''} onChange={e => upd('phone', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Email professionnel</label>
                <input type="email" className="input" placeholder="contact@votreclinique.ma" value={form.email ?? ''} onChange={e => upd('email', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Adresse</label>
                <input className="input" placeholder="123 Boulevard Mohammed V" value={form.address ?? ''} onChange={e => upd('address', e.target.value)} />
              </div>
            </div>
          </div>

          {/* IA + Account */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-sm font-semibold text-[#0C0E12] mb-5 pb-4 border-b border-[rgba(12,14,18,0.06)]">Configuration IA</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Horaires d'ouverture</label>
                  <input className="input" placeholder="Lun-Ven 9h-19h, Sam 9h-13h" value={form.hours ?? ''} onChange={e => upd('hours', e.target.value)} />
                  <p className="text-[11px] text-[#B0B5C3] mt-1">L'IA utilise ces horaires pour répondre aux clients</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Tarif de consultation</label>
                  <input className="input" placeholder="200 DH" value={form.price ?? ''} onChange={e => upd('price', e.target.value)} />
                  <p className="text-[11px] text-[#B0B5C3] mt-1">Affiché automatiquement lors des demandes de tarif</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-sm font-semibold text-[#0C0E12] mb-5 pb-4 border-b border-[rgba(12,14,18,0.06)]">Abonnement</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#7A7F8E]">Plan actuel</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${planColors[clinic?.plan ?? 'STARTER']}`}>
                    {clinic?.plan}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#7A7F8E]">Statut</span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Actif
                  </span>
                </div>
                {clinic?.trialEndsAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#7A7F8E]">Essai gratuit</span>
                    <span className="text-sm text-[#0C0E12]">jusqu'au {new Date(clinic.trialEndsAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#7A7F8E]">Membre depuis</span>
                  <span className="text-sm text-[#0C0E12]">{clinic?.createdAt ? new Date(clinic.createdAt).toLocaleDateString('fr-FR') : '—'}</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-[rgba(12,14,18,0.06)]">
                <a href="mailto:sales@bossystems.ma" className="btn-blue w-full justify-center text-xs">
                  Passer à Enterprise →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={saving || !edited} className="btn-primary px-8">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : 'Sauvegarder les modifications'}
          </button>
        </div>
      </form>
    </div>
  )
}

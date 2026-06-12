'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SECTORS = [
  { value: 'clinique',    label: '🏥 Clinique / Cabinet médical' },
  { value: 'garage',      label: '🚗 Garage automobile' },
  { value: 'immobilier',  label: '🏠 Agence immobilière' },
  { value: 'ecole',       label: '🎓 École / Centre de formation' },
  { value: 'avocat',      label: '⚖️ Cabinet d\'avocats' },
  { value: 'salon',       label: '💇 Salon de beauté / Coiffure' },
  { value: 'hotel',       label: '🏨 Hôtel / Riad' },
  { value: 'restaurant',  label: '🍽️ Restaurant' },
  { value: 'autre',       label: 'Autre' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [form, setForm] = useState({ clinicName: '', sector: 'clinique', email: '', password: '' })

  function upd(k: keyof typeof form, v: string) { setForm(f => ({...f, [k]: v})); setError('') }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password.length < 8) { setError('Mot de passe minimum 8 caractères.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      await signIn('credentials', { email: form.email, password: form.password, redirect: false })
      router.push('/dashboard')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de la création du compte.')
      setLoading(false)
    }
  }

  const selectedSector = SECTORS.find(s => s.value === form.sector)

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] animate-slide-up">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <img src="/logo.svg" alt="BOS" className="w-8 h-8" />
          <span className="font-bold text-[15px] tracking-wide text-[#0C0E12] font-display">BOS SYSTEMS</span>
        </Link>

        <div className="card p-8 shadow-md">
          {/* Progress */}
          <div className="flex gap-2 mb-6">
            {[1,2].map(s => (
              <div key={s} className="flex-1">
                <div className={`h-1 rounded-full transition-all duration-300 ${s <= step ? 'bg-[#0C0E12]' : 'bg-[rgba(12,14,18,0.08)]'}`} />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold text-[#B0B5C3] uppercase tracking-wider">Étape {step}/2</span>
          </div>
          <h1 className="text-xl font-bold text-[#0C0E12] mb-0.5">
            {step === 1 ? 'Votre établissement' : 'Créez votre compte'}
          </h1>
          <p className="text-sm text-[#7A7F8E] mb-7">
            {step === 1 ? 'Dites-nous en plus sur votre activité' : '14 jours gratuits, sans carte bancaire'}
          </p>

          {step === 1 ? (
            <form onSubmit={e => { e.preventDefault(); setStep(2) }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Nom de l'établissement *</label>
                <input
                  className="input"
                  placeholder="Clinique Dr. Bennani, Garage Elite..."
                  value={form.clinicName}
                  onChange={e => upd('clinicName', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3A3D45] mb-2">Secteur d'activité *</label>
                <div className="grid grid-cols-2 gap-2">
                  {SECTORS.slice(0, 8).map(s => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => upd('sector', s.value)}
                      className={`text-xs text-left px-3 py-2.5 rounded-xl border transition-all ${form.sector === s.value ? 'border-[#1A56FF] bg-[#EEF2FF] text-[#1A56FF] font-medium' : 'border-[rgba(12,14,18,0.08)] text-[#3A3D45] hover:border-[rgba(12,14,18,0.2)]'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" disabled={!form.clinicName || !form.sector} className="btn-primary w-full py-3 justify-center mt-2">
                Continuer →
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Summary */}
              <div className="flex items-center gap-2.5 p-3 bg-[#F7F8FA] rounded-xl border border-[rgba(12,14,18,0.06)]">
                <span className="text-lg">{selectedSector?.label.split(' ')[0]}</span>
                <div>
                  <div className="text-xs font-semibold text-[#0C0E12]">{form.clinicName}</div>
                  <div className="text-[10px] text-[#B0B5C3]">{SECTORS.find(s => s.value === form.sector)?.label.slice(3)}</div>
                </div>
                <button type="button" onClick={() => setStep(1)} className="ml-auto text-xs text-[#1A56FF] hover:underline">Modifier</button>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Adresse email *</label>
                <input
                  type="email"
                  className="input"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={e => upd('email', e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Mot de passe *</label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    className="input pr-11"
                    placeholder="Min. 8 caractères"
                    value={form.password}
                    onChange={e => upd('password', e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0B5C3] hover:text-[#7A7F8E]" aria-label="Afficher/masquer">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/></svg>
                  </button>
                </div>
                {form.password.length > 0 && (
                  <div className="flex gap-1 mt-1.5">
                    {[...Array(4)].map((_, i) => {
                      const strength = Math.min(Math.floor(form.password.length / 2), 4)
                      return <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < strength ? strength < 2 ? 'bg-red-400' : strength < 3 ? 'bg-amber-400' : 'bg-emerald-400' : 'bg-[#F0F2F5]'}`} />
                    })}
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 animate-fade-in">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.3"/><path d="M7 4.5v3M7 9.5h.01" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary px-4 py-3 justify-center">←</button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 justify-center">
                  {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : 'Créer mon compte →'}
                </button>
              </div>

              <p className="text-[11px] text-center text-[#B0B5C3]">
                En créant un compte, vous acceptez nos{' '}
                <a href="#" className="text-[#7A7F8E] hover:underline">conditions d'utilisation</a>
              </p>
            </form>
          )}

          <p className="text-center text-sm text-[#7A7F8E] mt-6">
            Déjà un compte ?{' '}
            <Link href="/connexion" className="text-[#1A56FF] font-medium hover:underline">Se connecter</Link>
          </p>
        </div>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {['✓ Sans carte bancaire','✓ 14 jours gratuits','✓ Annulation simple'].map(t=>(
            <span key={t} className="text-[11px] text-[#B0B5C3]">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

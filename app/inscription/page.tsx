'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SECTORS = [
  { value: 'clinique',   label: 'Clinique / Cabinet médical' },
  { value: 'garage',     label: 'Garage automobile' },
  { value: 'immobilier', label: 'Agence immobilière' },
  { value: 'ecole',      label: 'École / Centre de formation' },
  { value: 'avocat',     label: 'Cabinet d\'avocats' },
  { value: 'salon',      label: 'Salon de beauté / Coiffure' },
  { value: 'hotel',      label: 'Hôtel / Riad' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'autre',      label: 'Autre' },
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
    <div className="min-h-screen flex">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0C0E12 0%,#141A30 60%,#0C1020 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position:'absolute', top:'-20%', right:'-20%', width:500, height:500, background:'radial-gradient(ellipse, rgba(26,86,255,0.2) 0%, transparent 60%)', borderRadius:'50%' }}/>
          <div style={{ position:'absolute', bottom:'-10%', left:'-10%', width:400, height:400, background:'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 60%)', borderRadius:'50%' }}/>
        </div>

        <div className="relative">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-[15px] tracking-wide text-white font-display">BOS SYSTEMS</span>
          </Link>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/10 rounded-full text-white/60 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            14 jours gratuits · Sans carte
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 font-display leading-tight">
            Automatisez votre<br/>
            <span style={{ background:'linear-gradient(135deg,#6BA3FF,#A78BFA)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              relation client.
            </span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10">
            Rejoignez les PME marocaines qui utilisent BOS pour automatiser leurs rendez-vous, relancer leurs clients et booster leur CA.
          </p>

          <div className="space-y-3 mb-10">
            {[
              'Assistant IA WhatsApp configuré en 5 min',
              'Agenda intelligent avec rappels automatiques',
              'Analytics et CRM complets inclus',
              'Données 100% sécurisées, hébergées en Europe',
            ].map(text => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 5-5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-sm text-white/60">{text}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex -space-x-2">
              {[['YB','#3B82F6'],['FA','#F59E0B'],['SC','#8B5CF6'],['KA','#10B981']].map(([initials, bg]) => (
                <div key={initials} className="w-8 h-8 rounded-full border-2 border-[#0C0E12] flex items-center justify-center text-[10px] font-bold text-white" style={{ background: bg }}>{initials}</div>
              ))}
            </div>
            <div>
              <div className="text-xs font-semibold text-white">+240 PME marocaines</div>
              <div className="text-[11px] text-white/40">nous font déjà confiance</div>
            </div>
          </div>
        </div>

        <div className="relative text-xs text-white/30">© 2025 BOS Systems</div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#F7F8FA]">
        <div className="w-full max-w-[440px] animate-slide-up">
          <Link href="/" className="flex items-center gap-2.5 justify-center mb-8 lg:hidden">
            <div className="w-8 h-8 bg-[#0C0E12] rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-[15px] tracking-wide text-[#0C0E12] font-display">BOS SYSTEMS</span>
          </Link>

          <div className="bg-white border border-[rgba(12,14,18,0.08)] rounded-2xl p-8" style={{ boxShadow:'0 4px 20px rgba(12,14,18,0.08)' }}>
            {/* Progress */}
            <div className="flex gap-2 mb-6">
              {[1,2].map(s => (
                <div key={s} className="flex-1">
                  <div className={`h-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-[#1A56FF]' : 'bg-[rgba(12,14,18,0.08)]'}`} />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-[#B0B5C3] uppercase tracking-wider">Étape {step}/2</span>
            </div>
            <h1 className="text-xl font-bold text-[#0C0E12] mb-0.5 font-display">
              {step === 1 ? 'Votre établissement' : 'Créez votre compte'}
            </h1>
            <p className="text-sm text-[#7A7F8E] mb-7">
              {step === 1 ? 'Dites-nous en plus sur votre activité' : '14 jours gratuits, sans carte bancaire'}
            </p>

            {step === 1 ? (
              <form onSubmit={e => { e.preventDefault(); setStep(2) }} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#3A3D45] mb-1.5">Nom de l&apos;établissement *</label>
                  <input className="input" placeholder="Clinique Dr. Bennani, Garage Elite..." value={form.clinicName} onChange={e => upd('clinicName', e.target.value)} required/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3A3D45] mb-2">Secteur d&apos;activité *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {SECTORS.slice(0, 8).map(s => (
                      <button key={s.value} type="button" onClick={() => upd('sector', s.value)} className={`text-xs text-left px-3 py-2.5 rounded-xl border transition-all ${form.sector === s.value ? 'border-[#1A56FF] bg-[#EEF2FF] text-[#1A56FF] font-semibold' : 'border-[rgba(12,14,18,0.08)] text-[#3A3D45] hover:border-[rgba(12,14,18,0.2)] bg-[#F7F8FA]'}`}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" disabled={!form.clinicName || !form.sector} className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px disabled:opacity-50 disabled:pointer-events-none" style={{ background:'linear-gradient(135deg,#0C0E12,#1e2330)', boxShadow:'0 4px 12px rgba(12,14,18,0.2)' }}>
                  Continuer →
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#F7F8FA] rounded-xl border border-[rgba(12,14,18,0.06)]">
                  <div className="w-8 h-8 bg-[#EEF2FF] rounded-lg flex items-center justify-center text-[#1A56FF] flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7.5L5 11.5 13 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#0C0E12] truncate">{form.clinicName}</div>
                    <div className="text-[11px] text-[#B0B5C3]">{selectedSector?.label}</div>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-xs text-[#1A56FF] hover:underline font-medium flex-shrink-0">Modifier</button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A3D45] mb-1.5">Adresse email *</label>
                  <input type="email" className="input" placeholder="votre@email.com" value={form.email} onChange={e => upd('email', e.target.value)} required autoComplete="email"/>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A3D45] mb-1.5">Mot de passe *</label>
                  <div className="relative">
                    <input type={showPwd ? 'text' : 'password'} className="input pr-11" placeholder="Min. 8 caractères" value={form.password} onChange={e => upd('password', e.target.value)} required minLength={8} autoComplete="new-password"/>
                    <button type="button" onClick={() => setShowPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0B5C3] hover:text-[#7A7F8E]" aria-label="Afficher/masquer">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/></svg>
                    </button>
                  </div>
                  {form.password.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {[...Array(4)].map((_, i) => {
                        const strength = Math.min(Math.floor(form.password.length / 2), 4)
                        return <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < strength ? strength < 2 ? 'bg-red-400' : strength < 3 ? 'bg-amber-400' : 'bg-emerald-400' : 'bg-[#F0F2F5]'}`} />
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
                  <button type="button" onClick={() => setStep(1)} className="px-4 py-3 rounded-xl text-sm font-medium text-[#3A3D45] border border-[rgba(12,14,18,0.12)] hover:bg-[#F7F8FA] transition-all">←</button>
                  <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px disabled:opacity-60" style={{ background:'linear-gradient(135deg,#0C0E12,#1e2330)', boxShadow:'0 4px 12px rgba(12,14,18,0.2)' }}>
                    {loading ? <span className="inline-flex items-center justify-center"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/></span> : 'Créer mon compte →'}
                  </button>
                </div>

                <p className="text-[11px] text-center text-[#B0B5C3]">
                  En créant un compte, vous acceptez nos{' '}
                  <a href="#" className="text-[#7A7F8E] hover:underline">conditions d&apos;utilisation</a>
                </p>
              </form>
            )}

            <p className="text-center text-sm text-[#7A7F8E] mt-6">
              Déjà un compte ?{' '}
              <Link href="/connexion" className="text-[#1A56FF] font-semibold hover:underline">Se connecter</Link>
            </p>
          </div>

          <div className="flex items-center justify-center gap-5 mt-5">
            {['Sans carte bancaire','14 jours gratuits','Annulation simple'].map(t => (
              <div key={t} className="flex items-center gap-1 text-[11px] text-[#B0B5C3]">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 5-5" stroke="#10B981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

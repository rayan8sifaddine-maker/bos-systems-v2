'use client'
import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
    } else {
      router.push(from)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel (branding) ── */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C0E12 0%, #141A30 60%, #0C1020 100%)' }}>
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position:'absolute', top:'-20%', right:'-20%', width:500, height:500, background:'radial-gradient(ellipse, rgba(26,86,255,0.2) 0%, transparent 60%)', borderRadius:'50%' }}/>
          <div style={{ position:'absolute', bottom:'-10%', left:'-10%', width:400, height:400, background:'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 60%)', borderRadius:'50%' }}/>
        </div>

        <div className="relative">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="BOS Systems" width={44} height={44} />
            <span className="font-bold text-[15px] tracking-wide text-white font-display">BOS SYSTEMS</span>
          </Link>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/10 rounded-full text-white/60 text-xs font-semibold backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Système opérationnel
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 font-display leading-tight">
            Tout votre business<br/>
            <span style={{ background:'linear-gradient(135deg,#6BA3FF,#A78BFA)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              En un seul endroit
            </span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10">
            Rendez-vous, clients, facturation, analytics — BOS centralise tout et automatise le reste grâce à l&apos;IA.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[{ v:'−78%', l:'de no-shows' },{ v:'24/7', l:'IA active' },{ v:'+40%', l:'CA' }].map(({ v, l }) => (
              <div key={l} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-xl font-bold text-white font-display">{v}</div>
                <div className="text-xs text-white/40 mt-0.5">{l}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 14 14" fill="#F59E0B"><path d="M7 1l1.5 4h4.5l-3.5 2.5 1.5 4L7 9 3 11.5l1.5-4L1 5h4.5z"/></svg>
              ))}
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              &ldquo;En 3 mois, le taux d&apos;absence a chuté de 70% et mes rendez-vous sont toujours pleins. BOS a transformé mon cabinet.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-blue-300 text-xs font-bold">YB</div>
              <div>
                <div className="text-xs font-semibold text-white">Dr. Youssef Bennani</div>
                <div className="text-[11px] text-white/40">Dermatologue, Casablanca</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative text-xs text-white/30">© 2025 BOS Systems</div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#F7F8FA]">
        <div className="w-full max-w-[400px] animate-slide-up">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2.5 justify-center mb-8 lg:hidden">
            <Image src="/logo.png" alt="BOS Systems" width={44} height={44} />
            <span className="font-bold text-[15px] tracking-wide text-[#0C0E12] font-display">BOS SYSTEMS</span>
          </Link>

          <div className="bg-white border border-[rgba(12,14,18,0.08)] rounded-2xl p-8" style={{ boxShadow:'0 4px 20px rgba(12,14,18,0.08)' }}>
            <h1 className="text-2xl font-bold text-[#0C0E12] mb-1 font-display">Bon retour</h1>
            <p className="text-sm text-[#7A7F8E] mb-7">Connectez-vous à votre tableau de bord</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3A3D45] mb-1.5">Adresse email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  className={`input ${error ? 'input-error' : ''}`}
                  placeholder="votre@email.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#3A3D45]">Mot de passe</label>
                </div>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError('') }}
                    className={`input pr-11 ${error ? 'input-error' : ''}`}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0B5C3] hover:text-[#7A7F8E] transition-colors" aria-label={showPwd ? 'Masquer' : 'Afficher'}>
                    {showPwd ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 animate-fade-in">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.3"/><path d="M7 4.5v3M7 9.5h.01" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px disabled:opacity-60" style={{ background:'linear-gradient(135deg,#0C0E12,#1e2330)', boxShadow:'0 4px 12px rgba(12,14,18,0.2)' }}>
                {loading ? (
                  <span className="inline-flex items-center gap-2 justify-center"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/></span>
                ) : 'Se connecter →'}
              </button>
            </form>

            <p className="text-center text-sm text-[#7A7F8E] mt-6">
              Pas encore de compte ?{' '}
              <Link href="/inscription" className="text-[#1A56FF] font-semibold hover:underline">Essai gratuit 14 jours</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-[rgba(12,14,18,0.2)] border-t-[#0C0E12] rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

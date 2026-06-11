'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ clinicName:'', sector:'clinique', email:'', password:'' })

  function upd(k: string, v: string) { setForm(f=>({...f,[k]:v})); setError('') }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password.length < 6) { setError('Mot de passe trop court.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      await signIn('credentials', { email: form.email, password: form.password, redirect: false })
      router.push('/dashboard')
    } catch(e) {
      setError(e instanceof Error ? e.message : 'Erreur.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-6">
      <div className="w-full max-w-[440px]">
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-10">
          <div className="w-8 h-8 bg-[#0C0E12] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-[15px] tracking-wide text-[#0C0E12]">BOS SYSTEMS</span>
        </Link>
        <div className="bg-white border border-[rgba(12,14,18,0.08)] rounded-2xl p-8 shadow-sm">
          <div className="flex gap-2 mb-8">
            {[1,2].map(s=><div key={s} className={`h-1 flex-1 rounded-full transition-all ${s<=step?'bg-[#0C0E12]':'bg-[rgba(12,14,18,0.08)]'}`}/>)}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0C0E12] mb-1">{step===1?'Votre entreprise':'Votre compte'}</h1>
          <p className="text-sm text-[#7A7F8E] mb-8">Étape {step} sur 2</p>
          <form onSubmit={step===1?(e)=>{e.preventDefault();setStep(2)}:handleSubmit} className="space-y-4">
            {step===1 && <>
              <div>
                <label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Nom de l&apos;entreprise</label>
                <input className="input" placeholder="Clinique Dr. Bennani" value={form.clinicName} onChange={e=>upd('clinicName',e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Secteur</label>
                <select className="input" value={form.sector} onChange={e=>upd('sector',e.target.value)}>
                  {['clinique','garage','immobilier','ecole','avocat','salon','hotel','restaurant','autre'].map(s=>(
                    <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-primary w-full py-3 justify-center">Continuer →</button>
            </>}
            {step===2 && <>
              <div>
                <label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Email</label>
                <input type="email" className="input" placeholder="votre@email.com" value={form.email} onChange={e=>upd('email',e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Mot de passe</label>
                <input type="password" className="input" placeholder="Min. 6 caractères" value={form.password} onChange={e=>upd('password',e.target.value)} required />
              </div>
              {error && <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">{error}</div>}
              <div className="flex gap-3">
                <button type="button" onClick={()=>setStep(1)} className="btn-secondary flex-1 py-3 justify-center">← Retour</button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 justify-center">
                  {loading?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:'Créer mon compte'}
                </button>
              </div>
              <p className="text-xs text-center text-[#B0B5C3]">14 jours gratuits. Sans carte bancaire.</p>
            </>}
          </form>
          <p className="text-center text-sm text-[#7A7F8E] mt-6">
            Déjà un compte ? <Link href="/connexion" className="text-[#1A56FF] font-medium hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

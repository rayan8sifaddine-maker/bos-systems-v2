'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px]">
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
          <h1 className="text-2xl font-bold tracking-tight text-[#0C0E12] mb-1">Connexion</h1>
          <p className="text-sm text-[#7A7F8E] mb-8">Accédez à votre tableau de bord</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input" placeholder="votre@email.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Mot de passe</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="input" placeholder="••••••••" required />
            </div>
            {error && <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">{error}</div>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 justify-center mt-2">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : 'Se connecter →'}
            </button>
          </form>
          <p className="text-center text-sm text-[#7A7F8E] mt-6">
            Pas de compte ? <Link href="/inscription" className="text-[#1A56FF] font-medium hover:underline">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

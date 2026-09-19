'use client'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function DeconnexionPage() {
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(ellipse, rgba(26,86,255,0.08) 0%, transparent 60%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: 400, height: 400, background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 60%)', borderRadius: '50%' }} />
      </div>

      <div className="relative w-full max-w-sm bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-8 text-center" style={{ boxShadow: '0 8px 32px rgba(12,14,18,0.08)' }}>
        <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-[#0C0E12] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-[15px] tracking-wide text-[#0C0E12] font-display">BOS SYSTEMS</span>
        </Link>

        <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-5" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
          <svg width="24" height="24" viewBox="0 0 22 22" fill="none">
            <path d="M8 19H4a1 1 0 01-1-1V4a1 1 0 011-1h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 15l4-4-4-4M18 11H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-[#0C0E12] font-display mb-2">Se déconnecter ?</h1>
        <p className="text-sm text-[#7A7F8E] leading-relaxed mb-7">Vous êtes sur le point de quitter votre espace BOS Systems. Vous pourrez vous reconnecter à tout moment.</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            style={{ background: 'linear-gradient(135deg,#0C0E12,#1e2330)', boxShadow: '0 4px 16px rgba(12,14,18,0.25)' }}
          >
            {loading ? 'Déconnexion…' : 'Se déconnecter'}
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-[#3A3D45] border border-[rgba(12,14,18,0.12)] hover:bg-[#F7F8FA] transition-all"
          >
            Annuler
          </Link>
        </div>
      </div>
    </div>
  )
}

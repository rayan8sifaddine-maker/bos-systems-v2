'use client'
import Link from 'next/link'
import { useState } from 'react'

const MAIN_LINKS: [string, string][] = [
  ['Fonctionnalités', '/#fonctionnalites'],
  ['Comment ça marche', '/#comment'],
  ['Tarifs', '/#tarifs'],
  ['Secteurs', '/secteurs'],
]

const RESOURCE_LINKS: [string, string][] = [
  ['Comparatif', '/comparatif'],
  ['Centre d\'aide', '/aide'],
  ['À propos', '/a-propos'],
  ['Carrières', '/carrieres'],
  ['Nouveautés', '/nouveautes'],
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* 1px gradient accent line at very top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-px" style={{ background: 'linear-gradient(90deg, #1A56FF 0%, #7C3AED 50%, #1A56FF 100%)' }} />

      <nav className="fixed top-px left-0 right-0 z-50 bg-white/90 backdrop-blur-xl" style={{ borderBottom: '1px solid rgba(12,14,18,0.07)' }}>
        <div className="h-[60px] flex items-center justify-between px-5 md:px-10">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={() => setOpen(false)}>
            <div className="w-7 h-7 bg-[#0C0E12] rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-[14px] tracking-widest font-display text-[#0C0E12] uppercase">BOS Systems</span>
          </Link>

          {/* Desktop links — centered */}
          <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {MAIN_LINKS.map(([l, h]) => (
              <a key={h} href={h} className="px-3.5 py-2 text-[13px] text-[#5A5F6B] hover:text-[#0C0E12] transition-colors relative group">
                {l}
                <span className="absolute bottom-0 left-3.5 right-3.5 h-px bg-[#1A56FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
            <div className="relative group">
              <button className="px-3.5 py-2 text-[13px] text-[#5A5F6B] hover:text-[#0C0E12] transition-colors flex items-center gap-1.5 relative">
                Ressources
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className="transition-transform group-hover:rotate-180 opacity-50"><path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="absolute bottom-0 left-3.5 right-3.5 h-px bg-[#1A56FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="w-52 bg-white border border-[rgba(12,14,18,0.08)] rounded-2xl p-1.5" style={{ boxShadow: '0 16px 40px rgba(12,14,18,0.12)' }}>
                  {RESOURCE_LINKS.map(([l, h]) => (
                    <Link key={h} href={h} className="block px-3 py-2 text-[13px] text-[#5A5F6B] hover:text-[#0C0E12] hover:bg-[#F7F8FA] rounded-xl transition-all">{l}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-2">
            <Link href="/connexion" className="hidden md:block px-3.5 py-2 text-[13px] text-[#5A5F6B] hover:text-[#0C0E12] transition-colors">
              Se connecter
            </Link>
            <Link href="/inscription" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all hover:-translate-y-px hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1A56FF, #7C3AED)', boxShadow: '0 2px 10px rgba(26,86,255,0.3)' }}>
              Essai gratuit
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen(o => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F7F8FA] transition-colors"
            >
              {open ? (
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M3 3l12 12M15 3L3 15" stroke="#0C0E12" strokeWidth="1.6" strokeLinecap="round"/></svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M2 5h14M2 9h14M2 13h14" stroke="#0C0E12" strokeWidth="1.6" strokeLinecap="round"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-[rgba(12,14,18,0.06)] bg-white px-5 py-4 max-h-[calc(100vh-61px)] overflow-y-auto">
            <div className="flex flex-col gap-0.5">
              {MAIN_LINKS.map(([l, h]) => (
                <a key={h} href={h} onClick={() => setOpen(false)} className="px-3 py-2.5 text-[13px] text-[#5A5F6B] hover:text-[#0C0E12] hover:bg-[#F7F8FA] rounded-xl transition-all">{l}</a>
              ))}
              <div className="my-2 border-t border-[rgba(12,14,18,0.05)]" />
              {RESOURCE_LINKS.map(([l, h]) => (
                <Link key={h} href={h} onClick={() => setOpen(false)} className="px-3 py-2.5 text-[13px] text-[#5A5F6B] hover:text-[#0C0E12] hover:bg-[#F7F8FA] rounded-xl transition-all">{l}</Link>
              ))}
              <div className="my-2 border-t border-[rgba(12,14,18,0.05)]" />
              <Link href="/connexion" onClick={() => setOpen(false)} className="px-3 py-2.5 text-[13px] text-[#5A5F6B] border border-[rgba(12,14,18,0.1)] rounded-xl text-center hover:bg-[#F7F8FA] transition-all">Se connecter</Link>
              <Link href="/inscription" onClick={() => setOpen(false)} className="mt-1 px-3 py-3 text-[13px] font-semibold text-white rounded-xl text-center" style={{ background: 'linear-gradient(135deg, #1A56FF, #7C3AED)' }}>Essai gratuit →</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer style={{ background: '#0A0C10' }}>
      {/* Logotype + tagline */}
      <div className="px-6 md:px-12 pt-16 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="font-bold font-display leading-none tracking-[-0.02em] text-white/8 select-none" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'rgba(255,255,255,0.06)' }}>
              BOS SYSTEMS
            </div>
            <p className="text-[#5A5F6B] text-sm mt-4 max-w-xs leading-relaxed">
              La plateforme IA qui automatise la relation client des entreprises marocaines.
            </p>
          </div>
          <div className="flex items-center gap-3 pb-1">
            <Link href="/inscription" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-px" style={{ background: 'linear-gradient(135deg, #1A56FF, #7C3AED)', boxShadow: '0 4px 16px rgba(26,86,255,0.25)' }}>
              Essai gratuit →
            </Link>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-[11px] font-semibold text-[#3A3D45] uppercase tracking-[0.12em] mb-4">Produit</div>
            {[
              ['Fonctionnalités', '/#fonctionnalites'],
              ['Tarifs', '/#tarifs'],
              ['Secteurs', '/secteurs'],
              ['Comparatif', '/comparatif'],
              ['Nouveautés', '/nouveautes'],
            ].map(([l, h]) => (
              <Link key={h} href={h} className="block text-[13px] text-[#4A4F5A] hover:text-[#9CA3AF] transition-colors mb-2.5">{l}</Link>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#3A3D45] uppercase tracking-[0.12em] mb-4">Entreprise</div>
            {[
              ['À propos', '/a-propos'],
              ['Carrières', '/carrieres'],
              ['Centre d\'aide', '/aide'],
            ].map(([l, h]) => (
              <Link key={h} href={h} className="block text-[13px] text-[#4A4F5A] hover:text-[#9CA3AF] transition-colors mb-2.5">{l}</Link>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#3A3D45] uppercase tracking-[0.12em] mb-4">Compte</div>
            {[
              ['Se connecter', '/connexion'],
              ['Créer un compte', '/inscription'],
            ].map(([l, h]) => (
              <Link key={h} href={h} className="block text-[13px] text-[#4A4F5A] hover:text-[#9CA3AF] transition-colors mb-2.5">{l}</Link>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#3A3D45] uppercase tracking-[0.12em] mb-4">Contact</div>
            <a href="mailto:support@bossystems.ma" className="block text-[13px] text-[#4A4F5A] hover:text-[#9CA3AF] transition-colors mb-2.5">Support</a>
            <a href="mailto:sales@bossystems.ma" className="block text-[13px] text-[#4A4F5A] hover:text-[#9CA3AF] transition-colors mb-2.5">Ventes</a>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-[11px] text-[#4A4F5A]">Tous les systèmes op.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="px-6 md:px-12 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[12px] text-[#3A3D45]">© 2026 BOS Systems — Casablanca, Maroc</span>
          <div className="flex items-center gap-5">
            <Link href="/confidentialite" className="text-[12px] text-[#3A3D45] hover:text-[#6B7280] transition-colors">Confidentialité</Link>
            <Link href="/conditions" className="text-[12px] text-[#3A3D45] hover:text-[#6B7280] transition-colors">Conditions</Link>
            <Link href="/conformite" className="text-[12px] text-[#3A3D45] hover:text-[#6B7280] transition-colors">Conformité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

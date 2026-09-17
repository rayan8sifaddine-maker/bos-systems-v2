import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(12,14,18,0.06)] py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 bg-[#0C0E12] rounded-md flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
                  <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                  <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                  <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
                </svg>
              </div>
              <span className="font-bold text-sm text-[#0C0E12] font-display">BOS SYSTEMS</span>
            </div>
            <p className="text-xs text-[#B0B5C3] leading-relaxed">La plateforme SaaS qui automatise la relation client des entreprises marocaines grâce à l&apos;IA.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="text-xs font-semibold text-[#0C0E12] uppercase tracking-wider mb-3">Produit</div>
              {[['Fonctionnalités','/#fonctionnalites'],['Tarifs','/#tarifs'],['Secteurs','/secteurs'],['Comparatif','/comparatif']].map(([l,h])=>(
                <Link key={h} href={h} className="block text-[#7A7F8E] hover:text-[#0C0E12] transition-colors mb-2">{l}</Link>
              ))}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0C0E12] uppercase tracking-wider mb-3">Entreprise</div>
              {[['À propos','/a-propos'],['Carrières','/carrieres'],['Centre d’aide','/aide']].map(([l,h])=>(
                <Link key={h} href={h} className="block text-[#7A7F8E] hover:text-[#0C0E12] transition-colors mb-2">{l}</Link>
              ))}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0C0E12] uppercase tracking-wider mb-3">Compte</div>
              {[['Se connecter','/connexion'],['Créer un compte','/inscription']].map(([l,h])=>(
                <Link key={h} href={h} className="block text-[#7A7F8E] hover:text-[#0C0E12] transition-colors mb-2">{l}</Link>
              ))}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0C0E12] uppercase tracking-wider mb-3">Contact</div>
              {[['Support','mailto:support@bossystems.ma'],['Ventes','mailto:sales@bossystems.ma']].map(([l,h])=>(
                <a key={h} href={h} className="block text-[#7A7F8E] hover:text-[#0C0E12] transition-colors mb-2">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-[rgba(12,14,18,0.06)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs text-[#B0B5C3]">
            <span>© 2026 BOS Systems — Casablanca, Maroc</span>
            <span className="hidden md:inline">·</span>
            <Link href="/confidentialite" className="hover:text-[#0C0E12] transition-colors">Politique de confidentialité</Link>
            <span className="hidden md:inline">·</span>
            <Link href="/conditions" className="hover:text-[#0C0E12] transition-colors">Conditions d&apos;utilisation</Link>
            <span className="hidden md:inline">·</span>
            <Link href="/conformite" className="hover:text-[#0C0E12] transition-colors">Conformité des données</Link>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#B0B5C3]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Tous les systèmes opérationnels
          </div>
        </div>
      </div>
    </footer>
  )
}

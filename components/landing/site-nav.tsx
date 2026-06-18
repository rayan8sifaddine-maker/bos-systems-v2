import Link from 'next/link'

export function SiteNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 bg-white/80 backdrop-blur-xl" style={{ borderBottom: '1px solid rgba(12,14,18,0.07)', boxShadow: '0 1px 0 rgba(12,14,18,0.04)' }}>
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-[#0C0E12] rounded-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
          </svg>
        </div>
        <span className="font-bold text-[15px] tracking-wide font-display text-[#0C0E12]">BOS SYSTEMS</span>
      </Link>
      <div className="hidden md:flex items-center gap-1">
        {[['Fonctionnalités','/#fonctionnalites'],['Comment ça marche','/#comment'],['Tarifs','/#tarifs'],['Secteurs','/secteurs']].map(([l,h])=>(
          <a key={h} href={h} className="px-4 py-2 text-sm text-[#3A3D45] hover:text-[#0C0E12] hover:bg-[#F7F8FA] rounded-lg transition-all">{l}</a>
        ))}
        <div className="relative group">
          <button className="px-4 py-2 text-sm text-[#3A3D45] hover:text-[#0C0E12] hover:bg-[#F7F8FA] rounded-lg transition-all flex items-center gap-1">
            Ressources
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className="transition-transform group-hover:rotate-180"><path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <div className="w-56 bg-white border border-[rgba(12,14,18,0.08)] rounded-xl p-1.5" style={{ boxShadow: '0 12px 32px rgba(12,14,18,0.12)' }}>
              {[['Comparatif','/comparatif'],['Centre d’aide','/aide'],['À propos','/a-propos'],['Carrières','/carrieres'],['Nouveautés','/nouveautes']].map(([l,h])=>(
                <Link key={h} href={h} className="block px-3 py-2 text-sm text-[#3A3D45] hover:text-[#0C0E12] hover:bg-[#F7F8FA] rounded-lg transition-all">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/connexion" className="hidden md:block px-4 py-2 text-sm text-[#3A3D45] border border-[rgba(12,14,18,0.1)] rounded-xl hover:bg-[#F7F8FA] transition-all">Se connecter</Link>
        <Link href="/inscription" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px" style={{ background: '#0C0E12', boxShadow: '0 2px 8px rgba(12,14,18,0.2)' }}>
          Essai gratuit →
        </Link>
      </div>
    </nav>
  )
}

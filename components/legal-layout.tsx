import Link from 'next/link'

export default function LegalLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[rgba(12,14,18,0.06)] px-6 md:px-12 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#0C0E12] rounded-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-sm text-[#0C0E12] font-display">BOS SYSTEMS</span>
          </Link>
          <Link href="/" className="text-xs text-[#7A7F8E] hover:text-[#0C0E12] transition-colors">← Retour à l&apos;accueil</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-12 py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.015em] text-[#0C0E12] font-display mb-2">{title}</h1>
        <p className="text-xs text-[#B0B5C3] mb-10">Dernière mise à jour : {updated}</p>
        <div className="space-y-8 text-sm text-[#3A3D45] leading-relaxed [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-[#0C0E12] [&_h2]:mb-2 [&_h2]:font-display [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
          {children}
        </div>
      </main>

      <footer className="border-t border-[rgba(12,14,18,0.06)] py-8 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-xs text-[#B0B5C3]">© 2026 BOS Systems — Casablanca, Maroc</div>
      </footer>
    </div>
  )
}

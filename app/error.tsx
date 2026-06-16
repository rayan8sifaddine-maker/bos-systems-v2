'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-red-500">
        <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L2 17h16L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M10 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="14.5" r="0.7" fill="currentColor"/>
        </svg>
      </div>
      <div className="text-sm font-bold text-red-500 tracking-wider mb-2">ERREUR INATTENDUE</div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#0C0E12] font-display mb-3">Une erreur s&apos;est produite</h1>
      <p className="text-[#7A7F8E] max-w-sm mb-8">Désolé, quelque chose s&apos;est mal passé. Vous pouvez réessayer ou revenir à l&apos;accueil.</p>
      <div className="flex items-center gap-3">
        <button onClick={() => reset()} className="btn-primary px-5 py-2.5">Réessayer</button>
        <a href="/" className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#3A3D45] border border-[rgba(12,14,18,0.1)] hover:bg-[#F7F8FA] transition-colors">Retour à l&apos;accueil</a>
      </div>
    </div>
  )
}

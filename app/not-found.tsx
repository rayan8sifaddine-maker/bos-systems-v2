import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 bg-[#0C0E12] rounded-2xl flex items-center justify-center mb-6">
        <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
          <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
          <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
          <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
        </svg>
      </div>
      <div className="text-sm font-bold text-[#1A56FF] tracking-wider mb-2">ERREUR 404</div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#0C0E12] font-display mb-3">Cette page n&apos;existe pas</h1>
      <p className="text-[#7A7F8E] max-w-sm mb-8">La page que vous cherchez a peut-être été déplacée ou n&apos;a jamais existé.</p>
      <div className="flex items-center gap-3">
        <Link href="/" className="btn-primary px-5 py-2.5">Retour à l&apos;accueil</Link>
        <Link href="/dashboard" className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#3A3D45] border border-[rgba(12,14,18,0.1)] hover:bg-[#F7F8FA] transition-colors">Aller au dashboard</Link>
      </div>
    </div>
  )
}

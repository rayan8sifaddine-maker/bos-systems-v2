import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteNav } from '@/components/landing/site-nav'
import { SiteFooter } from '@/components/landing/site-footer'
import { ScrollReveal } from '@/components/landing/scroll-reveal'

export const metadata: Metadata = {
  title: 'Carrières — BOS Systems',
  description: 'Rejoignez BOS Systems pour aider les entreprises marocaines à automatiser leur relation client.',
}

export default function CarrieresPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position:'absolute', top:'-15%', right:'10%', width:560, height:560, background:'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 65%)', borderRadius:'50%' }}/>
        </div>
        <div className="max-w-3xl mx-auto relative text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F5F3FF] border border-[rgba(124,58,237,0.15)] rounded-full text-[10px] font-semibold text-[#7C3AED] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              On recrute bientôt
            </div>
            <h1 className="text-[36px] md:text-[48px] font-bold tracking-[-0.015em] leading-[1.1] text-[#0C0E12] font-display mb-4">Construisez l&apos;avenir des entreprises marocaines avec nous</h1>
            <p className="text-lg text-[#3A3D45] font-light leading-relaxed max-w-xl mx-auto">BOS Systems grandit. Nous préparons l&apos;ouverture de nos premiers postes — notamment deux postes de développeur·se — pour accélérer la suite de l&apos;aventure.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-[#F7F8FA]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-8 md:p-10 text-center" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.05)' }}>
            <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-5" style={{ background:'#F5F3FF', color:'#7C3AED' }}>
              <svg width="24" height="24" viewBox="0 0 22 22" fill="none"><rect x="3" y="7" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 12h16" stroke="currentColor" strokeWidth="1.5"/></svg>
            </div>
            <h2 className="text-xl font-bold text-[#0C0E12] font-display mb-3">Aucun poste ouvert pour l&apos;instant</h2>
            <p className="text-[#7A7F8E] leading-relaxed max-w-md mx-auto mb-6">Mais l&apos;équipe va s&apos;agrandir dans les prochains mois, notamment côté développement produit. Si vous êtes développeur·se (front, back, ou full-stack) et que l&apos;idée de rejoindre une startup marocaine à ses débuts vous intéresse, laissez-nous votre profil — on vous contactera en priorité dès qu&apos;un poste s&apos;ouvre.</p>
            <a href="mailto:sales@bossystems.ma?subject=Candidature%20spontanée" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#0C0E12,#1e2330)', boxShadow:'0 4px 16px rgba(12,14,18,0.25)' }}>
              Envoyer une candidature spontanée
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Stade', value: 'Pré-seed', desc: 'Startup solo, en pleine construction' },
              { label: 'Prochains postes', value: '2 développeurs', desc: 'Front-end & back-end / full-stack' },
              { label: 'Mode de travail', value: 'Remote-friendly', desc: 'Basé au Maroc, flexible' },
            ].map(s => (
              <div key={s.label} className="p-5 rounded-2xl border border-[rgba(12,14,18,0.07)] bg-white text-center">
                <div className="text-[10px] font-semibold text-[#B0B5C3] uppercase tracking-wider mb-1.5">{s.label}</div>
                <div className="text-lg font-bold text-[#0C0E12] font-display mb-1">{s.value}</div>
                <div className="text-xs text-[#7A7F8E]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#7A7F8E]">En attendant, vous pouvez aussi <Link href="/a-propos" className="text-[#1A56FF] font-semibold hover:underline">découvrir l&apos;histoire de BOS Systems</Link>.</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

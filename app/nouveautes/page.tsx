import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteNav } from '@/components/landing/site-nav'
import { SiteFooter } from '@/components/landing/site-footer'
import { ScrollReveal } from '@/components/landing/scroll-reveal'

export const metadata: Metadata = {
  title: 'Nouveautés — BOS Systems',
  description: 'Les dernières mises à jour et nouveautés de BOS Systems.',
}

const UPDATES = [
  {
    date: 'Juin 2026',
    tag: 'Nouveau',
    color: '#1A56FF', bg: '#EEF2FF',
    title: 'Pages secteurs détaillées',
    desc: 'Chaque secteur (cliniques, garages, salons, écoles, restaurants) a désormais sa propre page avec cas d\'usage spécifiques, recommandation de plan adaptée et témoignages.',
  },
  {
    date: 'Juin 2026',
    tag: 'Nouveau',
    color: '#1A56FF', bg: '#EEF2FF',
    title: 'Comparateur BOS vs WhatsApp Business vs Excel',
    desc: 'Un tableau comparatif visuel pour comprendre concrètement ce que BOS automatise par rapport à une gestion manuelle.',
  },
  {
    date: 'Juin 2026',
    tag: 'Nouveau',
    color: '#1A56FF', bg: '#EEF2FF',
    title: 'Centre d\'aide',
    desc: 'Un guide pas-à-pas pour configurer votre assistant IA en 5 minutes, sans connaissances techniques.',
  },
  {
    date: 'Mai 2026',
    tag: 'Amélioration',
    color: '#10B981', bg: '#ECFDF5',
    title: 'Mode sombre sur tout le dashboard',
    desc: 'Le dashboard, le CRM, l\'agenda et l\'assistant IA supportent désormais un mode sombre complet.',
  },
  {
    date: 'Mai 2026',
    tag: 'Amélioration',
    color: '#10B981', bg: '#ECFDF5',
    title: 'Relances automatiques plus intelligentes',
    desc: 'Les relances de clients inactifs s\'adaptent désormais à l\'historique de chaque client pour un message plus pertinent.',
  },
]

export default function NouveautesPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <section className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position:'absolute', top:'-15%', left:'50%', transform:'translateX(-50%)', width:700, height:700, background:'radial-gradient(ellipse, rgba(26,86,255,0.1) 0%, transparent 65%)', borderRadius:'50%' }}/>
        </div>
        <div className="max-w-3xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F7F8FA] border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
            Nouveautés
          </div>
          <h1 className="text-[36px] md:text-[48px] font-bold tracking-[-0.015em] leading-[1.1] text-[#0C0E12] font-display mb-4">Ce qui change chez BOS Systems</h1>
          <p className="text-lg text-[#3A3D45] font-light leading-relaxed">On améliore le produit chaque semaine. Voici les dernières nouveautés.</p>
        </div>
      </section>

      <section className="pb-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative pl-8 border-l-2 border-[rgba(12,14,18,0.07)] space-y-10">
            {UPDATES.map((u, i) => (
              <ScrollReveal key={u.title} delay={i * 80}>
                <div className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full border-2 border-white" style={{ background: u.color }} />
                  <div className="text-xs text-[#B0B5C3] font-semibold mb-2">{u.date}</div>
                  <div className="bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-5" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: u.bg, color: u.color }}>{u.tag}</span>
                      <h3 className="text-base font-bold text-[#0C0E12]">{u.title}</h3>
                    </div>
                    <p className="text-sm text-[#7A7F8E] leading-relaxed">{u.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-[#F7F8FA]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold text-[#0C0E12] font-display mb-3">Une idée ou un retour ?</h2>
          <p className="text-[#7A7F8E] mb-6">Chaque suggestion compte pour la suite de BOS Systems.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:sales@bossystems.ma" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#0C0E12,#1e2330)', boxShadow:'0 4px 16px rgba(12,14,18,0.25)' }}>
              Partager un retour
            </a>
            <Link href="/" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium text-[#3A3D45] border border-[rgba(12,14,18,0.12)] hover:bg-white transition-all">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

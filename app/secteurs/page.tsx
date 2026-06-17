import Link from 'next/link'
import type { Metadata } from 'next'
import { SECTORS } from '@/lib/sectors'
import { SiteNav } from '@/components/landing/site-nav'
import { SiteFooter } from '@/components/landing/site-footer'
import { ScrollReveal } from '@/components/landing/scroll-reveal'

export const metadata: Metadata = {
  title: 'Secteurs — BOS Systems',
  description: 'Découvrez comment BOS Systems s\'adapte aux cliniques, garages, salons, écoles et restaurants marocains.',
}

export default function SectorsHubPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <section className="relative pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F7F8FA] border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
            Secteurs
          </div>
          <h1 className="text-[36px] md:text-[48px] font-bold tracking-[-0.015em] leading-[1.1] text-[#0C0E12] font-display mb-4">Une plateforme,<br/>conçue pour votre métier</h1>
          <p className="text-lg text-[#3A3D45] font-light leading-relaxed">Chaque secteur a ses propres usages, ses propres clients et ses propres défis. Découvrez comment BOS s&apos;adapte au vôtre.</p>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
          {SECTORS.map((s, i) => (
            <ScrollReveal key={s.slug} delay={i * 90}>
              <Link href={`/secteurs/${s.slug}`} className="block bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-7 h-full hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(12,14,18,0.08)] hover:border-[rgba(26,86,255,0.2)] transition-all duration-200 group" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.05)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: s.bg, color: s.color }}>
                  {s.icon}
                </div>
                <h2 className="text-lg font-bold text-[#0C0E12] group-hover:text-[#1A56FF] transition-colors mb-1">{s.name}</h2>
                <p className="text-xs text-[#B0B5C3] uppercase tracking-wider font-semibold mb-3">{s.shortDesc}</p>
                <p className="text-sm text-[#7A7F8E] leading-relaxed mb-4">{s.tagline}</p>
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(12,14,18,0.06)]">
                  <span className="text-xs font-semibold" style={{ color: s.color }}>{s.stat.value} · {s.stat.label}</span>
                  <span className="text-xs font-semibold text-[#1A56FF] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Découvrir
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

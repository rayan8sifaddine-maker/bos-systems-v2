import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SECTORS, getSector } from '@/lib/sectors'
import { SiteNav } from '@/components/landing/site-nav'
import { SiteFooter } from '@/components/landing/site-footer'
import { ScrollReveal } from '@/components/landing/scroll-reveal'

export function generateStaticParams() {
  return SECTORS.map(s => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const sector = getSector(params.slug)
  if (!sector) return {}
  return {
    title: `BOS Systems pour ${sector.name} — ${sector.tagline}`,
    description: sector.intro,
    openGraph: {
      title: `BOS Systems pour ${sector.name}`,
      description: sector.intro,
      locale: 'fr_MA',
      type: 'website',
    },
  }
}

export default function SectorPage({ params }: { params: { slug: string } }) {
  const sector = getSector(params.slug)
  if (!sector) notFound()

  const otherSectors = SECTORS.filter(s => s.slug !== sector.slug)

  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position:'absolute', top:'-15%', left:'10%', width:560, height:560, background:`radial-gradient(ellipse, ${sector.color}1A 0%, transparent 65%)`, borderRadius:'50%' }}/>
        </div>
        <div className="max-w-3xl mx-auto relative text-center">
          <div className="text-xs text-[#B0B5C3] mb-6 flex items-center justify-center gap-1.5">
            <Link href="/" className="hover:text-[#0C0E12] transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/secteurs" className="hover:text-[#0C0E12] transition-colors">Secteurs</Link>
            <span>/</span>
            <span className="text-[#3A3D45]">{sector.name}</span>
          </div>
          <div className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6" style={{ background: sector.bg, color: sector.color }}>
            {sector.icon}
          </div>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F7F8FA] border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
            {sector.shortDesc}
          </div>
          <h1 className="text-[36px] md:text-[48px] font-bold tracking-[-0.015em] leading-[1.1] text-[#0C0E12] font-display mb-4">{sector.tagline}</h1>
          <p className="text-lg text-[#3A3D45] font-light leading-relaxed mb-8 max-w-xl mx-auto">{sector.intro}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/inscription" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#0C0E12,#1e2330)', boxShadow:'0 4px 16px rgba(12,14,18,0.25)' }}>
              Essayer gratuitement 7 jours →
            </Link>
            <Link href="/#tarifs" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium text-[#3A3D45] border border-[rgba(12,14,18,0.12)] hover:bg-[#F7F8FA] transition-all">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* ── STAT BAR ── */}
      <section className="py-8 px-6 md:px-12 border-y border-[rgba(12,14,18,0.06)] bg-[#F7F8FA]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-3xl font-bold font-display" style={{ color: sector.color }}>{sector.stat.value}</div>
          <div className="text-sm text-[#7A7F8E] mt-1">{sector.stat.label}</div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-[#0C0E12] font-display mb-8 text-center">Ce que vivent les {sector.name.toLowerCase()} chaque jour</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-3">
            {sector.painPoints.map((p, i) => (
              <ScrollReveal key={p} delay={i * 80}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-[rgba(239,68,68,0.15)]" style={{ background:'rgba(239,68,68,0.04)' }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:'rgba(239,68,68,0.15)' }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <span className="text-sm text-[#3A3D45] leading-relaxed">{p}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="py-20 px-6 md:px-12 bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
              Cas d&apos;usage
            </div>
            <h2 className="text-[32px] md:text-[36px] font-bold tracking-[-0.015em] leading-[1.1] text-[#0C0E12] font-display">Comment BOS s&apos;adapte à votre métier</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {sector.useCases.map((u, i) => (
              <ScrollReveal key={u.title} delay={i * 90}>
                <div className="bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-6 h-full hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(12,14,18,0.08)] transition-all duration-200" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.05)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: sector.bg, color: sector.color }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 className="text-base font-bold text-[#0C0E12] mb-2">{u.title}</h3>
                  <p className="text-sm text-[#7A7F8E] leading-relaxed">{u.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECOMMENDED PLAN ── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F7F8FA] border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
              Quel plan choisir
            </div>
            <h2 className="text-[32px] font-bold tracking-[-0.015em] text-[#0C0E12] font-display">Notre recommandation pour {sector.name.toLowerCase()}</h2>
          </div>
          <div className="rounded-2xl p-7 border" style={{ background: sector.bg, borderColor: `${sector.color}33` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ background: sector.color }}>Recommandé</span>
              <span className="text-lg font-bold text-[#0C0E12] font-display">Plan {sector.recommendedPlan}</span>
            </div>
            <p className="text-sm text-[#3A3D45] leading-relaxed mb-4">{sector.planReason}</p>
            <Link href="/inscription" className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:underline" style={{ color: sector.color }}>
              Commencer avec le plan {sector.recommendedPlan} →
            </Link>
          </div>
          {sector.alternativePlans.length > 0 && (
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {sector.alternativePlans.map(alt => (
                <div key={alt.name} className="p-5 rounded-2xl border border-[rgba(12,14,18,0.07)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F7F8FA] text-[#7A7F8E] border border-[rgba(12,14,18,0.08)]">{alt.label}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#0C0E12] mb-1.5">Plan {alt.name}</div>
                  <p className="text-sm text-[#7A7F8E] leading-relaxed">{alt.reason}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      {sector.testimonial && (
        <section className="py-20 px-6 md:px-12 bg-[#F7F8FA]">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-7" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.05)' }}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B"><path d="M7 1l1.5 4h4.5l-3.5 2.5 1.5 4L7 9 3 11.5l1.5-4L1 5h4.5z"/></svg>
                ))}
              </div>
              <p className="text-base text-[#3A3D45] leading-relaxed mb-5">&ldquo;{sector.testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[rgba(12,14,18,0.06)]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${sector.testimonial.color}`}>{sector.testimonial.initials}</div>
                <div>
                  <div className="text-sm font-semibold text-[#0C0E12]">{sector.testimonial.name}</div>
                  <div className="text-xs text-[#B0B5C3]">{sector.testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── OTHER SECTORS ── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#0C0E12] font-display mb-6 text-center">Découvrir les autres secteurs</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {otherSectors.map(s => (
              <Link key={s.slug} href={`/secteurs/${s.slug}`} className="p-4 border border-[rgba(12,14,18,0.08)] rounded-xl hover:border-[rgba(26,86,255,0.25)] hover:bg-[#EEF2FF] hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3 w-[calc(50%-6px)] md:w-auto">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.bg, color: s.color }}>
                  {s.icon}
                </div>
                <span className="text-sm font-semibold text-[#0C0E12]">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

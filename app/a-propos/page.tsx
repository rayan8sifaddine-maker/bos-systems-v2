import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteNav } from '@/components/landing/site-nav'
import { SiteFooter } from '@/components/landing/site-footer'
import { ScrollReveal } from '@/components/landing/scroll-reveal'

export const metadata: Metadata = {
  title: 'À propos — BOS Systems',
  description: 'Pourquoi BOS Systems a été créé, et notre vision pour les PME marocaines.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position:'absolute', top:'-15%', left:'10%', width:560, height:560, background:'radial-gradient(ellipse, rgba(26,86,255,0.1) 0%, transparent 65%)', borderRadius:'50%' }}/>
        </div>
        <div className="max-w-3xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F7F8FA] border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
            À propos
          </div>
          <h1 className="text-[36px] md:text-[48px] font-bold tracking-[-0.015em] leading-[1.1] text-[#0C0E12] font-display mb-4">Pourquoi j&apos;ai créé BOS Systems</h1>
          <p className="text-lg text-[#3A3D45] font-light leading-relaxed">L&apos;histoire d&apos;un fondateur, et une conviction simple : les PME marocaines méritent les mêmes outils que les grandes entreprises.</p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-2xl mx-auto space-y-6 text-[#3A3D45] leading-relaxed text-[17px]">
          <ScrollReveal>
            <p>Tout est parti d&apos;un constat simple : au Maroc, des milliers de cliniques, garages, salons, écoles et restaurants perdent des clients chaque jour — non pas parce que leur service est mauvais, mais parce que personne ne répond au téléphone pendant le rush, parce qu&apos;un rendez-vous est oublié, ou parce que le suivi client se fait encore sur un carnet papier ou un fichier Excel.</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p>J&apos;ai vu ça de près. Des amis qui gèrent un cabinet médical, un garage, un salon de coiffure — tous avec le même problème : trop de demandes, pas assez de temps, et aucun outil pensé pour leur réalité. Les solutions existantes sont soit trop chères, soit conçues pour des entreprises américaines avec des équipes IT, soit tout simplement absentes du marché marocain.</p>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p>BOS Systems est né de cette frustration. L&apos;idée : donner à chaque petite et moyenne entreprise marocaine un assistant IA capable de répondre sur WhatsApp 24/7, de gérer les rendez-vous, de centraliser les clients dans un vrai CRM, et de relancer automatiquement ceux qu&apos;on oublie — sans embaucher une secrétaire supplémentaire, sans formation compliquée, et à un prix pensé pour le marché local.</p>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <div className="my-10 p-7 rounded-2xl border border-[rgba(26,86,255,0.15)]" style={{ background: '#EEF2FF' }}>
              <p className="text-[#0C0E12] font-medium text-lg leading-relaxed">&ldquo;Je ne construis pas BOS Systems pour les grandes entreprises qui ont déjà dix outils. Je le construis pour le médecin qui répond à ses messages entre deux consultations, pour le garagiste qui note les rendez-vous sur un carnet, pour la coiffeuse qui répond à ses clientes à 22h depuis son téléphone.&rdquo;</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={320}>
            <p>Aujourd&apos;hui, BOS Systems démarre comme un projet solo — je construis, je teste, j&apos;écoute chaque retour de mes premiers clients pour améliorer le produit semaine après semaine. Ma vision est claire : devenir l&apos;outil de référence pour la relation client des PME marocaines, secteur par secteur, ville par ville. La prochaine étape ? Agrandir l&apos;équipe avec des développeurs qui partagent cette conviction.</p>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <p>Si vous dirigez une PME au Maroc et que vous perdez des clients à cause d&apos;un téléphone qui sonne dans le vide, j&apos;aimerais vous montrer ce que BOS peut faire pour vous.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-16 px-6 md:px-12 bg-[#F7F8FA]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0C0E12] font-display mb-10 text-center">Ce qui guide BOS Systems</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Pensé pour le Maroc', desc: 'WhatsApp, dirham, fuseau horaire, réalités locales — BOS est conçu pour le marché marocain, pas adapté après coup.', color: '#1A56FF', bg: '#EEF2FF' },
              { title: 'Simple avant tout', desc: 'Aucune formation technique requise. Si un outil prend plus de 10 minutes à comprendre, il est mal conçu.', color: '#7C3AED', bg: '#F5F3FF' },
              { title: 'Au plus proche des clients', desc: 'Chaque retour client influence directement le produit. C\'est ce que permet de rester proche du terrain.', color: '#10B981', bg: '#ECFDF5' },
            ].map(v => (
              <div key={v.title} className="bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 font-bold text-sm" style={{ background: v.bg, color: v.color }}>✓</div>
                <h3 className="text-base font-bold text-[#0C0E12] mb-2">{v.title}</h3>
                <p className="text-sm text-[#7A7F8E] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0C0E12] font-display mb-4">Envie d&apos;en discuter ?</h2>
          <p className="text-[#7A7F8E] mb-7">Écrivez-moi directement, je réponds personnellement à chaque message.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/inscription" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#0C0E12,#1e2330)', boxShadow:'0 4px 16px rgba(12,14,18,0.25)' }}>
              Essayer gratuitement 7 jours →
            </Link>
            <a href="mailto:sales@bossystems.ma" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium text-[#3A3D45] border border-[rgba(12,14,18,0.12)] hover:bg-[#F7F8FA] transition-all">
              Écrire un email
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

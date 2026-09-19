import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteNav } from '@/components/landing/site-nav'
import { SiteFooter } from '@/components/landing/site-footer'
import { ScrollReveal } from '@/components/landing/scroll-reveal'

export const metadata: Metadata = {
  title: 'Centre d\'aide — BOS Systems',
  description: 'Comment configurer votre assistant IA BOS Systems en 5 minutes.',
}

const STEPS = [
  {
    n: '1',
    title: 'Créez votre compte',
    desc: 'Inscrivez-vous en moins de 2 minutes avec l\'email de votre entreprise. Aucune carte bancaire requise pour les 7 jours d\'essai.',
    color: '#1A56FF', bg: '#EEF2FF',
    mock: (
      <div className="bg-white rounded-xl border border-[rgba(12,14,18,0.08)] p-4 space-y-2.5">
        <div className="h-2.5 w-24 rounded bg-[#E5E7EB]" />
        <div className="h-8 rounded-lg border border-[rgba(12,14,18,0.1)] bg-[#F7F8FA]" />
        <div className="h-8 rounded-lg border border-[rgba(12,14,18,0.1)] bg-[#F7F8FA]" />
        <div className="h-8 rounded-lg" style={{ background: '#0C0E12' }} />
      </div>
    ),
  },
  {
    n: '2',
    title: 'Connectez votre numéro WhatsApp',
    desc: 'Suivez les instructions à l\'écran pour lier votre numéro WhatsApp Business existant — ou utilisez un numéro dédié BOS.',
    color: '#10B981', bg: '#ECFDF5',
    mock: (
      <div className="bg-white rounded-xl border border-[rgba(12,14,18,0.08)] p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 00-6 10.6L1 15l3.5-1A7 7 0 108 1z"/></svg>
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-20 rounded bg-[#E5E7EB]" />
          <div className="h-2 w-14 rounded bg-[#10B981]/30" />
        </div>
        <div className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#ECFDF5] text-[#10B981]">Connecté</div>
      </div>
    ),
  },
  {
    n: '3',
    title: 'Personnalisez votre assistant',
    desc: 'Renseignez les infos de votre activité — horaires, services, tarifs — pour que l\'IA réponde exactement comme vous le feriez.',
    color: '#7C3AED', bg: '#F5F3FF',
    mock: (
      <div className="bg-white rounded-xl border border-[rgba(12,14,18,0.08)] p-4 space-y-2">
        {['Nom de l\'activité', 'Horaires d\'ouverture', 'Services proposés'].map(f => (
          <div key={f} className="flex items-center justify-between">
            <span className="text-[10px] text-[#7A7F8E]">{f}</span>
            <div className="h-2 w-16 rounded bg-[#7C3AED]/20" />
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '4',
    title: 'Configurez votre planning',
    desc: 'Définissez vos créneaux disponibles, vos jours de fermeture et la durée par défaut d\'un rendez-vous.',
    color: '#D97706', bg: '#FFFBEB',
    mock: (
      <div className="bg-white rounded-xl border border-[rgba(12,14,18,0.08)] p-4 grid grid-cols-5 gap-1.5">
        {[1,1,0,1,1,0,1].slice(0,5).map((on,i) => (
          <div key={i} className={`h-8 rounded-lg ${on ? 'bg-[#FFFBEB] border border-[#D97706]/30' : 'bg-[#F7F8FA]'}`} />
        ))}
      </div>
    ),
  },
  {
    n: '5',
    title: 'Activez et c\'est parti',
    desc: 'Cliquez sur "Activer l\'assistant" — votre IA répond désormais à vos clients sur WhatsApp 24/7, automatiquement.',
    color: '#EF4444', bg: '#FEF2F2',
    mock: (
      <div className="bg-white rounded-xl border border-[rgba(12,14,18,0.08)] p-4 flex items-center justify-center">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ECFDF5] text-[#10B981] text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          Assistant actif
        </div>
      </div>
    ),
  },
]

export default function AidePage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <section className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position:'absolute', top:'-15%', left:'10%', width:560, height:560, background:'radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 65%)', borderRadius:'50%' }}/>
        </div>
        <div className="max-w-3xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F7F8FA] border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
            Centre d&apos;aide
          </div>
          <h1 className="text-[36px] md:text-[48px] font-bold tracking-[-0.015em] leading-[1.1] text-[#0C0E12] font-display mb-4">Configurez votre assistant IA en 5 minutes</h1>
          <p className="text-lg text-[#3A3D45] font-light leading-relaxed">Aucune compétence technique requise. Suivez ces 5 étapes et votre assistant répondra à vos clients dès aujourd&apos;hui.</p>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-5">
          {STEPS.map((s, i) => (
            <ScrollReveal key={s.n} delay={i * 90}>
              <div className="grid md:grid-cols-[auto_1fr_220px] gap-5 items-center bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-6" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.05)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background: s.bg, color: s.color }}>{s.n}</div>
                <div>
                  <h3 className="text-base font-bold text-[#0C0E12] mb-1.5">{s.title}</h3>
                  <p className="text-sm text-[#7A7F8E] leading-relaxed">{s.desc}</p>
                </div>
                <div className="w-full md:w-[220px]">{s.mock}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-[#F7F8FA]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-[#0C0E12] font-display mb-3">Une question pendant la configuration ?</h2>
          <p className="text-[#7A7F8E] mb-6">Notre équipe support répond généralement en moins d&apos;une heure.</p>
          <a href="mailto:support@bossystems.ma" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#0C0E12,#1e2330)', boxShadow:'0 4px 16px rgba(12,14,18,0.25)' }}>
            Contacter le support
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

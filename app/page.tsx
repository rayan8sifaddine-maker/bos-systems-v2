import Link from 'next/link'
import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/landing/scroll-reveal'
import { AnimatedCounter } from '@/components/landing/animated-counter'
import { FaqItem } from '@/components/landing/faq-item'
import { SiteNav } from '@/components/landing/site-nav'
import { TiltCard } from '@/components/landing/tilt-card'
import { MagneticButton } from '@/components/landing/magnetic-button'
import { SiteFooter } from '@/components/landing/site-footer'
import { Marquee } from '@/components/landing/marquee'
import { SECTORS } from '@/lib/sectors'

export const metadata: Metadata = {
  title: 'BOS Systems — Le système d\'exploitation des entreprises marocaines',
  description: 'Remplacez WhatsApp, Excel et le carnet papier par un système IA intelligent. Rendez-vous automatisés, rappels, CRM — tout en un.',
  openGraph: {
    title: 'BOS Systems — Le système des entreprises marocaines',
    description: 'La plateforme SaaS qui centralise et automatise votre relation client.',
    locale: 'fr_MA',
    type: 'website',
  },
}

/* ─── Dashboard Mockup ─────────────────────────────────────── */
function DashboardMockup() {
  return (
    <div className="relative select-none">
      {/* Floating badges */}
      <div className="absolute -top-5 -right-3 z-10 flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-lg" style={{ boxShadow: '0 4px 24px rgba(12,14,18,0.14)', border: '1px solid rgba(12,14,18,0.07)' }}>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
        <span className="text-[11px] font-semibold text-[#0C0E12]">IA active · réponse en 2s</span>
      </div>
      <div className="absolute -bottom-4 -left-3 z-10 flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5" style={{ boxShadow: '0 8px 28px rgba(12,14,18,0.12)', border: '1px solid rgba(12,14,18,0.06)' }}>
        <div className="w-7 h-7 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 9l3-5 2.5 3 2-3 2.5 5" stroke="#10B981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div>
          <div className="text-[10px] font-bold text-[#0C0E12]">+38% rendez-vous</div>
          <div className="text-[9px] text-[#B0B5C3]">vs mois dernier</div>
        </div>
      </div>
      {/* Browser */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1A1D24] border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          <div className="flex-1 mx-4 h-5 bg-white/5 rounded-md border border-white/5 flex items-center justify-center">
            <span className="text-[9px] text-white/30">app.bossystems.ma/dashboard</span>
          </div>
        </div>
        <div className="flex bg-[#13151A]" style={{ height: 330 }}>
          <div className="w-[108px] bg-[#0F1116] border-r border-white/5 flex flex-col flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-3 border-b border-white/5">
              <div className="w-5 h-5 bg-[#1A56FF] rounded-md flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
                  <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                  <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                  <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
                </svg>
              </div>
              <span className="text-[9px] font-bold text-white/80">BOS</span>
            </div>
            <div className="p-2 space-y-0.5">
              {[
                { label: 'Dashboard', active: true },
                { label: 'Rendez-vous', active: false },
                { label: 'CRM', active: false },
                { label: 'Analytics', active: false },
                { label: 'Assistant IA', active: false },
              ].map(item => (
                <div key={item.label} className={`px-2 py-1.5 rounded-lg text-[9px] font-medium ${item.active ? 'bg-[#1A56FF]/20 text-[#6BA3FF]' : 'text-white/30'}`}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 p-3 overflow-hidden">
            <div className="text-[11px] font-bold text-white/80 mb-2.5">Bonjour, Dr. Bennani 👋</div>
            <div className="grid grid-cols-4 gap-1.5 mb-2.5">
              {[
                { label: 'Clients', value: '248', color: '#6BA3FF', bg: 'rgba(26,86,255,0.15)', trend: '+12%' },
                { label: 'RDV/jour', value: '14', color: '#A78BFA', bg: 'rgba(124,58,237,0.15)', trend: '+5' },
                { label: 'CA mois', value: '48k', color: '#34D399', bg: 'rgba(16,185,129,0.15)', trend: '+22%' },
                { label: 'Taux RDV', value: '94%', color: '#FBBF24', bg: 'rgba(245,158,11,0.15)', trend: '↑' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-2" style={{ background: s.bg }}>
                  <div className="text-[8px] text-white/30 mb-1">{s.label}</div>
                  <div className="text-[13px] font-bold text-white leading-none mb-1">{s.value}</div>
                  <div className="text-[8px] font-semibold" style={{ color: s.color }}>{s.trend}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-2.5 mb-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold text-white/50">Rendez-vous — 30 jours</span>
                <span className="text-[8px] text-emerald-400 font-medium">↑ +38%</span>
              </div>
              <svg viewBox="0 0 280 50" className="w-full" style={{ height: 50 }}>
                <defs>
                  <linearGradient id="chartGradDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A56FF" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#1A56FF" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,48 C20,44 35,42 55,36 C75,30 90,33 110,26 C130,19 145,22 165,14 C185,6 210,8 230,4 C250,0 265,2 280,1" fill="none" stroke="#1A56FF" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M0,50 L0,48 C20,44 35,42 55,36 C75,30 90,33 110,26 C130,19 145,22 165,14 C185,6 210,8 230,4 C250,0 265,2 280,1 L280,50 Z" fill="url(#chartGradDark)"/>
                {[[55,36],[110,26],[165,14],[230,4]].map(([x,y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#13151A" stroke="#1A56FF" strokeWidth="1.5"/>
                ))}
              </svg>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="px-2.5 py-1.5 border-b border-white/5">
                <span className="text-[9px] font-semibold text-white/50">Prochains RDV</span>
              </div>
              {[
                { time: '10:00', name: 'Youssef M.', color: 'text-emerald-400', dot: 'bg-emerald-400' },
                { time: '11:30', name: 'Fatima B.', color: 'text-amber-400', dot: 'bg-amber-400' },
                { time: '14:00', name: 'Karim L.', color: 'text-emerald-400', dot: 'bg-emerald-400' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 border-b border-white/5 last:border-0">
                  <span className="text-[9px] font-bold text-white/60 w-8 flex-shrink-0">{a.time}</span>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.dot}`} />
                  <span className="text-[9px] text-white/40 flex-1">{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Data ─────────────────────────────────────────────────── */
const FEATURES = [
  {
    title: 'Assistant IA WhatsApp',
    desc: 'Répond à vos clients 24h/24 en français et en darija. Gère les rendez-vous, les tarifs, les disponibilités — dans votre style.',
    color: '#1A56FF', bg: 'rgba(26,86,255,0.1)',
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M2 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H6l-4 3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 9h6M7 6h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    size: 'large',
  },
  {
    title: 'Agenda intelligent',
    desc: 'Le client demande, l\'IA confirme. Zéro conflit, synchronisation temps réel.',
    color: '#7C3AED', bg: 'rgba(124,58,237,0.08)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 1v4M14 1v4M2 9h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="5" y="12" width="3" height="3" rx="0.5" fill="currentColor"/></svg>,
    size: 'small',
  },
  {
    title: 'Rappels automatiques',
    desc: 'J-1 et 2h avant. −78% d\'absences. Plus jamais un créneau perdu.',
    color: '#10B981', bg: 'rgba(16,185,129,0.08)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
    size: 'small',
  },
  {
    title: 'Relances intelligentes',
    desc: 'BOS identifie les clients inactifs et les relance au bon moment.',
    color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 14l4-7 3 4 2-3 4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    size: 'small',
  },
  {
    title: 'Analytics temps réel',
    desc: 'CA, conversions, performance — tout sur un seul dashboard.',
    color: '#EF4444', bg: 'rgba(239,68,68,0.08)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 15l4-5 3 3 4-6 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
    size: 'small',
  },
  {
    title: 'CRM complet',
    desc: 'Historique client, notes, statuts, pipeline. La mémoire de votre établissement.',
    color: '#06B6D4', bg: 'rgba(6,182,212,0.08)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M2 17c0-3.314 2.239-6 5-6s5 2.686 5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M18 13c0-2.209-1.343-4-3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    size: 'medium',
  },
  {
    title: 'Automatisations',
    desc: 'Workflows, séquences emails, relances — tournent seuls, sans intervention.',
    color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
    size: 'medium',
  },
  {
    title: 'Gestion d\'équipe',
    desc: 'Rôles et permissions granulaires. Journal d\'activité. Performance par collaborateur.',
    color: '#F97316', bg: 'rgba(249,115,22,0.08)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    size: 'small',
  },
]

const PLANS = [
  {
    name: 'Starter',
    price: '749',
    desc: 'Pour démarrer et valider',
    features: ['Assistant IA WhatsApp', 'Gestion des rendez-vous', 'Rappels automatiques', '200 conversations/mois', 'CRM basique', '1 utilisateur'],
    featured: false,
    cta: 'Commencer',
  },
  {
    name: 'Pro',
    price: '2 749',
    desc: 'Pour les équipes actives',
    features: ['Tout Starter inclus', 'Conversations illimitées', 'Relances automatiques', 'CRM complet', 'Analytics avancés', '3 utilisateurs', 'Support prioritaire'],
    featured: true,
    cta: 'Commencer maintenant',
  },
  {
    name: 'Enterprise',
    price: '4 489',
    desc: 'Pour les grandes structures',
    features: ['Tout Pro inclus', 'Équipe illimitée', 'Intégrations custom', 'API dédiée', 'SLA garanti', 'Account manager dédié', 'Onboarding personnalisé'],
    featured: false,
    cta: 'Contacter l\'équipe',
  },
]

/* ─── Section label component ──────────────────────────────── */
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: '#1A56FF' }}>{num}</span>
      <div className="w-8 h-px" style={{ background: '#1A56FF' }} />
      <span className="text-[11px] font-medium text-[#9CA3AF] tracking-[0.1em] uppercase">{label}</span>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      {/* ══════════════════════════════════════
          HERO — dark, centered, dashboard below
      ══════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(180deg, #080A0E 0%, #0C0E12 100%)' }} className="relative pt-28 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 700, background: 'radial-gradient(ellipse, rgba(26,86,255,0.14) 0%, transparent 55%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '30%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 60%)', borderRadius: '50%' }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '56px 56px' }} />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative">
          {/* Badge */}
          <Link href="/nouveautes" className="inline-flex items-center gap-2.5 mb-10 px-4 py-2 rounded-full text-[12px] text-white/40 hover:text-white/60 transition-colors" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A56FF] flex-shrink-0" />
            Nouveau : pages secteurs détaillées & comparatif
            <span className="opacity-40">→</span>
          </Link>

          {/* Headline */}
          <h1 className="font-bold leading-[0.92] tracking-[-0.03em] text-white mb-7 font-display" style={{ fontSize: 'clamp(52px, 8vw, 92px)' }}>
            L&apos;infrastructure<br />
            <span style={{ background: 'linear-gradient(135deg, #5B8DFF 0%, #A78BFA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              client
            </span>
            {' '}des<br />
            entreprises<br />
            marocaines.
          </h1>

          <p className="text-white/35 text-lg max-w-lg mx-auto mb-10 font-light leading-relaxed">
            BOS remplace WhatsApp, Excel et le carnet papier — rendez-vous automatisés, rappels, CRM, analytics. Tout sur une plateforme.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <MagneticButton
              href="/inscription"
              className="items-center justify-center gap-2 px-8 py-4 rounded-2xl text-[15px] font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #1A56FF, #7C3AED)', boxShadow: '0 0 0 1px rgba(26,86,255,0.4), 0 8px 32px rgba(26,86,255,0.35)' }}
            >
              Commencer gratuitement — 7 jours
            </MagneticButton>
            <Link href="/connexion" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-[15px] font-medium text-white/50 hover:text-white/70 transition-colors" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              Se connecter
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-10 pb-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '3rem', marginTop: '0' }}>
            {[
              { v: -78, suffix: '%', l: 'de no-shows en moins' },
              { v: 24, suffix: '/7', l: 'disponibilité IA' },
              { v: 40, prefix: '+', suffix: '%', l: 'de conversions' },
              { v: 2, suffix: 'h', l: 'gagnées par jour' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-[28px] font-bold text-white font-display leading-none mb-1">
                  <AnimatedCounter value={s.v} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="text-[12px] text-white/25">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard showcase — bleeds into white below */}
        <div className="relative px-6 md:px-12 max-w-5xl mx-auto" style={{ paddingBottom: 0 }}>
          <div className="absolute inset-x-0 -top-8" style={{ height: 120, background: 'radial-gradient(ellipse 50% 100% at 50% 50%, rgba(26,86,255,0.18) 0%, transparent 70%)' }} />
          <TiltCard>
            <DashboardMockup />
          </TiltCard>
        </div>

        {/* Gradient to white */}
        <div style={{ height: 80, background: 'linear-gradient(to bottom, #0C0E12, white)', marginTop: -1 }} />
      </section>

      {/* ══════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════ */}
      <Marquee />

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white" style={{ borderBottom: '1px solid rgba(12,14,18,0.06)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[11px] font-semibold text-[#C0C4CE] uppercase tracking-[0.18em] mb-12">Résultats observés en moyenne sur nos clients</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[rgba(12,14,18,0.06)]">
            {[
              { v: 78, suffix: '%', l: 'de réduction des absences', color: '#10B981' },
              { v: 3, suffix: '×', l: 'plus de clients convertis', color: '#1A56FF' },
              { v: 3, prefix: '< ', suffix: 's', l: 'temps de réponse IA', color: '#7C3AED' },
              { v: 240, prefix: '+', l: 'entreprises équipées', color: '#F59E0B' },
            ].map(({ v, l, prefix, suffix, color }) => (
              <div key={l} className="text-center py-4 px-4">
                <div className="text-[42px] font-bold font-display leading-none mb-2" style={{ color }}>
                  <AnimatedCounter value={v} prefix={prefix} suffix={suffix} />
                </div>
                <div className="text-[12px] text-[#9CA3AF] leading-snug">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COMMENT ÇA MARCHE — vertical steps
      ══════════════════════════════════════ */}
      <section id="comment" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionLabel num="01" label="Comment ça marche" />
          <h2 className="font-bold text-[#0C0E12] tracking-[-0.02em] leading-tight mb-16 font-display" style={{ fontSize: 'clamp(36px, 5vw, 52px)' }}>
            Opérationnel<br />en 5 minutes.
          </h2>
          <div className="space-y-0">
            {[
              {
                n: '01',
                title: 'Créez votre compte',
                desc: 'Inscrivez-vous en 30 secondes. Choisissez votre secteur, renseignez votre établissement. Aucune carte bancaire requise.',
                color: '#1A56FF',
                bg: '#EEF2FF',
                icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M15 5h4M17 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              },
              {
                n: '02',
                title: 'Configurez l\'IA',
                desc: 'Donnez à l\'IA votre style, vos horaires et vos services. Elle apprend votre façon de parler à vos clients.',
                color: '#7C3AED',
                bg: '#F5F3FF',
                icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M8.5 10c0-1.38.895-2.5 2-2.5s2 1.12 2 2.5c0 1.663-2 3-2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="11" cy="15.5" r=".75" fill="currentColor"/></svg>,
              },
              {
                n: '03',
                title: 'Vos clients sont gérés',
                desc: 'L\'IA répond sur WhatsApp, confirme les RDV, envoie des rappels, relance les inactifs. Vous vous concentrez sur votre métier.',
                color: '#10B981',
                bg: '#ECFDF5',
                icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              },
            ].map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 100}>
                <div className="flex gap-8 py-10" style={{ borderBottom: i < 2 ? '1px solid rgba(12,14,18,0.06)' : undefined }}>
                  <div className="font-bold font-display leading-none text-right w-14 flex-shrink-0 pt-3 select-none" style={{ fontSize: 48, color: 'rgba(12,14,18,0.05)' }}>
                    {step.n}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0" style={{ background: step.bg, color: step.color }}>
                      {step.icon}
                    </div>
                    <h3 className="text-[18px] font-bold text-[#0C0E12] mb-2">{step.title}</h3>
                    <p className="text-[#7A7F8E] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES — bento grid
      ══════════════════════════════════════ */}
      <section id="fonctionnalites" className="py-24 px-6" style={{ background: '#F8F7F4' }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel num="02" label="Fonctionnalités" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2 className="font-bold text-[#0C0E12] tracking-[-0.02em] leading-tight font-display" style={{ fontSize: 'clamp(32px, 4vw, 46px)' }}>
              Tout ce dont vous<br />avez besoin.
            </h2>
            <p className="text-[#7A7F8E] max-w-xs leading-relaxed text-sm">Chaque fonctionnalité résout un problème réel des entreprises marocaines.</p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* LARGE — Assistant IA (spans 2 rows, 5 cols) */}
            <ScrollReveal className="md:col-span-5 md:row-span-2">
              <div className="h-full rounded-3xl p-8 flex flex-col" style={{ background: '#0C0E12', minHeight: 280 }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0" style={{ background: 'rgba(26,86,255,0.2)', color: '#6BA3FF' }}>
                  {FEATURES[0].icon}
                </div>
                <div className="text-white text-[18px] font-bold mb-3">{FEATURES[0].title}</div>
                <div className="text-white/40 leading-relaxed text-sm flex-1">{FEATURES[0].desc}</div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {['darija', 'français', 'arabe', '24/7'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#5B8DFF]" style={{ background: 'rgba(26,86,255,0.15)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* SMALL top-right: Agenda */}
            <ScrollReveal className="md:col-span-4" delay={60}>
              <div className="rounded-3xl p-6 bg-white h-full" style={{ border: '1px solid rgba(12,14,18,0.07)' }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: FEATURES[1].bg, color: FEATURES[1].color }}>
                  {FEATURES[1].icon}
                </div>
                <div className="text-[15px] font-bold text-[#0C0E12] mb-1.5">{FEATURES[1].title}</div>
                <div className="text-[13px] text-[#7A7F8E] leading-relaxed">{FEATURES[1].desc}</div>
              </div>
            </ScrollReveal>

            {/* SMALL top-right: Rappels */}
            <ScrollReveal className="md:col-span-3" delay={100}>
              <div className="rounded-3xl p-6 h-full" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)' }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>
                  {FEATURES[2].icon}
                </div>
                <div className="text-[15px] font-bold text-[#0C0E12] mb-1.5">{FEATURES[2].title}</div>
                <div className="text-[13px] text-[#7A7F8E] leading-relaxed">{FEATURES[2].desc}</div>
              </div>
            </ScrollReveal>

            {/* SMALL row 2: Relances */}
            <ScrollReveal className="md:col-span-4" delay={80}>
              <div className="rounded-3xl p-6 bg-white h-full" style={{ border: '1px solid rgba(12,14,18,0.07)' }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: FEATURES[3].bg, color: FEATURES[3].color }}>
                  {FEATURES[3].icon}
                </div>
                <div className="text-[15px] font-bold text-[#0C0E12] mb-1.5">{FEATURES[3].title}</div>
                <div className="text-[13px] text-[#7A7F8E] leading-relaxed">{FEATURES[3].desc}</div>
              </div>
            </ScrollReveal>

            {/* SMALL row 2: Analytics */}
            <ScrollReveal className="md:col-span-3" delay={120}>
              <div className="rounded-3xl p-6 h-full" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)' }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
                  {FEATURES[4].icon}
                </div>
                <div className="text-[15px] font-bold text-[#0C0E12] mb-1.5">{FEATURES[4].title}</div>
                <div className="text-[13px] text-[#7A7F8E] leading-relaxed">{FEATURES[4].desc}</div>
              </div>
            </ScrollReveal>

            {/* WIDE bottom: CRM */}
            <ScrollReveal className="md:col-span-7" delay={60}>
              <div className="rounded-3xl p-6 h-full flex gap-5" style={{ background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.12)' }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(6,182,212,0.1)', color: '#06B6D4' }}>
                  {FEATURES[5].icon}
                </div>
                <div>
                  <div className="text-[15px] font-bold text-[#0C0E12] mb-1.5">{FEATURES[5].title}</div>
                  <div className="text-[13px] text-[#7A7F8E] leading-relaxed">{FEATURES[5].desc}</div>
                </div>
              </div>
            </ScrollReveal>

            {/* Auto */}
            <ScrollReveal className="md:col-span-5" delay={100}>
              <div className="rounded-3xl p-6 h-full flex gap-5" style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.12)' }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>
                  {FEATURES[6].icon}
                </div>
                <div>
                  <div className="text-[15px] font-bold text-[#0C0E12] mb-1.5">{FEATURES[6].title}</div>
                  <div className="text-[13px] text-[#7A7F8E] leading-relaxed">{FEATURES[6].desc}</div>
                </div>
              </div>
            </ScrollReveal>

            {/* Équipe — full width */}
            <ScrollReveal className="md:col-span-12" delay={80}>
              <div className="rounded-3xl p-6 flex flex-col md:flex-row md:items-center gap-5 justify-between" style={{ background: '#0C0E12' }}>
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,115,22,0.2)', color: '#FB923C' }}>
                    {FEATURES[7].icon}
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-white mb-1">{FEATURES[7].title}</div>
                    <div className="text-[13px] text-white/40 leading-relaxed">{FEATURES[7].desc}</div>
                  </div>
                </div>
                <Link href="/inscription" className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white hover:opacity-90 transition-all" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  Voir toutes les fonctionnalités →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTORS
      ══════════════════════════════════════ */}
      <section id="secteurs" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionLabel num="03" label="Secteurs" />
              <h2 className="font-bold text-[#0C0E12] tracking-[-0.02em] leading-tight font-display" style={{ fontSize: 'clamp(32px, 4vw, 46px)' }}>
                Une plateforme,<br />tous les métiers.
              </h2>
            </div>
            <p className="text-[#7A7F8E] max-w-xs text-sm leading-relaxed">Adapté à chaque secteur, conçu pour la réalité marocaine.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SECTORS.map((s, i) => (
              <ScrollReveal key={s.slug} delay={i * 40}>
                <Link href={`/secteurs/${s.slug}`} className="group block p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(26,86,255,0.25)] hover:shadow-[0_12px_32px_rgba(26,86,255,0.08)]" style={{ border: '1px solid rgba(12,14,18,0.07)', background: 'white' }}>
                  <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] group-hover:bg-[#EEF2FF] flex items-center justify-center text-[#7A7F8E] group-hover:text-[#1A56FF] mb-3 transition-all">
                    {s.icon}
                  </div>
                  <div className="text-[13px] font-semibold text-[#0C0E12] mb-0.5">{s.name}</div>
                  <div className="text-[11px] text-[#B0B5C3]">{s.shortDesc}</div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="flex justify-start mt-8">
            <Link href="/secteurs" className="text-[13px] font-semibold text-[#1A56FF] hover:underline flex items-center gap-1.5">
              Voir tous les secteurs
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AVANT / APRÈS — true split screen
      ══════════════════════════════════════ */}
      <section className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* AVANT — dark */}
          <div className="px-8 md:px-12 lg:px-16 py-20" style={{ background: '#0C0E12' }}>
            <div className="max-w-md ml-auto">
              <div className="flex items-center gap-2 mb-10">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(239,68,68,0.2)' }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-[0.15em]">Avant BOS</span>
              </div>
              <h2 className="font-bold text-white tracking-tight mb-10 font-display" style={{ fontSize: 'clamp(28px, 3vw, 38px)' }}>
                Le chaos du<br />quotidien.
              </h2>
              <div className="space-y-5">
                {[
                  'WhatsApp débordé, messages manqués',
                  'Excel avec 47 onglets non mis à jour',
                  'Clients oubliés pendant des semaines',
                  'Aucune visibilité sur le chiffre d\'affaires',
                  'Absences fréquentes, créneaux perdus',
                  'Zéro statistiques, décisions à l\'aveugle',
                ].map((item, i) => (
                  <ScrollReveal key={item} delay={i * 60}>
                    <div className="flex items-start gap-3">
                      <span className="text-red-500/30 flex-shrink-0 mt-0.5 text-lg leading-none">—</span>
                      <span className="text-white/35 text-[14px] leading-relaxed">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* APRÈS — white */}
          <div className="px-8 md:px-12 lg:px-16 py-20 bg-white" style={{ borderLeft: '1px solid rgba(12,14,18,0.06)' }}>
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-10">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,0.15)' }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2.5 2.5 4.5-5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.15em]">Après BOS</span>
              </div>
              <h2 className="font-bold text-[#0C0E12] tracking-tight mb-10 font-display" style={{ fontSize: 'clamp(28px, 3vw, 38px)' }}>
                La clarté au<br />quotidien.
              </h2>
              <div className="space-y-5">
                {[
                  'IA WhatsApp qui répond en moins de 3 secondes',
                  'CRM centralisé, historique complet par client',
                  'Relances automatiques au bon moment',
                  'Dashboard temps réel — CA, RDV, tendances',
                  '−78% d\'absences grâce aux rappels automatiques',
                  'Analytics complets chaque semaine',
                ].map((item, i) => (
                  <ScrollReveal key={item} delay={i * 60}>
                    <div className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                        <circle cx="8" cy="8" r="7" fill="#ECFDF5"/>
                        <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-[#3A3D45] text-[14px] leading-relaxed">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <div className="mt-10">
                <Link href="/inscription" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-semibold text-white hover:-translate-y-px transition-all" style={{ background: 'linear-gradient(135deg, #1A56FF, #7C3AED)', boxShadow: '0 4px 16px rgba(26,86,255,0.3)' }}>
                  Passer à l&apos;après maintenant →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS — featured + 2 small
      ══════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: '#F8F7F4' }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel num="04" label="Témoignages" />
          <h2 className="font-bold text-[#0C0E12] tracking-[-0.02em] leading-tight mb-12 font-display" style={{ fontSize: 'clamp(32px, 4vw, 46px)' }}>
            Ce que nos clients<br />disent.
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {/* Featured */}
            <ScrollReveal className="md:col-span-2">
              <div className="rounded-3xl p-10 h-full flex flex-col" style={{ background: '#0C0E12' }}>
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 14 14" fill="#F59E0B"><path d="M7 1l1.5 4h4.5l-3.5 2.5 1.5 4L7 9 3 11.5l1.5-4L1 5h4.5z"/></svg>
                  ))}
                </div>
                <p className="text-white text-[22px] font-medium leading-[1.4] flex-1 mb-8">&ldquo;Depuis BOS, je ne reçois plus d&apos;appels manqués. L&apos;IA répond, planifie et rappelle mes patients. J&apos;ai récupéré 2h par jour — et mes patients sont mieux suivis que jamais.&rdquo;</p>
                <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">YB</div>
                  <div>
                    <div className="text-[13px] font-semibold text-white">Dr. Youssef Bennani</div>
                    <div className="text-[12px] text-white/30">Dermatologue, Casablanca</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            {/* Two small */}
            <div className="space-y-5">
              {[
                { name: 'Farid Alaoui', role: 'Directeur, Garage Elite Rabat', initials: 'FA', color: 'bg-amber-500', quote: 'Mes clients reçoivent des rappels automatiques pour les révisions. Le taux de retour a augmenté de 35% en 3 mois.' },
                { name: 'Salma Chraibi', role: 'Directrice, École Innovate', initials: 'SC', color: 'bg-violet-600', quote: 'Le tableau de bord me donne une vision complète. Je sais exactement combien d\'inscrits et ce que ça représente en CA.' },
              ].map((t, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="bg-white rounded-3xl p-6 h-full" style={{ border: '1px solid rgba(12,14,18,0.07)' }}>
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} width="13" height="13" viewBox="0 0 14 14" fill="#F59E0B"><path d="M7 1l1.5 4h4.5l-3.5 2.5 1.5 4L7 9 3 11.5l1.5-4L1 5h4.5z"/></svg>
                      ))}
                    </div>
                    <p className="text-[13px] text-[#3A3D45] leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                    <div className="flex items-center gap-2.5 pt-4" style={{ borderTop: '1px solid rgba(12,14,18,0.05)' }}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 ${t.color}`}>{t.initials}</div>
                      <div>
                        <div className="text-[12px] font-semibold text-[#0C0E12]">{t.name}</div>
                        <div className="text-[11px] text-[#B0B5C3]">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHATSAPP AI — centered phone
      ══════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel num="05" label="Assistant WhatsApp" />
            <h2 className="font-bold text-[#0C0E12] tracking-[-0.02em] leading-tight mb-4 font-display" style={{ fontSize: 'clamp(32px, 4vw, 46px)' }}>
              Pourquoi l&apos;IA de BOS<br />est différente.
            </h2>
            <p className="text-[#7A7F8E] max-w-lg mx-auto leading-relaxed">Vos clients écrivent comme ils parlent — en darija, en français, parfois les deux. BOS les comprend instantanément.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* iPhone */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 -m-16" style={{ background: 'radial-gradient(ellipse, rgba(37,211,102,0.12) 0%, transparent 60%)' }} />
                <div className="relative" style={{ width: 280 }}>
                  <div className="absolute -left-[3px] top-[72px] w-[3px] h-8 rounded-l-full" style={{ background: '#2a2a2a' }} />
                  <div className="absolute -left-[3px] top-[112px] w-[3px] h-10 rounded-l-full" style={{ background: '#2a2a2a' }} />
                  <div className="absolute -left-[3px] top-[156px] w-[3px] h-10 rounded-l-full" style={{ background: '#2a2a2a' }} />
                  <div className="absolute -right-[3px] top-[100px] w-[3px] h-14 rounded-r-full" style={{ background: '#2a2a2a' }} />
                  <div className="rounded-[44px] overflow-hidden" style={{ background: '#1a1a1a', padding: '3px', boxShadow: '0 40px 80px rgba(12,14,18,0.3), 0 0 0 0.5px rgba(255,255,255,0.08)' }}>
                    <div className="rounded-[42px] overflow-hidden bg-black">
                      <div className="bg-[#075E54]">
                        <div className="px-6 pt-3 pb-1 flex items-center justify-between">
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black rounded-full flex items-center justify-center gap-1.5 px-3" style={{ width: 88, height: 26, zIndex: 10 }}>
                            <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-[#333]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-[#333]" />
                          </div>
                          <span className="text-white text-[11px] font-semibold mt-1">9:41</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <svg width="13" height="9" viewBox="0 0 13 9" fill="white"><rect x="0" y="5" width="2.5" height="4" rx=".5"/><rect x="3.5" y="3" width="2.5" height="6" rx=".5"/><rect x="7" y="1" width="2.5" height="8" rx=".5"/><rect x="10.5" y="0" width="2.5" height="9" rx=".5"/></svg>
                            <svg width="20" height="10" viewBox="0 0 20 10" fill="none"><rect x="0.5" y="0.5" width="16" height="9" rx="2.5" stroke="white" strokeOpacity=".5"/><rect x="1.5" y="1.5" width="12" height="7" rx="1.5" fill="white"/></svg>
                          </div>
                        </div>
                        <div className="px-4 pb-3 pt-1 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#128C7E] flex items-center justify-center text-white text-sm font-bold flex-shrink-0 border-2 border-white/20">B</div>
                          <div className="flex-1">
                            <div className="text-white text-[13px] font-semibold">BOS Assistant</div>
                            <div className="text-emerald-200 text-[10px]">● en ligne</div>
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-3 space-y-2.5" style={{ background: '#ECE5DD', minHeight: 340 }}>
                        <div className="flex justify-center mb-2">
                          <span className="text-[9px] bg-[#E1F2FB] text-[#667781] px-2 py-0.5 rounded-full">Aujourd&apos;hui</span>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-[#DCF8C6] rounded-[16px] rounded-tr-[4px] px-3 py-2 max-w-[78%]" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                            <p className="text-[12px] text-[#111]">Salam, bghit nakhod rendez-vous pour coupe + soin 🙏</p>
                            <p className="text-[9px] text-[#667781] text-right mt-0.5">14:23 ✓✓</p>
                          </div>
                        </div>
                        <div className="flex justify-start gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-[#128C7E] flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0 self-end mb-1">B</div>
                          <div className="bg-white rounded-[16px] rounded-tl-[4px] px-3 py-2 max-w-[80%]" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
                            <p className="text-[11.5px] text-[#111]">Bonjour ! 😊 Voici les créneaux pour <span className="font-semibold">coupe + soin</span> :</p>
                            <div className="mt-1.5 space-y-1">
                              {['📅 Lundi 16 juin — 10h00', '📅 Lundi 16 juin — 14h30', '📅 Mardi 17 juin — 11h00'].map(s => (
                                <div key={s} className="text-[10.5px] bg-[#F0F4F8] rounded-lg px-2 py-1">{s}</div>
                              ))}
                            </div>
                            <p className="text-[9px] text-[#667781] text-right mt-1">14:23</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-[#DCF8C6] rounded-[16px] rounded-tr-[4px] px-3 py-2 max-w-[70%]" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                            <p className="text-[12px] text-[#111]">Le lundi à 14h30 svp</p>
                            <p className="text-[9px] text-[#667781] text-right mt-0.5">14:24 ✓✓</p>
                          </div>
                        </div>
                        <div className="flex justify-start gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-[#128C7E] flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0 self-end mb-1">B</div>
                          <div className="bg-white rounded-[16px] rounded-tl-[4px] px-3 py-2 max-w-[80%]" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
                            <p className="text-[11.5px] text-[#111]">✅ <span className="font-semibold">Confirmé !</span> Lundi 16 juin à 14h30. Rappel la veille. À bientôt 🌟</p>
                            <p className="text-[9px] text-[#667781] text-right mt-1">14:24</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#F0F2F5] px-3 py-2 flex items-center gap-2">
                        <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-[#B0B5C3]">Message</div>
                        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="white"><path d="M13 7L1 1l3 6-3 6 12-6z"/></svg>
                        </div>
                      </div>
                      <div className="bg-black flex justify-center py-2">
                        <div className="w-24 h-1 rounded-full bg-white opacity-30" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-10 top-16 bg-white rounded-2xl px-3 py-2.5" style={{ boxShadow: '0 8px 24px rgba(12,14,18,0.12)', border: '1px solid rgba(12,14,18,0.07)' }}>
                  <div className="text-[9px] text-[#7A7F8E]">Réponse en</div>
                  <div className="text-[20px] font-bold text-[#25D366]">2 sec</div>
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-5">
              {[
                { color: '#10B981', bg: '#ECFDF5', title: 'Répond en moins de 3 secondes', desc: 'Même à 23h, même le week-end. Vos clients n\'attendent plus.' },
                { color: '#1A56FF', bg: '#EEF2FF', title: 'Comprend le français et la darija', desc: 'Adapté à la réalité marocaine. Pas besoin d\'écrire parfaitement.' },
                { color: '#F59E0B', bg: '#FFFBEB', title: 'Prend les RDV automatiquement', desc: 'Vérifie les disponibilités, confirme, envoie un rappel — tout seul.' },
                { color: '#7C3AED', bg: '#F5F3FF', title: 'Parle dans votre style', desc: 'Vous configurez le ton. Il s\'adapte à votre image.' },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80}>
                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F8F7F4] transition-colors">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.bg, color: item.color }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-[#0C0E12] mb-0.5">{item.title}</div>
                      <div className="text-[13px] text-[#7A7F8E] leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SÉCURITÉ
      ══════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: '#F8F7F4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel num="06" label="Sécurité" />
              <h2 className="font-bold text-[#0C0E12] tracking-[-0.02em] leading-tight mb-4 font-display" style={{ fontSize: 'clamp(32px, 4vw, 46px)' }}>
                Vos données sont<br />protégées.
              </h2>
              <p className="text-[#7A7F8E] leading-relaxed mb-8">Sécurité et conformité prises au sérieux dès le premier jour.</p>
              <div className="flex flex-wrap gap-3">
                {['RGPD', 'Loi 09-08', 'TLS/HTTPS', 'Europe-hosted'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[12px] font-medium text-[#3A3D45] bg-white" style={{ border: '1px solid rgba(12,14,18,0.08)' }}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Chiffrement TLS', desc: 'Connexions HTTPS. Données jamais en clair.', color: '#1A56FF', bg: '#EEF2FF', icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9V6a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5"/></svg> },
                { title: 'Conformité Maroc', desc: 'Loi 09-08 & RGPD. Standards européens.', color: '#10B981', bg: '#ECFDF5', icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2l7 3v5c0 4.4-2.9 7.6-7 9-4.1-1.4-7-4.6-7-9V5l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
                { title: 'Hébergement Europe', desc: 'Cloud certifié avec sauvegardes régulières.', color: '#7C3AED', bg: '#F5F3FF', icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7h16M5 14v2M15 14v2M4 18h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                { title: 'Isolation totale', desc: 'Chaque compte totalement cloisonné.', color: '#F59E0B', bg: '#FFFBEB', icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg> },
              ].map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 70}>
                  <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(12,14,18,0.07)' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: f.bg, color: f.color }}>{f.icon}</div>
                    <div className="text-[13px] font-semibold text-[#0C0E12] mb-1">{f.title}</div>
                    <div className="text-[12px] text-[#7A7F8E] leading-relaxed">{f.desc}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ — two columns
      ══════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <SectionLabel num="07" label="FAQ" />
              <h2 className="font-bold text-[#0C0E12] tracking-[-0.02em] leading-tight mb-5 font-display" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}>
                Questions<br />fréquentes.
              </h2>
              <p className="text-[#7A7F8E] text-[14px] leading-relaxed mb-8">Tout ce que vous devez savoir avant de vous lancer.</p>
              <Link href="/aide" className="text-[13px] font-semibold text-[#1A56FF] hover:underline flex items-center gap-1.5">
                Centre d&apos;aide complet
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div className="md:col-span-3 space-y-3">
              {[
                { q: 'Combien de temps faut-il pour démarrer ?', a: 'Comptez 5 minutes : création du compte, choix du secteur, configuration de l\'assistant IA. Aucune installation, aucun technicien requis.' },
                { q: 'Mes données sont-elles en sécurité ?', a: 'Oui. Données hébergées en Europe, chiffrées au repos et en transit. Conformité RGPD et loi marocaine 09-08.' },
                { q: 'L\'IA comprend-elle vraiment la darija ?', a: 'Oui. L\'assistant comprend le français, l\'arabe et la darija — y compris les messages mélangeant plusieurs langues.' },
                { q: 'Puis-je annuler à tout moment ?', a: 'Aucun engagement. Annulation depuis les paramètres, sans frais ni justification.' },
                { q: 'Le support est-il disponible en français ?', a: 'Notre équipe répond en français et darija, via WhatsApp et email, avec un temps de réponse moyen < 2h en semaine.' },
              ].map((item, i) => (
                <ScrollReveal key={item.q} delay={i * 60}>
                  <FaqItem question={item.q} answer={item.a} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING
      ══════════════════════════════════════ */}
      <section id="tarifs" className="py-24 px-6" style={{ background: '#F8F7F4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel num="08" label="Tarifs" />
            <h2 className="font-bold text-[#0C0E12] tracking-[-0.02em] leading-tight mb-3 font-display" style={{ fontSize: 'clamp(32px, 4vw, 46px)' }}>
              Un plan pour chaque<br />taille d&apos;équipe.
            </h2>
            <p className="text-[#7A7F8E]">Sans engagement · 7 jours d&apos;essai gratuit · Annulez à tout moment</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PLANS.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 80}>
                <div
                  className="relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 h-full"
                  style={p.featured
                    ? { background: '#0C0E12', boxShadow: '0 24px 64px rgba(12,14,18,0.25), 0 0 0 1px rgba(26,86,255,0.35)', transform: 'translateY(-6px)' }
                    : { background: 'white', border: '1px solid rgba(12,14,18,0.07)' }
                  }
                >
                  {p.featured && (
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #1A56FF, #7C3AED)' }} />
                  )}
                  {p.featured && (
                    <div className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold uppercase tracking-widest" style={{ background: 'rgba(26,86,255,0.12)', color: '#6BA3FF' }}>
                      ✦ Le plus populaire
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <div className={`text-[12px] font-semibold tracking-wider uppercase mb-1 ${p.featured ? 'text-white/40' : 'text-[#9CA3AF]'}`}>{p.name}</div>
                    <div className={`text-[12px] mb-6 ${p.featured ? 'text-white/25' : 'text-[#C0C4CE]'}`}>{p.desc}</div>
                    <div className="flex items-baseline gap-1.5 mb-8">
                      <span className={`font-bold tracking-tight font-display leading-none ${p.featured ? 'text-white' : 'text-[#0C0E12]'}`} style={{ fontSize: 48 }}>{p.price}</span>
                      <span className={`text-sm ${p.featured ? 'text-white/25' : 'text-[#C0C4CE]'}`}>DH/mois</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {p.features.map(f => (
                        <li key={f} className={`flex items-center gap-2.5 text-[13px] ${p.featured ? 'text-white/65' : 'text-[#3A3D45]'}`}>
                          <svg className="flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" fill={p.featured ? 'rgba(26,86,255,0.2)' : '#EEF2FF'}/>
                            <path d="M5 8l2 2 4-4" stroke={p.featured ? '#6BA3FF' : '#1A56FF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={p.name === 'Enterprise' ? 'mailto:sales@bossystems.ma' : '/inscription'}
                      className={`block text-center py-3.5 rounded-2xl text-[13px] font-semibold transition-all hover:-translate-y-px ${p.featured ? 'text-white' : 'bg-[#0C0E12] text-white hover:bg-[#1e2330]'}`}
                      style={p.featured ? { background: 'linear-gradient(135deg, #1A56FF, #7C3AED)', boxShadow: '0 6px 20px rgba(26,86,255,0.35)' } : {}}
                    >
                      {p.cta}
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-center text-[12px] text-[#C0C4CE] mt-10">Tous les prix en DH HT/mois · Paiement mensuel ou annuel (−20%) · Sans carte bancaire pour l&apos;essai</p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA — dark, minimal, big
      ══════════════════════════════════════ */}
      <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#080A0E' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(26,86,255,0.15) 0%, transparent 60%)', borderRadius: '50%' }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '56px 56px' }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-[12px] text-white/30" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            Rejoignez les entreprises déjà automatisées
          </div>
          <h2 className="font-bold text-white leading-[0.95] tracking-[-0.03em] mb-8 font-display" style={{ fontSize: 'clamp(48px, 7vw, 80px)' }}>
            Prêt à<br />
            <span style={{ background: 'linear-gradient(135deg, #5B8DFF, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>automatiser</span>
            <br />votre relation<br />client ?
          </h2>
          <p className="text-white/30 text-lg mb-12">7 jours gratuits. Sans carte bancaire. Résultats dès le premier jour.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              href="/inscription"
              className="items-center justify-center gap-2 px-10 py-4 rounded-2xl text-[15px] font-semibold text-[#0C0E12] bg-white hover:bg-white/90 transition-all"
              style={{ boxShadow: '0 4px 24px rgba(255,255,255,0.15)' }}
            >
              Commencer gratuitement →
            </MagneticButton>
          </div>
          <div className="flex items-center justify-center gap-8 mt-10">
            {['Sans engagement', 'Support inclus', 'Annulation simple'].map(t => (
              <div key={t} className="flex items-center gap-1.5 text-[12px] text-white/25">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

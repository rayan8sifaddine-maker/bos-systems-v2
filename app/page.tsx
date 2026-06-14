import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BOS Systems — Le système d\'exploitation des PME marocaines',
  description: 'Remplacez WhatsApp, Excel et le carnet papier par un système IA intelligent. Rendez-vous automatisés, rappels, CRM — tout en un.',
  openGraph: {
    title: 'BOS Systems — Le système des PME marocaines',
    description: 'La plateforme SaaS qui centralise et automatise votre relation client.',
    locale: 'fr_MA',
    type: 'website',
  },
}

/* ─── Dashboard Mockup (hero visual) ──────────────────────── */
function DashboardMockup() {
  return (
    <div className="relative select-none" aria-hidden>
      {/* Floating badge top-right */}
      <div className="absolute -top-4 -right-4 z-10 flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-[rgba(12,14,18,0.08)]" style={{ boxShadow: '0 4px 20px rgba(12,14,18,0.12)' }}>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
        <span className="text-[11px] font-semibold text-[#0C0E12]">Assistant IA actif</span>
      </div>

      {/* Floating badge bottom-left */}
      <div className="absolute -bottom-4 -left-4 z-10 flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-[rgba(12,14,18,0.08)]" style={{ boxShadow: '0 4px 20px rgba(12,14,18,0.12)' }}>
        <div className="w-7 h-7 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 9l3-5 2.5 3 2-3 2.5 5" stroke="#10B981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div>
          <div className="text-[10px] font-bold text-[#0C0E12]">+38% RDV</div>
          <div className="text-[9px] text-[#B0B5C3]">vs mois dernier</div>
        </div>
      </div>

      {/* Notification badge */}
      <div className="absolute top-16 -left-6 z-10 flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-[rgba(12,14,18,0.08)]" style={{ boxShadow: '0 4px 20px rgba(12,14,18,0.10)' }}>
        <div className="w-7 h-7 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="2" width="11" height="9" rx="1.5" stroke="#1A56FF" strokeWidth="1.2"/><path d="M1 5l5.5 3.5L12 5" stroke="#1A56FF" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </div>
        <div>
          <div className="text-[10px] font-bold text-[#0C0E12]">Rappel envoyé</div>
          <div className="text-[9px] text-[#B0B5C3]">3 clients notifiés</div>
        </div>
      </div>

      {/* Browser frame */}
      <div className="rounded-2xl overflow-hidden border border-[rgba(12,14,18,0.10)]" style={{ boxShadow: '0 24px 60px rgba(12,14,18,0.15), 0 8px 20px rgba(12,14,18,0.08)' }}>
        {/* Chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#F7F8FA] border-b border-[rgba(12,14,18,0.06)]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <div className="flex-1 mx-4 h-5 bg-white rounded-md border border-[rgba(12,14,18,0.08)] flex items-center gap-1.5 px-2">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="3" stroke="#B0B5C3" strokeWidth="1"/><path d="M4 2v2l1.5 1.5" stroke="#B0B5C3" strokeWidth="1" strokeLinecap="round"/></svg>
            <span className="text-[9px] text-[#B0B5C3]">app.bossystems.ma/dashboard</span>
          </div>
        </div>

        {/* Dashboard UI */}
        <div className="flex bg-[#F7F8FA]" style={{ height: 340 }}>
          {/* Sidebar */}
          <div className="w-[110px] bg-white border-r border-[rgba(12,14,18,0.06)] flex flex-col flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-3 border-b border-[rgba(12,14,18,0.06)]">
              <div className="w-5 h-5 bg-[#0C0E12] rounded-md flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
                  <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                  <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                  <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
                </svg>
              </div>
              <span className="text-[9px] font-bold text-[#0C0E12]">BOS</span>
            </div>
            <div className="p-2 space-y-0.5">
              {[
                { label: 'Dashboard', active: true },
                { label: 'Rendez-vous', active: false },
                { label: 'CRM', active: false },
                { label: 'Analytics', active: false },
                { label: 'Facturation', active: false },
                { label: 'Assistant IA', active: false },
              ].map(item => (
                <div key={item.label} className={`px-2 py-1.5 rounded-lg text-[9px] font-medium ${item.active ? 'bg-[#EEF2FF] text-[#1A56FF]' : 'text-[#7A7F8E]'}`}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-3 overflow-hidden">
            <div className="text-[11px] font-bold text-[#0C0E12] mb-2.5">Bonjour, Dr. Bennani</div>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-1.5 mb-2.5">
              {[
                { label: 'Clients', value: '248', color: '#1A56FF', bg: '#EEF2FF', trend: '+12%' },
                { label: 'RDV/jour', value: '14', color: '#7C3AED', bg: '#F5F3FF', trend: '+5' },
                { label: 'CA mois', value: '48k', color: '#10B981', bg: '#ECFDF5', trend: '+22%' },
                { label: 'Taux RDV', value: '94%', color: '#F59E0B', bg: '#FFFBEB', trend: '↑' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-2 border border-[rgba(12,14,18,0.06)]">
                  <div className="text-[8px] text-[#B0B5C3] mb-1">{s.label}</div>
                  <div className="text-[13px] font-bold text-[#0C0E12] leading-none mb-1">{s.value}</div>
                  <div className="text-[8px] font-semibold" style={{ color: s.color }}>{s.trend}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl p-2.5 border border-[rgba(12,14,18,0.06)] mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold text-[#0C0E12]">Rendez-vous — 30 jours</span>
                <span className="text-[8px] text-emerald-500 font-medium">↑ +38%</span>
              </div>
              <svg viewBox="0 0 280 55" className="w-full" style={{ height: 55 }}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A56FF" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#1A56FF" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,50 C20,46 35,44 55,38 C75,32 90,35 110,28 C130,21 145,24 165,16 C185,8 210,10 230,6 C250,2 265,4 280,3" fill="none" stroke="#1A56FF" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M0,55 L0,50 C20,46 35,44 55,38 C75,32 90,35 110,28 C130,21 145,24 165,16 C185,8 210,10 230,6 C250,2 265,4 280,3 L280,55 Z" fill="url(#chartGrad)"/>
                {/* Dots */}
                {[[55,38],[110,28],[165,16],[230,6]].map(([x,y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="white" stroke="#1A56FF" strokeWidth="1.5"/>
                ))}
              </svg>
            </div>

            {/* Appointment list */}
            <div className="bg-white rounded-xl border border-[rgba(12,14,18,0.06)] overflow-hidden">
              <div className="px-2.5 py-1.5 border-b border-[rgba(12,14,18,0.04)]">
                <span className="text-[9px] font-semibold text-[#0C0E12]">Prochains RDV</span>
              </div>
              {[
                { time: '10:00', name: 'Youssef M.', status: 'Confirmé', color: 'text-emerald-600 bg-emerald-50' },
                { time: '11:30', name: 'Fatima B.', status: 'En attente', color: 'text-amber-600 bg-amber-50' },
                { time: '14:00', name: 'Karim L.', status: 'Confirmé', color: 'text-emerald-600 bg-emerald-50' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 border-b border-[rgba(12,14,18,0.04)] last:border-0">
                  <span className="text-[9px] font-bold text-[#0C0E12] w-8 flex-shrink-0">{a.time}</span>
                  <span className="text-[9px] text-[#3A3D45] flex-1 truncate">{a.name}</span>
                  <span className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${a.color}`}>{a.status}</span>
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
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H6l-4 3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 9h6M7 6h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Assistant IA WhatsApp', desc: 'Répond à vos clients 24h/24. Tarifs, disponibilités, prise de RDV — dans votre style.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 1v4M14 1v4M2 9h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="5" y="12" width="3" height="3" rx="0.5" fill="currentColor"/></svg>, title: 'Agenda intelligent', desc: 'Le client demande, l\'IA propose et confirme. Synchronisation temps réel. Zéro conflit.', color: 'text-violet-500', bg: 'bg-violet-50' },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>, title: 'Rappels automatiques', desc: 'J-1 et 2h avant. Les absences chutent de 78%. Plus jamais un créneau perdu.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 14l4-7 3 4 2-3 4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="16" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M16 3V1M14 5h-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title: 'Relances intelligentes', desc: 'BOS identifie les clients inactifs et les relance au bon moment. Fidélisation automatique.', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 15l4-5 3 3 4-6 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>, title: 'Analytics temps réel', desc: 'CA, taux de conversion, performance équipe — tout sur un seul tableau de bord.', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M2 17c0-3.314 2.239-6 5-6s5 2.686 5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M18 13c0-2.209-1.343-4-3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'CRM complet', desc: 'Historique client, notes, statuts, pipeline commercial. Votre mémoire institutionnelle.', color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Facturation intégrée', desc: 'Créez et suivez vos devis et factures. Paiements en ligne bientôt disponibles.', color: 'text-teal-500', bg: 'bg-teal-50' },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>, title: 'Automatisations', desc: 'Workflows personnalisés, séquences emails, relances factures — sans intervention.', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Gestion d\'équipe', desc: 'Rôles et permissions granulaires. Journal d\'activité. Performance par collaborateur.', color: 'text-orange-500', bg: 'bg-orange-50' },
]

const SECTORS = [
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 9.5L11 2l8 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 21v-7h6v7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, name: 'Cliniques', desc: 'Médecins & cabinets' },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="8" width="18" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8V6a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="1.5"/><circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="15" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>, name: 'Garages', desc: 'Auto & mécanique' },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 10L11 3l8 7v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 21v-6h6v6" stroke="currentColor" strokeWidth="1.5"/></svg>, name: 'Immobilier', desc: 'Agences & promoteurs' },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 8h6M8 11h4M8 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, name: 'Avocats', desc: 'Cabinets juridiques' },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, name: 'Salons', desc: 'Beauté & coiffure' },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 7V5a5 5 0 0110 0v2" stroke="currentColor" strokeWidth="1.5"/><path d="M9 13h4M11 11v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, name: 'Hôtels & Riads', desc: 'Hospitalité & tourisme' },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 17l4-8 3 4 3-6 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>, name: 'Écoles', desc: 'Formation & éducation' },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16l-1.5 9H4.5L3 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 6l-1-3M8 6V4M14 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="14" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>, name: 'Restaurants', desc: 'Restauration & livraison' },
]

const PLANS = [
  { name: 'Starter', price: '500', desc: 'Pour démarrer et valider', features: ['Assistant IA WhatsApp', 'Gestion des rendez-vous', 'Rappels automatiques', '200 conversations/mois', 'CRM basique', '1 utilisateur'], featured: false, cta: 'Commencer' },
  { name: 'Pro', price: '1 500', desc: 'Pour les équipes actives', features: ['Tout Starter inclus', 'Conversations illimitées', 'Relances automatiques', 'CRM complet', 'Analytics avancés', 'Facturation', '3 utilisateurs', 'Support prioritaire'], featured: true, cta: 'Commencer maintenant' },
  { name: 'Enterprise', price: '5 000+', desc: 'Pour les grandes structures', features: ['Tout Pro inclus', 'Équipe illimitée', 'Intégrations custom', 'API dédiée', 'SLA garanti', 'Account manager dédié', 'Onboarding personnalisé'], featured: false, cta: 'Contacter l\'équipe' },
]

/* ─── Page ─────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 bg-white/80 backdrop-blur-xl" style={{ borderBottom: '1px solid rgba(12,14,18,0.07)', boxShadow: '0 1px 0 rgba(12,14,18,0.04)' }}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#0C0E12] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-[15px] tracking-wide font-display text-[#0C0E12]">BOS SYSTEMS</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {[['Fonctionnalités','#fonctionnalites'],['Comment ça marche','#comment'],['Tarifs','#tarifs']].map(([l,h])=>(
            <a key={h} href={h} className="px-4 py-2 text-sm text-[#3A3D45] hover:text-[#0C0E12] hover:bg-[#F7F8FA] rounded-lg transition-all">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/connexion" className="hidden md:block px-4 py-2 text-sm text-[#3A3D45] border border-[rgba(12,14,18,0.1)] rounded-xl hover:bg-[#F7F8FA] transition-all">Se connecter</Link>
          <Link href="/inscription" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px" style={{ background: '#0C0E12', boxShadow: '0 2px 8px rgba(12,14,18,0.2)' }}>
            Essai gratuit →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-16 px-6 md:px-12 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div style={{ position:'absolute', top:'-20%', left:'20%', width:700, height:700, background:'radial-gradient(ellipse, rgba(26,86,255,0.06) 0%, transparent 65%)', borderRadius:'50%' }}/>
          <div style={{ position:'absolute', top:'10%', right:'5%', width:500, height:500, background:'radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 65%)', borderRadius:'50%' }}/>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-[#EEF2FF] border border-[rgba(26,86,255,0.2)] rounded-full text-[#1A56FF] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A56FF] animate-pulse flex-shrink-0" />
                Disponible au Maroc · 14 jours gratuits
              </div>

              <h1 className="text-[48px] md:text-[62px] font-bold leading-[1.05] tracking-tight text-[#0C0E12] mb-5 font-display">
                L&apos;infrastructure<br/>client des{' '}
                <span style={{ background:'linear-gradient(135deg,#1A56FF 0%,#7C3AED 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  PME<br/>modernes
                </span>
              </h1>

              <p className="text-lg text-[#3A3D45] leading-relaxed mb-8 max-w-lg font-light">
                BOS remplace WhatsApp, Excel et le carnet papier par un système IA complet — rendez-vous automatisés, rappels, CRM, analytics. Tout sur une plateforme.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link href="/inscription" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#0C0E12,#1e2330)', boxShadow:'0 4px 16px rgba(12,14,18,0.25)' }}>
                  Commencer gratuitement — 14 jours →
                </Link>
                <Link href="/connexion" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium text-[#3A3D45] border border-[rgba(12,14,18,0.12)] hover:bg-[#F7F8FA] transition-all">
                  Se connecter
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                {[
                  { v:'−78%', l:'de no-shows', c:'#10B981' },
                  { v:'24/7', l:'disponibilité', c:'#1A56FF' },
                  { v:'+40%', l:'conversions', c:'#7C3AED' },
                ].map(({ v, l, c }) => (
                  <div key={l} className="flex items-center gap-2">
                    <span className="text-xl font-bold font-display" style={{ color:c }}>{v}</span>
                    <span className="text-sm text-[#7A7F8E]">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Dashboard mockup */}
            <div className="hidden lg:block relative">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY / STATS BAR ── */}
      <section className="py-10 px-6 md:px-12 border-y border-[rgba(12,14,18,0.06)] bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-xs font-semibold text-[#B0B5C3] uppercase tracking-widest text-center md:text-left">Résultats moyens observés</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { v:'78%', l:'de réduction des absences' },
                { v:'3×', l:'plus de clients convertis' },
                { v:'< 3s', l:'temps de réponse IA' },
                { v:'2h', l:'gagnées par jour' },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-bold text-[#0C0E12] font-display">{v}</div>
                  <div className="text-xs text-[#7A7F8E] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section id="comment" className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F7F8FA] border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
              En 3 étapes
            </div>
            <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] font-display">Opérationnel en 5 minutes</h2>
            <p className="text-lg text-[#3A3D45] mt-3 font-light">Pas de formation. Pas de technicien. Juste votre navigateur.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t-2 border-dashed border-[rgba(12,14,18,0.08)]" />

            {[
              {
                n: '01',
                title: 'Créez votre compte',
                desc: 'Inscrivez-vous en 30 secondes. Choisissez votre secteur, renseignez votre établissement. Aucune carte bancaire requise.',
                color: '#1A56FF',
                bg: '#EEF2FF',
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M15 5h4M17 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              },
              {
                n: '02',
                title: 'Configurez l\'IA',
                desc: 'Donnez à l\'IA votre style de communication, vos horaires et vos services. Elle apprend votre façon de parler à vos clients.',
                color: '#7C3AED',
                bg: '#F5F3FF',
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M8.5 10c0-1.38.895-2.5 2-2.5s2 1.12 2 2.5c0 1.663-2 3-2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="11" cy="15.5" r=".75" fill="currentColor"/></svg>,
              },
              {
                n: '03',
                title: 'Vos clients sont gérés',
                desc: 'L\'IA répond sur WhatsApp, confirme les RDV, envoie des rappels, relance les inactifs. Vous vous concentrez sur votre métier.',
                color: '#10B981',
                bg: '#ECFDF5',
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              },
            ].map((step) => (
              <div key={step.n} className="relative bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-7" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.06)' }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:step.bg, color:step.color }}>
                    {step.icon}
                  </div>
                  <span className="text-5xl font-bold font-display leading-none" style={{ color:'rgba(12,14,18,0.05)' }}>{step.n}</span>
                </div>
                <h3 className="text-base font-bold text-[#0C0E12] mb-2">{step.title}</h3>
                <p className="text-sm text-[#7A7F8E] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="fonctionnalites" className="py-24 px-6 md:px-12 bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14 max-w-xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
              Fonctionnalités
            </div>
            <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] mb-3 font-display">Tout ce dont vous avez besoin</h2>
            <p className="text-lg text-[#3A3D45] font-light">Chaque fonctionnalité résout un problème réel des PME marocaines.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-6 hover:border-[rgba(26,86,255,0.2)] hover:-translate-y-0.5 transition-all group" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.05)' }}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.bg} ${f.color}`}>{f.icon}</div>
                <div className="text-sm font-semibold text-[#0C0E12] mb-2 group-hover:text-[#1A56FF] transition-colors">{f.title}</div>
                <div className="text-sm text-[#7A7F8E] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section id="secteurs" className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F7F8FA] border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
                Secteurs
              </div>
              <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] font-display">Une plateforme<br/>Tous les secteurs</h2>
            </div>
            <p className="text-lg text-[#3A3D45] font-light md:max-w-xs md:text-right">Adapté à chaque métier, conçu pour la réalité marocaine.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SECTORS.map(s => (
              <div key={s.name} className="p-5 border border-[rgba(12,14,18,0.08)] rounded-2xl hover:border-[rgba(26,86,255,0.25)] hover:bg-[#EEF2FF] hover:-translate-y-0.5 transition-all cursor-default group" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.04)' }}>
                <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] group-hover:bg-white flex items-center justify-center text-[#3A3D45] group-hover:text-[#1A56FF] mb-3 transition-all">
                  {s.icon}
                </div>
                <div className="text-sm font-semibold text-[#0C0E12] group-hover:text-[#1A56FF] transition-colors mb-0.5">{s.name}</div>
                <div className="text-[11px] text-[#B0B5C3]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVANT / APRÈS ── */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0C0E12 0%,#141A30 60%,#0A1020 100%)' }}>
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position:'absolute', top:'-20%', left:'10%', width:600, height:600, background:'radial-gradient(ellipse, rgba(26,86,255,0.12) 0%, transparent 60%)', borderRadius:'50%' }}/>
          <div style={{ position:'absolute', bottom:'-20%', right:'5%', width:500, height:500, background:'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 60%)', borderRadius:'50%' }}/>
          {/* Dot grid */}
          <div className="absolute inset-0" style={{ backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize:'28px 28px' }}/>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-white/10 rounded-full text-white/50 text-xs font-semibold">
              Transformation
            </div>
            <h2 className="text-[40px] font-bold tracking-tight text-white font-display mb-3">Remplacez le chaos par la clarté</h2>
            <p className="text-white/40 text-lg font-light">Tout ce que BOS remplace. Tout ce qu&apos;il apporte.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* AVANT */}
            <div className="rounded-2xl p-8 border" style={{ background:'rgba(239,68,68,0.04)', borderColor:'rgba(239,68,68,0.15)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'rgba(239,68,68,0.15)' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </div>
                <span className="text-sm font-bold text-red-400 uppercase tracking-wider">Avant BOS</span>
              </div>
              <div className="space-y-3.5">
                {[
                  'WhatsApp débordé, messages manqués',
                  'Excel avec 47 onglets non mis à jour',
                  'Clients oubliés pendant des semaines',
                  'Aucune visibilité sur le chiffre d\'affaires',
                  'Absences fréquentes, créneaux perdus',
                  'Facturation manuelle et chronophage',
                  'Zéro statistiques, décisions à l\'aveugle',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:'rgba(239,68,68,0.15)' }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <span className="text-sm text-white/40 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* APRÈS */}
            <div className="rounded-2xl p-8 border" style={{ background:'rgba(16,185,129,0.04)', borderColor:'rgba(16,185,129,0.2)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'rgba(16,185,129,0.15)' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7l4 4 8-8" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Après BOS</span>
              </div>
              <div className="space-y-3.5">
                {[
                  'IA WhatsApp qui répond en moins de 3 secondes',
                  'CRM centralisé, historique complet par client',
                  'Relances automatiques au bon moment',
                  'Dashboard temps réel — CA, RDV, tendances',
                  '−78% d\'absences grâce aux rappels automatiques',
                  'Devis et factures générés en 1 clic',
                  'Analytics complets chaque semaine',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:'rgba(16,185,129,0.15)' }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2.5 2.5 4.5-5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className="text-sm text-white/70 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA inside section */}
          <div className="mt-10 text-center">
            <Link href="/inscription" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#1A56FF,#7C3AED)', boxShadow:'0 4px 16px rgba(26,86,255,0.35)' }}>
              Passer à l&apos;après maintenant →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 md:px-12 bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
              Témoignages
            </div>
            <h2 className="text-[36px] font-bold tracking-tight text-[#0C0E12] font-display">Ce que nos clients disent</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name:'Dr. Youssef Bennani', role:'Dermatologue, Casablanca', initials:'YB', color:'bg-blue-100 text-blue-600', quote:'Depuis BOS, je ne reçois plus d\'appels manqués. L\'IA répond, planifie et rappelle mes patients. J\'ai récupéré 2h par jour.' },
              { name:'Farid Alaoui', role:'Directeur, Garage Elite Rabat', initials:'FA', color:'bg-amber-100 text-amber-600', quote:'Mes clients reçoivent des rappels automatiques pour les révisions. Le taux de retour a augmenté de 35% en 3 mois.' },
              { name:'Salma Chraibi', role:'Directrice, École Innovate', initials:'SC', color:'bg-violet-100 text-violet-600', quote:'Le tableau de bord me donne une vision complète. Je sais exactement combien d\'inscrits, de prospects, et ce que ça représente en CA.' },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-6 flex flex-col" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.05)' }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B"><path d="M7 1l1.5 4h4.5l-3.5 2.5 1.5 4L7 9 3 11.5l1.5-4L1 5h4.5z"/></svg>
                  ))}
                </div>
                <p className="text-sm text-[#3A3D45] leading-relaxed flex-1 mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[rgba(12,14,18,0.06)]">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${t.color}`}>{t.initials}</div>
                  <div>
                    <div className="text-xs font-semibold text-[#0C0E12]">{t.name}</div>
                    <div className="text-[11px] text-[#B0B5C3]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="tarifs" className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F7F8FA] border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
              Tarifs
            </div>
            <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] mb-3 font-display">Simples et transparents</h2>
            <p className="text-lg text-[#3A3D45] font-light">Sans engagement. 14 jours d&apos;essai gratuit. Annulez à tout moment.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 items-center">
            {PLANS.map(p => (
              <div key={p.name} className={`rounded-2xl overflow-hidden transition-all ${p.featured ? 'ring-2 ring-[#1A56FF] ring-offset-2 scale-[1.02]' : 'border border-[rgba(12,14,18,0.08)]'}`} style={p.featured ? { background:'#0C0E12', boxShadow:'0 16px 40px rgba(12,14,18,0.25)' } : { background:'white', boxShadow:'0 1px 3px rgba(12,14,18,0.06)' }}>
                {p.featured && (
                  <div className="text-center py-2 text-[11px] font-bold uppercase tracking-widest" style={{ background:'rgba(26,86,255,0.15)', color:'#6BA3FF' }}>
                    ⭐ Le plus populaire
                  </div>
                )}
                <div className="p-8">
                  <div className={`text-xs font-semibold tracking-wider uppercase mb-1 ${p.featured ? 'text-white/40' : 'text-[#7A7F8E]'}`}>{p.name}</div>
                  <div className={`text-xs mb-5 ${p.featured ? 'text-white/30' : 'text-[#B0B5C3]'}`}>{p.desc}</div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-4xl font-bold tracking-tight font-display ${p.featured ? 'text-white' : 'text-[#0C0E12]'}`}>{p.price}</span>
                    <span className={`text-sm ${p.featured ? 'text-white/30' : 'text-[#B0B5C3]'}`}>DH/mois</span>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {p.features.map(f => (
                      <li key={f} className={`flex items-center gap-2.5 text-sm ${p.featured ? 'text-white/70' : 'text-[#3A3D45]'}`}>
                        <svg className="flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" fill={p.featured ? 'rgba(26,86,255,0.25)' : '#EEF2FF'}/>
                          <path d="M5 8l2 2 4-4" stroke={p.featured ? '#6BA3FF' : '#1A56FF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={p.name === 'Enterprise' ? 'mailto:sales@bossystems.ma' : '/inscription'} className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${p.featured ? 'text-white hover:opacity-90' : 'bg-[#0C0E12] text-white hover:bg-[#1e2330]'}`} style={p.featured ? { background:'linear-gradient(135deg,#1A56FF,#7C3AED)', boxShadow:'0 4px 14px rgba(26,86,255,0.4)' } : {}}>
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#B0B5C3] mt-8">Tous les prix sont en DH HT/mois · Paiement mensuel ou annuel (−20%)</p>
        </div>
      </section>

      {/* ── REVENUE TABLE ── */}
      <section className="py-24 px-6 md:px-12 bg-[#F7F8FA]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[32px] font-bold tracking-tight text-[#0C0E12] mb-3 font-display">La vision chiffrée</h2>
          <p className="text-[#7A7F8E] mb-10">Des revenus récurrents et prévisibles à chaque étape.</p>
          <div className="bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl overflow-hidden" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.06)' }}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F7F8FA]">
                  {['Clients','MRR estimé','ARR estimé'].map(h => (
                    <th key={h} className="px-6 py-4 text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider text-left border-b border-[rgba(12,14,18,0.06)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[[100,'150 000 DH','1 800 000 DH'],[500,'750 000 DH','9 000 000 DH'],[1000,'1 500 000 DH','18 000 000 DH']].map(([c,m,a],i)=>(
                  <tr key={i} className="border-b border-[rgba(12,14,18,0.04)] last:border-0 hover:bg-[#F7F8FA] transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-[#0C0E12]">{c} clients</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">{m}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#1A56FF]">{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto rounded-3xl p-14 text-center relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0C0E12 0%,#141A30 50%,#0C1020 100%)' }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            <div style={{ position:'absolute', top:'-30%', right:'-10%', width:500, height:500, background:'radial-gradient(ellipse, rgba(26,86,255,0.25) 0%, transparent 55%)', borderRadius:'50%' }}/>
            <div style={{ position:'absolute', bottom:'-30%', left:'-10%', width:400, height:400, background:'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 55%)', borderRadius:'50%' }}/>
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/10 rounded-full text-white/60 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Rejoignez les PME qui ont déjà automatisé
            </div>
            <h2 className="text-[40px] font-bold tracking-tight text-white mb-4 font-display">Prêt à automatiser<br/>votre relation client ?</h2>
            <p className="text-white/50 mb-10 text-lg">14 jours gratuits. Sans carte bancaire. Résultats visibles dès le premier jour.</p>
            <Link href="/inscription" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#0C0E12] rounded-xl text-base font-semibold hover:bg-gray-50 transition-all hover:-translate-y-0.5 hover:shadow-2xl">
              Commencer gratuitement →
            </Link>
            <div className="flex items-center justify-center gap-8 mt-10">
              {['Sans engagement','Support inclus','Annulation simple'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-white/40">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[rgba(12,14,18,0.06)] py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 bg-[#0C0E12] rounded-md flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
                    <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                    <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                    <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
                  </svg>
                </div>
                <span className="font-bold text-sm text-[#0C0E12] font-display">BOS SYSTEMS</span>
              </div>
              <p className="text-xs text-[#B0B5C3] leading-relaxed">La plateforme SaaS qui automatise la relation client des PME marocaines grâce à l&apos;IA.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="text-xs font-semibold text-[#0C0E12] uppercase tracking-wider mb-3">Produit</div>
                {[['Fonctionnalités','#fonctionnalites'],['Tarifs','#tarifs'],['Secteurs','#secteurs']].map(([l,h])=>(
                  <a key={h} href={h} className="block text-[#7A7F8E] hover:text-[#0C0E12] transition-colors mb-2">{l}</a>
                ))}
              </div>
              <div>
                <div className="text-xs font-semibold text-[#0C0E12] uppercase tracking-wider mb-3">Compte</div>
                {[['Se connecter','/connexion'],['Créer un compte','/inscription']].map(([l,h])=>(
                  <Link key={h} href={h} className="block text-[#7A7F8E] hover:text-[#0C0E12] transition-colors mb-2">{l}</Link>
                ))}
              </div>
              <div>
                <div className="text-xs font-semibold text-[#0C0E12] uppercase tracking-wider mb-3">Contact</div>
                {[['Support','mailto:support@bossystems.ma'],['Ventes','mailto:sales@bossystems.ma']].map(([l,h])=>(
                  <a key={h} href={h} className="block text-[#7A7F8E] hover:text-[#0C0E12] transition-colors mb-2">{l}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-[rgba(12,14,18,0.06)] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#B0B5C3]">© 2025 BOS Systems — Casablanca, Maroc</div>
            <div className="flex items-center gap-1 text-xs text-[#B0B5C3]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Tous les systèmes opérationnels
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

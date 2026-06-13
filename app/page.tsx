import Link from 'next/link'
import type { Metadata } from 'next'
import { HeroCanvas } from '@/components/landing/hero-canvas'

export const metadata: Metadata = {
  title: 'BOS Systems — Le système d\'exploitation des PME marocaines',
  description: 'Remplacez WhatsApp, Excel et le carnet papier par un système IA intelligent. Rendez-vous automatisés, rappels, CRM, facturation — tout en un.',
}

const FEATURES = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: 'Assistant IA WhatsApp',
    desc: 'Répond à vos clients 24h/24. Tarifs, disponibilités, prise de RDV — automatiquement dans votre style.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: 'Agenda intelligent',
    desc: 'Le client demande, l\'IA propose et confirme. Synchronisation temps réel. Zéro double réservation.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    title: 'Rappels automatiques',
    desc: 'J-1 et 2h avant chaque rendez-vous. Les absences chutent de 78%. Plus jamais un créneau perdu.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
    title: 'Relances intelligentes',
    desc: 'BOS identifie les clients inactifs et les relance au bon moment. Fidélisation sans effort.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    title: 'Analytics temps réel',
    desc: 'Chiffre d\'affaires, taux de conversion, performance équipe — tout sur un seul tableau de bord.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'CRM complet',
    desc: 'Historique client, notes, statuts, pipeline commercial. Votre mémoire institutionnelle.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: 'Facturation intégrée',
    desc: 'Créez et suivez vos devis et factures. Statuts en temps réel. Paiements en ligne bientôt.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: 'Automatisations',
    desc: 'Workflows personnalisés, séquences de relances, rappels factures — tout sans intervention manuelle.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>,
    title: 'Gestion d\'équipe',
    desc: 'Rôles et permissions granulaires. Journal d\'activité. Suivi de performance par collaborateur.',
  },
]

const SECTORS = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, name: 'Cliniques & Cabinets' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, name: 'Garages Auto' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/><path d="M3 9h18"/></svg>, name: 'Immobilier' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, name: 'Écoles & Centres' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, name: 'Avocats & Notaires' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, name: 'Salons Beauté' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><rect x="9" y="13" width="6" height="9"/><path d="M3 9h18"/><path d="M9 9h6"/></svg>, name: 'Hôtels & Riads' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>, name: 'Restaurants & Cafés' },
]

const PLANS = [
  {
    name: 'Starter', price: '500', desc: 'Pour démarrer et valider',
    features: ['Assistant IA WhatsApp', 'Gestion des rendez-vous', 'Rappels automatiques', '200 conversations/mois', 'CRM basique', '1 utilisateur'],
    featured: false, cta: 'Commencer gratuitement',
  },
  {
    name: 'Pro', price: '1 500', desc: 'Pour les équipes actives',
    features: ['Tout Starter inclus', 'Conversations illimitées', 'Relances automatiques', 'CRM complet', 'Analytics avancés', 'Facturation', '3 utilisateurs', 'Support prioritaire'],
    featured: true, cta: 'Commencer — le plus populaire',
  },
  {
    name: 'Enterprise', price: 'Sur devis', desc: 'Pour les grandes structures',
    features: ['Tout Pro inclus', 'Équipe illimitée', 'Intégrations custom', 'API dédiée', 'SLA garanti', 'Account manager dédié', 'Onboarding personnalisé'],
    featured: false, cta: 'Contacter l\'équipe',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 bg-white/90 backdrop-blur-xl border-b border-[rgba(12,14,18,0.06)]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#0C0E12] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-[15px] tracking-wide font-display">BOS SYSTEMS</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {[['Fonctionnalités','#fonctionnalites'],['Secteurs','#secteurs'],['Tarifs','#tarifs']].map(([l,h])=>(
            <a key={h} href={h} className="px-4 py-2 text-sm text-[#3A3D45] hover:text-[#0C0E12] hover:bg-[#F7F8FA] rounded-lg transition-all">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/connexion" className="hidden md:block px-4 py-2 text-sm text-[#3A3D45] border border-[rgba(12,14,18,0.1)] rounded-xl hover:bg-[#F7F8FA] transition-all">Se connecter</Link>
          <Link href="/inscription" className="btn-primary text-sm">Essai gratuit 14 jours →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-0 px-6 md:px-12 overflow-hidden" style={{background:'linear-gradient(180deg,#fff 0%,#f8fafc 60%,#f0f4ff 100%)'}}>
        <HeroCanvas />
        {/* Grid pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(circle,rgba(26,86,255,0.06) 1px,transparent 1px)',backgroundSize:'32px 32px'}} />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-white border border-[rgba(26,86,255,0.2)] rounded-full text-[#1A56FF] text-xs font-semibold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A56FF] animate-pulse" />
            Disponible au Maroc · 14 jours gratuits · Sans carte bancaire
          </div>
          <h1 className="text-[52px] md:text-[76px] font-bold leading-[1.02] tracking-tight text-[#0C0E12] mb-6 font-display">
            L&apos;infrastructure client<br/>des <span style={{background:'linear-gradient(135deg,#1A56FF,#0EA5E9)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>PME modernes.</span>
          </h1>
          <p className="text-xl text-[#3A3D45] leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            BOS remplace WhatsApp, Excel et le carnet papier par un système IA complet — rendez-vous automatisés, rappels, CRM, analytics, facturation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Link href="/inscription" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0C0E12] text-white rounded-xl text-base font-semibold hover:bg-[#1e2330] hover:-translate-y-px hover:shadow-xl transition-all">
              Commencer gratuitement →
            </Link>
            <Link href="/connexion" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0C0E12] rounded-xl text-base font-semibold border border-[rgba(12,14,18,0.12)] hover:bg-[#F7F8FA] hover:-translate-y-px hover:shadow-md transition-all">
              Se connecter
            </Link>
          </div>
          <p className="text-xs text-[#B0B5C3]">Sans engagement · Annulez quand vous voulez</p>
        </div>

        {/* Dashboard mockup */}
        <div className="relative z-10 w-full max-w-5xl mx-auto mt-16" style={{animation:'float 5s ease-in-out infinite'}}>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-[rgba(12,14,18,0.12)]" style={{boxShadow:'0 40px 100px rgba(12,14,18,0.15),0 8px 24px rgba(12,14,18,0.08)'}}>
            {/* Top bar */}
            <div className="bg-[#0C0E12] px-5 py-3.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
              </div>
              <span className="text-[11px] text-[#7A7F8E] ml-2 tracking-wide">BOS Systems — Dashboard</span>
            </div>
            {/* Body */}
            <div className="grid bg-[#F7F8FA]" style={{gridTemplateColumns:'180px 1fr',minHeight:'360px'}}>
              {/* Sidebar */}
              <div className="bg-white border-r border-[rgba(12,14,18,0.06)] p-3">
                <div className="flex items-center gap-2 px-2 py-2 mb-3">
                  <div className="w-5 h-5 bg-[#0C0E12] rounded flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/></svg>
                  </div>
                  <span className="text-xs font-bold text-[#0C0E12]">BOS</span>
                </div>
                {[
                  {icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,label:'Dashboard',active:true},
                  {icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,label:'CRM',active:false},
                  {icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,label:'Rendez-vous',active:false},
                  {icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,label:'Facturation',active:false},
                  {icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,label:'Analytics',active:false},
                ].map(({icon,label,active})=>(
                  <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 text-[11px] font-medium ${active?'bg-[#EEF2FF] text-[#1A56FF]':'text-[#7A7F8E]'}`}>
                    {icon}{label}
                  </div>
                ))}
              </div>
              {/* Main */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-[#0C0E12]">Tableau de bord — Juin 2025</div>
                  <div className="text-[10px] text-[#B0B5C3] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />En direct</div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[{l:'Chiffre d\'affaires',v:'84 200 DH',t:'↑ 12.4%'},{l:'Clients actifs',v:'1 284',t:'↑ 8.1%'},{l:'RDV ce mois',v:'312',t:'↑ 3 cette semaine'}].map(({l,v,t})=>(
                    <div key={l} className="bg-white border border-[rgba(12,14,18,0.06)] rounded-xl p-3">
                      <div className="text-[9px] text-[#B0B5C3] uppercase tracking-wider mb-1">{l}</div>
                      <div className="text-lg font-bold text-[#0C0E12] tracking-tight">{v}</div>
                      <div className="text-[9px] text-emerald-500 mt-0.5">{t}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white border border-[rgba(12,14,18,0.06)] rounded-xl p-3 mb-3">
                  <div className="text-[9px] text-[#B0B5C3] uppercase tracking-wider mb-2">Revenus mensuels</div>
                  <div className="flex items-end gap-1.5" style={{height:'50px'}}>
                    {[35,52,42,65,80,72,90,85,94,78,88,100].map((h,i)=>(
                      <div key={i} className="flex-1 rounded-t" style={{height:`${h}%`,background:h===100?'#1A56FF':'#EEF2FF'}} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-[rgba(12,14,18,0.06)] rounded-xl p-3">
                    <div className="text-[9px] text-[#B0B5C3] uppercase tracking-wider mb-2">Derniers clients</div>
                    {[['Karim Bennani','Actif'],['Salma Alaoui','Prospect'],['Youssef Tazi','RDV confirmé']].map(([n,s])=>(
                      <div key={n} className="flex items-center justify-between py-1 border-b border-[rgba(12,14,18,0.04)] last:border-0">
                        <span className="text-[10px] font-medium text-[#0C0E12]">{n}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${s==='Actif'?'bg-emerald-50 text-emerald-700':s==='Prospect'?'bg-blue-50 text-blue-700':'bg-amber-50 text-amber-700'}`}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white border border-[rgba(12,14,18,0.06)] rounded-xl p-3">
                    <div className="text-[9px] text-[#B0B5C3] uppercase tracking-wider mb-2">Factures récentes</div>
                    {[['FAC-0041','3 200 DH'],['FAC-0042','1 800 DH'],['FAC-0043','5 500 DH']].map(([n,v])=>(
                      <div key={n} className="flex items-center justify-between py-1 border-b border-[rgba(12,14,18,0.04)] last:border-0">
                        <span className="text-[10px] font-medium text-[#0C0E12]">{n}</span>
                        <span className="text-[10px] text-[#7A7F8E]">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
      </section>

      {/* STATS */}
      <div className="border-y border-[rgba(12,14,18,0.06)] bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(12,14,18,0.06)]">
          {[['−78%','de no-shows'],['24/7','disponibilité IA'],['+40%','clients convertis'],['< 3s','temps de réponse']].map(([v,l])=>(
            <div key={l} className="py-10 px-8 text-center">
              <div className="text-3xl font-bold text-[#0C0E12] tracking-tight font-display">{v}</div>
              <div className="text-sm text-[#7A7F8E] mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="fonctionnalites" className="py-24 px-6 md:px-12" style={{background:'linear-gradient(180deg,#0C0E12 0%,#111827 100%)'}}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 border border-[rgba(255,255,255,0.08)] rounded-full text-xs text-[#7A7F8E] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A56FF]" />
              Plateforme
            </div>
            <h2 className="text-[40px] font-bold tracking-tight text-white mb-3 font-display">Tout ce dont vous avez besoin.</h2>
            <p className="text-lg text-[#7A7F8E] font-light max-w-xl">Chaque fonctionnalité résout un problème réel des PME marocaines.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.06)'}}>
            {FEATURES.map(f => (
              <div key={f.title} className="p-7 group cursor-default transition-all duration-300" style={{background:'rgba(255,255,255,0.02)'}}
                onMouseEnter={e=>(e.currentTarget.style.background='rgba(26,86,255,0.06)')}
                onMouseLeave={e=>(e.currentTarget.style.background='rgba(255,255,255,0.02)')}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-[#1A56FF]" style={{background:'rgba(26,86,255,0.12)'}}>
                  {f.icon}
                </div>
                <div className="text-sm font-semibold text-white mb-2">{f.title}</div>
                <div className="text-sm text-[#64748B] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section id="secteurs" className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(circle,rgba(26,86,255,0.04) 1px,transparent 1px)',backgroundSize:'28px 28px'}} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 border border-[rgba(12,14,18,0.1)] rounded-full text-xs text-[#7A7F8E] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A56FF]" />
              Secteurs
            </div>
            <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] mb-3 font-display">Une plateforme. Tous les secteurs.</h2>
            <p className="text-lg text-[#7A7F8E] font-light">Adapté à chaque métier, conçu pour la réalité marocaine.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SECTORS.map(s=>(
              <div key={s.name} className="group p-6 bg-white border border-[rgba(12,14,18,0.08)] rounded-2xl hover:border-[rgba(26,86,255,0.3)] hover:shadow-lg transition-all cursor-default">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-[#1A56FF] group-hover:bg-[#EEF2FF] transition-all" style={{background:'#F7F8FA'}}>
                  {s.icon}
                </div>
                <div className="text-sm font-semibold text-[#0C0E12] group-hover:text-[#1A56FF] transition-colors">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANT / APRÈS */}
      <section className="py-24 px-6 md:px-12" style={{background:'#0C0E12'}}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 border border-[rgba(255,255,255,0.08)] rounded-full text-xs text-[#7A7F8E] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A56FF]" />
              Pourquoi BOS
            </div>
            <h2 className="text-[40px] font-bold tracking-tight text-white mb-3 font-display">Remplacez le chaos.<br/>Adoptez la clarté.</h2>
            <p className="text-lg text-[#64748B] font-light">Arrêtez de payer pour 12 outils qui ne se parlent pas.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8 border border-[rgba(255,255,255,0.06)]" style={{background:'rgba(255,255,255,0.02)'}}>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[#475569] mb-6">Avant BOS Systems</div>
              <ul className="space-y-4">
                {['Excel pour suivre vos revenus','WhatsApp pour les rendez-vous','Carnet papier pour les clients','Appels manqués non rappelés','Aucune visibilité sur votre CA','12 outils déconnectés'].map(t=>(
                  <li key={t} className="flex items-center gap-3 text-sm text-[#475569]">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{background:'rgba(255,255,255,0.06)'}}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2L2 8" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-8 border border-[rgba(26,86,255,0.2)] relative overflow-hidden" style={{background:'rgba(26,86,255,0.04)'}}>
              <div className="absolute inset-0 pointer-events-none" style={{background:'linear-gradient(135deg,rgba(26,86,255,0.06),transparent)'}} />
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[#1A56FF] mb-6 relative">Après BOS Systems</div>
              <ul className="space-y-4 relative">
                {['Une plateforme intelligente tout-en-un','Rendez-vous pris automatiquement par l\'IA','CRM complet avec historique client','Rappels automatiques, zéro no-show','Analytics temps réel sur votre activité','Collaboration fluide pour toute l\'équipe'].map(t=>(
                  <li key={t} className="flex items-center gap-3 text-sm text-[#94A3B8]">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-[#1A56FF]">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 border border-[rgba(12,14,18,0.1)] rounded-full text-xs text-[#7A7F8E] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A56FF]" />
              Témoignages
            </div>
            <h2 className="text-[36px] font-bold tracking-tight text-[#0C0E12] font-display">Ce que nos clients disent</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name:'Dr. Youssef Bennani', role:'Dermatologue, Casablanca', init:'YB', color:'bg-blue-50 text-blue-700', quote:'Depuis BOS, je ne reçois plus d\'appels manqués. L\'IA répond, planifie et rappelle mes patients. J\'ai récupéré 2h par jour.' },
              { name:'Farid Alaoui', role:'Directeur, Garage Elite Rabat', init:'FA', color:'bg-emerald-50 text-emerald-700', quote:'Mes clients reçoivent des rappels automatiques pour les révisions. Le taux de retour a augmenté de 35% en 3 mois.' },
              { name:'Salma Chraibi', role:'Directrice, École Innovate', init:'SC', color:'bg-purple-50 text-purple-700', quote:'Le tableau de bord me donne une vision complète. Je sais exactement combien d\'inscrits, de prospects, et ce que ça représente en CA.' },
            ].map((t,i)=>(
              <div key={i} className="p-7 bg-[#F8FAFC] border border-[rgba(12,14,18,0.06)] rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_,j)=><span key={j} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-sm text-[#374151] leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${t.color}`}>{t.init}</div>
                  <div>
                    <div className="text-sm font-semibold text-[#0C0E12]">{t.name}</div>
                    <div className="text-xs text-[#7A7F8E]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="tarifs" className="py-24 px-6 md:px-12 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(circle,rgba(26,86,255,0.04) 1px,transparent 1px)',backgroundSize:'32px 32px'}} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 border border-[rgba(12,14,18,0.1)] rounded-full text-xs text-[#7A7F8E] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A56FF]" />
              Tarifs
            </div>
            <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] mb-3 font-display">Tarifs simples et transparents.</h2>
            <p className="text-lg text-[#7A7F8E] font-light">Sans engagement. 14 jours d&apos;essai gratuit. Annulez à tout moment.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 items-start">
            {PLANS.map(p=>(
              <div key={p.name} className={`rounded-2xl overflow-hidden transition-all ${p.featured?'shadow-2xl md:-mt-3 md:mb-3':'hover:shadow-lg'}`}
                style={p.featured?{background:'#0C0E12',border:'1px solid #0C0E12',boxShadow:'0 24px 72px rgba(12,14,18,0.25)'}:{background:'white',border:'1px solid rgba(12,14,18,0.08)'}}>
                {p.featured && (
                  <div className="text-center py-2 bg-[#1A56FF] text-white text-xs font-semibold tracking-wider">⭐ Le plus populaire</div>
                )}
                <div className="p-8">
                  <div className={`text-xs font-semibold tracking-widest uppercase mb-1 ${p.featured?'text-white/40':'text-[#7A7F8E]'}`}>{p.name}</div>
                  <div className={`text-xs mb-5 ${p.featured?'text-white/30':'text-[#B0B5C3]'}`}>{p.desc}</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-4xl font-bold tracking-tight font-display ${p.featured?'text-white':'text-[#0C0E12]'}`}>{p.price}</span>
                    <span className={`text-sm ${p.featured?'text-white/30':'text-[#B0B5C3]'}`}>{p.name!=='Enterprise'?' DH/mois':''}</span>
                  </div>
                  <hr className={`my-6 ${p.featured?'border-white/10':'border-[rgba(12,14,18,0.06)]'}`} />
                  <ul className="space-y-3 mb-8">
                    {p.features.map(f=>(
                      <li key={f} className={`flex items-start gap-2.5 text-sm ${p.featured?'text-white/70':'text-[#3A3D45]'}`}>
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${p.featured?'bg-[#1A56FF]':'bg-[#EEF2FF]'}`}>
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke={p.featured?'white':'#1A56FF'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={p.name==='Enterprise'?'mailto:sales@bossystems.ma':'/inscription'}
                    className={`block text-center py-3.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-px ${p.featured?'bg-white text-[#0C0E12] hover:bg-gray-50 hover:shadow-md':'bg-[#0C0E12] text-white hover:bg-[#1e2330] hover:shadow-lg'}`}
                  >
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-3xl mx-auto rounded-3xl p-14 text-center relative overflow-hidden" style={{background:'linear-gradient(135deg,#0C0E12 0%,#1a2035 100%)'}}>
          <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(circle,rgba(26,86,255,0.12) 1px,transparent 1px)',backgroundSize:'24px 24px'}} />
          <div className="relative z-10">
            <h2 className="text-[36px] font-bold tracking-tight text-white mb-3 font-display">Prêt à automatiser ?</h2>
            <p className="text-white/50 mb-8 text-lg">14 jours gratuits. Sans carte bancaire. Résultats visibles dès le premier jour.</p>
            <Link href="/inscription" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#0C0E12] rounded-xl text-base font-semibold hover:bg-gray-50 hover:-translate-y-px hover:shadow-xl transition-all">
              Commencer gratuitement →
            </Link>
            <div className="flex items-center justify-center gap-8 mt-8">
              {['Sans engagement','Support inclus','Annulation simple'].map(t=>(
                <div key={t} className="flex items-center gap-1.5 text-xs text-white/40">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0C0E12] border-t border-[rgba(255,255,255,0.06)] py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-[#1E293B] rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
                    <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                    <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                    <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
                  </svg>
                </div>
                <span className="font-bold text-[15px] text-white font-display">BOS SYSTEMS</span>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed max-w-xs">Le système d&apos;exploitation des PME marocaines. CRM, agenda, IA, facturation — tout en un.</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-4">Produit</div>
              <ul className="space-y-3">
                {['Fonctionnalités','Tarifs','Secteurs'].map(l=>(
                  <li key={l}><a href="#" className="text-sm text-[#475569] hover:text-[#94A3B8] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-4">Contact</div>
              <ul className="space-y-3">
                {[['Support','mailto:support@bossystems.ma'],['Ventes','mailto:sales@bossystems.ma'],['Connexion','/connexion']].map(([l,h])=>(
                  <li key={l}><a href={h} className="text-sm text-[#475569] hover:text-[#94A3B8] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-[rgba(255,255,255,0.06)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#334155]">© 2025 BOS Systems — Casablanca, Maroc</span>
            <div className="flex gap-6">
              {['Confidentialité','Conditions d\'utilisation'].map(l=>(
                <a key={l} href="#" className="text-xs text-[#334155] hover:text-[#64748B] transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BOS Systems — Le système d\'exploitation des PME marocaines',
  description: 'Remplacez WhatsApp, Excel et le carnet papier par un système IA intelligent. Rendez-vous automatisés, rappels, CRM — tout en un.',
}

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H6l-4 3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7 9h6M7 6h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Assistant IA WhatsApp',
    desc: 'Répond à vos clients 24h/24. Tarifs, disponibilités, prise de RDV — automatiquement dans votre style.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 1v4M14 1v4M2 9h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 13h2v2H6z" fill="currentColor"/>
      </svg>
    ),
    title: 'Agenda intelligent',
    desc: 'Le client demande, l\'IA propose et confirme. Synchronisation temps réel. Zéro double réservation.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Rappels automatiques',
    desc: 'J-1 et 2h avant. Les absences chutent de 78%. Plus jamais un créneau perdu.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 14l4-8 3 5 2-3 3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 10a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Relances intelligentes',
    desc: 'BOS identifie les clients inactifs et les relance au bon moment. Fidélisation sans effort.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 15l4-5 3 3 4-6 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Analytics temps réel',
    desc: 'Chiffre d\'affaires, taux de conversion, performance équipe — tout sur un seul tableau de bord.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 17c0-3.314 2.239-6 5-6s5 2.686 5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 13c0-2.209-1.343-4-3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'CRM complet',
    desc: 'Historique client, notes, statuts, pipeline commercial. Votre mémoire institutionnelle.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Facturation intégrée',
    desc: 'Créez et suivez vos devis et factures. Paiements en ligne bientôt disponibles.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Automatisations',
    desc: 'Workflows personnalisés, séquences d\'emails, relances factures — tout sans intervention manuelle.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Gestion d\'équipe',
    desc: 'Rôles et permissions granulaires. Journal d\'activité. Suivi de performance par collaborateur.',
  },
]

const SECTORS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 9.5L11 2l8 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 21v-7h6v7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Cliniques',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="8" width="18" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 8V6a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="15" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    name: 'Garages',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 10L11 3l8 7v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 21v-6h6v6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    name: 'Immobilier',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 17l4-8 3 4 3-6 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="11" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    name: 'Écoles',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 8h6M8 11h4M8 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Avocats',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Salons',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 7V5a5 5 0 0110 0v2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 13h4M11 11v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Hôtels & Riads',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 6h16l-1.5 9H4.5L3 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 6l-1-3H1M8 6V4M14 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="14" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    name: 'Restaurants',
  },
]

const PLANS = [
  {
    name: 'Starter',
    price: '500',
    desc: 'Pour démarrer et valider',
    features: ['Assistant IA WhatsApp', 'Gestion des rendez-vous', 'Rappels automatiques', '200 conversations/mois', 'CRM basique', '1 utilisateur'],
    featured: false,
    cta: 'Commencer',
  },
  {
    name: 'Pro',
    price: '1 500',
    desc: 'Pour les équipes actives',
    features: ['Tout Starter inclus', 'Conversations illimitées', 'Relances automatiques', 'CRM complet', 'Analytics avancés', 'Facturation', '3 utilisateurs', 'Support prioritaire'],
    featured: true,
    cta: 'Commencer — le plus populaire',
  },
  {
    name: 'Enterprise',
    price: '5 000+',
    desc: 'Pour les grandes structures',
    features: ['Tout Pro inclus', 'Équipe illimitée', 'Intégrations custom', 'API dédiée', 'SLA garanti', 'Account manager dédié', 'Onboarding personnalisé'],
    featured: false,
    cta: 'Contacter l\'équipe',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
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
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-[#EEF2FF] border border-[rgba(26,86,255,0.15)] rounded-full text-[#1A56FF] text-xs font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A56FF] animate-pulse" />
          Disponible au Maroc · 14 jours gratuits
        </div>
        <h1 className="text-[52px] md:text-[76px] font-bold leading-[1.02] tracking-tight text-[#0C0E12] mb-6 font-display">
          L&apos;infrastructure client<br/>des <span className="text-[#1A56FF]">PME modernes.</span>
        </h1>
        <p className="text-xl text-[#3A3D45] leading-relaxed max-w-2xl mx-auto mb-10 font-light">
          BOS remplace WhatsApp, Excel et le carnet papier par un système IA complet — rendez-vous automatisés, rappels, CRM, analytics, facturation. Tout sur une plateforme.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/inscription" className="btn-primary text-base px-8 py-4 justify-center">
            Commencer gratuitement — 14 jours →
          </Link>
          <Link href="/connexion" className="btn-secondary text-base px-8 py-4 justify-center">
            Se connecter
          </Link>
        </div>
        <p className="text-xs text-[#B0B5C3] mt-4">Sans carte bancaire · Sans engagement · Annulez quand vous voulez</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-[rgba(12,14,18,0.06)]">
          {[['−78%','de no-shows'],['24/7','disponibilité IA'],['+40%','clients convertis'],['< 3s','temps de réponse']].map(([v,l])=>(
            <div key={l} className="text-center">
              <div className="text-3xl font-bold text-[#0C0E12] tracking-tight font-display">{v}</div>
              <div className="text-sm text-[#7A7F8E] mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="fonctionnalites" className="py-20 px-6 md:px-12 max-w-5xl mx-auto border-t border-[rgba(12,14,18,0.06)]">
        <div className="mb-14">
          <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] mb-3 font-display">Tout ce dont vous avez besoin.</h2>
          <p className="text-lg text-[#3A3D45] font-light">Chaque fonctionnalité résout un problème réel des PME marocaines.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-[rgba(12,14,18,0.06)] border border-[rgba(12,14,18,0.06)] rounded-2xl overflow-hidden">
          {FEATURES.map(f => (
            <div key={f.title} className="p-7 bg-white hover:bg-[#F7F8FA] transition-colors group">
              <div className="text-[#1A56FF] mb-4">{f.icon}</div>
              <div className="text-sm font-semibold text-[#0C0E12] mb-2 group-hover:text-[#1A56FF] transition-colors">{f.title}</div>
              <div className="text-sm text-[#7A7F8E] leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTORS */}
      <section id="secteurs" className="py-20 px-6 md:px-12 max-w-5xl mx-auto border-t border-[rgba(12,14,18,0.06)]">
        <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] mb-4 font-display">Une plateforme. Tous les secteurs.</h2>
        <p className="text-lg text-[#3A3D45] mb-12 font-light">Adapté à chaque métier, conçu pour la réalité marocaine.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SECTORS.map(s=>(
            <div key={s.name} className="p-6 border border-[rgba(12,14,18,0.08)] rounded-2xl hover:border-[rgba(26,86,255,0.3)] hover:bg-[#EEF2FF] transition-all cursor-default group">
              <div className="text-[#1A56FF] mb-3">{s.icon}</div>
              <div className="text-sm font-semibold text-[#0C0E12] group-hover:text-[#1A56FF] transition-colors">{s.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-20 px-6 md:px-12 border-t border-[rgba(12,14,18,0.06)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[32px] font-bold tracking-tight text-[#0C0E12] mb-12 text-center font-display">Ce que nos clients disent</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Dr. Youssef Bennani', role: 'Dermatologue, Casablanca', quote: 'Depuis BOS, je ne reçois plus d\'appels manqués. L\'IA répond, planifie et rappelle mes patients. J\'ai récupéré 2h par jour.' },
              { name: 'Farid Alaoui', role: 'Directeur, Garage Elite Rabat', quote: 'Mes clients reçoivent des rappels automatiques pour les révisions. Le taux de retour a augmenté de 35% en 3 mois.' },
              { name: 'Salma Chraibi', role: 'Directrice, École Innovate', quote: 'Le tableau de bord me donne une vision complète. Je sais exactement combien d\'inscrits, de prospects, et ce que ça représente en CA.' },
            ].map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-sm text-[#3A3D45] leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="text-sm font-semibold text-[#0C0E12]">{t.name}</div>
                  <div className="text-xs text-[#7A7F8E]">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="tarifs" className="py-20 px-6 md:px-12 max-w-5xl mx-auto border-t border-[rgba(12,14,18,0.06)]">
        <div className="mb-14">
          <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] mb-3 font-display">Tarifs simples et transparents.</h2>
          <p className="text-lg text-[#3A3D45] font-light">Sans engagement. 14 jours d&apos;essai gratuit. Annulez à tout moment.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 items-start">
          {PLANS.map(p => (
            <div key={p.name} className={`rounded-2xl border overflow-hidden ${p.featured ? 'bg-[#0C0E12] border-[#0C0E12] md:-mt-2 md:mb-2' : 'bg-white border-[rgba(12,14,18,0.08)]'}`}>
              <div className="p-8">
                <div className={`text-xs font-semibold tracking-wider uppercase mb-1 ${p.featured ? 'text-white/40' : 'text-[#7A7F8E]'}`}>{p.name}</div>
                <div className={`text-xs mb-4 ${p.featured ? 'text-white/30' : 'text-[#B0B5C3]'}`}>{p.desc}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-bold tracking-tight font-display ${p.featured ? 'text-white' : 'text-[#0C0E12]'}`}>{p.price}</span>
                  <span className={`text-sm ${p.featured ? 'text-white/30' : 'text-[#B0B5C3]'}`}>DH/mois</span>
                </div>
                <hr className={`my-6 ${p.featured ? 'border-white/10' : 'border-[rgba(12,14,18,0.06)]'}`} />
                <ul className="space-y-2.5 mb-8">
                  {p.features.map(f=>(
                    <li key={f} className={`flex items-start gap-2 text-sm ${p.featured ? 'text-white/70' : 'text-[#3A3D45]'}`}>
                      <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke={p.featured?'white':'#1A56FF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.name === 'Enterprise' ? 'mailto:sales@bossystems.ma' : '/inscription'}
                  className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${p.featured ? 'bg-white text-[#0C0E12] hover:bg-gray-50' : 'bg-[#0C0E12] text-white hover:bg-[#1e2330]'}`}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVENUE PROJECTION */}
      <section className="py-20 px-6 md:px-12 border-t border-[rgba(12,14,18,0.06)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[32px] font-bold tracking-tight text-[#0C0E12] mb-3 font-display">La vision chiffrée.</h2>
          <p className="text-[#7A7F8E] mb-10">Des revenus récurrents et prévisibles à chaque étape.</p>
          <div className="card overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-[#F7F8FA]">
                <tr>
                  {['Clients','MRR estimé','ARR estimé'].map(h=><th key={h} className="px-6 py-4 text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider text-left border-b border-[rgba(12,14,18,0.06)]">{h}</th>)}
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

      {/* CTA */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto bg-[#0C0E12] rounded-3xl p-12 text-center">
          <h2 className="text-[36px] font-bold tracking-tight text-white mb-3 font-display">Prêt à automatiser ?</h2>
          <p className="text-white/50 mb-8">14 jours gratuits. Sans carte bancaire. Résultats visibles dès le premier jour.</p>
          <Link href="/inscription" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#0C0E12] rounded-xl text-base font-semibold hover:bg-gray-50 transition-all hover:-translate-y-px hover:shadow-xl">
            Commencer gratuitement →
          </Link>
          <div className="flex items-center justify-center gap-6 mt-8">
            {['Sans engagement','Support inclus','Annulation simple'].map(t=>(
              <div key={t} className="flex items-center gap-1.5 text-xs text-white/40">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[rgba(12,14,18,0.06)] py-10 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
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
          <div className="flex items-center gap-6 text-sm text-[#7A7F8E]">
            <a href="mailto:support@bossystems.ma" className="hover:text-[#0C0E12] transition-colors">Support</a>
            <a href="mailto:sales@bossystems.ma" className="hover:text-[#0C0E12] transition-colors">Ventes</a>
            <Link href="/connexion" className="hover:text-[#0C0E12] transition-colors">Connexion</Link>
          </div>
          <div className="text-sm text-[#B0B5C3]">© 2025 BOS Systems — Casablanca, Maroc</div>
        </div>
      </footer>
    </div>
  )
}

import Link from 'next/link'

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
          <span className="font-bold text-[15px] tracking-wide" style={{fontFamily:'Syne,sans-serif'}}>BOS SYSTEMS</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {[['Tarifs','#tarifs'],['Contact','#contact']].map(([l,h])=>(
            <Link key={h} href={h} className="px-4 py-2 text-sm text-[#3A3D45] hover:text-[#0C0E12] hover:bg-[#F7F8FA] rounded-lg transition-all">{l}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/connexion" className="hidden md:block px-4 py-2 text-sm text-[#3A3D45] border border-[rgba(12,14,18,0.1)] rounded-xl hover:bg-[#F7F8FA] transition-all">Se connecter</Link>
          <Link href="/inscription" className="btn-primary text-sm px-5 py-2.5">Commencer gratuitement</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-[#EEF2FF] border border-[rgba(26,86,255,0.15)] rounded-full text-[#1A56FF] text-xs font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A56FF] animate-pulse"></span>
          Disponible au Maroc
        </div>
        <h1 className="text-[52px] md:text-[76px] font-bold leading-[1.02] tracking-tight text-[#0C0E12] mb-8" style={{fontFamily:'Syne,sans-serif'}}>
          L&apos;infrastructure client<br />des <span className="text-[#1A56FF]">PME modernes.</span>
        </h1>
        <p className="text-xl text-[#3A3D45] leading-relaxed max-w-2xl mx-auto mb-12 font-light">
          BOS remplace WhatsApp, Excel et le carnet papier par un système intelligent — rendez-vous automatisés, réponses instantanées, visibilité totale.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/inscription" className="btn-primary px-8 py-4 text-base justify-center">
            Commencer gratuitement →
          </Link>
          <Link href="/connexion" className="btn-secondary px-8 py-4 text-base justify-center">
            Se connecter
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-[rgba(12,14,18,0.06)]">
          {[['−78%','de no-shows'],['24/7','disponibilité IA'],['+40%','clients convertis'],['3 sec','temps de réponse']].map(([v,l])=>(
            <div key={l} className="text-center">
              <div className="text-3xl font-bold text-[#0C0E12] tracking-tight" style={{fontFamily:'Syne,sans-serif'}}>{v}</div>
              <div className="text-sm text-[#7A7F8E] mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-[rgba(12,14,18,0.06)]">
        <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] mb-4" style={{fontFamily:'Syne,sans-serif'}}>Tout ce dont vous avez besoin.</h2>
        <p className="text-lg text-[#3A3D45] mb-16 font-light">Chaque fonctionnalité résout un problème réel.</p>
        <div className="grid md:grid-cols-3 gap-px bg-[rgba(12,14,18,0.06)] border border-[rgba(12,14,18,0.06)] rounded-2xl overflow-hidden">
          {[
            ['💬','Assistant IA WhatsApp','Répond à vos clients 24h/24. Tarifs, horaires, disponibilités — automatiquement.'],
            ['📅','Gestion des rendez-vous','Le client demande, l\'IA propose et confirme. Zéro intervention manuelle.'],
            ['🔔','Rappels automatiques','Un message la veille, un autre 2h avant. Le taux de no-show chute de 78%.'],
            ['📊','Dashboard temps réel','Prospects, RDV, conversions — tout sur une seule page.'],
            ['🔄','Relances intelligentes','Clients inactifs relancés automatiquement au bon moment.'],
            ['👥','CRM intégré','Historique complet de chaque client, notes, statuts.'],
          ].map(([icon,title,desc])=>(
            <div key={title} className="p-8 bg-white hover:bg-[#F7F8FA] transition-colors">
              <div className="text-2xl mb-4">{icon}</div>
              <div className="text-base font-semibold text-[#0C0E12] mb-2">{title}</div>
              <div className="text-sm text-[#7A7F8E] leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTORS */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-[rgba(12,14,18,0.06)]">
        <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] mb-16" style={{fontFamily:'Syne,sans-serif'}}>Une plateforme. Tous les secteurs.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[['🏥','Cliniques'],['🚗','Garages'],['🏠','Immobilier'],['🎓','Écoles'],['⚖️','Avocats'],['💇','Salons'],['🏨','Hôtels'],['🍽️','Restaurants']].map(([icon,name])=>(
            <div key={name} className="p-6 border border-[rgba(12,14,18,0.08)] rounded-2xl hover:border-[rgba(26,86,255,0.2)] hover:bg-[#EEF2FF] transition-all">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="text-sm font-semibold text-[#0C0E12]">{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="tarifs" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-[rgba(12,14,18,0.06)]">
        <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] mb-4" style={{fontFamily:'Syne,sans-serif'}}>Tarifs simples.</h2>
        <p className="text-lg text-[#3A3D45] mb-16 font-light">Sans engagement. Annulez quand vous voulez.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {name:'Starter',price:'500',features:['Assistant IA WhatsApp','Gestion RDV','Rappels automatiques','200 conversations/mois','1 utilisateur'],featured:false},
            {name:'Pro',price:'1 500',features:['Tout Starter inclus','Relances automatiques','CRM complet','Illimité','3 utilisateurs','Support prioritaire'],featured:true},
            {name:'Enterprise',price:'5 000+',features:['Tout Pro inclus','Config sur mesure','Intégrations custom','Illimité','Account manager'],featured:false},
          ].map(p=>(
            <div key={p.name} className={`p-8 rounded-2xl border ${p.featured ? 'bg-[#0C0E12] border-[#0C0E12] scale-[1.02]' : 'bg-white border-[rgba(12,14,18,0.08)]'}`}>
              <div className={`text-xs font-semibold tracking-wider uppercase mb-3 ${p.featured ? 'text-white/50' : 'text-[#7A7F8E]'}`}>{p.name}</div>
              <div className={`text-4xl font-bold tracking-tight mb-1 ${p.featured ? 'text-white' : 'text-[#0C0E12]'}`} style={{fontFamily:'Syne,sans-serif'}}>{p.price}</div>
              <div className={`text-sm mb-6 ${p.featured ? 'text-white/40' : 'text-[#7A7F8E]'}`}>DH/mois</div>
              <hr className={`mb-6 ${p.featured ? 'border-white/10' : 'border-[rgba(12,14,18,0.06)]'}`} />
              <ul className="space-y-2.5 mb-8">
                {p.features.map(f=>(
                  <li key={f} className={`flex items-center gap-2 text-sm ${p.featured ? 'text-white/70' : 'text-[#3A3D45]'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke={p.featured?'white':'#1A56FF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/inscription" className={`block text-center py-3 rounded-xl text-sm font-medium transition-all ${p.featured ? 'bg-white text-[#0C0E12] hover:bg-gray-100' : 'border border-[rgba(12,14,18,0.1)] text-[#0C0E12] hover:bg-[#F7F8FA]'}`}>
                Commencer
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto bg-[#F7F8FA] border border-[rgba(12,14,18,0.06)] rounded-3xl p-12 text-center">
          <h2 className="text-[40px] font-bold tracking-tight text-[#0C0E12] mb-4" style={{fontFamily:'Syne,sans-serif'}}>Prêt à automatiser ?</h2>
          <p className="text-lg text-[#3A3D45] mb-8 font-light">14 jours gratuits. Sans carte bancaire.</p>
          <Link href="/inscription" className="btn-primary px-10 py-4 text-base justify-center">
            Commencer gratuitement →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[rgba(12,14,18,0.06)] py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#0C0E12] rounded-md flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-sm text-[#0C0E12]">BOS SYSTEMS</span>
        </div>
        <div className="text-sm text-[#B0B5C3]">© 2025 BOS Systems — Casablanca, Maroc</div>
      </footer>
    </div>
  )
}

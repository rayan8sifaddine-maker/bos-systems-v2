import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteNav } from '@/components/landing/site-nav'
import { SiteFooter } from '@/components/landing/site-footer'
import { ScrollReveal } from '@/components/landing/scroll-reveal'

export const metadata: Metadata = {
  title: 'BOS Systems vs WhatsApp Business vs Excel',
  description: 'Comparez BOS Systems, WhatsApp Business et le suivi Excel pour la gestion de votre relation client.',
}

type Cell = true | false | string

const ROWS: { feature: string; bos: Cell; wa: Cell; excel: Cell }[] = [
  { feature: 'Réponse automatique 24/7 sur WhatsApp', bos: true, wa: false, excel: false },
  { feature: 'Prise de rendez-vous sans intervention humaine', bos: true, wa: false, excel: false },
  { feature: 'Rappels automatiques avant rendez-vous', bos: true, wa: 'Manuel', excel: false },
  { feature: 'Relance automatique des clients inactifs', bos: true, wa: false, excel: false },
  { feature: 'Historique client centralisé et consultable', bos: true, wa: 'Limité', excel: 'Manuel' },
  { feature: 'Tableau de bord et statistiques en temps réel', bos: true, wa: false, excel: 'Manuel' },
  { feature: 'Accès multi-utilisateurs avec permissions', bos: true, wa: false, excel: 'Limité' },
  { feature: 'Aucune saisie manuelle requise', bos: true, wa: false, excel: false },
  { feature: 'Fonctionne pendant que vous êtes occupé', bos: true, wa: false, excel: true },
  { feature: 'Coût mensuel', bos: 'Dès 749 DH', wa: 'Gratuit*', excel: 'Gratuit*' },
]

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-flex w-6 h-6 rounded-full items-center justify-center bg-[#ECFDF5] text-[#10B981]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.5l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex w-6 h-6 rounded-full items-center justify-center bg-[#FEF2F2] text-[#EF4444]">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </span>
    )
  }
  return <span className="text-xs font-semibold text-[#7A7F8E]">{value}</span>
}

export default function ComparatifPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <section className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position:'absolute', top:'-15%', left:'50%', transform:'translateX(-50%)', width:700, height:700, background:'radial-gradient(ellipse, rgba(26,86,255,0.1) 0%, transparent 65%)', borderRadius:'50%' }}/>
        </div>
        <div className="max-w-3xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F7F8FA] border border-[rgba(12,14,18,0.08)] rounded-full text-[10px] font-semibold text-[#7A7F8E] uppercase tracking-wider">
            Comparatif
          </div>
          <h1 className="text-[36px] md:text-[48px] font-bold tracking-[-0.015em] leading-[1.1] text-[#0C0E12] font-display mb-4">BOS Systems vs WhatsApp Business vs Excel</h1>
          <p className="text-lg text-[#3A3D45] font-light leading-relaxed">Trois façons de gérer votre relation client. Une seule automatise vraiment votre quotidien.</p>
        </div>
      </section>

      <section className="pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="overflow-x-auto rounded-2xl border border-[rgba(12,14,18,0.07)]" style={{ boxShadow:'0 1px 3px rgba(12,14,18,0.05)' }}>
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-[rgba(12,14,18,0.07)]">
                    <th className="text-left p-4 text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider">Fonctionnalité</th>
                    <th className="p-4 text-center" style={{ background:'#EEF2FF' }}>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-bold text-[#1A56FF] font-display">BOS Systems</span>
                        <span className="text-[10px] font-semibold text-[#1A56FF]/70 uppercase tracking-wider">Recommandé</span>
                      </div>
                    </th>
                    <th className="p-4 text-center text-sm font-bold text-[#0C0E12]">WhatsApp Business</th>
                    <th className="p-4 text-center text-sm font-bold text-[#0C0E12]">Excel / Carnet</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r, i) => (
                    <tr key={r.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F8FA]/50'}>
                      <td className="p-4 text-[#3A3D45]">{r.feature}</td>
                      <td className="p-4 text-center" style={{ background:'#EEF2FF' }}><div className="flex justify-center"><CellValue value={r.bos} /></div></td>
                      <td className="p-4 text-center"><div className="flex justify-center"><CellValue value={r.wa} /></div></td>
                      <td className="p-4 text-center"><div className="flex justify-center"><CellValue value={r.excel} /></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
          <p className="text-xs text-[#B0B5C3] mt-4 text-center">*WhatsApp Business et Excel sont gratuits, mais nécessitent du temps humain pour chaque tâche — temps qui a un coût réel pour votre entreprise.</p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-[#F7F8FA]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
          {[
            { name: 'WhatsApp Business', desc: 'Bon pour démarrer, mais chaque message, chaque rendez-vous et chaque relance reste manuel — vous restez l\'unique goulot d\'étranglement.', color: '#10B981' },
            { name: 'Excel / Carnet papier', desc: 'Aucune automatisation, aucune notification, et un risque permanent de perdre des informations ou de doubler un rendez-vous.', color: '#D97706' },
            { name: 'BOS Systems', desc: 'L\'IA répond, planifie et relance à votre place — vous gardez le contrôle total sans y passer vos soirées.', color: '#1A56FF' },
          ].map(c => (
            <div key={c.name} className="bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl p-6">
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: c.color }} />
              <h3 className="text-base font-bold text-[#0C0E12] mb-2">{c.name}</h3>
              <p className="text-sm text-[#7A7F8E] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0C0E12] font-display mb-4">Prêt à passer à l&apos;automatisation ?</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/inscription" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#0C0E12,#1e2330)', boxShadow:'0 4px 16px rgba(12,14,18,0.25)' }}>
              Essayer gratuitement 7 jours →
            </Link>
            <Link href="/secteurs" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium text-[#3A3D45] border border-[rgba(12,14,18,0.12)] hover:bg-[#F7F8FA] transition-all">
              Voir les secteurs
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

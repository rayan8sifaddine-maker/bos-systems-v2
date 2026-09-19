'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const PLAN_INFO: Record<string, { label: string; price: string; desc: string; features: string[]; color: string; bg: string }> = {
  starter: {
    label: 'Starter',
    price: '749',
    desc: 'Pour démarrer et valider',
    features: ['Assistant IA WhatsApp', 'Gestion des rendez-vous', 'Rappels automatiques', '200 conversations/mois', 'CRM basique', '1 utilisateur'],
    color: '#3A3D45',
    bg: '#F7F8FA',
  },
  pro: {
    label: 'Pro',
    price: '2 749',
    desc: 'Pour les équipes actives',
    features: ['Tout Starter inclus', 'Conversations illimitées', 'Relances automatiques', 'CRM complet', 'Analytics avancés', '3 utilisateurs', 'Support prioritaire'],
    color: '#1A56FF',
    bg: '#EEF2FF',
  },
  enterprise: {
    label: 'Enterprise',
    price: '4 489',
    desc: 'Pour les grandes structures',
    features: ['Tout Pro inclus', 'Équipe illimitée', 'Intégrations custom', 'API dédiée', 'SLA garanti', 'Account manager dédié'],
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
}

const PAYMENT_METHODS = [
  { id: 'card', label: 'Carte bancaire', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M1 8h18" stroke="currentColor" strokeWidth="1.5"/><path d="M4 13h4M14 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { id: 'virement', label: 'Virement bancaire', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 7h14M5 10h2M9 10h2M13 10h2M5 13h2M9 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="1" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg> },
  { id: 'cheque', label: 'Chèque', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="5" width="18" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M4 9h6M4 12h4M14 9h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
]

function PaymentPageInner() {
  const params = useSearchParams()
  const planKey = (params.get('plan') || 'pro').toLowerCase()
  const plan = PLAN_INFO[planKey] || PLAN_INFO.pro

  const [step, setStep] = useState<'pay' | 'processing' | 'success'>('pay')
  const [method, setMethod] = useState('card')
  const [loading, setLoading] = useState(false)
  const [key, setKey] = useState('')
  const [copied, setCopied] = useState(false)

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStep('processing')

    await new Promise(r => setTimeout(r, 2200))

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey.toUpperCase() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setKey(data.key)
      setStep('success')
    } catch {
      setStep('pay')
    } finally {
      setLoading(false)
    }
  }

  function copyKey() {
    navigator.clipboard.writeText(key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[rgba(12,14,18,0.07)] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#0C0E12] rounded-lg flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-sm tracking-wide text-[#0C0E12] font-display">BOS SYSTEMS</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-[#7A7F8E]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="6" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M5 6V4a2 2 0 014 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            Paiement sécurisé
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-4xl">

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[rgba(12,14,18,0.07)] flex items-center justify-center mb-6 shadow-sm">
                <div className="w-8 h-8 border-2 border-[#1A56FF]/30 border-t-[#1A56FF] rounded-full animate-spin" />
              </div>
              <div className="text-base font-semibold text-[#0C0E12] mb-1">Traitement en cours…</div>
              <div className="text-sm text-[#7A7F8E]">Votre paiement est en cours de validation</div>
            </div>
          )}

          {step === 'success' && (
            <div className="animate-slide-up">
              {/* Success banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="9" fill="#10B981" opacity=".15"/>
                    <path d="M6 11l3.5 3.5L16 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-base font-bold text-emerald-900">Paiement effectué avec succès !</div>
                  <div className="text-sm text-emerald-700 mt-0.5">Votre clé de licence <strong>plan {plan.label}</strong> a été générée.</div>
                </div>
              </div>

              {/* Key card */}
              <div className="bg-white rounded-2xl border border-[rgba(12,14,18,0.07)] overflow-hidden mb-6" style={{ boxShadow: '0 4px 24px rgba(12,14,18,0.08)' }}>
                {/* Dark header */}
                <div className="px-8 py-6 text-center" style={{ background: 'linear-gradient(135deg, #0C0E12 0%, #141A30 100%)' }}>
                  <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l2 4.5 5 .7-3.6 3.5.9 5-4.3-2.3-4.3 2.3.9-5L1 6.2l5-.7L8 1z"/></svg>
                    Clé de licence {plan.label}
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-widest mb-2 break-all">{key}</div>
                  <div className="text-white/30 text-xs">Générée le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>

                {/* Warning */}
                <div className="flex items-start gap-3 px-6 py-4 bg-amber-50 border-b border-amber-100">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5"><path d="M9 2L1.5 15.5h15L9 2z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 8v4M9 13.5h.01" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  <div>
                    <div className="text-sm font-bold text-amber-800">⚠ Conservez cette clé en lieu sûr</div>
                    <div className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                      Cette clé est unique, non récupérable et ne peut être utilisée qu&apos;une seule fois lors de la création de votre compte BOS Systems. Copiez-la et sauvegardez-la maintenant.
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={copyKey}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${copied ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-[#0C0E12] text-white hover:bg-[#1e2330]'}`}
                  >
                    {copied ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Copié !
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M4 4V2.5A1.5 1.5 0 012.5 1H1a.5.5 0 00-.5.5v8A1.5 1.5 0 002 11h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                        Copier la clé
                      </>
                    )}
                  </button>
                  <Link
                    href={`/inscription?key=${encodeURIComponent(key)}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px"
                    style={{ background: 'linear-gradient(135deg, #1A56FF, #7C3AED)', boxShadow: '0 4px 16px rgba(26,86,255,0.3)' }}
                  >
                    Créer mon compte →
                  </Link>
                </div>
              </div>

              {/* What's next */}
              <div className="bg-white rounded-2xl border border-[rgba(12,14,18,0.06)] p-6">
                <div className="text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider mb-4">Prochaines étapes</div>
                <div className="space-y-3">
                  {[
                    { n: 1, text: 'Copiez et sauvegardez votre clé de licence ci-dessus', done: true },
                    { n: 2, text: 'Créez votre compte BOS Systems en saisissant votre clé', done: false },
                    { n: 3, text: 'Configurez votre assistant IA et commencez à automatiser', done: false },
                  ].map(s => (
                    <div key={s.n} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${s.done ? 'bg-emerald-100 text-emerald-700' : 'bg-[#F0F2F5] text-[#7A7F8E]'}`}>
                        {s.done ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> : s.n}
                      </div>
                      <span className={`text-sm ${s.done ? 'text-[#0C0E12] line-through opacity-50' : 'text-[#3A3D45]'}`}>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'pay' && (
            <div className="grid lg:grid-cols-[1fr_380px] gap-6 animate-fade-in">
              {/* Left: payment form */}
              <div className="bg-white rounded-2xl border border-[rgba(12,14,18,0.07)] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(12,14,18,0.06)' }}>
                <div className="px-8 pt-8 pb-6 border-b border-[rgba(12,14,18,0.06)]">
                  <h1 className="text-xl font-bold text-[#0C0E12] font-display mb-1">Finaliser votre commande</h1>
                  <p className="text-sm text-[#7A7F8E]">Choisissez votre mode de paiement</p>
                </div>

                <form onSubmit={handlePay} className="p-8 space-y-6">
                  {/* Payment method */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3D45] mb-3">Mode de paiement</label>
                    <div className="space-y-2">
                      {PAYMENT_METHODS.map(m => (
                        <label key={m.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${method === m.id ? 'border-[#1A56FF] bg-[#EEF2FF]' : 'border-[rgba(12,14,18,0.08)] hover:border-[rgba(12,14,18,0.2)] bg-[#F7F8FA]'}`}>
                          <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} className="sr-only"/>
                          <span className={`flex-shrink-0 ${method === m.id ? 'text-[#1A56FF]' : 'text-[#7A7F8E]'}`}>{m.icon}</span>
                          <span className={`text-sm font-medium ${method === m.id ? 'text-[#1A56FF]' : 'text-[#3A3D45]'}`}>{m.label}</span>
                          {method === m.id && (
                            <svg className="ml-auto text-[#1A56FF]" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#1A56FF"/><path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {method === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#3A3D45] mb-1.5">Numéro de carte</label>
                        <input className="input font-mono tracking-widest" placeholder="•••• •••• •••• ••••" maxLength={19} readOnly defaultValue="4242 4242 4242 4242"/>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#3A3D45] mb-1.5">Expiration</label>
                          <input className="input" placeholder="MM/AA" readOnly defaultValue="12/28"/>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#3A3D45] mb-1.5">CVV</label>
                          <input className="input" placeholder="•••" maxLength={3} readOnly defaultValue="123"/>
                        </div>
                      </div>
                    </div>
                  )}

                  {method === 'virement' && (
                    <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[rgba(12,14,18,0.06)]">
                      <div className="text-xs font-semibold text-[#0C0E12] mb-2">Coordonnées bancaires</div>
                      <div className="space-y-1 text-xs text-[#7A7F8E] font-mono">
                        <div>IBAN : MA64 0007 0001 0000 0012 3456</div>
                        <div>BIC : BMCEMAMC</div>
                        <div>Référence : BOS-{planKey.toUpperCase()}</div>
                      </div>
                    </div>
                  )}

                  {method === 'cheque' && (
                    <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[rgba(12,14,18,0.06)]">
                      <div className="text-xs font-semibold text-[#0C0E12] mb-2">Chèque à l&apos;ordre de</div>
                      <div className="text-xs text-[#7A7F8E]">BOS Systems SARL<br/>20, Boulevard Zerktouni<br/>Casablanca 20000</div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #1A56FF, #7C3AED)', boxShadow: '0 4px 16px rgba(26,86,255,0.3)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="6" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M5 6V4a2 2 0 014 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Payer {plan.price} DH/mois
                  </button>

                  <p className="text-center text-[11px] text-[#B0B5C3]">
                    Paiement sécurisé · Sans engagement · Annulez à tout moment
                  </p>
                </form>
              </div>

              {/* Right: order summary */}
              <div>
                <div className="bg-white rounded-2xl border border-[rgba(12,14,18,0.07)] p-6 sticky top-6" style={{ boxShadow: '0 2px 12px rgba(12,14,18,0.06)' }}>
                  <div className="text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider mb-4">Récapitulatif</div>

                  <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[rgba(12,14,18,0.06)]">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0C0E12, #1A2040)' }}>
                      BOS
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0C0E12]">BOS Systems — Plan {plan.label}</div>
                      <div className="text-xs text-[#7A7F8E]">{plan.desc}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs text-[#3A3D45]">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#EEF2FF"/><path d="M4 7l2 2 4-4" stroke="#1A56FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[rgba(12,14,18,0.06)] pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-[#7A7F8E]">
                      <span>Abonnement mensuel</span>
                      <span>{plan.price} DH</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#7A7F8E]">
                      <span>TVA (20%)</span>
                      <span>{Math.round(parseInt(plan.price.replace(' ', '')) * 0.2).toLocaleString('fr-FR')} DH</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#0C0E12] pt-2 border-t border-[rgba(12,14,18,0.06)] mt-2">
                      <span>Total</span>
                      <span>{Math.round(parseInt(plan.price.replace(' ', '')) * 1.2).toLocaleString('fr-FR')} DH</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[11px] text-[#B0B5C3]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l4 1.5v3c0 3-2 4.8-4 5.5-2-0.7-4-2.5-4-5.5v-3L6 1z" stroke="currentColor" strokeWidth="1.2"/></svg>
                    Données sécurisées · Conformité RGPD & loi 09-08
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentPageInner />
    </Suspense>
  )
}

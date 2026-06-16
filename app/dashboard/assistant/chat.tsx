'use client'
import { useState, useRef, useEffect } from 'react'
import { formatTime } from '@/lib/utils'

interface Message { role: 'user' | 'assistant'; content: string; ts: Date }
interface Props { clinicId: string; clinicName: string; clinicHours: string; clinicPrice: string }

const SUGGESTIONS = [
  'Bonjour, je voudrais prendre rendez-vous',
  'Quels sont vos tarifs ?',
  'Êtes-vous disponible demain matin ?',
  'Comment puis-je annuler mon rendez-vous ?',
  'Quelles sont vos horaires d\'ouverture ?',
]

export default function AssistantChat({ clinicId, clinicName, clinicHours, clinicPrice }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')

    const userMsg: Message = { role: 'user', content: msg, ts: new Date() }
    setMessages(p => [...p, userMsg])
    setLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, clinicId, history }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erreur inconnue')
      setMessages(p => [...p, { role: 'assistant', content: data.reply, ts: new Date() }])
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erreur inconnue'
      setMessages(p => [...p, { role: 'assistant', content: `⚠️ ${msg}`, ts: new Date() }])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-3xl mb-4">🤖</div>
              <div className="text-base font-semibold text-[#0C0E12] mb-1">Assistant de {clinicName}</div>
              <div className="text-sm text-[#7A7F8E] max-w-sm">
                Simulez une conversation avec votre assistant IA. Posez une question comme un client le ferait via WhatsApp.
              </div>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 bg-white border border-[rgba(12,14,18,0.08)] rounded-xl text-[#3A3D45] hover:border-[#1A56FF] hover:text-[#1A56FF] hover:bg-[#EEF2FF] transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-sm flex-shrink-0 mr-2.5 mt-0.5">🤖</div>
                )}
                <div className={`max-w-[75%] ${m.role === 'user' ? 'order-2' : ''}`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#0C0E12] text-white rounded-br-sm'
                      : 'bg-white border border-[rgba(12,14,18,0.08)] text-[#0C0E12] rounded-bl-sm shadow-sm'
                  }`}>
                    {m.content}
                  </div>
                  <div className={`text-[10px] text-[#B0B5C3] mt-1 ${m.role === 'user' ? 'text-right' : ''}`}>
                    {formatTime(m.ts)}
                  </div>
                </div>
                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-[#0C0E12] flex items-center justify-center text-white text-xs flex-shrink-0 ml-2.5 mt-0.5">Vous</div>
                )}
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start animate-slide-up">
              <div className="w-7 h-7 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-sm flex-shrink-0 mr-2.5">🤖</div>
              <div className="bg-white border border-[rgba(12,14,18,0.08)] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#B0B5C3] animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 pb-4 pt-2 border-t border-[rgba(12,14,18,0.06)] bg-white flex-shrink-0">
          {messages.length > 0 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {SUGGESTIONS.slice(0, 3).map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11px] px-2.5 py-1 bg-[#F7F8FA] border border-[rgba(12,14,18,0.06)] rounded-lg text-[#7A7F8E] hover:border-[#1A56FF] hover:text-[#1A56FF] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Tapez un message..."
              className="input flex-1"
              maxLength={500}
              disabled={loading}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="btn-primary px-4 flex-shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7l12-6-5 12-2-5-5-1z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[10px] text-[#B0B5C3]">Appuyez sur Entrée pour envoyer</span>
            <span className="text-[10px] text-[#B0B5C3]">{input.length}/500</span>
          </div>
        </div>
      </div>

      {/* Sidebar info */}
      <div className="w-64 border-l border-[rgba(12,14,18,0.06)] bg-[#F7F8FA] p-5 overflow-y-auto hidden lg:block flex-shrink-0">
        <div className="text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider mb-3">Configuration IA</div>
        <div className="space-y-2.5 mb-6">
          {[
            ['Modèle', 'Gemini 1.5 Flash'],
            ['Langue', 'Français (auto)'],
            ['Délai réponse', '< 3 sec'],
            ['Max tokens', '500'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-xs">
              <span className="text-[#B0B5C3]">{k}</span>
              <span className="font-medium text-[#3A3D45]">{v}</span>
            </div>
          ))}
        </div>

        <div className="divider mb-4" />
        <div className="text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider mb-3">Ce que l'IA sait</div>
        <div className="space-y-2">
          {[
            { icon: '🏥', label: 'Votre établissement', value: clinicName },
            { icon: '⏰', label: 'Vos horaires', value: clinicHours },
            { icon: '💰', label: 'Vos tarifs', value: clinicPrice },
            { icon: '📅', label: 'Créneaux dispo', value: 'Temps réel' },
          ].map(i => (
            <div key={i.label} className="card-inset rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-sm">{i.icon}</span>
                <span className="text-[10px] font-medium text-[#7A7F8E]">{i.label}</span>
              </div>
              <div className="text-xs font-medium text-[#0C0E12] truncate">{i.value}</div>
            </div>
          ))}
        </div>

        {messages.length > 0 && (
          <>
            <div className="divider my-4" />
            <button
              onClick={() => setMessages([])}
              className="w-full text-xs text-[#7A7F8E] hover:text-red-500 transition-colors py-1"
            >
              Réinitialiser la conversation
            </button>
          </>
        )}
      </div>
    </div>
  )
}

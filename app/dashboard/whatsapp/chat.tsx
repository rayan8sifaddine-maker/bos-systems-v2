'use client'
import { useState } from 'react'

interface Message { role: 'user' | 'assistant'; content: string }

export default function WhatsAppChat({ clinicId, clinicName }: { clinicId: string; clinicName: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Bonjour ! Je suis l'assistant de ${clinicName}. Comment puis-je vous aider ?` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(m => [...m, { role: 'user', content: userMsg }])
    setLoading(true)
    try {
      const history = messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }))
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, clinicId, history }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply || 'Désolé, une erreur s\'est produite.' }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Désolé, une erreur s\'est produite.' }])
    }
    setLoading(false)
  }

  return (
    <div className="flex gap-6 flex-1 min-h-0">
      <div className="flex-1 card flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[rgba(12,14,18,0.06)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white text-sm font-bold">W</div>
          <div>
            <div className="text-sm font-semibold text-[#0C0E12]">{clinicName}</div>
            <div className="text-xs text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              En ligne
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F7F8FA]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${m.role === 'user' ? 'bg-[#0C0E12] text-white rounded-br-sm' : 'bg-white border border-[rgba(12,14,18,0.08)] text-[#0C0E12] rounded-bl-sm'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-[rgba(12,14,18,0.08)] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#B0B5C3] animate-bounce" style={{animationDelay:`${i*0.15}s`}}></span>)}
              </div>
            </div>
          )}
        </div>
        <div className="p-3 border-t border-[rgba(12,14,18,0.06)] flex gap-2">
          <input
            className="input flex-1"
            placeholder="Écrivez un message..."
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&send()}
          />
          <button onClick={send} disabled={loading||!input.trim()} className="btn-primary px-4 py-2.5 text-sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l12-6-5 6 5 6-12-6z" fill="white"/></svg>
          </button>
        </div>
      </div>
      <div className="w-64 space-y-4">
        <div className="card p-4">
          <div className="text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider mb-3">Suggestions rapides</div>
          <div className="space-y-2">
            {['Quels sont vos horaires ?','Combien coûte une consultation ?','Je voudrais un rendez-vous','Vous êtes disponible demain ?'].map(s => (
              <button key={s} onClick={()=>{setInput(s)}} className="w-full text-left px-3 py-2 text-xs text-[#3A3D45] bg-[#F7F8FA] hover:bg-[#EEF2FF] hover:text-[#1A56FF] rounded-xl transition-colors">{s}</button>
            ))}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider mb-3">Statut IA</div>
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Assistant actif
          </div>
          <p className="text-xs text-[#B0B5C3] mt-2">L&apos;IA répond automatiquement à vos patients via cette interface.</p>
        </div>
      </div>
    </div>
  )
}

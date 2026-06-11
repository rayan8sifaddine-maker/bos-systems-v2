'use client'
import { useState, useEffect } from 'react'
import { initials, STATUS_COLORS, STATUS_LABELS } from '@/lib/utils'

interface Client {
  id: string
  name: string
  phone?: string
  email?: string
  status: string
  notes?: string
  createdAt: string
}

export default function CrmPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name:'', phone:'', email:'', notes:'' })
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => { fetchClients() }, [])

  async function fetchClients() {
    const res = await fetch('/api/clients')
    if (res.ok) setClients(await res.json())
    setLoading(false)
  }

  async function saveClient(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/clients', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setShowForm(false)
    setForm({ name:'', phone:'', email:'', notes:'' })
    fetchClients()
    setSaving(false)
  }

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0C0E12]">CRM Clients</h1>
          <p className="text-sm text-[#7A7F8E] mt-1">{clients.length} clients au total</p>
        </div>
        <button onClick={()=>setShowForm(true)} className="btn-primary text-sm px-5 py-2.5">+ Nouveau client</button>
      </div>

      <div className="mb-6">
        <input className="input max-w-sm" placeholder="Rechercher un client..." value={search} onChange={e=>setSearch(e.target.value)} />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md border border-[rgba(12,14,18,0.08)]">
            <h2 className="text-xl font-bold text-[#0C0E12] mb-6">Nouveau client</h2>
            <form onSubmit={saveClient} className="space-y-4">
              <div><label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Nom</label><input className="input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required/></div>
              <div><label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Téléphone</label><input className="input" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></div>
              <div><label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Email</label><input type="email" className="input" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
              <div><label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Notes</label><textarea className="input h-20 py-3 resize-none" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/></div>
              <div className="flex gap-3">
                <button type="button" onClick={()=>setShowForm(false)} className="btn-secondary flex-1 py-3 justify-center">Annuler</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 py-3 justify-center">
                  {saving?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {loading ? (
          <div className="card p-12 text-center text-sm text-[#B0B5C3]">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="card p-12 text-center text-sm text-[#B0B5C3]">
            {search ? 'Aucun résultat' : 'Aucun client — ajoutez-en un !'}
          </div>
        ) : filtered.map(c => (
          <div key={c.id} className="card p-4 flex items-center gap-4 hover:bg-[#F7F8FA] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#1A56FF] text-sm font-bold flex-shrink-0">
              {initials(c.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#0C0E12]">{c.name}</div>
              <div className="text-xs text-[#7A7F8E]">{c.phone||c.email||'Aucun contact'}</div>
            </div>
            <span className={`badge text-[10px] ${STATUS_COLORS[c.status]||'bg-gray-50 text-gray-600 border-gray-200'}`}>{STATUS_LABELS[c.status]||c.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { formatDate, formatTime, STATUS_COLORS, STATUS_LABELS } from '@/lib/utils'

interface Appointment {
  id: string
  patientName: string
  phone?: string
  datetime: string
  type: string
  status: string
  source: string
}

export default function RdvPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ patientName:'', phone:'', datetime:'', type:'Consultation', notes:'' })
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchRdv() }, [])

  async function fetchRdv() {
    const res = await fetch('/api/appointments')
    if (res.ok) setAppointments(await res.json())
    setLoading(false)
  }

  async function saveRdv(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/appointments', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setShowForm(false)
    setForm({ patientName:'', phone:'', datetime:'', type:'Consultation', notes:'' })
    fetchRdv()
    setSaving(false)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0C0E12]">Rendez-vous</h1>
          <p className="text-sm text-[#7A7F8E] mt-1">{appointments.length} rendez-vous au total</p>
        </div>
        <button onClick={()=>setShowForm(true)} className="btn-primary text-sm px-5 py-2.5">+ Nouveau RDV</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md border border-[rgba(12,14,18,0.08)]">
            <h2 className="text-xl font-bold text-[#0C0E12] mb-6">Nouveau rendez-vous</h2>
            <form onSubmit={saveRdv} className="space-y-4">
              <div><label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Nom du patient</label><input className="input" value={form.patientName} onChange={e=>setForm(f=>({...f,patientName:e.target.value}))} required/></div>
              <div><label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Téléphone</label><input className="input" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></div>
              <div><label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Date et heure</label><input type="datetime-local" className="input" value={form.datetime} onChange={e=>setForm(f=>({...f,datetime:e.target.value}))} required/></div>
              <div><label className="block text-sm font-medium text-[#3A3D45] mb-1.5">Type</label>
                <select className="input" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
                  {['Consultation','Première visite','Suivi','Renouvellement','Autre'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={()=>setShowForm(false)} className="btn-secondary flex-1 py-3 justify-center">Annuler</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 py-3 justify-center">
                  {saving?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F7F8FA]">
              {['Date & Heure','Patient','Type','Téléphone','Source','Statut'].map(h=>(
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#7A7F8E] uppercase tracking-wider border-b border-[rgba(12,14,18,0.06)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-12 text-sm text-[#B0B5C3]">Chargement...</td></tr>
            ) : appointments.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-sm text-[#B0B5C3]">Aucun rendez-vous — ajoutez-en un !</td></tr>
            ) : appointments.map(a => (
              <tr key={a.id} className="hover:bg-[#F7F8FA] transition-colors">
                <td className="px-4 py-3 border-b border-[rgba(12,14,18,0.04)]">
                  <div className="text-sm font-medium text-[#0C0E12]">{formatDate(a.datetime)}</div>
                  <div className="text-xs text-[#7A7F8E]">{formatTime(a.datetime)}</div>
                </td>
                <td className="px-4 py-3 border-b border-[rgba(12,14,18,0.04)] text-sm font-medium text-[#0C0E12]">{a.patientName}</td>
                <td className="px-4 py-3 border-b border-[rgba(12,14,18,0.04)] text-sm text-[#3A3D45]">{a.type}</td>
                <td className="px-4 py-3 border-b border-[rgba(12,14,18,0.04)] text-sm text-[#7A7F8E]">{a.phone||'—'}</td>
                <td className="px-4 py-3 border-b border-[rgba(12,14,18,0.04)]"><span className="badge bg-[#EEF2FF] text-[#1A56FF] border-[rgba(26,86,255,0.2)] text-[10px]">{a.source}</span></td>
                <td className="px-4 py-3 border-b border-[rgba(12,14,18,0.04)]"><span className={`badge text-[10px] ${STATUS_COLORS[a.status]||'bg-gray-50 text-gray-600 border-gray-200'}`}>{STATUS_LABELS[a.status]||a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

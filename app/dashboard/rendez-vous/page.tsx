'use client'
import { useState, useEffect, useCallback } from 'react'
import { formatDate, formatTime, STATUS_COLORS, STATUS_LABELS } from '@/lib/utils'
import { Modal } from '@/components/ui/modal'
import { Confirm } from '@/components/ui/confirm'
import { SkeletonTable } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'

interface Appointment {
  id: string
  patientName: string
  phone?: string
  datetime: string
  type: string
  status: string
  source: string
  notes?: string
}

const TYPES = ['Consultation','Première visite','Suivi','Renouvellement','Autre']
const STATUSES = ['PENDING','CONFIRMED','DONE','CANCELED','NO_SHOW'] as const
const EMPTY_FORM = { patientName: '', phone: '', datetime: '', type: 'Consultation', notes: '', status: 'PENDING' }

export default function RdvPage() {
  const { toast } = useToast()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState<Appointment | null>(null)
  const [deleting, setDeleting] = useState<Appointment | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(false)
  const [filterStatus, setFilterStatus] = useState('')

  const fetchRdv = useCallback(async () => {
    const params = new URLSearchParams()
    if (filterStatus) params.set('status', filterStatus)
    const res = await fetch(`/api/appointments?${params}`)
    if (res.ok) setAppointments(await res.json())
    setLoading(false)
  }, [filterStatus])

  useEffect(() => { fetchRdv() }, [fetchRdv])

  function openAdd() { setForm(EMPTY_FORM); setShowAdd(true) }
  function openEdit(a: Appointment) {
    setEditing(a)
    const dt = new Date(a.datetime)
    const localDT = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
    setForm({ patientName: a.patientName, phone: a.phone ?? '', datetime: localDT, type: a.type, notes: a.notes ?? '', status: a.status })
  }
  function closeModal() { setShowAdd(false); setEditing(null) }

  async function saveRdv(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const url = editing ? `/api/appointments/${editing.id}` : '/api/appointments'
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast(editing ? 'RDV mis à jour' : 'RDV ajouté', 'success')
      closeModal()
      fetchRdv()
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Erreur', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/appointments/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    if (res.ok) { toast('Statut mis à jour', 'success'); fetchRdv() }
    else toast('Erreur', 'error')
  }

  async function confirmDelete() {
    if (!deleting) return
    setDeletingId(true)
    try {
      const res = await fetch(`/api/appointments/${deleting.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast('RDV supprimé', 'success')
      setDeleting(null)
      fetchRdv()
    } catch {
      toast('Erreur lors de la suppression', 'error')
    } finally {
      setDeletingId(false)
    }
  }

  const today = appointments.filter(a => {
    const d = new Date(a.datetime)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  }).length

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Rendez-vous</h1>
          <p className="page-subtitle">{appointments.length} au total · {today} aujourd'hui</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Nouveau RDV
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        {['', ...STATUSES].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterStatus === s ? 'bg-[#0C0E12] text-white' : 'bg-white border border-[rgba(12,14,18,0.08)] text-[#3A3D45] hover:bg-[#F7F8FA]'}`}
          >
            {s ? STATUS_LABELS[s] : 'Tous'}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <SkeletonTable rows={6} />
      ) : (
        <div className="table-container">
          <table className="w-full border-collapse">
            <thead className="table-header">
              <tr>
                {['Date & Heure','Patient','Type','Téléphone','Source','Statut',''].map(h => (
                  <th key={h} className="th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">
                      <div className="empty-icon">📅</div>
                      <div className="empty-title">Aucun rendez-vous</div>
                      <div className="empty-desc mt-2">
                        <button onClick={openAdd} className="text-[#1A56FF] hover:underline">Ajouter votre premier RDV</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : appointments.map(a => (
                <tr key={a.id} className="tr-hover">
                  <td className="td">
                    <div className="text-sm font-semibold text-[#0C0E12]">{formatDate(a.datetime)}</div>
                    <div className="text-xs text-[#7A7F8E]">{formatTime(a.datetime)}</div>
                  </td>
                  <td className="td">
                    <div className="text-sm font-medium text-[#0C0E12]">{a.patientName}</div>
                    {a.notes && <div className="text-xs text-[#B0B5C3] truncate max-w-[140px]">{a.notes}</div>}
                  </td>
                  <td className="td text-sm text-[#3A3D45]">{a.type}</td>
                  <td className="td text-sm text-[#7A7F8E]">{a.phone ?? '—'}</td>
                  <td className="td">
                    <span className="badge-blue badge-sm">{a.source}</span>
                  </td>
                  <td className="td">
                    <select
                      value={a.status}
                      onChange={e => updateStatus(a.id, e.target.value)}
                      className={`text-[10px] font-medium border rounded-full px-2 py-0.5 cursor-pointer outline-none appearance-none ${STATUS_COLORS[a.status] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                  </td>
                  <td className="td">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => openEdit(a)} className="btn-icon" title="Modifier">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9.5 1.5l2 2L4 11H2v-2L9.5 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                      </button>
                      <button onClick={() => setDeleting(a)} className="btn-icon text-red-400 hover:text-red-500 hover:bg-red-50" title="Supprimer">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M5.5 6v3.5M7.5 6v3.5M3 3.5l.5 7a1 1 0 001 1h4a1 1 0 001-1l.5-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal open={showAdd || !!editing} onClose={closeModal} title={editing ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}>
        <form onSubmit={saveRdv} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Nom du patient *</label>
            <input className="input" placeholder="Mohammed Alami" value={form.patientName} onChange={e => setForm(f => ({...f, patientName: e.target.value}))} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Téléphone</label>
              <input className="input" placeholder="06 00 00 00 00" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Date et heure *</label>
              <input type="datetime-local" className="input" value={form.datetime} onChange={e => setForm(f => ({...f, datetime: e.target.value}))} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Type</label>
              <select className="select" value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Statut</label>
              <select className="select" value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
                {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Notes</label>
            <textarea className="textarea" rows={2} placeholder="Motif de consultation, observations..." value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center">Annuler</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : (editing ? 'Mettre à jour' : 'Enregistrer')}
            </button>
          </div>
        </form>
      </Modal>

      <Confirm
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Supprimer le rendez-vous"
        message={`Supprimer le RDV de ${deleting?.patientName} le ${deleting ? formatDate(deleting.datetime) : ''} ?`}
        confirmLabel="Supprimer"
        danger
        loading={deletingId}
      />
    </div>
  )
}

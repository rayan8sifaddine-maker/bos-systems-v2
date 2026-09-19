'use client'
import { useState, useEffect, useCallback } from 'react'
import { formatDate, formatTime, STATUS_COLORS, STATUS_LABELS } from '@/lib/utils'

// ── Agenda (calendar) view ───────────────────────────────────
function AgendaView({ appointments, onAdd, onEdit }: { appointments: Appointment[]; onAdd: () => void; onEdit: (a: Appointment) => void }) {
  const [weekOffset, setWeekOffset] = useState(0)
  const HOURS = Array.from({ length: 13 }, (_, i) => i + 7) // 7h–19h
  const today = new Date()

  function getWeekDays(offset: number) {
    const monday = new Date(today)
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7) + offset * 7)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      return d
    })
  }

  const days = getWeekDays(weekOffset)
  const weekLabel = `${days[0].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} – ${days[6].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`

  function getAppts(day: Date) {
    return appointments.filter(a => {
      const d = new Date(a.datetime)
      return d.toDateString() === day.toDateString()
    }).sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
  }

  const DOT_COLORS: Record<string, string> = {
    PENDING: 'bg-amber-400', CONFIRMED: 'bg-emerald-400', DONE: 'bg-blue-400', CANCELED: 'bg-gray-400', NO_SHOW: 'bg-red-400',
  }

  return (
    <div>
      {/* Week navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setWeekOffset(o => o - 1)} className="btn-icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#0C0E12] dark:text-[#F1F2F4]">{weekLabel}</span>
          {weekOffset !== 0 && (
            <button onClick={() => setWeekOffset(0)} className="text-xs text-[#1A56FF] hover:underline">Aujourd&apos;hui</button>
          )}
        </div>
        <button onClick={() => setWeekOffset(o => o + 1)} className="btn-icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Week grid */}
      <div className="card overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-[48px_repeat(7,1fr)] border-b border-[rgba(12,14,18,0.06)] dark:border-white/10">
          <div className="border-r border-[rgba(12,14,18,0.04)] dark:border-white/5" />
          {days.map(day => {
            const isToday = day.toDateString() === today.toDateString()
            const appts = getAppts(day)
            return (
              <div key={day.toISOString()} className={`px-2 py-2.5 text-center border-r border-[rgba(12,14,18,0.04)] dark:border-white/5 last:border-r-0 ${isToday ? 'bg-[#EEF2FF] dark:bg-[#1A56FF]/10' : ''}`}>
                <div className="text-[10px] text-[#B0B5C3] dark:text-[#5A5F6B] uppercase">{day.toLocaleDateString('fr-FR', { weekday: 'short' })}</div>
                <div className={`text-sm font-bold mt-0.5 ${isToday ? 'text-[#1A56FF]' : 'text-[#0C0E12] dark:text-[#F1F2F4]'}`}>{day.getDate()}</div>
                {appts.length > 0 && <div className="text-[9px] text-[#B0B5C3] dark:text-[#5A5F6B] mt-0.5">{appts.length} RDV</div>}
              </div>
            )
          })}
        </div>

        {/* Time slots */}
        <div className="overflow-y-auto" style={{ maxHeight: 480 }}>
          {HOURS.map(hour => (
            <div key={hour} className="grid grid-cols-[48px_repeat(7,1fr)] border-b border-[rgba(12,14,18,0.04)] dark:border-white/5 last:border-b-0 min-h-[52px]">
              <div className="flex items-start justify-end pr-2 pt-1.5 border-r border-[rgba(12,14,18,0.04)] dark:border-white/5">
                <span className="text-[10px] text-[#B0B5C3] dark:text-[#5A5F6B] tabular-nums">{hour}h</span>
              </div>
              {days.map(day => {
                const dayAppts = getAppts(day).filter(a => new Date(a.datetime).getHours() === hour)
                const isToday = day.toDateString() === today.toDateString()
                return (
                  <div
                    key={day.toISOString()}
                    className={`border-r border-[rgba(12,14,18,0.04)] dark:border-white/5 last:border-r-0 p-1 ${isToday ? 'bg-[#EEF2FF]/30 dark:bg-[#1A56FF]/5' : ''}`}
                  >
                    {dayAppts.map(a => (
                      <button
                        key={a.id}
                        onClick={() => onEdit(a)}
                        className="w-full text-left rounded-lg px-1.5 py-1 mb-0.5 text-[10px] leading-tight transition-all hover:brightness-95 group"
                        style={{ background: '#EEF2FF', borderLeft: `2px solid #1A56FF` }}
                      >
                        <div className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${DOT_COLORS[a.status] ?? 'bg-gray-400'}`} />
                          <span className="font-semibold text-[#1A56FF] truncate">{formatTime(a.datetime)}</span>
                        </div>
                        <div className="text-[#3A3D45] truncate">{a.patientName}</div>
                      </button>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
import { Modal } from '@/components/ui/modal'
import { Confirm } from '@/components/ui/confirm'
import { SkeletonTable } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'
import { ExportPanel, downloadCSV, printAsPDF } from '@/components/ui/export-panel'

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
  const [exporting, setExporting] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'agenda'>('list')

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

  async function handleExport(format: 'csv' | 'pdf', range: { from?: string; to?: string }, periodText: string) {
    setExporting(true)
    try {
      const params = new URLSearchParams({ limit: '5000' })
      if (range.from) params.set('from', range.from)
      if (range.to) params.set('to', range.to)
      const res = await fetch(`/api/appointments?${params}`)
      if (!res.ok) throw new Error()
      const data: Appointment[] = await res.json()

      const headers = ['Date', 'Heure', 'Patient', 'Téléphone', 'Type', 'Statut', 'Notes']
      const rows = data.map(a => [
        formatDate(a.datetime),
        formatTime(a.datetime),
        a.patientName,
        a.phone ?? '',
        a.type,
        STATUS_LABELS[a.status] ?? a.status,
        a.notes ?? '',
      ])

      if (format === 'csv') {
        downloadCSV(`rendez-vous_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows)
      } else {
        printAsPDF('Rendez-vous', periodText, headers, rows)
      }
    } catch {
      toast("Erreur lors de l'export", 'error')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Rendez-vous</h1>
          <p className="page-subtitle">{appointments.length} au total · {today} aujourd'hui</p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex bg-[#F7F8FA] dark:bg-[#1A1D24] border border-[rgba(12,14,18,0.08)] dark:border-white/10 rounded-xl p-1 gap-1">
            <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${viewMode === 'list' ? 'bg-white dark:bg-[#0C0E12] text-[#0C0E12] dark:text-white shadow-sm' : 'text-[#7A7F8E] hover:text-[#0C0E12] dark:hover:text-white'}`}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 3h10M1 6h10M1 9h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              Liste
            </button>
            <button onClick={() => setViewMode('agenda')} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${viewMode === 'agenda' ? 'bg-white dark:bg-[#0C0E12] text-[#0C0E12] dark:text-white shadow-sm' : 'text-[#7A7F8E] hover:text-[#0C0E12] dark:hover:text-white'}`}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 4h10M4 1v3M8 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              Agenda
            </button>
          </div>
          <ExportPanel onExport={handleExport} exporting={exporting} />
          <button onClick={openAdd} className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Nouveau RDV
          </button>
        </div>
      </div>

      {/* Agenda view */}
      {viewMode === 'agenda' && !loading && (
        <AgendaView appointments={appointments} onAdd={openAdd} onEdit={openEdit} />
      )}

      {/* Filters — list view only */}
      {viewMode === 'list' && <div className="flex gap-1.5 mb-6 flex-wrap">
        {['', ...STATUSES].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterStatus === s ? 'bg-[#0C0E12] dark:bg-[#1A56FF] text-white' : 'bg-white dark:bg-[#1A1D24] border border-[rgba(12,14,18,0.08)] dark:border-white/10 text-[#3A3D45] dark:text-[#9CA3AF] hover:bg-[#F7F8FA] dark:hover:bg-white/5'}`}
          >
            {s ? STATUS_LABELS[s] : 'Tous'}
          </button>
        ))}
      </div>}

      {/* Table — list view only */}
      {viewMode === 'list' && (loading ? (
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
                    <div className="text-sm font-semibold text-[#0C0E12] dark:text-[#F1F2F4]">{formatDate(a.datetime)}</div>
                    <div className="text-xs text-[#7A7F8E] dark:text-[#9CA3AF]">{formatTime(a.datetime)}</div>
                  </td>
                  <td className="td">
                    <div className="text-sm font-medium text-[#0C0E12] dark:text-[#F1F2F4]">{a.patientName}</div>
                    {a.notes && <div className="text-xs text-[#B0B5C3] dark:text-[#5A5F6B] truncate max-w-[140px]">{a.notes}</div>}
                  </td>
                  <td className="td text-sm text-[#3A3D45] dark:text-[#9CA3AF]">{a.type}</td>
                  <td className="td text-sm text-[#7A7F8E] dark:text-[#9CA3AF]">{a.phone ?? '—'}</td>
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
      ))}

      {/* Add / Edit Modal */}
      <Modal open={showAdd || !!editing} onClose={closeModal} title={editing ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}>
        <form onSubmit={saveRdv} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] dark:text-[#9CA3AF] mb-1.5">Nom du patient *</label>
            <input className="input" placeholder="Mohammed Alami" value={form.patientName} onChange={e => setForm(f => ({...f, patientName: e.target.value}))} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] dark:text-[#9CA3AF] mb-1.5">Téléphone</label>
              <input className="input" placeholder="06 00 00 00 00" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] dark:text-[#9CA3AF] mb-1.5">Date et heure *</label>
              <input type="datetime-local" className="input" value={form.datetime} onChange={e => setForm(f => ({...f, datetime: e.target.value}))} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] dark:text-[#9CA3AF] mb-1.5">Type</label>
              <select className="select" value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] dark:text-[#9CA3AF] mb-1.5">Statut</label>
              <select className="select" value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
                {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] dark:text-[#9CA3AF] mb-1.5">Notes</label>
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

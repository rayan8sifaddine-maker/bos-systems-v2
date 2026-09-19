'use client'
import { useState, useEffect, useCallback } from 'react'
import { initials, STATUS_COLORS, STATUS_LABELS, avatarColor, formatDate } from '@/lib/utils'
import { Modal } from '@/components/ui/modal'
import { Confirm } from '@/components/ui/confirm'
import { SkeletonRow } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'
import { ExportPanel, downloadCSV, printAsPDF } from '@/components/ui/export-panel'

interface Client {
  id: string
  name: string
  phone?: string
  email?: string
  status: string
  notes?: string
  tags?: string[]
  source?: string
  lastContactAt?: string | null
  createdAt: string
}

const STATUS_OPTIONS = ['LEAD','ACTIVE','INACTIVE'] as const
const EMPTY_FORM = { name: '', phone: '', email: '', notes: '', status: 'LEAD' }

export default function CrmPage() {
  const { toast } = useToast()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState<Client | null>(null)
  const [deleting, setDeleting] = useState<Client | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [exporting, setExporting] = useState(false)

  const fetchClients = useCallback(async () => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (filterStatus) params.set('status', filterStatus)
    const res = await fetch(`/api/clients?${params}`)
    if (res.ok) setClients(await res.json())
    setLoading(false)
  }, [search, filterStatus])

  useEffect(() => { fetchClients() }, [fetchClients])

  function openAdd() { setForm(EMPTY_FORM); setShowAdd(true) }
  function openEdit(c: Client) {
    setEditing(c)
    setForm({ name: c.name, phone: c.phone ?? '', email: c.email ?? '', notes: c.notes ?? '', status: c.status })
  }
  function closeModal() { setShowAdd(false); setEditing(null) }

  async function saveClient(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const url = editing ? `/api/clients/${editing.id}` : '/api/clients'
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast(editing ? 'Client mis à jour' : 'Client ajouté', 'success')
      closeModal()
      fetchClients()
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Erreur', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function confirmDelete() {
    if (!deleting) return
    setDeletingId(true)
    try {
      const res = await fetch(`/api/clients/${deleting.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast('Client supprimé', 'success')
      setDeleting(null)
      fetchClients()
    } catch {
      toast('Erreur lors de la suppression', 'error')
    } finally {
      setDeletingId(false)
    }
  }

  const leadCount   = clients.filter(c => c.status === 'LEAD').length
  const activeCount = clients.filter(c => c.status === 'ACTIVE').length

  async function handleExport(format: 'csv' | 'pdf', range: { from?: string; to?: string }, periodText: string) {
    setExporting(true)
    try {
      const params = new URLSearchParams({ limit: '5000' })
      if (range.from) params.set('from', range.from)
      if (range.to) params.set('to', range.to)
      const res = await fetch(`/api/clients?${params}`)
      if (!res.ok) throw new Error()
      const data: Client[] = await res.json()

      const headers = ['Nom', 'Téléphone', 'Email', 'Statut', 'Source', 'Tags', 'Dernier contact', 'Créé le']
      const rows = data.map(c => [
        c.name,
        c.phone ?? '',
        c.email ?? '',
        STATUS_LABELS[c.status] ?? c.status,
        c.source ?? '',
        (c.tags ?? []).join(', '),
        c.lastContactAt ? formatDate(c.lastContactAt) : '',
        formatDate(c.createdAt),
      ])

      if (format === 'csv') {
        downloadCSV(`clients_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows)
      } else {
        printAsPDF('Clients CRM', periodText, headers, rows)
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
          <h1 className="page-title">CRM Clients</h1>
          <p className="page-subtitle">{clients.length} client{clients.length !== 1 ? 's' : ''} · {leadCount} prospect{leadCount !== 1 ? 's' : ''} · {activeCount} actif{activeCount !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportPanel onExport={handleExport} includeAllOption exporting={exporting} />
          <button onClick={openAdd} className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Nouveau client
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B5C3] dark:text-[#5A5F6B]" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            className="input pl-9"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5">
          {['', ...STATUS_OPTIONS].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterStatus === s ? 'bg-[#0C0E12] dark:bg-[#1A56FF] text-white' : 'bg-white dark:bg-[#1A1D24] border border-[rgba(12,14,18,0.08)] dark:border-white/10 text-[#3A3D45] dark:text-[#9CA3AF] hover:bg-[#F7F8FA] dark:hover:bg-white/5'}`}
            >
              {s ? STATUS_LABELS[s] : 'Tous'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="w-full border-collapse">
          <thead className="table-header">
            <tr>
              {['Client','Téléphone','Email','Statut','Ajouté le',''].map(h => (
                <th key={h} className="th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({length: 5}).map((_, i) => <tr key={i}><td colSpan={6}><SkeletonRow /></td></tr>)
            ) : clients.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <div className="empty-icon">👥</div>
                    <div className="empty-title">{search ? 'Aucun résultat' : 'Aucun client pour l\'instant'}</div>
                    <div className="empty-desc mt-2">
                      {!search && <button onClick={openAdd} className="text-[#1A56FF] hover:underline">Ajouter votre premier client</button>}
                    </div>
                  </div>
                </td>
              </tr>
            ) : clients.map(c => (
              <tr key={c.id} className="tr-hover group">
                <td className="td">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 transition-transform group-hover:scale-105 ${avatarColor(c.name)}`}>
                      {initials(c.name)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0C0E12] dark:text-[#F1F2F4]">{c.name}</div>
                      {c.notes && <div className="text-xs text-[#B0B5C3] dark:text-[#5A5F6B] truncate max-w-[160px]">{c.notes}</div>}
                    </div>
                  </div>
                </td>
                <td className="td text-[#3A3D45] dark:text-[#9CA3AF]">{c.phone ?? '—'}</td>
                <td className="td text-[#3A3D45] dark:text-[#9CA3AF]">{c.email ?? '—'}</td>
                <td className="td">
                  <span className={`badge text-[10px] ${STATUS_COLORS[c.status] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {STATUS_LABELS[c.status] ?? c.status}
                  </span>
                </td>
                <td className="td text-[#7A7F8E] dark:text-[#9CA3AF]">{formatDate(c.createdAt)}</td>
                <td className="td">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => openEdit(c)} className="btn-icon" title="Modifier">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9.5 1.5l2 2L4 11H2v-2L9.5 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                    </button>
                    <button onClick={() => setDeleting(c)} className="btn-icon text-red-400 hover:text-red-500 hover:bg-red-50" title="Supprimer">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M5.5 6v3.5M7.5 6v3.5M3 3.5l.5 7a1 1 0 001 1h4a1 1 0 001-1l.5-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit modal */}
      <Modal open={showAdd || !!editing} onClose={closeModal} title={editing ? 'Modifier le client' : 'Nouveau client'}>
        <form onSubmit={saveClient} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] dark:text-[#9CA3AF] mb-1.5">Nom complet *</label>
            <input className="input" placeholder="Mohammed Alami" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] dark:text-[#9CA3AF] mb-1.5">Téléphone</label>
              <input className="input" placeholder="06 00 00 00 00" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] dark:text-[#9CA3AF] mb-1.5">Email</label>
              <input type="email" className="input" placeholder="email@exemple.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] dark:text-[#9CA3AF] mb-1.5">Statut</label>
            <select className="select" value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] dark:text-[#9CA3AF] mb-1.5">Notes</label>
            <textarea className="textarea" rows={3} placeholder="Notes, observations..." value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center">Annuler</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : (editing ? 'Mettre à jour' : 'Ajouter')}
            </button>
          </div>
        </form>
      </Modal>

      <Confirm
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Supprimer le client"
        message={`Êtes-vous sûr de vouloir supprimer ${deleting?.name} ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        danger
        loading={deletingId}
      />
    </div>
  )
}

'use client'
import { useState, useEffect, useCallback } from 'react'
import { formatDate, formatCurrency, STATUS_COLORS, STATUS_LABELS } from '@/lib/utils'
import { Modal } from '@/components/ui/modal'
import { Confirm } from '@/components/ui/confirm'
import { SkeletonTable } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'

interface Invoice {
  id: string
  number: string
  clientName: string
  amount: number
  description: string
  status: string
  dueDate?: string
  paidAt?: string
  createdAt: string
  client?: { id: string; name: string }
}

interface Client { id: string; name: string }

const STATUSES = ['DRAFT','SENT','PAID','OVERDUE'] as const
const EMPTY_FORM = { clientName: '', amount: '', description: '', status: 'DRAFT', dueDate: '' }

export default function FacturationPage() {
  const { toast } = useToast()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [deleting, setDeleting] = useState<Invoice | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(false)
  const [filterStatus, setFilterStatus] = useState('')

  const fetchInvoices = useCallback(async () => {
    const params = new URLSearchParams()
    if (filterStatus) params.set('status', filterStatus)
    const [invRes, cliRes] = await Promise.all([
      fetch(`/api/invoices?${params}`),
      fetch('/api/clients?limit=200'),
    ])
    if (invRes.ok) setInvoices(await invRes.json())
    if (cliRes.ok) setClients(await cliRes.json())
    setLoading(false)
  }, [filterStatus])

  useEffect(() => { fetchInvoices() }, [fetchInvoices])

  async function saveInvoice(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast('Facture créée', 'success')
      setShowAdd(false)
      setForm(EMPTY_FORM)
      fetchInvoices()
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Erreur', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function changeStatus(id: string, status: string) {
    const res = await fetch(`/api/invoices/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    if (res.ok) { toast('Statut mis à jour', 'success'); fetchInvoices() }
    else toast('Erreur', 'error')
  }

  async function confirmDelete() {
    if (!deleting) return
    setDeletingId(true)
    try {
      const res = await fetch(`/api/invoices/${deleting.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast('Facture supprimée', 'success')
      setDeleting(null)
      fetchInvoices()
    } catch {
      toast('Erreur', 'error')
    } finally {
      setDeletingId(false)
    }
  }

  const totalPaid    = invoices.filter(i => i.status === 'PAID').reduce((a, i) => a + i.amount, 0)
  const totalPending = invoices.filter(i => i.status !== 'PAID').reduce((a, i) => a + i.amount, 0)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Facturation</h1>
          <p className="page-subtitle">{invoices.length} facture{invoices.length !== 1 ? 's' : ''} · {formatCurrency(totalPaid)} encaissé</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Nouvelle facture
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Encaissé', value: formatCurrency(totalPaid), color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'En attente', value: formatCurrency(totalPending), color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Total factures', value: invoices.length.toString(), color: 'text-[#0C0E12]', bg: 'bg-[#F7F8FA]' },
          { label: 'Payées', value: invoices.filter(i => i.status === 'PAID').length.toString(), color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((s, i) => (
          <div key={i} className={`card p-4 flex items-center gap-3 ${s.bg}`}>
            <div>
              <div className="text-xs text-[#7A7F8E] font-medium mb-0.5">{s.label}</div>
              <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        {['', ...STATUSES].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterStatus === s ? 'bg-[#0C0E12] text-white' : 'bg-white border border-[rgba(12,14,18,0.08)] text-[#3A3D45] hover:bg-[#F7F8FA]'}`}
          >
            {s ? STATUS_LABELS[s] : 'Toutes'}
          </button>
        ))}
      </div>

      {loading ? <SkeletonTable rows={5} /> : (
        <div className="table-container">
          <table className="w-full border-collapse">
            <thead className="table-header">
              <tr>{['Numéro','Client','Montant','Description','Échéance','Statut',''].map(h => <th key={h} className="th">{h}</th>)}</tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="empty-state">
                    <div className="empty-icon">📄</div>
                    <div className="empty-title">Aucune facture</div>
                    <div className="empty-desc mt-2">
                      <button onClick={() => setShowAdd(true)} className="text-[#1A56FF] hover:underline">Créer votre première facture</button>
                    </div>
                  </div>
                </td></tr>
              ) : invoices.map(inv => (
                <tr key={inv.id} className="tr-hover">
                  <td className="td font-mono text-sm font-medium text-[#0C0E12]">{inv.number}</td>
                  <td className="td text-sm font-medium text-[#0C0E12]">{inv.clientName}</td>
                  <td className="td text-sm font-semibold text-[#0C0E12]">{formatCurrency(inv.amount)}</td>
                  <td className="td text-sm text-[#7A7F8E] max-w-[200px] truncate">{inv.description}</td>
                  <td className="td text-sm text-[#7A7F8E]">{inv.dueDate ? formatDate(inv.dueDate) : '—'}</td>
                  <td className="td">
                    <select
                      value={inv.status}
                      onChange={e => changeStatus(inv.id, e.target.value)}
                      className={`text-[10px] font-medium border rounded-full px-2 py-0.5 cursor-pointer outline-none appearance-none ${STATUS_COLORS[inv.status] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                  </td>
                  <td className="td">
                    <button onClick={() => setDeleting(inv)} className="btn-icon text-red-400 hover:text-red-500 hover:bg-red-50">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M5.5 6v3.5M7.5 6v3.5M3 3.5l.5 7a1 1 0 001 1h4a1 1 0 001-1l.5-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Nouvelle facture">
        <form onSubmit={saveInvoice} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Client *</label>
            <input
              className="input"
              list="client-list"
              placeholder="Nom du client..."
              value={form.clientName}
              onChange={e => setForm(f => ({...f, clientName: e.target.value}))}
              required
            />
            <datalist id="client-list">
              {clients.map(c => <option key={c.id} value={c.name} />)}
            </datalist>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Montant (DH) *</label>
              <input type="number" min="0" step="0.01" className="input" placeholder="500" value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Date d'échéance</label>
              <input type="date" className="input" value={form.dueDate} onChange={e => setForm(f => ({...f, dueDate: e.target.value}))} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Description *</label>
            <textarea className="textarea" rows={2} placeholder="Consultation médicale, prestation..." value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} required />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Statut</label>
            <select className="select" value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
              {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Annuler</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : 'Créer la facture'}
            </button>
          </div>
        </form>
      </Modal>

      <Confirm
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Supprimer la facture"
        message={`Supprimer la facture ${deleting?.number} de ${deleting?.clientName} ?`}
        confirmLabel="Supprimer"
        danger
        loading={deletingId}
      />
    </div>
  )
}

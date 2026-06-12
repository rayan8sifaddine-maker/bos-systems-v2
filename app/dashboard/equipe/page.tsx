'use client'
import { useState, useEffect, useCallback } from 'react'
import { initials, STATUS_LABELS, avatarColor } from '@/lib/utils'
import { Modal } from '@/components/ui/modal'
import { Confirm } from '@/components/ui/confirm'
import { useToast } from '@/components/ui/toast'

interface Member {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt: string
}

const ROLES = ['ADMIN','MANAGER','AGENT','VIEWER'] as const
const EMPTY_FORM = { name: '', email: '', role: 'AGENT' }

const ROLE_PERMS: Record<string, string[]> = {
  ADMIN:   ['Accès complet','Gestion équipe','Facturation','Paramètres'],
  MANAGER: ['CRM','Rendez-vous','Analytics','Communication'],
  AGENT:   ['CRM','Rendez-vous','Assistant IA'],
  VIEWER:  ['Dashboard lecture seule'],
}

export default function EquipePage() {
  const { toast } = useToast()
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [deleting, setDeleting] = useState<Member | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(false)

  const fetchMembers = useCallback(async () => {
    const res = await fetch('/api/team')
    if (res.ok) setMembers(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchMembers() }, [fetchMembers])

  async function saveMember(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/team', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast('Membre invité', 'success')
      setShowAdd(false)
      setForm(EMPTY_FORM)
      fetchMembers()
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Erreur', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function changeRole(id: string, role: string) {
    const res = await fetch(`/api/team/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role }) })
    if (res.ok) { toast('Rôle mis à jour', 'success'); fetchMembers() }
    else toast('Erreur', 'error')
  }

  async function confirmDelete() {
    if (!deleting) return
    setDeletingId(true)
    try {
      const res = await fetch(`/api/team/${deleting.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast('Membre retiré', 'success')
      setDeleting(null)
      fetchMembers()
    } catch {
      toast('Erreur', 'error')
    } finally {
      setDeletingId(false)
    }
  }

  const roleColors: Record<string, string> = {
    ADMIN: 'bg-red-50 text-red-700 border-red-200',
    MANAGER: 'bg-purple-50 text-purple-700 border-purple-200',
    AGENT: 'bg-blue-50 text-blue-700 border-blue-200',
    VIEWER: 'bg-gray-50 text-gray-600 border-gray-200',
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Équipe</h1>
          <p className="page-subtitle">{members.length} membre{members.length !== 1 ? 's' : ''} dans votre équipe</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Inviter un membre
        </button>
      </div>

      {/* Role overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {ROLES.map(r => {
          const count = members.filter(m => m.role === r).length
          return (
            <div key={r} className="card p-4">
              <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border mb-3 ${roleColors[r]}`}>
                {STATUS_LABELS[r]}
              </div>
              <div className="text-2xl font-bold text-[#0C0E12]">{count}</div>
              <div className="text-xs text-[#B0B5C3]">{ROLE_PERMS[r]?.[0]}</div>
            </div>
          )
        })}
      </div>

      {/* Members list */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="card p-4 h-16 skeleton" />)}
        </div>
      ) : (
        <div className="card overflow-hidden">
          {members.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <div className="empty-title">Votre équipe est vide</div>
              <div className="empty-desc mt-2">
                <button onClick={() => setShowAdd(true)} className="text-[#1A56FF] hover:underline">Inviter votre premier collaborateur</button>
              </div>
            </div>
          ) : members.map((m, i) => (
            <div key={m.id} className={`flex items-center gap-4 px-6 py-4 hover:bg-[#F7F8FA] transition-colors ${i < members.length - 1 ? 'border-b border-[rgba(12,14,18,0.04)]' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${avatarColor(m.name)}`}>
                {initials(m.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#0C0E12]">{m.name}</div>
                <div className="text-xs text-[#7A7F8E]">{m.email}</div>
              </div>
              <div className="hidden md:block">
                <div className="text-xs text-[#B0B5C3] mb-1">Permissions</div>
                <div className="flex gap-1">
                  {ROLE_PERMS[m.role]?.slice(0, 2).map(p => (
                    <span key={p} className="text-[10px] bg-[#F7F8FA] border border-[rgba(12,14,18,0.06)] rounded px-1.5 py-0.5 text-[#7A7F8E]">{p}</span>
                  ))}
                </div>
              </div>
              <select
                value={m.role}
                onChange={e => changeRole(m.id, e.target.value)}
                className={`text-[10px] font-semibold border rounded-full px-2.5 py-1 cursor-pointer outline-none appearance-none ${roleColors[m.role]}`}
              >
                {ROLES.map(r => <option key={r} value={r}>{STATUS_LABELS[r]}</option>)}
              </select>
              <button onClick={() => setDeleting(m)} className="btn-icon text-red-400 hover:text-red-500 hover:bg-red-50">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M5.5 6v3.5M7.5 6v3.5M3 3.5l.5 7a1 1 0 001 1h4a1 1 0 001-1l.5-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Role permissions reference */}
      <div className="card p-6 mt-6">
        <h3 className="text-sm font-semibold text-[#0C0E12] mb-4">Référentiel des rôles</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLES.map(r => (
            <div key={r}>
              <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border mb-2 ${roleColors[r]}`}>
                {STATUS_LABELS[r]}
              </div>
              <ul className="space-y-1">
                {ROLE_PERMS[r]?.map(p => (
                  <li key={p} className="flex items-center gap-1.5 text-xs text-[#3A3D45]">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 5-5" stroke="#1A56FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Inviter un collaborateur">
        <form onSubmit={saveMember} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Nom complet *</label>
            <input className="input" placeholder="Karim Benali" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Email *</label>
            <input type="email" className="input" placeholder="karim@votreclinique.ma" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#3A3D45] mb-1.5">Rôle</label>
            <select className="select" value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))}>
              {ROLES.map(r => <option key={r} value={r}>{STATUS_LABELS[r]} — {ROLE_PERMS[r]?.[0]}</option>)}
            </select>
          </div>
          <div className="p-3 bg-[#EEF2FF] rounded-xl text-xs text-[#1A56FF]">
            Un email d'invitation sera envoyé à cette adresse.
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Annuler</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : 'Envoyer l\'invitation'}
            </button>
          </div>
        </form>
      </Modal>

      <Confirm
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Retirer le membre"
        message={`Retirer ${deleting?.name} de votre équipe ?`}
        confirmLabel="Retirer"
        danger
        loading={deletingId}
      />
    </div>
  )
}

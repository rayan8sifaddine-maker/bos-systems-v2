'use client'
import { Modal } from './modal'

interface ConfirmProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
  loading?: boolean
}

export function Confirm({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirmer', danger = false, loading = false }: ConfirmProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="space-y-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${danger ? 'bg-red-50' : 'bg-amber-50'}`}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 6v4M9 13h.01M7.286 2.571L1.714 12A1.714 1.714 0 003.429 14.571h11.142A1.714 1.714 0 0016.286 12L10.714 2.57a1.714 1.714 0 00-2.857 0z" stroke={danger ? '#ef4444' : '#f59e0b'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#0C0E12] mb-1">{title}</h3>
          <p className="text-sm text-[#7A7F8E]">{message}</p>
        </div>
        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="btn-secondary flex-1 justify-center">Annuler</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 justify-center btn ${danger ? 'btn-danger' : 'btn-primary'}`}
          >
            {loading ? <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin"/> : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}

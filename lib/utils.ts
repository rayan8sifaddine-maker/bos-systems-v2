import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export function formatTime(date: Date | string) {
  return new Date(date).toLocaleTimeString('fr-FR', {
    hour: '2-digit', minute: '2-digit',
  })
}

export function formatDateTime(date: Date | string) {
  const d = new Date(date)
  return `${formatDate(d)} à ${formatTime(d)}`
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', minimumFractionDigits: 0 }).format(amount)
}

export function formatRelative(date: Date | string) {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "À l'instant"
  if (mins < 60) return `Il y a ${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `Il y a ${hrs}h`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `Il y a ${days}j`
  return formatDate(d)
}

export function initials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export function truncate(str: string, len: number) {
  return str.length > len ? str.slice(0, len) + '…' : str
}

// Status labels
export const STATUS_LABELS: Record<string, string> = {
  PENDING:   'En attente',
  CONFIRMED: 'Confirmé',
  CANCELED:  'Annulé',
  DONE:      'Terminé',
  NO_SHOW:   'Absent',
  LEAD:      'Prospect',
  ACTIVE:    'Actif',
  INACTIVE:  'Inactif',
  DRAFT:     'Brouillon',
  SENT:      'Envoyée',
  PAID:      'Payée',
  OVERDUE:   'En retard',
  ADMIN:     'Admin',
  MANAGER:   'Manager',
  AGENT:     'Agent',
  VIEWER:    'Lecteur',
}

// Status CSS class mappings using predefined badge classes
export const STATUS_BADGE: Record<string, string> = {
  PENDING:   'badge-pending',
  CONFIRMED: 'badge-confirmed',
  CANCELED:  'badge-canceled',
  DONE:      'badge-done',
  NO_SHOW:   'badge-noshow',
  LEAD:      'badge-lead',
  ACTIVE:    'badge-active',
  INACTIVE:  'badge-inactive',
  DRAFT:     'badge-inactive',
  SENT:      'badge-blue',
  PAID:      'badge-confirmed',
  OVERDUE:   'badge-canceled',
}

// Legacy alias
export const STATUS_COLORS: Record<string, string> = {
  PENDING:   'bg-amber-50 text-amber-700 border-amber-200',
  CONFIRMED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  CANCELED:  'bg-red-50 text-red-700 border-red-200',
  DONE:      'bg-blue-50 text-blue-700 border-blue-200',
  NO_SHOW:   'bg-gray-50 text-gray-600 border-gray-200',
  LEAD:      'bg-purple-50 text-purple-700 border-purple-200',
  ACTIVE:    'bg-emerald-50 text-emerald-700 border-emerald-200',
  INACTIVE:  'bg-gray-50 text-gray-600 border-gray-200',
  DRAFT:     'bg-gray-50 text-gray-600 border-gray-200',
  SENT:      'bg-blue-50 text-blue-700 border-blue-200',
  PAID:      'bg-emerald-50 text-emerald-700 border-emerald-200',
  OVERDUE:   'bg-red-50 text-red-700 border-red-200',
}

export function apiError(message: string, status = 500) {
  return Response.json({ error: message }, { status })
}

export function apiOk<T>(data: T, status = 200) {
  return Response.json(data, { status })
}

// Color palette for avatars
const AVATAR_COLORS = [
  'bg-violet-100 text-violet-700',
  'bg-sky-100 text-sky-700',
  'bg-emerald-100 text-emerald-700',
  'bg-orange-100 text-orange-700',
  'bg-pink-100 text-pink-700',
  'bg-[#EEF2FF] text-[#1A56FF]',
]

export function avatarColor(name: string) {
  const idx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length
  return AVATAR_COLORS[idx]
}

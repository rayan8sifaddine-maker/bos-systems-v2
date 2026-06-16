'use client'
import { useRef, useState } from 'react'

export type PeriodKey = 'today' | 'week' | 'month' | 'custom' | 'all'

interface PeriodOption {
  key: PeriodKey
  label: string
}

const DEFAULT_OPTIONS: PeriodOption[] = [
  { key: 'today', label: "Aujourd'hui" },
  { key: 'week', label: 'Cette semaine' },
  { key: 'month', label: 'Ce mois' },
  { key: 'custom', label: 'Plage personnalisée' },
]

/** Compute { from, to } ISO bounds (start of day / end of day) for a given period key. */
export function periodToRange(period: PeriodKey, customFrom: string, customTo: string): { from?: string; to?: string } {
  const now = new Date()
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
  const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)

  switch (period) {
    case 'today': {
      return { from: startOfDay(now).toISOString(), to: endOfDay(now).toISOString() }
    }
    case 'week': {
      const day = (now.getDay() + 6) % 7 // Monday = 0
      const monday = new Date(now)
      monday.setDate(now.getDate() - day)
      const sunday = new Date(monday)
      sunday.setDate(monday.getDate() + 6)
      return { from: startOfDay(monday).toISOString(), to: endOfDay(sunday).toISOString() }
    }
    case 'month': {
      const first = new Date(now.getFullYear(), now.getMonth(), 1)
      const last = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      return { from: startOfDay(first).toISOString(), to: endOfDay(last).toISOString() }
    }
    case 'custom': {
      return {
        from: customFrom ? startOfDay(new Date(customFrom)).toISOString() : undefined,
        to: customTo ? endOfDay(new Date(customTo)).toISOString() : undefined,
      }
    }
    case 'all':
    default:
      return {}
  }
}

export function periodLabel(period: PeriodKey, customFrom: string, customTo: string): string {
  switch (period) {
    case 'today': return "Aujourd'hui"
    case 'week': return 'Cette semaine'
    case 'month': return 'Ce mois'
    case 'custom': return customFrom || customTo ? `Du ${customFrom || '...'} au ${customTo || '...'}` : 'Plage personnalisée'
    case 'all': return 'Toutes les périodes'
    default: return ''
  }
}

/** Builds a CSV string from headers + rows and triggers a browser download. No npm dependency required. */
export function downloadCSV(filename: string, headers: string[], rows: (string | number)[][]) {
  const escape = (val: string | number) => {
    const s = String(val ?? '')
    if (/[",;\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }
  const lines = [headers.map(escape).join(';'), ...rows.map(r => r.map(escape).join(';'))]
  // BOM for Excel to correctly detect UTF-8 accents
  const csv = '﻿' + lines.join('\r\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * "PDF export" without any npm dependency: open a new window with a clean printable
 * HTML view (title, period, table, header/footer) and trigger window.print(). The user
 * then chooses "Save as PDF" in the browser's native print dialog. This is a standard,
 * dependency-free approach to generate PDFs client-side.
 */
export function printAsPDF(title: string, periodText: string, headers: string[], rows: (string | number)[][]) {
  const win = window.open('', '_blank', 'width=900,height=700')
  if (!win) return

  const escapeHtml = (s: string | number) =>
    String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const generatedAt = new Date().toLocaleString('fr-FR')

  win.document.write(`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #0C0E12; margin: 24px; }
  header { display: flex; align-items: baseline; justify-content: space-between; border-bottom: 2px solid #0C0E12; padding-bottom: 12px; margin-bottom: 16px; }
  header .brand { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; }
  header .meta { text-align: right; font-size: 12px; color: #555; }
  h1 { font-size: 16px; margin: 0 0 4px; }
  .period { font-size: 12px; color: #555; margin-bottom: 16px; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; vertical-align: top; }
  th { background: #f2f2f2; font-weight: 600; }
  tbody tr:nth-child(even) { background: #fafafa; }
  footer { margin-top: 24px; font-size: 10px; color: #888; text-align: center; }
  @media print {
    body { margin: 12mm; }
    header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    th { background: #eee !important; }
    tbody tr:nth-child(even) { background: #f7f7f7 !important; }
    @page { margin: 12mm; size: A4; }
  }
</style>
</head>
<body>
  <header>
    <div class="brand">BOS Systems</div>
    <div class="meta">Généré le ${escapeHtml(generatedAt)}</div>
  </header>
  <h1>${escapeHtml(title)}</h1>
  <div class="period">Période : ${escapeHtml(periodText)} — ${rows.length} résultat${rows.length !== 1 ? 's' : ''}</div>
  <table>
    <thead><tr>${headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
    <tbody>
      ${rows.map(r => `<tr>${r.map(c => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}
    </tbody>
  </table>
  <footer>BOS Systems — Document généré automatiquement</footer>
</body>
</html>`)
  win.document.close()
  win.focus()
  // Give the new window a moment to render before opening the print dialog.
  setTimeout(() => { win.print() }, 250)
}

interface ExportPanelProps {
  /** Called with the resolved from/to ISO bounds (undefined = no bound) once the user clicks an export action. */
  onExport: (format: 'csv' | 'pdf', range: { from?: string; to?: string }, periodText: string) => void
  /** Include the "Tous" (all) option, selected by default. Used for CRM clients. */
  includeAllOption?: boolean
  exporting?: boolean
}

export function ExportPanel({ onExport, includeAllOption, exporting }: ExportPanelProps) {
  const [open, setOpen] = useState(false)
  const [period, setPeriod] = useState<PeriodKey>(includeAllOption ? 'all' : 'today')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const options: PeriodOption[] = includeAllOption
    ? [{ key: 'all', label: 'Tous' }, ...DEFAULT_OPTIONS]
    : DEFAULT_OPTIONS

  function handleExport(format: 'csv' | 'pdf') {
    const range = periodToRange(period, customFrom, customTo)
    const text = periodLabel(period, customFrom, customTo)
    onExport(format, range, text)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)} className="btn-secondary" type="button">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v8M4 6.5L7 9.5L10 6.5M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Exporter
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 card-elevated p-4 z-20">
            <div className="text-xs font-semibold text-[#0C0E12] mb-2">Période</div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {options.map(o => (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => setPeriod(o.key)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${period === o.key ? 'bg-[#0C0E12] text-white' : 'bg-[#F7F8FA] border border-[rgba(12,14,18,0.08)] text-[#3A3D45] hover:bg-white'}`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            {period === 'custom' && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#3A3D45] mb-1">Début</label>
                  <input type="date" className="input h-9 text-xs" value={customFrom} onChange={e => setCustomFrom(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#3A3D45] mb-1">Fin</label>
                  <input type="date" className="input h-9 text-xs" value={customTo} onChange={e => setCustomTo(e.target.value)} />
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <button type="button" disabled={exporting} onClick={() => handleExport('csv')} className="btn-secondary flex-1 justify-center text-xs">
                Export CSV
              </button>
              <button type="button" disabled={exporting} onClick={() => handleExport('pdf')} className="btn-primary flex-1 justify-center text-xs">
                Export PDF
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

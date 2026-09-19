'use client'
import { useTheme } from '@/components/dashboard/theme-provider'

interface MobileHeaderProps {
  clinicName: string
}

export function MobileHeader({ clinicName }: MobileHeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="md:hidden flex items-center justify-between h-14 px-4 bg-white dark:bg-[#13151A] border-b border-[rgba(12,14,18,0.06)] dark:border-white/10 flex-shrink-0" style={{ boxShadow: '0 1px 0 rgba(12,14,18,0.04)' }}>
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-[#0C0E12] dark:bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white"/>
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity=".5"/>
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white"/>
          </svg>
        </div>
        <div>
          <div className="text-xs font-bold text-[#0C0E12] dark:text-white leading-tight">BOS Systems</div>
          <div className="text-[10px] text-[#7A7F8E] dark:text-[#5A5F6B] leading-tight truncate max-w-[140px]">{clinicName}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold text-emerald-700 dark:text-emerald-400" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          IA active
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Changer le thème"
          className="w-8 h-8 rounded-xl flex items-center justify-center text-[#7A7F8E] dark:text-[#9CA3AF] hover:bg-[#F7F8FA] dark:hover:bg-white/10 transition-colors"
        >
          {theme === 'dark' ? (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 9.5A6 6 0 016.5 2.5a6 6 0 106.999 6.999z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

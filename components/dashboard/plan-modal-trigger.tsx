'use client'
import { usePlanModal } from '@/components/dashboard/plan-modal-provider'

export function PlanModalTrigger({ className, children }: { className?: string; children: React.ReactNode }) {
  const { open } = usePlanModal()
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  )
}

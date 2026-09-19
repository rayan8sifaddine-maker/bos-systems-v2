import { randomBytes } from 'crypto'

export type Plan = 'STARTER' | 'PRO' | 'ENTERPRISE'

const PREFIXES: Record<Plan, string> = {
  STARTER: 'BSS',
  PRO: 'BSP',
  ENTERPRISE: 'BSE',
}

export const PLAN_LABELS: Record<Plan, string> = {
  STARTER: 'Starter',
  PRO: 'Pro',
  ENTERPRISE: 'Enterprise',
}

export const PLAN_PRICES: Record<Plan, string> = {
  STARTER: '749',
  PRO: '2 749',
  ENTERPRISE: '4 489',
}

export function generateKey(plan: Plan): string {
  const prefix = PREFIXES[plan]
  const segments = Array.from({ length: 4 }, () =>
    randomBytes(2).toString('hex').toUpperCase()
  )
  return `${prefix}-${segments.join('-')}`
}

export function getPlanFromKey(key: string): Plan | null {
  const upper = key.toUpperCase().trim()
  if (upper.startsWith('BSS-')) return 'STARTER'
  if (upper.startsWith('BSP-')) return 'PRO'
  if (upper.startsWith('BSE-')) return 'ENTERPRISE'
  return null
}

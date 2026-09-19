export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id }, select: { id: true } })
  if (!clinic) return NextResponse.json({ error: 'Clinique introuvable' }, { status: 404 })

  const rule = await prisma.automationRule.findFirst({ where: { id: params.id, clinicId: clinic.id } })
  if (!rule) return NextResponse.json({ error: 'Règle introuvable' }, { status: 404 })

  const body = await req.json()
  if (typeof body.enabled !== 'boolean') return NextResponse.json({ error: 'Paramètre invalide' }, { status: 422 })

  const updated = await prisma.automationRule.update({
    where: { id: params.id },
    data: { enabled: body.enabled },
  })

  const cfg = (updated.config ?? {}) as Record<string, unknown>
  return NextResponse.json({
    id: updated.id,
    name: updated.name,
    trigger: updated.trigger,
    action: updated.action,
    enabled: updated.enabled,
    runCount: updated.runCount,
    description: (cfg.description as string) ?? '',
    impact: (cfg.impact as string) ?? '',
    category: (cfg.category as string) ?? '',
    bg: (cfg.bg as string) ?? '#F3F4F6',
    color: (cfg.color as string) ?? '#6B7280',
  })
}

export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPlanFromKey, PLAN_LABELS } from '@/lib/license-keys'

export async function POST(req: Request) {
  try {
    const { key } = await req.json()
    if (!key || typeof key !== 'string') {
      return NextResponse.json({ error: 'Clé manquante.' }, { status: 400 })
    }

    const normalized = key.toUpperCase().trim()
    const plan = getPlanFromKey(normalized)
    if (!plan) {
      return NextResponse.json({ error: 'Format de clé invalide.' }, { status: 400 })
    }

    const record = await prisma.licenseKey.findUnique({ where: { key: normalized } })
    if (!record) {
      return NextResponse.json({ error: 'Clé introuvable ou invalide.' }, { status: 404 })
    }
    if (record.used) {
      return NextResponse.json({ error: 'Cette clé a déjà été utilisée.' }, { status: 409 })
    }

    return NextResponse.json({ valid: true, plan, label: PLAN_LABELS[plan] })
  } catch (e) {
    console.error('[validate-key]', e)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

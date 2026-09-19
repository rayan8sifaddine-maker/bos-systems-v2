export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateKey, getPlanFromKey, type Plan } from '@/lib/license-keys'

const VALID_PLANS: Plan[] = ['STARTER', 'PRO', 'ENTERPRISE']

export async function POST(req: Request) {
  try {
    const { plan } = await req.json()
    const planUpper = (plan as string)?.toUpperCase() as Plan

    if (!VALID_PLANS.includes(planUpper)) {
      return NextResponse.json({ error: 'Plan invalide.' }, { status: 400 })
    }

    const key = generateKey(planUpper)

    await prisma.licenseKey.create({
      data: { key, plan: planUpper },
    })

    return NextResponse.json({ key }, { status: 201 })
  } catch (e) {
    console.error('[checkout]', e)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

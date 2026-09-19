export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations'
import { ZodError } from 'zod'
import { getPlanFromKey, PLAN_LABELS } from '@/lib/license-keys'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { licenseKey, ...rest } = body
    const data = registerSchema.parse(rest)

    // Validate license key
    if (!licenseKey) {
      return NextResponse.json({ error: 'Clé de licence requise.' }, { status: 400 })
    }

    const normalizedKey = (licenseKey as string).toUpperCase().trim()
    const plan = getPlanFromKey(normalizedKey)
    if (!plan) {
      return NextResponse.json({ error: 'Format de clé invalide.' }, { status: 400 })
    }

    const keyRecord = await prisma.licenseKey.findUnique({ where: { key: normalizedKey } })
    if (!keyRecord) {
      return NextResponse.json({ error: 'Clé de licence introuvable.' }, { status: 404 })
    }
    if (keyRecord.used) {
      return NextResponse.json({ error: 'Cette clé a déjà été utilisée.' }, { status: 409 })
    }

    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé.' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(data.password, 12)

    const user = await prisma.user.create({
      data: { email: data.email, hashedPassword, name: data.clinicName },
    })

    const clinic = await prisma.clinic.create({
      data: {
        userId: user.id,
        name: data.clinicName,
        sector: data.sector,
        plan,
        // No trialEndsAt — they have a real plan via key
      },
    })

    // Mark key as used
    await prisma.licenseKey.update({
      where: { key: normalizedKey },
      data: { used: true, usedAt: new Date(), clinicId: clinic.id },
    })

    // Send welcome email (fire and forget)
    sendWelcomeEmail({ to: data.email, clinicName: data.clinicName, plan: PLAN_LABELS[plan] }).catch(() => {})

    return NextResponse.json({ message: 'Compte créé avec succès.' }, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json({ error: e.errors[0].message }, { status: 422 })
    }
    console.error('[register]', e)
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

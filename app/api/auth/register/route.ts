export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = registerSchema.parse(body)

    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé.' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(data.password, 12)
    const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)

    const user = await prisma.user.create({
      data: { email: data.email, hashedPassword, name: data.clinicName },
    })

    await prisma.clinic.create({
      data: {
        userId: user.id,
        name: data.clinicName,
        sector: data.sector,
        plan: 'STARTER',
        trialEndsAt,
      },
    })

    return NextResponse.json({ message: 'Compte créé avec succès.' }, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json({ error: e.errors[0].message }, { status: 422 })
    }
    console.error('[register]', e)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

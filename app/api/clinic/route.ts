export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { clinicUpdateSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  return NextResponse.json(clinic)
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  try {
    const body = await req.json()
    const data = clinicUpdateSchema.partial().parse(body)

    const updated = await prisma.clinic.update({
      where: { id: clinic.id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.sector && { sector: data.sector }),
        phone: data.phone !== undefined ? (data.phone || null) : undefined,
        email: data.email !== undefined ? (data.email || null) : undefined,
        address: data.address !== undefined ? (data.address || null) : undefined,
        ...(data.city && { city: data.city }),
        ...(data.hours && { hours: data.hours }),
        ...(data.price && { price: data.price }),
      },
    })

    return NextResponse.json(updated)
  } catch (e) {
    if (e instanceof ZodError) return NextResponse.json({ error: e.errors[0].message }, { status: 422 })
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

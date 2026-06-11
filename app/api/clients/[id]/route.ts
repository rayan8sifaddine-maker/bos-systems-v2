export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { clientSchema } from '@/lib/validations'
import { ZodError } from 'zod'

async function getClinicAndClient(userId: string, clientId: string) {
  const clinic = await prisma.clinic.findFirst({ where: { userId }, select: { id: true } })
  if (!clinic) return null
  const client = await prisma.client.findFirst({ where: { id: clientId, clinicId: clinic.id } })
  return client ? { clinicId: clinic.id, client } : null
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const result = await getClinicAndClient(session.user.id, params.id)
  if (!result) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: { appointments: { orderBy: { datetime: 'desc' }, take: 10 } },
  })

  return NextResponse.json(client)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const result = await getClinicAndClient(session.user.id, params.id)
  if (!result) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  try {
    const body = await req.json()
    const data = clientSchema.partial().parse(body)

    const updated = await prisma.client.update({
      where: { id: params.id },
      data: {
        ...(data.name && { name: data.name }),
        phone: data.phone !== undefined ? (data.phone || null) : undefined,
        email: data.email !== undefined ? (data.email || null) : undefined,
        ...(data.status && { status: data.status }),
        notes: data.notes !== undefined ? (data.notes || null) : undefined,
      },
    })

    return NextResponse.json(updated)
  } catch (e) {
    if (e instanceof ZodError) return NextResponse.json({ error: e.errors[0].message }, { status: 422 })
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const result = await getClinicAndClient(session.user.id, params.id)
  if (!result) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  await prisma.client.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Client supprimé' })
}

export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { appointmentSchema } from '@/lib/validations'
import { ZodError } from 'zod'

async function getOwned(userId: string, apptId: string) {
  const clinic = await prisma.clinic.findFirst({ where: { userId }, select: { id: true } })
  if (!clinic) return null
  const appt = await prisma.appointment.findFirst({ where: { id: apptId, clinicId: clinic.id } })
  return appt
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const appt = await getOwned(session.user.id, params.id)
  if (!appt) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  try {
    const body = await req.json()
    const data = appointmentSchema.partial().parse(body)

    const updated = await prisma.appointment.update({
      where: { id: params.id },
      data: {
        ...(data.patientName && { patientName: data.patientName }),
        phone: data.phone !== undefined ? (data.phone || null) : undefined,
        ...(data.datetime && { datetime: new Date(data.datetime) }),
        ...(data.type && { type: data.type }),
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

  const appt = await getOwned(session.user.id, params.id)
  if (!appt) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  await prisma.appointment.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'RDV supprimé' })
}

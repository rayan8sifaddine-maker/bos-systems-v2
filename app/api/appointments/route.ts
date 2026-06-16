export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { appointmentSchema } from '@/lib/validations'
import { ZodError } from 'zod'

async function getClinic(userId: string) {
  return prisma.clinic.findFirst({ where: { userId }, select: { id: true } })
}

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await getClinic(session.user.id)
  if (!clinic) return NextResponse.json({ error: 'Clinique introuvable' }, { status: 404 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') || ''
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500)

  const appointments = await prisma.appointment.findMany({
    where: {
      clinicId: clinic.id,
      ...(status && { status }),
      ...(from || to ? {
        datetime: {
          ...(from && { gte: new Date(from) }),
          ...(to && { lte: new Date(to) }),
        },
      } : {}),
    },
    orderBy: { datetime: 'asc' },
    take: limit,
    include: { client: { select: { id: true, name: true, status: true } } },
  })

  return NextResponse.json(appointments)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await getClinic(session.user.id)
  if (!clinic) return NextResponse.json({ error: 'Clinique introuvable' }, { status: 404 })

  try {
    const body = await req.json()
    const data = appointmentSchema.parse(body)

    let clientId = data.clientId || null
    if (!clientId) {
      const existing = data.phone
        ? await prisma.client.findFirst({ where: { clinicId: clinic.id, phone: data.phone } })
        : null
      const client = existing ?? await prisma.client.create({
        data: {
          clinicId: clinic.id,
          name: data.patientName,
          phone: data.phone || null,
          status: 'LEAD',
          source: 'RDV',
        },
      })
      clientId = client.id
    }

    const appointment = await prisma.appointment.create({
      data: {
        clinicId: clinic.id,
        patientName: data.patientName,
        phone: data.phone || null,
        datetime: new Date(data.datetime),
        type: data.type,
        status: data.status ?? 'PENDING',
        notes: data.notes || null,
        clientId,
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) return NextResponse.json({ error: e.errors[0].message }, { status: 422 })
    console.error('[appointments/POST]', e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

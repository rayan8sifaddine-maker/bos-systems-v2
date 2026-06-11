import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) return NextResponse.json({ error: 'Clinique introuvable' }, { status: 404 })
  const appointments = await prisma.appointment.findMany({
    where: { clinicId: clinic.id },
    orderBy: { datetime: 'asc' },
    include: { client: true },
  })
  return NextResponse.json(appointments)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) return NextResponse.json({ error: 'Clinique introuvable' }, { status: 404 })
  const { patientName, phone, datetime, type, notes } = await req.json()
  if (!patientName || !datetime) {
    return NextResponse.json({ error: 'Champs manquants.' }, { status: 400 })
  }
  const appointment = await prisma.appointment.create({
    data: { clinicId: clinic.id, patientName, phone, datetime: new Date(datetime), type: type || 'Consultation', notes },
  })
  return NextResponse.json(appointment, { status: 201 })
}

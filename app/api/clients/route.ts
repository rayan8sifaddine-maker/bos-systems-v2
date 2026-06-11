import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) return NextResponse.json({ error: 'Clinique introuvable' }, { status: 404 })
  const clients = await prisma.client.findMany({
    where: { clinicId: clinic.id },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(clients)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) return NextResponse.json({ error: 'Clinique introuvable' }, { status: 404 })
  const { name, phone, email, notes } = await req.json()
  if (!name) return NextResponse.json({ error: 'Nom requis.' }, { status: 400 })
  const client = await prisma.client.create({
    data: { clinicId: clinic.id, name, phone, email, notes },
  })
  return NextResponse.json(client, { status: 201 })
}

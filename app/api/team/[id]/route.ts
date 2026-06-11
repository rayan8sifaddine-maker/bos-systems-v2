export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function getOwned(userId: string, id: string) {
  const clinic = await prisma.clinic.findFirst({ where: { userId }, select: { id: true } })
  if (!clinic) return null
  return prisma.teamMember.findFirst({ where: { id, clinicId: clinic.id } })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const member = await getOwned(session.user.id, params.id)
  if (!member) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  const { role } = await req.json()
  const updated = await prisma.teamMember.update({ where: { id: params.id }, data: { role } })
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const member = await getOwned(session.user.id, params.id)
  if (!member) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  await prisma.teamMember.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Membre supprimé' })
}

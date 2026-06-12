export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function getOwned(userId: string, id: string) {
  const clinic = await prisma.clinic.findFirst({ where: { userId }, select: { id: true } })
  if (!clinic) return null
  return prisma.invoice.findFirst({ where: { id, clinicId: clinic.id } })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const inv = await getOwned(session.user.id, params.id)
  if (!inv) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  const { status } = await req.json()
  const updated = await prisma.invoice.update({
    where: { id: params.id },
    data: {
      status,
      ...(status === 'PAID' && { paidAt: new Date() }),
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const inv = await getOwned(session.user.id, params.id)
  if (!inv) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  await prisma.invoice.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Facture supprimée' })
}

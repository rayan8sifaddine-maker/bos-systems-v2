export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id }, select: { id: true } })
  if (!clinic) return NextResponse.json({ error: 'Clinique introuvable' }, { status: 404 })

  const { searchParams } = new URL(req.url)
  const since = searchParams.get('since')
  const sinceDate = since ? new Date(since) : new Date(0)

  const count = await prisma.message.count({
    where: {
      role: 'USER',
      createdAt: { gt: sinceDate },
      conversation: { clinicId: clinic.id },
    },
  })

  return NextResponse.json({ count })
}

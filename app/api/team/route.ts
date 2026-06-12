export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { teamMemberSchema } from '@/lib/validations'
import { ZodError } from 'zod'

async function getClinic(userId: string) {
  return prisma.clinic.findFirst({ where: { userId }, select: { id: true } })
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await getClinic(session.user.id)
  if (!clinic) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  const members = await prisma.teamMember.findMany({
    where: { clinicId: clinic.id },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(members)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await getClinic(session.user.id)
  if (!clinic) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  try {
    const body = await req.json()
    const data = teamMemberSchema.parse(body)

    const member = await prisma.teamMember.create({
      data: { clinicId: clinic.id, name: data.name, email: data.email, role: data.role },
    })

    return NextResponse.json(member, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) return NextResponse.json({ error: e.errors[0].message }, { status: 422 })
    if ((e as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Cet email est déjà membre de l\'équipe.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

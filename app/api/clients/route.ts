export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { clientSchema } from '@/lib/validations'
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
  const search = searchParams.get('q') || ''
  const status = searchParams.get('status') || ''
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 5000)

  const clients = await prisma.client.findMany({
    where: {
      clinicId: clinic.id,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(status && { status }),
      ...(from || to ? {
        createdAt: {
          ...(from && { gte: new Date(from) }),
          ...(to && { lte: new Date(to) }),
        },
      } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  return NextResponse.json(clients)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await getClinic(session.user.id)
  if (!clinic) return NextResponse.json({ error: 'Clinique introuvable' }, { status: 404 })

  try {
    const body = await req.json()
    const data = clientSchema.parse(body)

    const client = await prisma.client.create({
      data: {
        clinicId: clinic.id,
        name: data.name,
        phone: data.phone || null,
        email: data.email || null,
        status: data.status ?? 'LEAD',
        notes: data.notes || null,
      },
    })

    return NextResponse.json(client, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json({ error: e.errors[0].message }, { status: 422 })
    }
    console.error('[clients/POST]', e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

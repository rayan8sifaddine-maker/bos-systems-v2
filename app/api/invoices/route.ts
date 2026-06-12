export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { invoiceSchema } from '@/lib/validations'
import { ZodError } from 'zod'

async function getClinic(userId: string) {
  return prisma.clinic.findFirst({ where: { userId }, select: { id: true } })
}

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await getClinic(session.user.id)
  if (!clinic) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') || ''

  const invoices = await prisma.invoice.findMany({
    where: { clinicId: clinic.id, ...(status && { status }) },
    orderBy: { createdAt: 'desc' },
    include: { client: { select: { id: true, name: true } } },
    take: 100,
  })

  return NextResponse.json(invoices)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await getClinic(session.user.id)
  if (!clinic) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  try {
    const body = await req.json()
    const data = invoiceSchema.parse(body)

    // Auto-generate invoice number
    const count = await prisma.invoice.count({ where: { clinicId: clinic.id } })
    const number = `INV-${String(count + 1).padStart(4, '0')}`

    const invoice = await prisma.invoice.create({
      data: {
        clinicId: clinic.id,
        clientId: data.clientId || null,
        clientName: data.clientName,
        number,
        amount: data.amount,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    })

    return NextResponse.json(invoice, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) return NextResponse.json({ error: e.errors[0].message }, { status: 422 })
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id }, select: { id: true } })
  if (!clinic) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  const now = new Date()
  const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0)
  const todayEnd = new Date(now); todayEnd.setHours(23, 59, 59, 999)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

  const [
    totalClients,
    newClientsThisMonth,
    newClientsLastMonth,
    todayAppts,
    monthAppts,
    lastMonthAppts,
    confirmedThisMonth,
    noShowThisMonth,
    recentAppts,
    clientsByStatus,
    apptsByStatus,
  ] = await Promise.all([
    prisma.client.count({ where: { clinicId: clinic.id } }),
    prisma.client.count({ where: { clinicId: clinic.id, createdAt: { gte: monthStart } } }),
    prisma.client.count({ where: { clinicId: clinic.id, createdAt: { gte: lastMonthStart, lte: lastMonthEnd } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: todayStart, lte: todayEnd } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: monthStart } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: lastMonthStart, lte: lastMonthEnd } } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: monthStart }, status: 'CONFIRMED' } }),
    prisma.appointment.count({ where: { clinicId: clinic.id, datetime: { gte: monthStart }, status: 'NO_SHOW' } }),
    prisma.appointment.findMany({
      where: { clinicId: clinic.id, datetime: { gte: todayStart, lte: todayEnd } },
      orderBy: { datetime: 'asc' },
      take: 8,
    }),
    prisma.client.groupBy({ by: ['status'], where: { clinicId: clinic.id }, _count: true }),
    prisma.appointment.groupBy({ by: ['status'], where: { clinicId: clinic.id, datetime: { gte: monthStart } }, _count: true }),
  ])

  const noShowRate = monthAppts > 0 ? Math.round((noShowThisMonth / monthAppts) * 100) : 0
  const conversionRate = totalClients > 0
    ? Math.round((clientsByStatus.find(s => s.status === 'ACTIVE')?._count ?? 0) / totalClients * 100)
    : 0
  const clientGrowth = newClientsLastMonth > 0
    ? Math.round(((newClientsThisMonth - newClientsLastMonth) / newClientsLastMonth) * 100)
    : 0
  const apptGrowth = lastMonthAppts > 0
    ? Math.round(((monthAppts - lastMonthAppts) / lastMonthAppts) * 100)
    : 0

  return NextResponse.json({
    totalClients,
    newClientsThisMonth,
    clientGrowth,
    todayAppts,
    monthAppts,
    apptGrowth,
    confirmedThisMonth,
    noShowRate,
    conversionRate,
    recentAppts,
    clientsByStatus,
    apptsByStatus,
  })
}

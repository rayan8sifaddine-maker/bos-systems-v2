export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { clinicName, sector, email, password } = await req.json()
    if (!clinicName || !email || !password) {
      return NextResponse.json({ error: 'Champs manquants.' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Mot de passe trop court.' }, { status: 400 })
    }
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email déjà utilisé.' }, { status: 409 })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, hashedPassword, name: clinicName },
    })
    await prisma.clinic.create({
      data: { userId: user.id, name: clinicName, sector: sector || 'clinique' },
    })
    return NextResponse.json({ message: 'Compte créé.' }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

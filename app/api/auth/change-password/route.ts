export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { currentPassword, newPassword } = await req.json()
  if (!currentPassword || !newPassword) return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  if (newPassword.length < 8) return NextResponse.json({ error: 'Nouveau mot de passe trop court (min. 8 caractères).' }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user?.hashedPassword) return NextResponse.json({ error: 'Impossible de changer le mot de passe.' }, { status: 400 })

  const valid = await bcrypt.compare(currentPassword, user.hashedPassword)
  if (!valid) return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 401 })

  const hash = await bcrypt.hash(newPassword, 12)
  await prisma.user.update({ where: { id: session.user.id }, data: { hashedPassword: hash } })

  return NextResponse.json({ message: 'Mot de passe modifié avec succès.' })
}

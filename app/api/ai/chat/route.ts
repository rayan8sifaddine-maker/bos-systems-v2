export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const { message, history = [] } = await req.json()
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message requis.' }, { status: 400 })
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: 'Message trop long.' }, { status: 400 })
    }

    const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
    if (!clinic) return NextResponse.json({ error: 'Clinique introuvable.' }, { status: 404 })

    // Get real available slots (next 3 days with appointments)
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(0,0,0,0)
    const in3Days = new Date(); in3Days.setDate(in3Days.getDate() + 3); in3Days.setHours(23,59,59,999)

    const bookedSlots = await prisma.appointment.findMany({
      where: { clinicId: clinic.id, datetime: { gte: tomorrow, lte: in3Days }, status: { in: ['PENDING','CONFIRMED'] } },
      select: { datetime: true },
    })

    const bookedTimes = bookedSlots.map(a => a.datetime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }))
    const allSlots = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30']
    const available = allSlots.filter(s => !bookedTimes.includes(s)).slice(0, 5).join(', ')

    const system = `Tu es l'assistant IA de ${clinic.name}, situé à ${clinic.city}, Maroc.
Tu réponds aux clients via WhatsApp. Sois professionnel, chaleureux et concis (maximum 3-4 lignes).
Réponds TOUJOURS en français, ou dans la langue du client si nécessaire.
Horaires d'ouverture : ${clinic.hours}.
Tarif de consultation : ${clinic.price}.
Téléphone direct : ${clinic.phone || 'non renseigné'}.
Créneaux disponibles demain et après-demain : ${available || 'aucun créneau libre, proposer de rappeler'}.
Secteur : ${clinic.sector}.
Règles : Ne jamais inventer de prix ou horaires non listés. Pour les urgences médicales, toujours conseiller d'appeler le 15.`

    const messages = [
      ...history.slice(-10), // limit context window
      { role: 'user' as const, content: message.trim() },
    ]

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system,
      messages,
    })

    const reply = response.content[0].type === 'text' ? response.content[0].text : ''

    // Persist conversation
    let conv = await prisma.conversation.findFirst({ where: { clinicId: clinic.id, phone: 'web-demo' } })
    if (!conv) {
      conv = await prisma.conversation.create({ data: { clinicId: clinic.id, phone: 'web-demo', clientName: 'Démo Web' } })
    }
    await prisma.message.createMany({
      data: [
        { conversationId: conv.id, role: 'USER', content: message },
        { conversationId: conv.id, role: 'ASSISTANT', content: reply },
      ],
    })

    return NextResponse.json({ reply })
  } catch (e) {
    console.error('[ai/chat]', e)
    return NextResponse.json({ error: 'Erreur IA.' }, { status: 500 })
  }
}

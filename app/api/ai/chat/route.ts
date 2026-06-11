import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/prisma'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  try {
    const { message, clinicId, history = [] } = await req.json()
    if (!message || !clinicId) {
      return NextResponse.json({ error: 'Message et clinicId requis.' }, { status: 400 })
    }
    const clinic = await prisma.clinic.findUnique({ where: { id: clinicId } })
    if (!clinic) return NextResponse.json({ error: 'Clinique introuvable.' }, { status: 404 })

    const system = `Tu es l'assistant IA de ${clinic.name} a ${clinic.city}, Maroc.
Tu reponds aux clients via WhatsApp. Sois professionnel, chaleureux et concis (max 4 lignes).
Reponds TOUJOURS en francais.
Horaires : ${clinic.hours}. Tarif : ${clinic.price}. Tel : ${clinic.phone || 'non renseigne'}.
Creneaux disponibles : aujourd'hui 11h, 15h30 / demain 9h30, 14h, 16h30.
Si RDV demande : propose creneaux, confirme quand le patient choisit.`

    const messages = [
      ...history,
      { role: 'user' as const, content: message },
    ]

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system,
      messages,
    })

    const reply = response.content[0].type === 'text' ? response.content[0].text : ''

    // Save to DB
    let conv = await prisma.conversation.findFirst({ where: { clinicId, phone: 'web-demo' } })
    if (!conv) {
      conv = await prisma.conversation.create({ data: { clinicId, phone: 'web-demo' } })
    }
    await prisma.message.createMany({
      data: [
        { conversationId: conv.id, role: 'USER', content: message },
        { conversationId: conv.id, role: 'ASSISTANT', content: reply },
      ],
    })

    return NextResponse.json({ reply })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur IA.' }, { status: 500 })
  }
}

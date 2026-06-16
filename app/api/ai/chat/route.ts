export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')

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

    // Get real available slots (next 3 days)
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(0,0,0,0)
    const in3Days = new Date(); in3Days.setDate(in3Days.getDate() + 3); in3Days.setHours(23,59,59,999)

    const bookedSlots = await prisma.appointment.findMany({
      where: { clinicId: clinic.id, datetime: { gte: tomorrow, lte: in3Days }, status: { in: ['PENDING','CONFIRMED'] } },
      select: { datetime: true },
    })

    const bookedTimes = bookedSlots.map(a => a.datetime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }))
    const allSlots = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30']
    const available = allSlots.filter(s => !bookedTimes.includes(s)).slice(0, 5).join(', ')

    const systemPrompt = `Tu es l'assistant IA de ${clinic.name}, situé à ${clinic.city}, Maroc.
Tu réponds aux clients via WhatsApp. Sois professionnel, chaleureux et concis (maximum 3-4 lignes).
Réponds TOUJOURS en français, ou dans la langue du client si nécessaire.
Horaires d'ouverture : ${clinic.hours}.
Tarif de consultation : ${clinic.price}.
Téléphone direct : ${clinic.phone || 'non renseigné'}.
Créneaux disponibles demain et après-demain : ${available || 'aucun créneau libre pour le moment, proposer de rappeler'}.
Secteur : ${clinic.sector}.
Règles strictes : Ne jamais inventer de prix ou horaires non listés. Pour les urgences médicales, toujours conseiller d'appeler le 15.`

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-latest',
      systemInstruction: systemPrompt,
    })

    // Convert history to Gemini format
    const geminiHistory = history.slice(-10).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const chat = model.startChat({
      history: geminiHistory,
      generationConfig: { maxOutputTokens: 500, temperature: 0.7 },
    })

    const result = await chat.sendMessage(message.trim())
    const reply = result.response.text()

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
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[ai/chat]', msg)
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Clé GEMINI_API_KEY manquante dans les variables d\'environnement.' }, { status: 500 })
    }
    return NextResponse.json({ error: `Erreur IA : ${msg}` }, { status: 500 })
  }
}

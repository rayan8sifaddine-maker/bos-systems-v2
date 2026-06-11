export const dynamic = 'force-dynamic'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import WhatsAppChat from './chat'

export default async function WhatsAppPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')
  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) redirect('/inscription')
  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[#0C0E12]">Assistant IA</h1>
        <p className="text-sm text-[#7A7F8E] mt-1">Testez votre assistant IA — simulez une conversation patient</p>
      </div>
      <WhatsAppChat clinicId={clinic.id} clinicName={clinic.name} />
    </div>
  )
}

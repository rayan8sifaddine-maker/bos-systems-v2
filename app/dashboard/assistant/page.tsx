import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AssistantChat from './chat'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Assistant IA' }

export default async function AssistantPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) redirect('/inscription')

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 lg:px-8 py-5 border-b border-[rgba(12,14,18,0.06)] bg-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#0C0E12]">Assistant IA</h1>
            <p className="text-xs text-[#7A7F8E] mt-0.5">Simulez une conversation client · Propulsé par Claude AI</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            IA active
          </div>
        </div>
      </div>
      <AssistantChat clinicId={clinic.id} clinicName={clinic.name} clinicHours={clinic.hours} clinicPrice={clinic.price} />
    </div>
  )
}

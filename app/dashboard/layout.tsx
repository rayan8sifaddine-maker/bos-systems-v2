import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Sidebar } from '@/components/dashboard/sidebar'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) redirect('/inscription')

  return (
    <div className="flex h-screen bg-[#F7F8FA] overflow-hidden">
      <Sidebar clinicName={clinic.name} plan={clinic.plan} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

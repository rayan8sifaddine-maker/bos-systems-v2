import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function ParamsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')
  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id } })
  if (!clinic) redirect('/inscription')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[#0C0E12]">Paramètres</h1>
        <p className="text-sm text-[#7A7F8E] mt-1">Configuration de votre clinique</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-[#0C0E12] mb-5 pb-4 border-b border-[rgba(12,14,18,0.06)]">Profil clinique</h2>
          <div className="space-y-3">
            {[['Nom',clinic.name],['Secteur',clinic.sector],['Ville',clinic.city],['Horaires',clinic.hours],['Tarif',clinic.price],['Téléphone',clinic.phone||'—'],['Email',clinic.email||'—']].map(([l,v])=>(
              <div key={l} className="flex justify-between items-center py-2 border-b border-[rgba(12,14,18,0.04)] last:border-0">
                <span className="text-sm text-[#7A7F8E]">{l}</span>
                <span className="text-sm font-medium text-[#0C0E12]">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-[#0C0E12] mb-5 pb-4 border-b border-[rgba(12,14,18,0.06)]">Compte</h2>
          <div className="space-y-3">
            {[['Email',session.user.email||'—'],['Plan',clinic.plan],['Statut','Actif']].map(([l,v])=>(
              <div key={l} className="flex justify-between items-center py-2 border-b border-[rgba(12,14,18,0.04)] last:border-0">
                <span className="text-sm text-[#7A7F8E]">{l}</span>
                <span className={`text-sm font-medium ${l==='Statut'?'text-emerald-600':'text-[#0C0E12]'}`}>{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-[#EEF2FF] rounded-xl">
            <div className="text-sm font-medium text-[#1A56FF] mb-1">Pour modifier vos informations</div>
            <div className="text-xs text-[#3A3D45]">Contactez-nous à support@bossystems.ma</div>
          </div>
        </div>
      </div>
    </div>
  )
}

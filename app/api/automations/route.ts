export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const DEFAULTS = [
  {
    id: 'reminder_24h',
    name: 'Rappel J-1',
    trigger: 'APPOINTMENT_CONFIRMED',
    action: 'WHATSAPP_MESSAGE',
    config: {
      description: "Envoie un message WhatsApp automatiquement 24h avant chaque rendez-vous.",
      impact: "−78% d'absences",
      category: 'Rendez-vous',
      bg: '#ECFDF5',
      color: '#059669',
    },
    enabled: true,
  },
  {
    id: 'reminder_2h',
    name: 'Rappel 2h avant',
    trigger: 'APPOINTMENT_2H_BEFORE',
    action: 'WHATSAPP_MESSAGE',
    config: {
      description: 'Second rappel 2 heures avant le rendez-vous pour réduire les no-shows.',
      impact: 'Confirmation rapide',
      category: 'Rendez-vous',
      bg: '#FFF7ED',
      color: '#EA580C',
    },
    enabled: true,
  },
  {
    id: 'reactivation_30d',
    name: 'Relance 30 jours',
    trigger: 'CLIENT_INACTIVE_30D',
    action: 'WHATSAPP_MESSAGE',
    config: {
      description: 'Relance les clients inactifs depuis 30 jours pour reprendre rendez-vous.',
      impact: '+28% rétention',
      category: 'CRM',
      bg: '#EEF2FF',
      color: '#1A56FF',
    },
    enabled: true,
  },
  {
    id: 'welcome_new',
    name: 'Message de bienvenue',
    trigger: 'FIRST_APPOINTMENT_DONE',
    action: 'WHATSAPP_MESSAGE',
    config: {
      description: "Accueille automatiquement les nouveaux clients après leur premier RDV.",
      impact: 'Fidélisation',
      category: 'CRM',
      bg: '#F5F3FF',
      color: '#7C3AED',
    },
    enabled: false,
  },
  {
    id: 'birthday',
    name: 'Anniversaire client',
    trigger: 'CLIENT_BIRTHDAY',
    action: 'WHATSAPP_MESSAGE',
    config: {
      description: "Envoie un message personnalisé le jour de l'anniversaire du client.",
      impact: 'Engagement client',
      category: 'CRM',
      bg: '#FFF1F2',
      color: '#E11D48',
    },
    enabled: false,
  },
  {
    id: 'review_request',
    name: "Demande d'avis",
    trigger: 'APPOINTMENT_DONE',
    action: 'WHATSAPP_MESSAGE',
    config: {
      description: "Demande un avis client 24h après un rendez-vous terminé.",
      impact: 'Réputation',
      category: 'Satisfaction',
      bg: '#FFFBEB',
      color: '#D97706',
    },
    enabled: false,
  },
  {
    id: 'no_show_followup',
    name: 'Suivi no-show',
    trigger: 'APPOINTMENT_NO_SHOW',
    action: 'WHATSAPP_MESSAGE',
    config: {
      description: "Contacte automatiquement les clients qui n'ont pas honoré leur rendez-vous.",
      impact: 'Récupération',
      category: 'Rendez-vous',
      bg: '#F0F9FF',
      color: '#0284C7',
    },
    enabled: false,
  },
]

function formatRule(rule: { id: string; name: string; trigger: string; action: string; config: unknown; enabled: boolean; runCount: number }) {
  const cfg = (rule.config ?? {}) as Record<string, unknown>
  return {
    id: rule.id,
    name: rule.name,
    trigger: rule.trigger,
    action: rule.action,
    enabled: rule.enabled,
    runCount: rule.runCount,
    description: (cfg.description as string) ?? '',
    impact: (cfg.impact as string) ?? '',
    category: (cfg.category as string) ?? '',
    bg: (cfg.bg as string) ?? '#F3F4F6',
    color: (cfg.color as string) ?? '#6B7280',
  }
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clinic = await prisma.clinic.findFirst({ where: { userId: session.user.id }, select: { id: true } })
  if (!clinic) return NextResponse.json({ error: 'Clinique introuvable' }, { status: 404 })

  let rules = await prisma.automationRule.findMany({
    where: { clinicId: clinic.id },
    orderBy: { createdAt: 'asc' },
  })

  if (rules.length === 0) {
    // Seed defaults
    await prisma.automationRule.createMany({
      data: DEFAULTS.map(d => ({
        id: d.id + '_' + clinic.id,
        clinicId: clinic.id,
        name: d.name,
        trigger: d.trigger,
        action: d.action,
        config: d.config,
        enabled: d.enabled,
      })),
    })
    rules = await prisma.automationRule.findMany({
      where: { clinicId: clinic.id },
      orderBy: { createdAt: 'asc' },
    })
  }

  return NextResponse.json(rules.map(formatRule))
}

import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/components/ui/toast'

export const metadata: Metadata = {
  title: {
    default: 'BOS Systems — Le système des entreprises marocaines',
    template: '%s | BOS Systems',
  },
  description: 'Automatisez votre relation client avec l\'IA. Rendez-vous, rappels, WhatsApp — BOS Systems gère tout pour les entreprises marocaines.',
  keywords: ['CRM Maroc', 'gestion clinique', 'assistant IA WhatsApp', 'rendez-vous automatisés', 'entreprises marocaines'],
  openGraph: {
    title: 'BOS Systems — Le système des entreprises marocaines',
    description: 'La plateforme SaaS qui centralise et automatise votre relation client.',
    locale: 'fr_MA',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}

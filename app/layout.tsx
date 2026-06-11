import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'BOS Systems — Le système des PME marocaines', template: '%s | BOS Systems' },
  description: 'Automatisez votre relation client avec l\'IA. Rendez-vous, rappels, WhatsApp — BOS Systems gère tout.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

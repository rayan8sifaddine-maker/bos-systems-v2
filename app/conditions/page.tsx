import LegalLayout from '@/components/legal-layout'

export const metadata = { title: 'Conditions d\'utilisation — BOS Systems' }

export default function TermsPage() {
  return (
    <LegalLayout title="Conditions d'utilisation" updated="16 juin 2026">
      <section>
        <h2>1. Acceptation</h2>
        <p>En créant un compte sur BOS Systems, vous acceptez les présentes conditions. Si vous n&apos;êtes pas d&apos;accord, n&apos;utilisez pas le service.</p>
      </section>

      <section>
        <h2>2. Description du service</h2>
        <p>BOS Systems fournit un tableau de bord permettant de gérer les rendez-vous, les clients (CRM), la communication WhatsApp assistée par IA, les automatisations et les statistiques d&apos;activité d&apos;une entreprise.</p>
      </section>

      <section>
        <h2>3. Compte et responsabilités</h2>
        <ul>
          <li>Vous êtes responsable de l&apos;exactitude des informations fournies et de la confidentialité de votre mot de passe.</li>
          <li>Vous vous engagez à utiliser le service conformément à la loi, notamment concernant les données de vos propres clients.</li>
          <li>Toute utilisation frauduleuse ou abusive peut entraîner la suspension du compte.</li>
        </ul>
      </section>

      <section>
        <h2>4. Abonnement et facturation</h2>
        <p>L&apos;accès aux fonctionnalités payantes est soumis à un abonnement (Starter, Pro, Enterprise) décrit sur la page tarifs. Les tarifs peuvent évoluer, avec notification préalable des utilisateurs actifs.</p>
      </section>

      <section>
        <h2>5. Disponibilité</h2>
        <p>Nous nous efforçons d&apos;assurer une disponibilité continue du service, sans garantie absolue. Des interruptions ponctuelles peuvent survenir pour maintenance ou cas de force majeure.</p>
      </section>

      <section>
        <h2>6. Limitation de responsabilité</h2>
        <p>BOS Systems ne pourra être tenu responsable des dommages indirects résultant de l&apos;utilisation du service, notamment liés aux réponses générées par l&apos;assistant IA, qui doivent être vérifiées par l&apos;établissement pour les informations sensibles (urgences médicales, tarifs exacts, etc.).</p>
      </section>

      <section>
        <h2>7. Résiliation</h2>
        <p>Vous pouvez résilier votre abonnement à tout moment depuis les paramètres du compte. Nous pouvons suspendre ou résilier un compte en cas de violation manifeste de ces conditions.</p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>Pour toute question : <a className="text-[#1A56FF]" href="mailto:support@bossystems.ma">support@bossystems.ma</a>.</p>
      </section>
    </LegalLayout>
  )
}

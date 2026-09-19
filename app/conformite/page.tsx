import LegalLayout from '@/components/legal-layout'

export const metadata = { title: 'Conformité des données — BOS Systems' }

export default function CompliancePage() {
  return (
    <LegalLayout title="Conformité des données" updated="16 juin 2026">
      <section>
        <h2>1. Cadre légal</h2>
        <p>BOS Systems traite les données personnelles dans le respect de la loi marocaine n°09-08 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel, sous le contrôle de la Commission Nationale de contrôle de la protection des Données à caractère Personnel (CNDP).</p>
      </section>

      <section>
        <h2>2. Sécurité technique</h2>
        <ul>
          <li>Mots de passe stockés sous forme chiffrée (hash), jamais en texte clair.</li>
          <li>Connexions chiffrées (HTTPS/TLS) entre votre navigateur et nos serveurs.</li>
          <li>Base de données hébergée chez un fournisseur cloud avec chiffrement au repos et sauvegardes régulières.</li>
          <li>Accès aux données restreint par authentification et cloisonné par établissement (chaque clinique/garage/salon n&apos;accède qu&apos;à ses propres données).</li>
        </ul>
      </section>

      <section>
        <h2>3. Sous-traitants et hébergement</h2>
        <p>Nos données sont hébergées sur des infrastructures cloud reconnues (base de données PostgreSQL gérée). Les échanges WhatsApp passent par l&apos;API officielle WhatsApp Business, et les réponses de l&apos;assistant sont générées par un fournisseur d&apos;intelligence artificielle tiers, sans revente des contenus à des fins publicitaires.</p>
      </section>

      <section>
        <h2>4. Minimisation des données</h2>
        <p>Nous ne collectons que les données nécessaires au fonctionnement du service (identité du client, coordonnées, historique de rendez-vous et de messages). Aucune donnée sensible (santé détaillée, données bancaires) n&apos;est requise pour utiliser la plateforme.</p>
      </section>

      <section>
        <h2>5. Durée de conservation</h2>
        <p>Les données sont conservées pendant la durée de l&apos;abonnement, puis supprimées dans un délai raisonnable après la fermeture du compte, sauf obligation légale contraire.</p>
      </section>

      <section>
        <h2>6. Vos droits et demandes</h2>
        <p>Tout établissement utilisateur, ainsi que ses clients finaux, peut exercer ses droits d&apos;accès, de rectification ou de suppression des données le concernant en écrivant à <a className="text-[#1A56FF]" href="mailto:support@bossystems.ma">support@bossystems.ma</a>. Nous répondons dans un délai raisonnable.</p>
      </section>

      <section>
        <h2>7. Signalement d&apos;incident</h2>
        <p>En cas de faille de sécurité affectant des données personnelles, nous nous engageons à informer les établissements concernés dans les meilleurs délais et à prendre les mesures correctives nécessaires.</p>
      </section>
    </LegalLayout>
  )
}

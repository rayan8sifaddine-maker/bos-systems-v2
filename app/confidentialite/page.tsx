import LegalLayout from '@/components/legal-layout'

export const metadata = { title: 'Politique de confidentialité — BOS Systems' }

export default function PrivacyPage() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="16 juin 2026">
      <section>
        <h2>1. Qui sommes-nous</h2>
        <p>BOS Systems (« BOS », « nous ») édite une plateforme SaaS destinée aux entreprises marocaines (cliniques, garages, salons, écoles, restaurants) pour automatiser la relation client via WhatsApp, l&apos;agenda et le CRM. Cette politique explique quelles données nous collectons, pourquoi, et comment elles sont protégées.</p>
      </section>

      <section>
        <h2>2. Données que nous collectons</h2>
        <ul>
          <li>Données de compte : nom de l&apos;établissement, secteur, email, mot de passe (chiffré), téléphone, ville, adresse.</li>
          <li>Données clients de nos utilisateurs : nom, téléphone, historique de rendez-vous et de messages, saisis par l&apos;établissement ou échangés via WhatsApp.</li>
          <li>Données techniques : adresse IP, type de navigateur, journaux de connexion, à des fins de sécurité et de débogage.</li>
        </ul>
      </section>

      <section>
        <h2>3. Pourquoi nous les utilisons</h2>
        <ul>
          <li>Faire fonctionner le service (rendez-vous, rappels automatiques, assistant IA, CRM, analytics).</li>
          <li>Sécuriser les comptes et prévenir les usages abusifs.</li>
          <li>Améliorer le produit (statistiques d&apos;usage agrégées et anonymisées).</li>
          <li>Vous contacter pour le support ou des informations relatives au service.</li>
        </ul>
      </section>

      <section>
        <h2>4. Partage des données</h2>
        <p>Nous ne vendons aucune donnée. Elle peut être partagée uniquement avec des sous-traitants techniques nécessaires au fonctionnement du service (hébergement de la base de données, envoi de messages WhatsApp, intelligence artificielle utilisée pour générer les réponses), sous engagement de confidentialité, ou si la loi nous y oblige.</p>
      </section>

      <section>
        <h2>5. Conservation et sécurité</h2>
        <p>Les données sont conservées tant que votre compte est actif, puis supprimées dans un délai raisonnable après la clôture du compte, sauf obligation légale de conservation. Elles sont hébergées sur des infrastructures chiffrées et l&apos;accès est restreint aux personnes autorisées.</p>
      </section>

      <section>
        <h2>6. Vos droits</h2>
        <p>Conformément à la loi marocaine n°09-08 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel, vous pouvez à tout moment demander l&apos;accès, la rectification, l&apos;opposition ou la suppression de vos données en écrivant à <a className="text-[#1A56FF]" href="mailto:support@bossystems.ma">support@bossystems.ma</a>.</p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>Pour toute question relative à cette politique : <a className="text-[#1A56FF]" href="mailto:support@bossystems.ma">support@bossystems.ma</a>.</p>
      </section>
    </LegalLayout>
  )
}

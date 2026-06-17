export interface SectorUseCase { title: string; desc: string }
export interface SectorTestimonial { name: string; role: string; quote: string; initials: string; color: string }

export interface Sector {
  slug: string
  name: string
  shortDesc: string
  tagline: string
  intro: string
  color: string
  bg: string
  icon: JSX.Element
  painPoints: string[]
  useCases: SectorUseCase[]
  recommendedPlan: 'Starter' | 'Pro' | 'Enterprise'
  planReason: string
  altPlan?: { name: string; reason: string }
  stat: { value: string; label: string }
  testimonial?: SectorTestimonial
}

export const SECTORS: Sector[] = [
  {
    slug: 'cliniques',
    name: 'Cliniques',
    shortDesc: 'Médecins & cabinets',
    tagline: 'L\'assistant qui ne rate plus jamais un patient',
    intro: 'Entre les consultations, le téléphone qui sonne et les rendez-vous notés à la main, beaucoup de cabinets perdent des patients sans même s\'en rendre compte. BOS répond à votre place sur WhatsApp, organise votre planning et relance automatiquement vos patients.',
    color: '#1A56FF',
    bg: '#EEF2FF',
    icon: <svg width="28" height="28" viewBox="0 0 22 22" fill="none"><path d="M3 9.5L11 2l8 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 21v-7h6v7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    painPoints: [
      'Appels manqués pendant les consultations',
      'Rendez-vous oubliés et taux d\'absentéisme élevé',
      'Dossiers patients dispersés entre carnet et Excel',
      'Aucune visibilité sur le flux de patients de la semaine',
    ],
    useCases: [
      { title: 'Prise de RDV 24/7 sur WhatsApp', desc: 'Vos patients réservent un créneau même en dehors des heures d\'ouverture, sans attendre que quelqu\'un décroche.' },
      { title: 'Rappels automatiques J-1 et 2h avant', desc: 'Réduisez les rendez-vous manqués grâce à des rappels envoyés automatiquement, sans intervention de votre secrétariat.' },
      { title: 'Historique patient centralisé', desc: 'Chaque échange, chaque rendez-vous et chaque note est conservé dans une fiche client unique, consultable en un clic.' },
      { title: 'Relance des patients inactifs', desc: 'BOS identifie les patients qui n\'ont pas pris de rendez-vous depuis longtemps et les relance automatiquement.' },
    ],
    recommendedPlan: 'Pro',
    planReason: 'Pour un cabinet avec plusieurs praticiens et un volume de rendez-vous soutenu, le plan Pro offre des conversations illimitées, un CRM complet et des relances automatiques essentielles pour fidéliser vos patients.',
    altPlan: { name: 'Starter', reason: 'Pour un médecin seul avec un volume de patients modéré, le plan Starter couvre déjà l\'essentiel : prise de RDV, rappels et CRM de base.' },
    stat: { value: '−78%', label: 'd\'absences grâce aux rappels automatiques' },
    testimonial: { name: 'Dr. Youssef Bennani', role: 'Dermatologue, Casablanca', quote: 'Depuis BOS, je ne reçois plus d\'appels manqués. L\'IA répond, planifie et rappelle mes patients. J\'ai récupéré 2h par jour.', initials: 'YB', color: 'bg-blue-100 text-blue-600' },
  },
  {
    slug: 'garages',
    name: 'Garages',
    shortDesc: 'Auto & mécanique',
    tagline: 'Remplissez votre atelier, pas votre carnet papier',
    intro: 'Entre les révisions, les devis et les clients qui appellent pour savoir où en est leur voiture, le suivi papier devient vite ingérable. BOS prend les rendez-vous, envoie les rappels de révision et garde l\'historique complet de chaque véhicule.',
    color: '#D97706',
    bg: '#FFFBEB',
    icon: <svg width="28" height="28" viewBox="0 0 22 22" fill="none"><rect x="2" y="8" width="18" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8V6a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="1.5"/><circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="15" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
    painPoints: [
      'Rendez-vous pris au téléphone et oubliés',
      'Clients qui ne reviennent pas pour leur révision',
      'Aucun historique des interventions par véhicule',
      'Temps perdu à répondre aux mêmes questions sur les délais',
    ],
    useCases: [
      { title: 'Prise de RDV pour révisions et réparations', desc: 'Vos clients choisissent un créneau directement sur WhatsApp, sans passer par le téléphone.' },
      { title: 'Rappel automatique de révision', desc: 'BOS relance vos clients au bon moment selon la date de leur dernier passage, pour qu\'ils reviennent naturellement.' },
      { title: 'Suivi par véhicule', desc: 'Chaque client et son véhicule sont enregistrés avec l\'historique des interventions passées.' },
      { title: 'Réponses automatiques sur les délais', desc: 'L\'IA renseigne vos clients sur les disponibilités et délais courants, sans interrompre vos mécaniciens.' },
    ],
    recommendedPlan: 'Starter',
    planReason: 'Pour un garage indépendant, le plan Starter couvre la prise de rendez-vous, les rappels de révision et un CRM de base — l\'essentiel pour ne plus perdre de clients.',
    altPlan: { name: 'Pro', reason: 'Pour une chaîne de garages avec plusieurs techniciens, le plan Pro ajoute des conversations illimitées et un CRM complet multi-utilisateurs.' },
    stat: { value: '+35%', label: 'de taux de retour pour révision' },
    testimonial: { name: 'Farid Alaoui', role: 'Directeur, Garage Elite Rabat', quote: 'Mes clients reçoivent des rappels automatiques pour les révisions. Le taux de retour a augmenté de 35% en 3 mois.', initials: 'FA', color: 'bg-amber-100 text-amber-600' },
  },
  {
    slug: 'salons',
    name: 'Salons',
    shortDesc: 'Beauté & coiffure',
    tagline: 'Une secrétaire virtuelle qui ne dort jamais',
    intro: 'Les demandes de rendez-vous arrivent à toute heure — le soir, le dimanche, pendant que vous avez les mains prises. BOS répond instantanément sur WhatsApp, gère votre planning et rappelle vos clientes pour limiter les créneaux perdus.',
    color: '#7C3AED',
    bg: '#F5F3FF',
    icon: <svg width="28" height="28" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    painPoints: [
      'Demandes de RDV reçues en dehors des heures d\'ouverture',
      'Créneaux annulés à la dernière minute sans remplacement',
      'Clientes fidèles qu\'on oublie de relancer',
      'Temps perdu entre deux clientes à répondre aux messages',
    ],
    useCases: [
      { title: 'Réservation instantanée 24/7', desc: 'Vos clientes réservent un créneau à tout moment, même quand le salon est fermé.' },
      { title: 'Rappel avant le rendez-vous', desc: 'Réduisez les no-shows avec un rappel automatique envoyé la veille et quelques heures avant.' },
      { title: 'Relance fidélisation', desc: 'BOS relance automatiquement les clientes inactives pour les inciter à reprendre rendez-vous.' },
      { title: 'Réponses rapides sur les prestations', desc: 'L\'IA répond aux questions fréquentes sur les services et tarifs, même quand vous êtes occupée.' },
    ],
    recommendedPlan: 'Starter',
    planReason: 'Pour un salon avec une ou deux praticiennes, le plan Starter suffit largement : prise de RDV automatique, rappels et CRM basique pour suivre vos clientes.',
    stat: { value: '24/7', label: 'de disponibilité pour vos clientes' },
  },
  {
    slug: 'ecoles',
    name: 'Écoles',
    shortDesc: 'Formation & éducation',
    tagline: 'De la demande d\'inscription au suivi, tout est automatisé',
    intro: 'Les centres de formation reçoivent des dizaines de demandes d\'information chaque semaine, souvent répétitives. BOS qualifie les prospects automatiquement, organise les rendez-vous d\'inscription et vous donne une vision claire du nombre d\'inscrits.',
    color: '#7C3AED',
    bg: '#F5F3FF',
    icon: <svg width="28" height="28" viewBox="0 0 22 22" fill="none"><path d="M4 17l4-8 3 4 3-6 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>,
    painPoints: [
      'Dizaines de demandes d\'information répétitives chaque semaine',
      'Prospects qui ne reçoivent jamais de réponse à temps',
      'Aucune vision claire du nombre d\'inscrits ni du chiffre d\'affaires',
      'Suivi des familles dispersé entre appels et messages',
    ],
    useCases: [
      { title: 'Qualification automatique des prospects', desc: 'L\'IA répond aux demandes d\'information sur les formations, horaires et tarifs, et identifie les prospects sérieux.' },
      { title: 'Prise de RDV d\'inscription', desc: 'Planifiez automatiquement les rendez-vous de visite ou d\'inscription, sans aller-retour téléphonique.' },
      { title: 'Tableau de bord des inscriptions', desc: 'Suivez en temps réel le nombre de prospects, d\'inscrits et le chiffre d\'affaires généré.' },
      { title: 'Relance des familles indécises', desc: 'BOS relance automatiquement les prospects qui n\'ont pas finalisé leur inscription.' },
    ],
    recommendedPlan: 'Pro',
    planReason: 'Pour un centre de formation avec plusieurs filières et un volume important de demandes, le plan Pro offre des conversations illimitées et des analytics avancés pour piloter les inscriptions.',
    stat: { value: '100%', label: 'des demandes qualifiées automatiquement' },
    testimonial: { name: 'Salma Chraibi', role: 'Directrice, École Innovate', quote: 'Le tableau de bord me donne une vision complète. Je sais exactement combien d\'inscrits, de prospects, et ce que ça représente en CA.', initials: 'SC', color: 'bg-violet-100 text-violet-600' },
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    shortDesc: 'Restauration & livraison',
    tagline: 'Réservations gérées par IA, sans réceptionniste',
    intro: 'Le soir, en plein coup de feu, personne n\'a le temps de répondre au téléphone pour une réservation. BOS prend les réservations sur WhatsApp, confirme les tables disponibles et répond aux questions sur le menu et les horaires.',
    color: '#EF4444',
    bg: '#FEF2F2',
    icon: <svg width="28" height="28" viewBox="0 0 22 22" fill="none"><path d="M3 6h16l-1.5 9H4.5L3 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 6l-1-3M8 6V4M14 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="14" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>,
    painPoints: [
      'Téléphone impossible à gérer pendant le service',
      'Réservations doubles ou mal notées',
      'Questions répétitives sur le menu, les horaires et les allergènes',
      'Aucun suivi des clients réguliers',
    ],
    useCases: [
      { title: 'Réservation de table par WhatsApp', desc: 'Vos clients réservent directement, même pendant le coup de feu, sans déranger votre équipe en salle.' },
      { title: 'Confirmation et rappel automatiques', desc: 'Réduisez les no-shows avec une confirmation immédiate et un rappel avant le service.' },
      { title: 'Réponses sur le menu et les horaires', desc: 'L\'IA répond aux questions fréquentes — menu, allergènes, horaires d\'ouverture — à toute heure.' },
      { title: 'Suivi des clients réguliers', desc: 'Identifiez vos habitués et envoyez-leur des offres ou rappels personnalisés.' },
    ],
    recommendedPlan: 'Starter',
    planReason: 'Pour un restaurant indépendant, le plan Starter couvre la prise de réservation, les rappels et les réponses automatiques aux questions fréquentes.',
    altPlan: { name: 'Pro', reason: 'Pour une chaîne avec plusieurs établissements, le plan Pro permet de gérer des volumes de réservation plus importants avec plusieurs utilisateurs.' },
    stat: { value: '<3s', label: 'de temps de réponse moyen' },
  },
]

export function getSector(slug: string) {
  return SECTORS.find(s => s.slug === slug)
}

export function Marquee() {
  const items = [
    'Assistant IA WhatsApp',
    'Agenda intelligent',
    'Rappels automatiques',
    'CRM complet',
    'Analytics temps réel',
    'Relances clients',
    'Automatisations',
    'Gestion d\'équipe',
    'Multi-secteurs',
    'Support darija',
  ]
  const repeated = [...items, ...items, ...items, ...items]
  return (
    <div className="overflow-hidden py-4 border-y border-[rgba(12,14,18,0.06)] bg-white select-none">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-7 mx-0 text-[13px] font-medium text-[#C0C4CE]">
            {item}
            <span className="w-1 h-1 rounded-full bg-[#DDE0E8] inline-block flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}

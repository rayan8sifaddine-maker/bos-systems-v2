export function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group bg-white border border-[rgba(12,14,18,0.07)] rounded-2xl px-6 py-1 transition-all duration-200 open:border-[rgba(26,86,255,0.2)] open:shadow-[0_8px_24px_rgba(12,14,18,0.06)]">
      <summary className="flex items-center justify-between gap-4 py-4 text-sm font-semibold text-[#0C0E12] select-none">
        {question}
        <span className="faq-chevron flex-shrink-0 w-7 h-7 rounded-full bg-[#F7F8FA] group-open:bg-[#EEF2FF] group-open:text-[#1A56FF] flex items-center justify-center text-[#7A7F8E]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </summary>
      <p className="text-sm text-[#7A7F8E] leading-relaxed pb-5 pr-10">{answer}</p>
    </details>
  )
}

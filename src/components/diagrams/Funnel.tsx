/**
 * Diagram: How design authority works
 * Left pills (inputs) → funnel (triage) → right cards (outputs).
 * Recreates deck slide 5.
 */
export default function Funnel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Inputs */}
      <div className="md:col-span-4 flex flex-col gap-3">
        {['Workstream A', 'Workstream B', 'External body', 'Programme board'].map((input) => (
          <div key={input} className="border border-navy rounded-full px-6 py-3 text-center bg-white">
            <span className="text-[15px] font-medium text-navy">{input}</span>
          </div>
        ))}
      </div>

      {/* Funnel SVG */}
      <div className="md:col-span-4 flex flex-col items-center">
        <p className="text-[13px] font-semibold text-navy mb-3 text-center">All design & service decisions</p>
        <svg viewBox="0 0 220 200" className="w-full max-w-[240px] h-auto" aria-hidden="true">
          <polygon points="10,10 210,10 130,140 90,140" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="90" y="140" width="40" height="50" fill="none" stroke="var(--navy)" strokeWidth="2" />
          <text x="110" y="80" textAnchor="middle" fill="var(--navy)" fontSize="14" fontWeight="700" fontFamily="Inter">Design authority</text>
          <text x="110" y="98" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="Inter">The triage point</text>
          <line x1="90" y1="115" x2="130" y2="115" stroke="var(--accent)" strokeWidth="2" />
        </svg>
      </div>

      {/* Outputs */}
      <div className="md:col-span-4 flex flex-col gap-3">
        {[
          { title: 'Decide and log', sub: 'We make the call and record it.' },
          { title: 'Hold and flag', sub: 'Conflicts with active delivery.' },
          { title: 'Escalate with recommendation', sub: 'Route to the appropriate board.' },
        ].map((out) => (
          <div key={out.title} className="border border-navy rounded-lg px-4 py-3 bg-white">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
              <div>
                <p className="text-[15px] font-semibold text-navy leading-snug">{out.title}</p>
                <p className="text-[13px] text-muted mt-0.5">{out.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

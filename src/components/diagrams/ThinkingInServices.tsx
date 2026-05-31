/**
 * Diagram: Thinking in teams vs Thinking in services
 * Recreates deck slide 2. Two side-by-side panels.
 */
export default function ThinkingInServices() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* LEFT — Thinking in teams */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-7 h-7 rounded-full border border-accent flex items-center justify-center text-[12px] font-semibold text-accent">A</span>
          <span className="text-[15px] font-semibold text-navy">Thinking in teams</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {['Admissions', 'IT', 'Accommodation', 'Finance'].map((team) => (
            <div key={team} className="bg-white border border-navy rounded-lg py-12 flex items-center justify-center">
              <span className="text-[16px] font-semibold text-navy">{team}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider on desktop */}
      <div className="hidden lg:block absolute" aria-hidden="true" />

      {/* RIGHT — Thinking in services */}
      <div className="lg:border-l lg:border-border lg:pl-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-7 h-7 rounded-full border border-accent flex items-center justify-center text-[12px] font-semibold text-accent">B</span>
          <span className="text-[15px] font-semibold text-navy">Thinking in services</span>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            {['Admissions', 'IT', 'Accommodation', 'Finance'].map((team) => (
              <div key={team} className="bg-white border border-border rounded-lg py-12 flex items-center justify-center">
                <span className="text-[16px] font-semibold text-navy opacity-50">{team}</span>
              </div>
            ))}
          </div>
          {/* Journey line overlay */}
          <svg viewBox="0 0 400 40" className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-10 pointer-events-none" preserveAspectRatio="none">
            <line x1="20" y1="20" x2="380" y2="20" stroke="var(--accent)" strokeWidth="2" />
            <polygon points="380,20 372,16 372,24" fill="var(--accent)" />
            {[40, 140, 260, 360].map((cx) => (
              <circle key={cx} cx={cx} cy="20" r="5" fill="var(--accent)" />
            ))}
          </svg>
          <div className="grid grid-cols-4 gap-2 absolute left-0 right-0 top-1/2 -translate-y-[230%] text-[11px] font-medium text-navy uppercase tracking-wider pointer-events-none">
            <span className="text-left pl-2">Apply</span>
            <span className="text-center">Offer</span>
            <span className="text-center">Enrol</span>
            <span className="text-right pr-2">Arrive</span>
          </div>
        </div>
      </div>
    </div>
  )
}

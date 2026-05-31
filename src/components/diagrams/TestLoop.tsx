/**
 * Diagram: Test before you commit
 * Circular loop of Prototype/Test/Learn/Refine with breakout to "Commit resource".
 * Recreates deck slide 7.
 */
export default function TestLoop() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
      {/* Loop */}
      <div className="relative w-[360px] h-[280px]">
        <svg viewBox="0 0 360 280" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <circle cx="180" cy="140" r="100" fill="none" stroke="var(--navy)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          <text x="180" y="135" textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="600" fontFamily="Inter" letterSpacing="0.1em">REPEAT UNTIL</text>
          <text x="180" y="152" textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="600" fontFamily="Inter" letterSpacing="0.1em">CONFIDENT</text>
        </svg>
        {/* Top: Prototype */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white border border-navy rounded-md px-5 py-2.5">
          <span className="text-[15px] font-semibold text-navy">Prototype</span>
        </div>
        {/* Right: Test */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-white border border-navy rounded-md px-5 py-2.5">
          <span className="text-[15px] font-semibold text-navy">Test</span>
        </div>
        {/* Bottom: Learn */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border border-navy rounded-md px-5 py-2.5">
          <span className="text-[15px] font-semibold text-navy">Learn</span>
        </div>
        {/* Left: Refine */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-white border border-navy rounded-md px-5 py-2.5">
          <span className="text-[15px] font-semibold text-navy">Refine</span>
        </div>
      </div>

      {/* Arrow + commit */}
      <div className="flex items-center gap-4">
        <svg width="48" height="20" viewBox="0 0 48 20" className="text-accent" aria-hidden="true">
          <line x1="0" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="2" />
          <polygon points="48,10 38,5 38,15" fill="currentColor" />
        </svg>
        <div className="border-2 border-accent rounded-md px-6 py-3 bg-white">
          <span className="text-[16px] font-semibold text-navy">Commit resource</span>
        </div>
      </div>
    </div>
  )
}

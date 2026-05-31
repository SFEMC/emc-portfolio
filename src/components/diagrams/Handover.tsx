/**
 * Diagram: Build for the future
 * Two cards — DURING (navy) and AFTER (white) — with a CLEAN HANDOVER arrow between.
 * Recreates deck slide 8.
 */
export default function Handover() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-stretch">
      {/* DURING — navy card */}
      <div className="bg-navy rounded-lg p-8 flex flex-col">
        <p className="text-accent text-[12px] font-semibold tracking-[0.18em] uppercase mb-4">During</p>
        <h3 className="text-white text-[24px] font-bold mb-3">Our engagement</h3>
        <p className="text-white/75 text-[15px] leading-relaxed">
          We design the operating model, blueprint journeys, write principles and lead delivery, coaching your teams alongside the work.
        </p>
      </div>

      {/* Arrow */}
      <div className="flex md:flex-col items-center justify-center gap-3 py-4 md:py-0">
        <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
        <p className="text-accent text-[11px] font-semibold tracking-[0.18em] uppercase text-center">Clean<br className="hidden md:block" /> handover</p>
      </div>

      {/* AFTER — white card */}
      <div className="bg-white border border-border rounded-lg p-8 flex flex-col">
        <p className="text-accent text-[12px] font-semibold tracking-[0.18em] uppercase mb-4">After</p>
        <h3 className="text-navy text-[24px] font-bold mb-3">Your capability</h3>
        <p className="text-muted text-[15px] leading-relaxed">
          A trained successor holds the role. The principles, artefacts and methodology stay with your institution and keep working.
        </p>
      </div>
    </div>
  )
}

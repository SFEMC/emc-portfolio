/**
 * Diagram: The gap
 * Three layers — strategy band, dashed empty middle, delivery band.
 * Recreates deck slide 3.
 */
export default function TheGap() {
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      {/* Top navy band */}
      <div className="bg-navy rounded-lg px-8 py-6 flex items-center justify-between">
        <span className="text-white font-semibold text-[18px]">Strategy and governance</span>
        <span className="text-white/60 text-[14px] hidden sm:block">Boards, committees, strategic direction</span>
      </div>

      {/* Middle — dashed gold outline */}
      <div className="text-center">
        <p className="eyebrow inline-flex mb-3">Nobody holds this view</p>
      </div>
      <div className="border-2 border-dashed border-accent rounded-lg px-8 py-6 flex items-center justify-between">
        <span className="text-accent font-semibold text-[18px]">The service and system view</span>
        <span className="text-muted text-[14px] hidden sm:block">No owner. Problems repeat. Conflicts surface too late.</span>
      </div>

      {/* Bottom navy band */}
      <div className="bg-navy rounded-lg px-8 py-6 flex items-center justify-between">
        <span className="text-white font-semibold text-[18px]">Workstream delivery</span>
        <span className="text-white/60 text-[14px] hidden sm:block">Project teams, sprint cadences, technical build</span>
      </div>
    </div>
  )
}

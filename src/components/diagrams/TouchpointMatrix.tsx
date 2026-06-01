/**
 * Touchpoint matrix — Design Authority Section 2 diagram.
 *
 * Service blueprint style: stage columns across the top, team rows down
 * the side, gold dots at intersections where a stage touches that team.
 *
 * Below the matrix: navy support-processes band showing the enabling
 * functions (governance, policy, training, capability, data, reporting)
 * that span every stage of the journey.
 *
 * Read as an illustration. Real client maps are bespoke.
 */

const stages = ['Apply', 'Offer', 'Compliance', 'Enrol', 'Pre-arrival', 'Arrive'] as const

interface Team {
  name: string
  sub?: string
  touches: number[]
}

const teams: Team[] = [
  { name: 'Marketing & lead', touches: [0] },
  { name: 'Student recruitment', touches: [0, 1] },
  { name: 'Application support', touches: [0, 1] },
  { name: 'Application routes', sub: 'UCAS, DfE, direct', touches: [0, 1] },
  { name: 'Admissions', touches: [0, 1, 2, 3] },
  { name: 'Academic programmes', touches: [0, 1, 4, 5] },
  { name: 'Compliance', sub: 'DBS, visa, fit to study', touches: [1, 2, 3, 4] },
  { name: 'Finance / fees', touches: [1, 3] },
  { name: 'Student records / Registry', touches: [3, 5] },
  { name: 'IT / Digital services', touches: [3, 4, 5] },
  { name: 'Accreditation bodies', touches: [2, 3] },
  { name: 'Partner institutions', touches: [0, 1, 2, 3, 4, 5] },
  { name: 'Accommodation', touches: [4, 5] },
  { name: 'Welcome / induction', touches: [5] },
  { name: 'Library / learning services', touches: [4, 5] },
]

export default function TouchpointMatrix() {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--grey-text)] mb-4">
        One student journey · many teams
      </p>

      {/* Matrix — horizontally scrollable on narrow screens */}
      <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
        <div className="min-w-[820px]" data-reveal-stagger>
          {/* Header row */}
          <div
            className="grid bg-navy text-white rounded-t-md"
            style={{ gridTemplateColumns: '220px repeat(6, minmax(0, 1fr))' }}
          >
            <div className="h-12" />
            {stages.map((s) => (
              <div key={s} className="h-12 flex items-center justify-center px-2">
                <span className="text-[12px] font-semibold tracking-[0.14em] uppercase">{s}</span>
              </div>
            ))}
          </div>

          {/* Team rows */}
          <div className="border-l border-r border-b border-[color:var(--border-card)] bg-white rounded-b-md">
            {teams.map((team, rowIdx) => (
              <div
                key={team.name}
                data-reveal
                className="grid border-b border-[color:var(--border-light)] last:border-b-0"
                style={{ gridTemplateColumns: '220px repeat(6, minmax(0, 1fr))' }}
              >
                {/* Team label */}
                <div className="px-5 py-3 border-r border-[color:var(--border-light)] flex flex-col justify-center">
                  <span className="text-[13px] font-semibold text-navy leading-snug">{team.name}</span>
                  {team.sub && (
                    <span className="text-[11px] italic text-[var(--grey-text)] mt-0.5">{team.sub}</span>
                  )}
                </div>
                {/* Stage cells */}
                {stages.map((_, colIdx) => (
                  <div
                    key={colIdx}
                    className="flex items-center justify-center py-3 border-r last:border-r-0 border-[color:var(--border-light)]"
                  >
                    {team.touches.includes(colIdx) && (
                      <span
                        className="block w-[10px] h-[10px] rounded-full bg-[var(--gold)]"
                        aria-label={`${team.name} touches ${stages[colIdx]}`}
                      />
                    )}
                  </div>
                ))}
                {/* Subtle row index to help debug — invisible */}
                <span className="sr-only">{rowIdx}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support processes band — runs under the matrix, full width */}
      <div className="bg-navy rounded-md p-7 mt-6" data-reveal>
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--gold)] mb-3 flex items-center gap-3">
          <span className="inline-block w-8 h-[2px] bg-[var(--gold)]" />
          Support processes
        </p>
        <p className="text-white text-[16px] md:text-[18px] font-semibold leading-snug">
          Governance &nbsp;·&nbsp; Policy &nbsp;·&nbsp; Training &nbsp;·&nbsp; Capability &nbsp;·&nbsp; Data systems &nbsp;·&nbsp; Reporting and dashboards
        </p>
        <p className="text-[#A9B4C6] text-[13px] mt-2">
          Underpins every stage of the journey.
        </p>
      </div>

      {/* Caption */}
      <p className="italic text-[var(--grey-text)] text-[13px] leading-relaxed mt-5 max-w-3xl">
        Illustrative only. Every university has its own version of this map. Different teams, different stages, different touchpoints. We build the real one with you. The point is the same: no single team owns the journey end to end.
      </p>
    </div>
  )
}

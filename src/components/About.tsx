const orgs = [
  'DEFRA',
  'HM Land Registry',
  'Plymouth Marjon University',
  'Public Digital',
  'GDS Service Standard',
]

export default function About() {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow mb-4">About</p>
          <h2 className="font-display text-[36px] md:text-[44px] leading-[1.05] tracking-tight text-ink font-medium">
            Practical, honest, hands-on.
          </h2>
        </div>

        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <div className="space-y-6 text-[17px] text-ink-soft leading-relaxed">
            <p>
              I design and deliver public-facing services across government and higher education. I research user needs, map the end-to-end journey across every channel and handoff, build blueprints and deliver through to live.
            </p>
            <p>
              I also work upstream. Before blueprints and technology, I help leadership teams define roles, governance and decision-making structures. An operating model built on unclear ownership will fail. So will any service blueprint built on top of it.
            </p>
            <p>
              I spend as much time with frontline staff and users as I do with leadership teams. The people closest to the work see what breaks first. I work across both levels because they depend on each other.
            </p>
          </div>

          <div
            className="mt-10 pt-8 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="eyebrow mb-5">Credentials shaped by</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {orgs.map((org) => (
                <span key={org} className="text-[15px] font-medium text-ink">
                  {org}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

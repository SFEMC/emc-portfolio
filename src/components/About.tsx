const orgs = [
  'DEFRA',
  'HM Land Registry',
  'Plymouth Marjon University',
  'Public Digital',
  'GDS',
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
              I embed inside your team. I do not consult from a distance or hand over a report and leave.
            </p>
            <p>
              I start with the people doing the work: your staff, your users, your partners. I learn how teams operate, find where services break down and map the whole journey from the outside in.
            </p>
            <p>
              From there I run discoveries, write user stories, design processes and build governance. I stay through delivery, working alongside your team to move things from alpha through to live.
            </p>
            <p>
              I work in the open. You see findings as they emerge, challenge the thinking and shape the direction. By the time we reach delivery, your team owns the solution because they helped build it.
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

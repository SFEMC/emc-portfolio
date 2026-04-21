const principles = [
  {
    n: '01',
    title: 'Start with user needs',
    body: 'Every piece of work begins with the people on the receiving end. Staff, users, partners. I sit with them before I touch the system.',
  },
  {
    n: '02',
    title: 'Map the whole service',
    body: 'Services break down between teams, not inside them. I cover every channel, handoff and touchpoint from first contact to outcome.',
  },
  {
    n: '03',
    title: 'Test before you build',
    body: 'Prototype cheaply. Run small pilots. Work in the open so stakeholders steer early. Scale what evidence shows to work.',
  },
  {
    n: '04',
    title: 'Build capability as you go',
    body: 'I do not leave a PowerPoint and a handshake. I embed in your team, coach as I work and make sure the change stays when I leave.',
  },
]

export default function Principles() {
  return (
    <section
      className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="grid grid-cols-12 gap-6 mb-14">
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow mb-4">How I work</p>
          <h2 className="font-display text-[36px] md:text-[44px] leading-[1.05] tracking-tight text-ink font-medium">
            Principles, not a playbook.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6 flex items-end">
          <p className="text-[17px] text-ink-soft leading-relaxed">
            Pulled from experience across public sector delivery.
          </p>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        {principles.map((p, i) => (
          <div
            key={p.n}
            className="py-10 md:py-12 md:px-8 relative group"
            style={{
              borderBottom: '1px solid var(--border)',
              borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div className="flex items-start gap-8">
              <span
                className="font-display text-[22px] md:text-[28px] font-medium leading-none pt-1"
                style={{ color: 'var(--accent)' }}
              >
                {p.n}
              </span>
              <div className="flex-1">
                <h3 className="font-display text-[22px] md:text-[26px] font-medium text-ink leading-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-[16px] text-ink-soft leading-relaxed max-w-md">
                  {p.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

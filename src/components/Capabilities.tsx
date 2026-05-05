const capabilities = [
  {
    title: 'Strategy & Organisational Design',
    body: 'Operating models, governance, roles and decision-making structures. I help leadership teams set the foundations before anyone redesigns a service.',
  },
  {
    title: 'Service Design',
    body: 'User research, journey mapping, blueprinting and end-to-end redesign. I find where services break for the people using them and rebuild around what they need.',
  },
  {
    title: 'Product & Delivery',
    body: 'Roadmaps, backlogs and multidisciplinary teams. I take services from discovery through to live and keep teams moving across organisational boundaries.',
  },
  {
    title: 'Stakeholder & Change',
    body: 'I work inside your organisation and build capability as I go. I coach, work in the open and make sure change lands with the people it affects.',
  },
]

export default function Capabilities() {
  return (
    <section
      className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="grid grid-cols-12 gap-6 mb-14">
        <div className="col-span-12 md:col-span-5">
          <p className="eyebrow mb-4">What I bring</p>
          <h2 className="font-display text-[36px] md:text-[44px] leading-[1.05] tracking-tight text-ink font-medium">
            Senior-level expertise, no consultancy layers.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'var(--border)' }}>
        {capabilities.map((cap) => (
          <div
            key={cap.title}
            className="p-8 md:p-10 transition-colors hover:bg-bg-elevated"
            style={{ background: 'var(--bg)' }}
          >
            <h3 className="font-display text-[22px] md:text-[26px] font-medium text-ink leading-tight mb-4">
              {cap.title}
            </h3>
            <p className="text-[16px] text-ink-soft leading-relaxed max-w-md">
              {cap.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

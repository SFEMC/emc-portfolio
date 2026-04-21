const capabilities = [
  {
    title: 'Product & Delivery',
    body: 'I take services from discovery through to live. I own the roadmap, run the backlog and keep multidisciplinary teams moving across organisational boundaries.',
    tools: ['Jira', 'Azure DevOps', 'Confluence'],
  },
  {
    title: 'Service Design',
    body: 'I map how your service works today, find where it breaks down and redesign it around the people who use it. User research, journey mapping, blueprinting.',
    tools: ['FigJam', 'Lucid', 'GOV.UK Prototype Kit'],
  },
  {
    title: 'Stakeholder & Change',
    body: 'I embed inside your organisation and build capability as I go. I coach teams, manage upwards and make sure change lands with the people it affects.',
    tools: ['Workshops', 'Show-and-tells', 'Coaching'],
  },
  {
    title: 'Technical Delivery',
    body: 'I write the requirements, shape the solution and bridge the gap between technical teams and the business. I get hands-on with whatever tooling the organisation uses.',
    tools: ['Salesforce', 'Power Automate', 'SharePoint'],
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
            <p className="text-[16px] text-ink-soft leading-relaxed mb-6 max-w-md">
              {cap.body}
            </p>
            <div className="flex flex-wrap gap-2">
              {cap.tools.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

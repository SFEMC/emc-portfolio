const engagements = [
  {
    org: 'Plymouth Marjon University',
    role: 'Consultant - Design Authority',
    dates: '2025 — Present',
    headline: 'Service-led transformation.',
    teaser: 'Design authority across Marjon\'s 2030 transformation. I shape the future operating model, service landscape and digital estate. Running admissions discovery and piloting a digital partner application route for May 2026.',
    tags: ['Design authority', 'Operating model', 'Service design', 'Digital estate'],
    sector: 'Higher Education',
  },
  {
    org: 'Department for Environment, Food & Rural Affairs',
    role: 'Consultant - Product and Service Design',
    dates: '2023 — 2025',
    headline: 'A high-risk cross-border programme from inception to live.',
    teaser: 'End-to-end service design and delivery of the £10m+ Windsor Framework Pet Travel Scheme, across UK Government, port operations and the EU. Projected to support 150,000 users in its first year.',
    tags: ['GDS Service Standard', 'GOV.UK Prototype Kit', 'Jira', 'Confluence'],
    sector: 'Central Government',
  },
  {
    org: 'HM Land Registry',
    role: 'Apprentice → Product Owner',
    dates: '2016 — 2023',
    headline: 'Raised the issues. Owned the fix.',
    teaser: 'Seven years moving through the organisation into product ownership, delivering transformation that unlocked automation at scale across 7,000 staff. Team won the RITA (Real Innovation Technology Award) for driving a 40% improvement in operational efficiency.',
    tags: ['Transformation delivery', 'Product ownership', 'Agile delivery', 'RITA award'],
    sector: 'Central Government',
  },
]

export default function Experience() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      {/* Header */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-10">
          <p className="eyebrow mb-6">Experience</p>
          <h1 className="font-display text-[44px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-tight text-ink font-medium mb-8">
            Ten years delivering digital products and services in the public sector.
          </h1>
          <p className="text-[18px] md:text-[19px] text-ink-soft leading-relaxed max-w-2xl">
            A quick tour of where I've been and what I've shipped. Get in touch if you'd like to walk through any of it.
          </p>
        </div>
      </div>

      {/* Engagement list */}
      <div
        className="border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        {engagements.map((e) => (
          <article
            key={e.org}
            className="grid grid-cols-12 gap-6 py-12 md:py-16 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="col-span-12 md:col-span-3">
              <p className="eyebrow mb-2">{e.dates}</p>
              <p className="text-[14px] text-muted mb-1">{e.sector}</p>
              <p className="text-[14px] text-ink-soft">{e.role}</p>
            </div>

            <div className="col-span-12 md:col-span-9">
              <p className="text-[14px] text-muted mb-3">
                {'orgUrl' in e && e.orgUrl ? (
                  <a
                    href={e.orgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    {e.org}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                  </a>
                ) : (
                  e.org
                )}
              </p>
              <h2 className="font-display text-[28px] md:text-[36px] font-medium text-ink leading-tight mb-5">
                {e.headline}
              </h2>
              <p className="text-[16px] md:text-[17px] text-ink-soft leading-relaxed mb-6 max-w-2xl">
                {e.teaser}
              </p>
              <div className="flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>

          </article>
        ))}
      </div>

      {/* Discuss */}
      <div
        className="mt-20 pt-16 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <p className="eyebrow mb-4">Want the detail?</p>
            <h2 className="font-display text-[32px] md:text-[40px] leading-tight tracking-tight text-ink font-medium mb-6">
              Happy to talk you through any of it.
            </h2>
            <p className="text-[17px] text-ink-soft leading-relaxed max-w-xl mb-8">
              I can walk through the constraints, what worked, what did not and what I would do differently. A thirty minute call usually covers it.
            </p>
            <a href="mailto:Samuel.Field@eddystonemersey.com" className="btn-primary">
              Set up a call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

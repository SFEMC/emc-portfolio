const engagements = [
  {
    org: 'Plymouth Marjon University',
    role: 'Consultant, Service Design and Delivery',
    dates: '2025 — Present',
    headline: 'Transformation delivery through service thinking.',
    teaser: 'Discovery across admissions, interim solution delivery and a fully digital partner application route designed, built and piloted for May 2026.',
    tags: ['Service design', 'Salesforce', 'Power Automate', 'SharePoint'],
    sector: 'Higher Education',
  },
  {
    org: 'Department for Environment, Food & Rural Affairs',
    role: 'Product Owner',
    dates: '2023 — 2025',
    headline: 'A high-risk cross-border programme from inception to live.',
    teaser: 'End-to-end service design and delivery across UK Government, port operations and the EU for the Windsor Framework Pet Travel Scheme.',
    tags: ['GDS Service Standard', 'GOV.UK Prototype Kit', 'Jira', 'Confluence'],
    sector: 'Central Government',
  },
  {
    org: 'HM Land Registry',
    role: 'Apprentice → Product Owner',
    dates: '2016 — 2023',
    headline: 'Earning every step: apprentice to product owner.',
    teaser: 'Seven years moving through the organisation into product ownership, delivering UI enhancements that unlocked automation at scale across 7,000 staff.',
    tags: ['Azure DevOps', 'Business analysis', 'Agile delivery'],
    sector: 'Central Government',
  },
]

export default function Experience() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      {/* Header */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-10">
          <p className="eyebrow mb-6">Case studies</p>
          <h1 className="font-display text-[44px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-tight text-ink font-medium mb-8">
            Ten years of public service delivery.
          </h1>
          <p className="text-[18px] md:text-[19px] text-ink-soft leading-relaxed max-w-2xl">
            Detailed case studies for each engagement are in the works. For now, here's the shape of the work. Get in touch if you'd like to dig into any of it.
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

            <div className="col-span-12 md:col-span-7">
              <p className="text-[14px] text-muted mb-3">{e.org}</p>
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

            <div className="col-span-12 md:col-span-2 flex md:justify-end items-start">
              <span
                className="text-[12px] font-medium tracking-wider uppercase px-3 py-1.5 rounded-full"
                style={{ background: 'var(--bg-elevated)', color: 'var(--muted)' }}
              >
                Case study coming
              </span>
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

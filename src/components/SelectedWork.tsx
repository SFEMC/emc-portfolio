import { Link } from 'react-router-dom'

const engagements = [
  {
    org: 'Plymouth Marjon University',
    role: 'Consultant - Design Authority',
    dates: '2025 — Present',
    headline: 'Service-led transformation.',
    tags: ['Design authority', 'Operating model', 'Service design'],
  },
  {
    org: 'Department for Environment, Food & Rural Affairs',
    role: 'Consultant - Product and Service Design',
    dates: '2023 — 2025',
    headline: 'A high-risk cross-border service from inception to live.',
    tags: ['GDS Service Standard', 'Cross-government', 'Product ownership'],
  },
  {
    org: 'HM Land Registry',
    role: 'Apprentice → Product Owner',
    dates: '2016 — 2023',
    headline: 'Seven years delivering transformation inside government.',
    tags: ['Transformation delivery', 'Product ownership', 'Agile delivery'],
  },
]

export default function SelectedWork() {
  return (
    <section
      className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="grid grid-cols-12 gap-6 mb-14">
        <div className="col-span-12 md:col-span-7">
          <p className="eyebrow mb-4">Selected work</p>
          <h2 className="font-display text-[36px] md:text-[44px] leading-[1.05] tracking-tight text-ink font-medium">
            Where I've been, what I've shipped.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-end justify-start md:justify-end">
          <Link to="/experience" className="btn-secondary text-[13px]">
            Full experience
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      <div
        className="border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        {engagements.map((e) => (
          <Link
            key={e.org}
            to="/experience"
            className="block group"
          >
            <div
              className="grid grid-cols-12 gap-6 py-10 md:py-12 border-b transition-colors hover:bg-bg-elevated px-2 -mx-2"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="col-span-12 md:col-span-3">
                <p className="eyebrow mb-2">{e.dates}</p>
                <p className="text-[14px] text-ink-soft">{e.role}</p>
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="text-[14px] text-muted mb-2">{e.org}</p>
                {e.headline && (
                  <h3 className="font-display text-[24px] md:text-[30px] font-medium text-ink leading-tight group-hover:text-accent transition-colors">
                    {e.headline}
                  </h3>
                )}
              </div>
              <div className="col-span-12 md:col-span-3 flex flex-wrap gap-2 md:justify-end items-start">
                {e.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { principles } from '../content/principles'

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
            Pulled from experience across public sector delivery. Read the full piece on the dedicated page.
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
            className="flex flex-col items-start text-left py-10 md:py-12 md:px-8 relative w-full"
            style={{
              borderBottom: '1px solid var(--border)',
              borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div className="flex items-start gap-8 w-full">
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

      <div className="mt-12 flex justify-center md:justify-start">
        <Link to="/how-i-work" className="btn-primary">
          Read all four in full
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </section>
  )
}

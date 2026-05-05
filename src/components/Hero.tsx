import { Link } from 'react-router-dom'
import CalendlyButton from './CalendlyButton'

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 md:pt-28 pb-20 md:pb-28">
      <div className="grid grid-cols-12 gap-6">
        {/* Eyebrow + status */}
        <div className="col-span-12 mb-10 flex items-center gap-3 flex-wrap">
          <span className="eyebrow">Eddystone Mersey Consulting</span>
          <span className="h-1 w-1 rounded-full" style={{ background: 'var(--muted)' }} />
          <span className="inline-flex items-center gap-2 text-[13px] text-ink-soft">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: 'var(--accent)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent)' }} />
            </span>
            Fractional availability through 2026
          </span>
        </div>

        {/* Big statement */}
        <h1 className="col-span-12 lg:col-span-10 font-display text-[44px] sm:text-[56px] md:text-[72px] lg:text-[88px] leading-[1.02] tracking-tight text-ink font-medium mb-10">
          I transform how organisations deliver <span style={{ color: 'var(--accent)' }} className="italic">complex public services.</span>
        </h1>

        {/* Secondary paragraph */}
        <p className="col-span-12 md:col-span-7 text-[18px] md:text-[19px] leading-relaxed text-ink-soft mb-10">
          I use design thinking to reshape how your organisation operates, from the operating model and governance that hold it together to the services your users experience.
        </p>

        {/* CTA cluster */}
        <div className="col-span-12 flex flex-wrap items-center gap-3">
          <Link to="/experience" className="btn-primary">
            See experience
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
          </Link>
          <CalendlyButton className="btn-secondary">
            Talk to me
          </CalendlyButton>
        </div>
      </div>

      {/* Credentials strip */}
      <div
        className="mt-20 pt-8 border-t grid grid-cols-1 md:grid-cols-3 gap-8"
        style={{ borderColor: 'var(--border)' }}
      >
        <div>
          <p className="eyebrow mb-2">Based in</p>
          <p className="text-[15px] font-medium text-ink">Plymouth, UK</p>
        </div>
        <div>
          <p className="eyebrow mb-2">Working in</p>
          <p className="text-[15px] font-medium text-ink">Public sector &amp; HE</p>
        </div>
        <div>
          <p className="eyebrow mb-2">Operating since</p>
          <p className="text-[15px] font-medium text-ink">2025</p>
        </div>
      </div>
    </section>
  )
}

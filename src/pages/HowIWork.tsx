import { principles } from '../content/principles'

export default function HowIWork() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      {/* Header */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-10">
          <p className="eyebrow mb-6">How I work</p>
          <h1 className="font-display text-[44px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-tight text-ink font-medium mb-8">
            Principles, not a playbook.
          </h1>
        </div>
      </div>

      {/* Framing prose */}
      <div
        className="grid grid-cols-12 gap-6 pb-16 md:pb-20 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <div className="space-y-6 text-[17px] md:text-[18px] text-ink-soft leading-relaxed max-w-2xl">
            <p>
              For a long time, organisations kept design in a corner. You hired a UX person to make the screens look right, a content designer to fix the words and an interaction designer to sort the clicks. Organisations got value from that model when digital meant "build a website." It does not hold today.
            </p>
            <p>
              The organisations pulling ahead use design thinking across the full stack of how they operate: from boardroom strategy through operating models and governance, into service delivery and frontline operations. When your leadership team maps the end-to-end experience of the people you serve before committing to a technology platform, you make better decisions. You spot the gaps between teams that no single system can fix. You build services around what people need, not around how your org chart happens to look.
            </p>
            <p>
              Organisations that treat design as a strategic discipline gain competitive advantage. They test ideas at low cost, learn fast and course-correct before sinking budget into the wrong things. They define clear ownership, sensible governance and realistic operating models before they ask anyone to redesign a process. They build with frontline staff, designing for how work happens rather than how a senior leader imagines it happens. Public Digital call this "optimising for adaptability": instead of predicting the future with a fixed target state, you build the feedback loops and capabilities that let you respond when things change.
            </p>
            <p>
              The organisations that get this right do not transform once. They build the muscle to keep transforming.
            </p>
          </div>
        </div>
      </div>

      {/* Principles, fully expanded */}
      <div>
        {principles.map((p) => (
          <article
            key={p.n}
            className="grid grid-cols-12 gap-6 py-12 md:py-16 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="col-span-12 md:col-span-1">
              <span
                className="font-display text-[22px] md:text-[28px] font-medium leading-none"
                style={{ color: 'var(--accent)' }}
              >
                {p.n}
              </span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display text-[28px] md:text-[36px] font-medium text-ink leading-tight mb-5">
                {p.title}
              </h2>
              <p className="text-[18px] md:text-[19px] text-ink leading-relaxed mb-6 max-w-2xl">
                {p.body}
              </p>
              <p className="text-[16px] md:text-[17px] text-ink-soft leading-relaxed max-w-2xl">
                {p.expanded}
              </p>
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
            <p className="eyebrow mb-4">Want to talk through how this would land in your team?</p>
            <h2 className="font-display text-[32px] md:text-[40px] leading-tight tracking-tight text-ink font-medium mb-6">
              Happy to walk through it.
            </h2>
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

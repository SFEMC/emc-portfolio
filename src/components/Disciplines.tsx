const disciplines = [
  {
    n: '01',
    title: 'Journey Mapping',
    body: 'Tracing a person\'s experience through a service stage by stage. I use maps to surface gaps between teams and translate lived experience into language that drives institutional action.',
    slug: 'journey-mapping',
  },
]

export default function Disciplines() {
  return (
    <section
      className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="grid grid-cols-12 gap-6 mb-14">
        <div className="col-span-12 md:col-span-5">
          <p className="eyebrow mb-4">Disciplines</p>
          <h2 className="font-display text-[36px] md:text-[44px] leading-[1.05] tracking-tight text-ink font-medium">
            Practices behind the work.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 flex items-end">
          <p className="text-[17px] text-ink-soft leading-relaxed">
            Short pieces on the methods I lean on most. Built over time as I write them up.
          </p>
        </div>
      </div>

      <div
        className="border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        {disciplines.map((d) => (
          <article
            key={d.slug}
            className="grid grid-cols-12 gap-6 py-10 md:py-12 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="col-span-12 md:col-span-1">
              <span
                className="font-display text-[22px] md:text-[28px] font-medium leading-none"
                style={{ color: 'var(--accent)' }}
              >
                {d.n}
              </span>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h3 className="font-display text-[24px] md:text-[30px] font-medium text-ink leading-tight mb-4">
                {d.title}
              </h3>
              <p className="text-[16px] md:text-[17px] text-ink-soft leading-relaxed max-w-2xl">
                {d.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="text-[14px] text-muted mt-8">
        More disciplines to follow.
      </p>
    </section>
  )
}

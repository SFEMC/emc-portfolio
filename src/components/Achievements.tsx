const stats = [
  { value: '£10m+', label: 'Programme delivered at DEFRA' },
  { value: 'RITA', label: 'Real Innovation Technology Award at HM Land Registry' },
  { value: '40%', label: 'Efficiency gain at HM Land Registry' },
  { value: 'Live', label: 'Service taken from discovery through to BAU at DEFRA' },
]

export default function Achievements() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 border-b border-border">
      <p className="text-xs text-muted uppercase tracking-widest font-body mb-12">Key Achievements</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-body font-semibold text-4xl md:text-5xl text-ink mb-2">{stat.value}</p>
            <p className="text-muted font-body font-light text-sm leading-snug">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

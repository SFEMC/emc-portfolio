export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-20 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div>
          <p className="text-xs text-muted uppercase tracking-widest font-body mb-3">About</p>
          <h2 className="font-body font-semibold text-3xl md:text-4xl text-ink leading-tight">
            How I work
          </h2>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-4">
          <p className="text-muted font-body font-light text-base leading-relaxed">
            I embed within organisations, learn how your teams operate, and take services from discovery through to live. I don't consult from a distance. I sit with the people doing the work, understand the constraints, and deliver compliant, accessible digital products.
          </p>
          <p className="text-muted font-body font-light text-base leading-relaxed">
            I've done this at DEFRA, HM Land Registry, and Plymouth Marjon University. I started as an apprentice and worked my way into senior product and delivery roles. That background means I understand how organisations run at every level, not from a slide deck.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            {['DEFRA', 'HM Land Registry', 'Plymouth Marjon University', 'Public Digital'].map((org) => (
              <span key={org} className="text-xs font-body text-muted border border-border px-3 py-1">
                {org}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

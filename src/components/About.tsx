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
            Most organisations know their services need to change. Fewer know where to start. They have systems, processes and project plans but no shared picture of what the service looks like from the outside in.
          </p>
          <p className="text-muted font-body font-light text-base leading-relaxed">
            I fix that. I sit with the people doing the work, learn how teams operate, find where services break down and design them end-to-end. I run discoveries, write user stories, map journeys and embed within delivery teams to move things from alpha through to live.
          </p>
          <p className="text-muted font-body font-light text-base leading-relaxed">
            I spent years doing this in central government, where GDS standards set the bar for how digital services get built. Now I bring those ways of working into higher education — a sector with the same complexity but fewer established frameworks for service delivery.
          </p>
          <p className="text-muted font-body font-light text-base leading-relaxed">
            I don't consult from a distance. I embed within your team, run discoveries, map services and stay until the thing works.
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

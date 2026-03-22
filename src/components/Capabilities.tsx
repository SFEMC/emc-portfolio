const capabilities = [
  {
    title: 'Product & Delivery',
    description: 'I take services from discovery through to live. I own the roadmap, run the backlog, and keep multidisciplinary teams moving across organisational boundaries.',
  },
  {
    title: 'Service Design',
    description: 'I map how your service works today, identify where it breaks down, and redesign it around the people who use it. User research, journey mapping, blueprinting.',
  },
  {
    title: 'Stakeholder & Change',
    description: 'I embed within your organisation and build capability as I go. I coach teams, manage upwards, and make sure change lands with the people it affects.',
  },
  {
    title: 'Technical Delivery',
    description: 'I write the requirements, shape the solution, and bridge the gap between technical teams and the business. I get hands-on with whatever tooling the organisation uses.',
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="max-w-6xl mx-auto px-6 py-20 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div>
          <p className="text-xs text-muted uppercase tracking-widest font-body mb-3">What I Do</p>
          <h2 className="font-body font-semibold text-3xl md:text-4xl text-ink leading-tight">
            How I help
          </h2>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {capabilities.map((cap) => (
            <div key={cap.title}>
              <h3 className="font-body font-semibold text-xl text-ink mb-2">{cap.title}</h3>
              <p className="text-muted font-body font-light text-sm leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

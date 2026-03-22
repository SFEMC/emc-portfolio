const roles = [
  {
    date: 'Sept 2025 – Present',
    title: 'Technology Consultant',
    org: 'Eddystone Mersey Consulting',
    via: null,
    body: 'I deliver senior-level digital transformation, product delivery, and service design across public sector and higher education. I work with clients directly, no account managers or layers between me and the work.',
  },
  {
    date: 'Oct 2025 – Present',
    title: 'Expert Network Member',
    org: 'Public Digital',
    via: 'via Eddystone Mersey Consulting',
    body: "I contribute to Public Digital's expert network, working with governments and large institutions on becoming more responsive and adaptable.",
  },
  {
    date: 'Oct 2025 – Present',
    title: 'Consultant - Head of Transformation Delivery',
    org: 'Plymouth Marjon University',
    via: 'via Eddystone Mersey Consulting',
    body: "Leading delivery across multiple workstreams of the Marjon 2030 Transformation Programme. With no dedicated team, budget, or tooling, I drove interim improvements across admissions and partnerships while shaping the CRM solution in parallel. Cut three weeks from the admissions cycle through process redesign and automation. Built Power Automate workflows saving ~40 FTE days. Authored 240+ user stories grounding the Salesforce build in user research and operational reality. Now designing and delivering a fully digital partner application route for May 2026 admissions, replacing the old spreadsheet model with another interim solution before CRM delivery begins.",
  },
  {
    date: 'July 2023 – July 2025',
    title: 'Strategy, Service Design & Product Management Consultant',
    org: 'Department for Environment, Food & Rural Affairs (DEFRA)',
    via: null,
    body: "Directed end-to-end service design and delivery of the Windsor Framework Pet Travel Scheme - a £10m+ programme spanning UK Government, port operations and the EU. Led a multidisciplinary team from inception through to live, delivered an accessibility-compliant Digital Support Scheme, and served as Product Owner across 12 critical interim solutions. Business continuity documentation adopted as departmental gold standard.",
  },
  {
    date: 'June 2016 – Feb 2023',
    title: 'Apprentice through to Product Owner',
    org: 'HM Land Registry',
    via: null,
    body: "Progressed from Business Administration Apprentice through to Product Owner across seven years. Delivered UI enhancements that unlocked automation at scale, designed a critical fallback feature for applications outside automation scope, and drove a 40% improvement in operational efficiency - contributing to the team winning the RITA (Real Innovation Technology Award). Nominated for the Executive Board People Award.",
  },
]

export default function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-20 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div>
          <p className="text-xs text-muted uppercase tracking-widest font-body mb-3">Experience</p>
          <h2 className="font-body font-semibold text-3xl md:text-4xl text-ink leading-tight">
            Where I've worked
          </h2>
        </div>
      </div>
      <div className="flex flex-col">
        {roles.map((role, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 py-8 border-t border-border">
            <div>
              <p className="text-xs text-muted font-body">{role.date}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-body font-semibold text-xl text-ink">{role.title}</h3>
              <p className="text-sm font-body font-medium text-ink mt-0.5">
                {role.org}
                {role.via && <span className="text-muted font-light"> - {role.via}</span>}
              </p>
              <p className="text-muted font-body font-light text-sm leading-relaxed mt-3">{role.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

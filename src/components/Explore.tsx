import { Link } from 'react-router-dom'

const links = [
  {
    title: 'Case Studies',
    description: 'How I operate: understanding the problem first, then building the right thing with the people who have to live with it.',
    to: '/experience',
  },
  {
    title: 'Articles',
    description: 'Thoughts on product delivery, service design, technology, and building things that work.',
    to: '/articles',
  },
  {
    title: 'Side Projects',
    description: 'Experiments, hobby builds, and creative work outside of client delivery.',
    to: '/projects',
  },
  {
    title: 'Resources',
    description: 'Books, newsletters, blogs and live feeds that shape how I think and work.',
    to: '/resources',
  },
]

export default function Explore() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
        <div>
          <p className="text-xs text-muted uppercase tracking-widest font-body mb-3">Explore</p>
          <h2 className="font-body font-semibold text-3xl md:text-4xl text-ink leading-tight">
            Go deeper
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {links.map((link) => (
          <Link
            key={link.title}
            to={link.to}
            className="border border-border p-5 rounded-lg hover:border-white transition-colors group flex flex-col"
          >
            <h3 className="font-body font-semibold text-lg text-ink mb-2 group-hover:text-white transition-colors">
              {link.title}
            </h3>
            <p className="text-muted font-body font-light text-sm leading-relaxed mb-4 flex-1">
              {link.description}
            </p>
            <span className="text-sm text-muted font-body group-hover:text-ink transition-colors">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

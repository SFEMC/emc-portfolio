import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 border-b border-border">
      <div className="flex flex-col items-center text-center">
        <img src="/logo.png" alt="Eddystone Mersey Consulting" className="h-40 w-auto mb-8 logo-img" />
        <h1 className="font-body font-semibold text-2xl md:text-3xl lg:text-4xl text-ink leading-[1.1] mb-6 max-w-3xl">
          I transform how organisations deliver public services.
        </h1>
        <p className="text-muted font-body font-light text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
          Product ownership, service design and end-to-end delivery across central government and higher education. Senior-level expertise, no consultancy layers.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            to="/experience"
            className="px-8 py-3 text-sm font-body font-semibold rounded-lg bg-btn-bg text-btn-text hover:opacity-90 transition-opacity"
          >
            View Experience
          </Link>
          <a
            href="mailto:Samuel.Field@eddystonemersey.com"
            className="px-8 py-3 text-sm font-body font-semibold rounded-lg bg-btn-bg text-btn-text hover:opacity-90 transition-opacity"
          >
            Contact Me
          </a>
        </div>

        {/* Quick links to sections */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link to="/experience" className="text-muted font-body hover:text-ink transition-colors">
            Case Studies &rarr;
          </Link>
          <Link to="/articles" className="text-muted font-body hover:text-ink transition-colors">
            Articles &rarr;
          </Link>
          <Link to="/projects" className="text-muted font-body hover:text-ink transition-colors">
            Side Projects &rarr;
          </Link>
          <Link to="/resources" className="text-muted font-body hover:text-ink transition-colors">
            Resources &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      className="mt-24 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Wordmark + blurb */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="" className="h-10 w-auto logo-img" />
              <span className="font-display text-[20px] font-medium tracking-tight text-ink leading-none">
                Eddystone Mersey<br />
                <span className="text-[14px] font-normal text-muted tracking-normal">Consulting</span>
              </span>
            </Link>
            <p className="text-[15px] text-muted leading-relaxed max-w-sm">
              Service-led transformation for UK government and higher education. Based in Plymouth. Working wherever the problem is.
            </p>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Explore</p>
            <ul className="flex flex-col gap-2.5">
              <li><Link to="/experience" className="text-[14px] text-ink-soft hover:text-accent transition-colors">Experience</Link></li>
              <li><Link to="/articles" className="text-[14px] text-ink-soft hover:text-accent transition-colors">Writing</Link></li>
              <li><Link to="/projects" className="text-[14px] text-ink-soft hover:text-accent transition-colors">Side Projects</Link></li>
              <li><Link to="/resources" className="text-[14px] text-ink-soft hover:text-accent transition-colors">Resources</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Get in touch</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="mailto:Samuel.Field@eddystonemersey.com" className="text-[14px] text-ink-soft hover:text-accent transition-colors">
                  Samuel.Field@eddystonemersey.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/eddystone-mersey-consulting" target="_blank" rel="noopener noreferrer" className="text-[14px] text-ink-soft hover:text-accent transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://wa.me/447876853872" target="_blank" rel="noopener noreferrer" className="text-[14px] text-ink-soft hover:text-accent transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-14 pt-6 border-t text-[13px] text-muted"
          style={{ borderColor: 'var(--border)' }}
        >
          <p>&copy; 2026 Eddystone Mersey Consulting Limited. Registered in England.</p>
        </div>
      </div>
    </footer>
  )
}

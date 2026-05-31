import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      className="mt-0 border-t bg-bg"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Wordmark + blurb */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <img src="/logo-navy.jpg" alt="" className="h-10 w-auto mix-blend-multiply" />
              <span className="text-[18px] font-semibold text-navy tracking-tight leading-none">
                Eddystone Mersey<br />
                <span className="text-[13px] font-normal text-muted tracking-normal">Consulting</span>
              </span>
            </Link>
            <p className="text-[15px] text-muted leading-relaxed max-w-sm">
              Service design and delivery for UK central government and higher education. Based in Plymouth.
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="flex flex-col gap-2.5">
              <li><Link to="/articles" className="text-[14px] text-navy hover:text-accent transition-colors">Writing</Link></li>
              <li><Link to="/about" className="text-[14px] text-navy hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/resources" className="text-[14px] text-navy hover:text-accent transition-colors">Resources</Link></li>
              <li><Link to="/projects" className="text-[14px] text-navy hover:text-accent transition-colors">Side projects</Link></li>
            </ul>
          </div>

          {/* Get in touch */}
          <div className="md:col-span-4">
            <p className="eyebrow mb-5">Get in touch</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="mailto:samuel.field@eddystonemersey.com" className="text-[14px] text-navy hover:text-accent transition-colors">
                  samuel.field@eddystonemersey.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/eddystone-mersey-consulting" target="_blank" rel="noopener noreferrer" className="text-[14px] text-navy hover:text-accent transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-14 pt-6 border-t text-[13px] text-muted"
          style={{ borderColor: 'var(--border)' }}
        >
          <p>&copy; 2026 Eddystone Mersey Consulting Limited. Company 16665724. Registered in England.</p>
        </div>
      </div>
    </footer>
  )
}

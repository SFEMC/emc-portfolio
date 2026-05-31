import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="section-navy-deep on-dark">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-20 pb-12">
        <div className="flex flex-wrap justify-between gap-12 pb-12 border-b" style={{ borderColor: 'var(--border-dark)' }}>
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="inline-block">
              <img src="/logo-white.png" alt="Eddystone Mersey Consulting" className="h-16 w-auto" />
            </Link>
            <p className="italic text-[#A9B4C6] mt-5 text-[16px] leading-relaxed max-w-[320px]">
              A senior consultancy for public-sector delivery.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[var(--gold)] mb-2">Explore</span>
            <Link to="/articles" className="text-[15px] text-[#A9B4C6] hover:text-white transition-colors">Writing</Link>
            <Link to="/about" className="text-[15px] text-[#A9B4C6] hover:text-white transition-colors">About</Link>
            <Link to="/resources" className="text-[15px] text-[#A9B4C6] hover:text-white transition-colors">Resources</Link>
            <Link to="/projects" className="text-[15px] text-[#A9B4C6] hover:text-white transition-colors">Side projects</Link>
          </div>

          {/* Get in touch */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[var(--gold)] mb-2">Get in touch</span>
            <span className="text-[18px] font-semibold text-white">New enquiries</span>
            <a href="mailto:samuel.field@eddystonemersey.com" className="text-[15px] text-[#A9B4C6] hover:text-white transition-colors inline-flex items-center gap-2.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>
              samuel.field@eddystonemersey.com
            </a>
            <a href="https://eddystonemersey.com" className="text-[15px] text-[#A9B4C6] hover:text-white transition-colors inline-flex items-center gap-2.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>
              eddystonemersey.com
            </a>
            <a href="https://www.linkedin.com/company/eddystone-mersey-consulting" target="_blank" rel="noopener noreferrer" className="text-[15px] text-[#A9B4C6] hover:text-white transition-colors inline-flex items-center gap-2.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap justify-between gap-3 text-[13px] text-[#A9B4C6]">
          <span>&copy; 2026 Eddystone Mersey Consulting Limited. Company 16665724.</span>
          <span>Registered in England</span>
        </div>
      </div>
    </footer>
  )
}

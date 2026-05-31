import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CalendlyButton from './CalendlyButton'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Writing', path: '/articles' },
  { label: 'About', path: '/about' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function isActive(path: string) {
    return pathname === path || (path !== '/' && pathname.startsWith(path))
  }

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-200 border-b"
      style={{
        backgroundColor: scrolled ? 'rgba(245,245,242,0.88)' : 'var(--warm-white)',
        backdropFilter: scrolled ? 'saturate(160%) blur(8px)' : 'none',
        borderColor: 'var(--border-light, #E3E3DE)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-[84px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo-navy.png" alt="Eddystone Mersey Consulting" className="h-[52px] w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-[15px] font-semibold transition-colors"
              style={{ color: isActive(item.path) ? 'var(--gold)' : 'var(--navy-primary)' }}
            >
              {item.label}
            </Link>
          ))}
          <CalendlyButton className="btn-primary">
            Book a call
          </CalendlyButton>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--navy-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? (
              <><path d="M18 6L6 18M6 6l12 12"/></>
            ) : (
              <><path d="M3 6h18M3 12h18M3 18h18"/></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t" style={{ borderColor: 'var(--border-light, #E3E3DE)' }}>
          <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 text-[15px] font-semibold rounded transition-colors"
                style={{ color: isActive(item.path) ? 'var(--gold)' : 'var(--navy-primary)' }}
              >
                {item.label}
              </Link>
            ))}
            <CalendlyButton
              className="btn-primary mt-3 justify-center"
              onAfter={() => setMobileOpen(false)}
            >
              Book a call
            </CalendlyButton>
          </div>
        </div>
      )}
    </nav>
  )
}

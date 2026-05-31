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
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? 'backdrop-blur-sm shadow-sm' : ''
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(245,245,242,0.92)' : 'var(--bg)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo + wordmark */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo-navy.jpg" alt="Eddystone Mersey Consulting" className="h-9 w-auto mix-blend-multiply" />
          <span className="hidden sm:inline text-[15px] font-semibold text-navy tracking-tight">
            Eddystone Mersey
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 text-[14px] font-medium transition-colors relative ${
                isActive(item.path) ? 'text-navy' : 'text-muted hover:text-navy'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span
                  className="absolute left-4 right-4 -bottom-[1px] h-[2px]"
                  style={{ background: 'var(--accent)' }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <CalendlyButton className="hidden md:inline-flex btn-primary">
            Book a call
          </CalendlyButton>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-[1.5px] transition-transform"
              style={{
                backgroundColor: 'var(--navy)',
                transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : '',
              }}
            />
            <span
              className="block w-5 h-[1.5px] transition-opacity"
              style={{ backgroundColor: 'var(--navy)', opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[1.5px] transition-transform"
              style={{
                backgroundColor: 'var(--navy)',
                transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : '',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
        >
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-3 text-[15px] font-medium rounded-md transition-colors ${
                  isActive(item.path) ? 'text-accent bg-bg-elevated' : 'text-navy'
                }`}
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

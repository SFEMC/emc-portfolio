import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Case Studies', path: '/experience' },
  { label: 'Writing', path: '/articles' },
  { label: 'Projects', path: '/projects' },
  { label: 'Resources', path: '/resources' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = (localStorage.getItem('emc-theme') as 'light' | 'dark') || 'light'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('emc-theme', next)
  }

  function isActive(path: string) {
    return pathname === path || (path !== '/' && pathname.startsWith(path))
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md' : ''
      }`}
      style={{
        backgroundColor: scrolled ? 'color-mix(in srgb, var(--bg) 85%, transparent)' : 'var(--bg)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="" className="h-5 w-auto logo-img" />
          <span className="font-display text-[15px] font-medium tracking-tight text-ink">
            Eddystone Mersey
          </span>
          <span className="hidden sm:inline text-[12px] tracking-wider uppercase text-muted ml-0.5 font-medium">
            Consulting
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3.5 py-2 text-[14px] font-medium transition-colors relative ${
                isActive(item.path) ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span
                  className="absolute left-3.5 right-3.5 -bottom-[1px] h-[2px]"
                  style={{ background: 'var(--accent)' }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-bg-elevated"
            title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
          >
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            )}
          </button>

          <a
            href="mailto:Samuel.Field@eddystonemersey.com"
            className="hidden md:inline-flex btn-primary"
          >
            Talk to me
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-[1.5px] transition-transform"
              style={{
                backgroundColor: 'var(--text)',
                transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : '',
              }}
            />
            <span
              className="block w-5 h-[1.5px] transition-opacity"
              style={{ backgroundColor: 'var(--text)', opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[1.5px] transition-transform"
              style={{
                backgroundColor: 'var(--text)',
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
                  isActive(item.path) ? 'text-accent bg-bg-elevated' : 'text-ink'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="mailto:Samuel.Field@eddystonemersey.com"
              className="btn-primary mt-3 justify-center"
            >
              Talk to me
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

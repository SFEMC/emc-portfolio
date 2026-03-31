import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Case Studies', path: '/experience' },
  { label: 'Articles', path: '/articles' },
  { label: 'Side Projects', path: '/projects' },
  { label: 'Resources', path: '/resources' },
]

const themes = [
  { id: 'dark', label: 'Dark', icon: '🌙' },
  { id: 'light', label: 'Light', icon: '☀️' },
  { id: 'navy', label: 'Navy', icon: '🌊' },
  { id: 'warm', label: 'Warm', icon: '🪵' },
] as const

export default function Navbar() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('emc-theme') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  function changeTheme(id: string) {
    setTheme(id)
    document.documentElement.setAttribute('data-theme', id)
    localStorage.setItem('emc-theme', id)
    setThemeOpen(false)
  }

  const isLight = theme === 'light' || theme === 'warm'

  function navClass(path: string) {
    const active = path === '/' ? pathname === '/' : pathname.startsWith(path)
    if (active) {
      return 'px-4 py-2 text-sm font-semibold rounded-lg transition-all' +
        ` bg-[var(--btn-bg)] text-[var(--btn-text)]`
    }
    return 'px-4 py-2 text-sm font-semibold rounded-lg transition-all' +
      ` border text-[var(--text)] border-[var(--text)] hover:opacity-70`
  }

  return (
    <nav className="sticky top-0 backdrop-blur-sm border-b z-50" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-2 font-body font-semibold text-sm hover:opacity-70 transition-opacity tracking-wide" style={{ color: 'var(--text)' }}>
          <img src="/logo.png" alt="" className="h-4 w-auto" style={{ filter: isLight ? 'none' : 'brightness(0) invert(1)' }} />
          <span className="hidden sm:inline">Eddystone Mersey Consulting Limited</span>
        </Link>
        <div className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={navClass(item.path)}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <div className="relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm hover:opacity-70 transition-opacity"
              style={{ color: 'var(--muted)' }}
              aria-label="Change theme"
            >
              {themes.find(t => t.id === theme)?.icon}
            </button>
            {themeOpen && (
              <div className="absolute right-0 top-full mt-2 rounded-lg border p-1 min-w-[120px] z-50" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => changeTheme(t.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-body font-medium rounded-md transition-colors text-left"
                    style={{
                      color: theme === t.id ? 'var(--text)' : 'var(--muted)',
                      backgroundColor: theme === t.id ? 'var(--border)' : 'transparent',
                    }}
                  >
                    <span>{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 transition-transform`} style={{ backgroundColor: 'var(--text)', transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : '' }} />
            <span className={`block w-5 h-0.5 transition-opacity`} style={{ backgroundColor: 'var(--text)', opacity: mobileOpen ? 0 : 1 }} />
            <span className={`block w-5 h-0.5 transition-transform`} style={{ backgroundColor: 'var(--text)', transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : '' }} />
          </button>

          <a
            href="mailto:Samuel.Field@eddystonemersey.com"
            className="hidden md:block px-3 py-2 sm:px-5 text-xs sm:text-sm font-body font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
            style={{ backgroundColor: 'var(--btn-bg)', color: 'var(--btn-text)' }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t backdrop-blur-sm px-6 py-4 flex flex-col gap-3" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={navClass(item.path) + ' block'}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="mailto:Samuel.Field@eddystonemersey.com"
            className="block px-4 py-2 text-sm font-body font-semibold rounded-lg hover:opacity-90 transition-opacity text-center mt-2"
            style={{ backgroundColor: 'var(--btn-bg)', color: 'var(--btn-text)' }}
          >
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  )
}

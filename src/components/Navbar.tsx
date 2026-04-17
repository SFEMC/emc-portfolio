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
  { id: 'dark', label: 'Dark mode', icon: '🌙' },
  { id: 'light', label: 'Light mode', icon: '☀️' },
  { id: 'navy', label: 'Navy mode', icon: '🌊' },
  { id: 'warm', label: 'Warm mode', icon: '🪵' },
] as const

export default function Navbar() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
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
          <button
            onClick={() => {
              const currentIndex = themes.findIndex(t => t.id === theme)
              const nextIndex = (currentIndex + 1) % themes.length
              changeTheme(themes[nextIndex].id)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium hover:opacity-70 transition-opacity border"
            style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
            aria-label="Change theme"
          >
            <span>{themes.find(t => t.id === theme)?.icon}</span>
            <span>{themes.find(t => t.id === theme)?.label}</span>
          </button>

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

import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const isResources = location.pathname === '/resources'

  return (
    <nav className="sticky top-0 bg-bg/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-body font-semibold text-sm text-ink hover:opacity-70 transition-opacity tracking-wide">
          <img src="/logo.png" alt="" className="h-4 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
          <span className="hidden sm:inline">Eddystone Mersey Consulting Limited</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-opacity ${!isResources ? 'bg-white text-gray-900' : 'border border-white text-white hover:opacity-70'}`}
          >
            Home
          </Link>
          <Link
            to="/resources"
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-opacity ${isResources ? 'bg-white text-gray-900' : 'border border-white text-white hover:opacity-70'}`}
          >
            Resources
          </Link>
        </div>
        <a
          href="mailto:Samuel.Field@eddystonemersey.com"
          className="px-3 py-2 sm:px-5 text-xs sm:text-sm font-body font-semibold rounded-lg bg-white text-gray-900 hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  )
}

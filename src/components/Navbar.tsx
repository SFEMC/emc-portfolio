import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const isResources = location.pathname === '/resources'

  return (
    <nav className="sticky top-0 bg-bg/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-body font-semibold text-sm text-ink hover:opacity-70 transition-opacity tracking-wide">
          Eddystone Mersey Consulting Limited
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-semibold transition-colors ${!isResources ? 'text-ink' : 'text-white hover:text-ink'}`}
          >
            Home
          </Link>
          <Link
            to="/resources"
            className={`text-sm font-semibold transition-colors ${isResources ? 'text-ink' : 'text-white hover:text-ink'}`}
          >
            Resources
          </Link>
        </div>
        <a
          href="mailto:Samuel.Field@eddystonemersey.com"
          className="px-5 py-2 text-sm font-body font-semibold rounded-lg bg-white text-gray-900 hover:opacity-90 transition-opacity"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  )
}

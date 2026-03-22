import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex flex-col items-center text-center">
        <p className="text-xs text-muted uppercase tracking-widest font-body mb-3">Contact</p>
        <h2 className="font-body font-semibold text-3xl md:text-4xl text-ink leading-tight mb-4">
          Let's talk
        </h2>
        <p className="text-muted font-body font-light text-base leading-relaxed mb-8 max-w-xl">
          If you have a service to deliver or a transformation to lead, I'd like to hear about it.
        </p>
        <a
          href="mailto:Samuel.Field@eddystonemersey.com"
          className="px-8 py-3 mb-8 text-sm font-body font-semibold rounded-lg bg-white text-gray-900 hover:opacity-90 transition-opacity"
        >
          Samuel.Field@eddystonemersey.com
        </a>
        <div className="flex gap-8">
          <a href="tel:+447876853872" className="text-sm text-muted font-body hover:text-ink transition-colors">
            +44 7876 853872
          </a>
          <a href="https://www.linkedin.com/company/eddystone-mersey-consulting" target="_blank" rel="noopener noreferrer" className="text-sm text-muted font-body hover:text-ink transition-colors">
            LinkedIn
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-20 pt-8 flex justify-between items-center flex-wrap gap-4">
        <p className="text-xs text-muted font-body">© 2026 Samuel Field · Eddystone Mersey Consulting Limited</p>
        <Link to="/resources" className="text-xs text-muted font-body hover:text-ink transition-colors">
          Resources →
        </Link>
      </div>
    </section>
  )
}

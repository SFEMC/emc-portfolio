export default function Contact() {
  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8">
          <p className="eyebrow mb-6">Start a conversation</p>
          <h2 className="font-display text-[44px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-tight text-ink font-medium mb-8">
            Have a service to deliver or a transformation to lead?
          </h2>
          <p className="text-[18px] md:text-[19px] text-ink-soft leading-relaxed max-w-xl mb-10">
            Send a short note about what you're working on. I'll come back within a working day.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="mailto:Samuel.Field@eddystonemersey.com" className="btn-primary">
              Samuel.Field@eddystonemersey.com
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/eddystone-mersey-consulting" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              LinkedIn
            </a>
            <a href="https://wa.me/447876853872" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

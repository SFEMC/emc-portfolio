import CalendlyButton from '../components/CalendlyButton'

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="section-light">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-16">
          <span className="eyebrow mb-6">About us</span>
          <h1 className="text-navy text-[44px] md:text-[56px] font-semibold tracking-[-0.025em] leading-[1.06] mt-5 mb-10 max-w-3xl">
            About us.
          </h1>
          <div className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed space-y-5">
            <p>
              Eddystone Mersey Consulting works across UK central government and higher education. We research user needs, map end-to-end journeys across every channel and handoff, build blueprints and deliver through to live.
            </p>
            <p>
              We also work upstream. Before blueprints and technology, we help leadership teams define roles, governance and decision-making structures. An operating model built on unclear ownership will fail. So will any service blueprint built on top of it.
            </p>
            <p>
              We spend as much time with frontline staff and users as with leadership teams. The people closest to the work see what breaks first. We work across both levels because they depend on each other.
            </p>
          </div>
        </div>
      </section>

      {/* Samuel Field */}
      <section className="section-surface border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-[110px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="eyebrow mb-6">Founder</span>
              <h2 className="text-navy text-[28px] md:text-[36px] font-semibold tracking-[-0.015em] mt-5 leading-tight">
                Samuel Field
              </h2>
              <p className="italic text-[var(--grey-text)] text-[16px] mt-3">Founder, Eddystone Mersey Consulting</p>
            </div>
            <div className="md:col-span-8 text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed space-y-5">
              <p>
                Samuel won a Real Innovation Technology Award for his work transforming how a government department processes applications. He spent seven years working on transformation at that department, starting as an apprentice in operations and leaving as an established product owner. He went on to manage service design and delivery at a major government department.
              </p>
              <p>
                He is passionate about human-centred design. He maps the full service because what breaks happens in the handoffs between teams. He prototypes and iterates before anyone commits resource. He builds the operating model, develops strategy and stays until the service goes live, ensuring successful service design and transition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-navy on-dark">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-24 text-center">
          <span className="eyebrow justify-center mb-6">Start a conversation</span>
          <h2 className="text-white text-[32px] md:text-[44px] font-semibold tracking-[-0.02em] leading-tight mb-6">
            Talk to us.
          </h2>
          <CalendlyButton className="btn-primary">
            Book a call
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </CalendlyButton>
          <p className="text-[#A9B4C6] text-[14px] mt-8">
            <a href="mailto:samuel.field@eddystonemersey.com" className="hover:text-[var(--gold)] transition-colors">
              samuel.field@eddystonemersey.com
            </a>
          </p>
          <p className="text-[#A9B4C6]/70 text-[13px] mt-10 max-w-md mx-auto">
            Eddystone Mersey Consulting Limited. Company 16665724. Registered in England.
          </p>
        </div>
      </section>
    </>
  )
}

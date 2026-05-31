import CalendlyButton from '../components/CalendlyButton'

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="section-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-16">
          <p className="eyebrow mb-6">About us</p>
          <h1 className="text-navy text-[44px] md:text-[64px] font-bold tracking-tight leading-[1.05] mb-10">
            About us.
          </h1>
          <div className="max-w-3xl text-muted text-[17px] md:text-[18px] leading-relaxed space-y-5">
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
      <section className="section-light border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-6">Founder</p>
              <h2 className="text-navy text-[28px] md:text-[36px] font-bold tracking-tight leading-tight">
                Samuel Field
              </h2>
              <p className="text-muted text-[14px] mt-3">Founder, Eddystone Mersey Consulting</p>
            </div>
            <div className="md:col-span-8 text-muted text-[17px] md:text-[18px] leading-relaxed space-y-5">
              <p>
                Samuel founded Eddystone Mersey Consulting after seven years at HM Land Registry, where he progressed from apprentice to product owner for a workstream that changed how a national service processes applications. That work won a RITA award for delivering operational efficiencies. He moved into consulting to bring GDS service standards and delivery discipline to higher education.
              </p>
              <p>
                Samuel is a product manager by trade, a service designer by practice and a delivery lead by necessity. He does all three because they depend on each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-24 text-center">
          <h2 className="text-white text-[32px] md:text-[44px] font-bold tracking-tight leading-tight mb-6">
            Talk to us.
          </h2>
          <CalendlyButton className="btn-primary">
            Book a call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </CalendlyButton>
          <p className="text-white/70 text-[14px] mt-8">
            <a href="mailto:samuel.field@eddystonemersey.com" className="hover:text-accent transition-colors">
              samuel.field@eddystonemersey.com
            </a>
          </p>
          <p className="text-white/50 text-[13px] mt-10 max-w-md mx-auto">
            Eddystone Mersey Consulting Limited. Company 16665724. Registered in England.
          </p>
        </div>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import CalendlyButton from '../components/CalendlyButton'
import LatestArticles from '../components/LatestArticles'
import TheGap from '../components/diagrams/TheGap'
import { useRevealOnScroll, gsap, prefersReducedMotion } from '../hooks/useScrollAnim'

/**
 * Homepage — concise 5-section company introduction.
 * Hero, the offer (Design Authority), the lead consultant, writing, contact.
 * Design Authority lives on its own showpiece page; the home page funnels to it.
 */
export default function Home() {
  useRevealOnScroll()
  const heroLine = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (heroLine.current) {
      gsap.fromTo(
        heroLine.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, delay: 0.4, ease: 'power2.out', transformOrigin: 'left center' }
      )
    }
  }, [])

  return (
    <>
      {/* 1. HERO — full viewport, deep navy */}
      <section className="section-navy-deep on-dark min-h-[calc(100vh-84px)] flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 text-center w-full">
          <img src="/mark-white.png" alt="" className="h-24 w-auto mx-auto mb-8" data-reveal />
          <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[var(--gold)] mb-6" data-reveal>
            Eddystone Mersey Consulting
          </p>
          <div ref={heroLine} className="w-16 h-[2px] bg-[var(--gold)] mx-auto mb-8" />
          <h1 className="text-white text-[44px] sm:text-[56px] md:text-[68px] font-semibold leading-[1.06] tracking-[-0.025em] max-w-4xl mx-auto mb-6" data-reveal>
            Service design and delivery for the public sector.
          </h1>
          <p className="italic text-[20px] md:text-[22px] text-[#A9B4C6] max-w-2xl mx-auto mb-10" data-reveal>
            Product management. Service design. Delivery leadership.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap" data-reveal>
            <Link to="/design-authority" className="btn-primary">
              See our offer
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <div className="on-dark inline-flex">
              <CalendlyButton className="btn-secondary">
                Book a call
              </CalendlyButton>
            </div>
          </div>
          <div className="mt-20 flex justify-center" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </div>
      </section>

      {/* 2. OUR OFFER — Design Authority */}
      <section className="section-light">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6" data-reveal>Our offer</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]" data-reveal>
            Design Authority for Higher Education.
          </h2>
          <p className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-12" data-reveal>
            We combine governance and delivery to ensure your transformation builds the right thing, first time. Design Authority is our structured approach to filling the gap between strategy and workstream delivery, the design and service-level view that most institutions lack.
          </p>
          <div data-reveal>
            <TheGap />
          </div>
          <div className="mt-14 flex flex-wrap gap-4" data-reveal>
            <Link to="/design-authority" className="btn-primary">
              Explore Design Authority
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. LEAD CONSULTANT — Samuel + 3 capability cards */}
      <section className="section-surface border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6" data-reveal>Lead consultant</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6" data-reveal>
            Samuel Field.
          </h2>
          <div className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed space-y-5 mb-14">
            <p data-reveal>
              Samuel is a product manager by trade, a service designer by practice and a delivery lead who does all three because they depend on each other.
            </p>
            <p data-reveal>
              He spent seven years at HM Land Registry, progressing from apprentice to product owner for a workstream that changed how a national service processes applications. That work won a RITA award for operational efficiencies. He delivers under GDS service standards, 14 points from user research through to live performance, and applies that discipline to higher education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7" data-reveal-stagger>
            {[
              {
                title: 'Product management',
                body: 'We own the backlog, the roadmap and the prioritisation decisions. We work with delivery teams to turn user needs into requirements and make sure teams build what matters most.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h6M7 16h8"/>
                  </svg>
                ),
              },
              {
                title: 'Service design',
                body: 'We research user needs, map end-to-end journeys and blueprint the service across every channel and handoff. We design around the student, not around the org chart.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>
                  </svg>
                ),
              },
              {
                title: 'Delivery leadership',
                body: 'We lead multidisciplinary teams from discovery through to live. We run controlled prototypes to test assumptions before committing resource.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                  </svg>
                ),
              },
            ].map((card) => (
              <div key={card.title} className="emc-card" data-reveal>
                <div className="text-[var(--gold)] mb-5">{card.icon}</div>
                <h3 className="text-navy text-[22px] font-semibold mb-3">{card.title}</h3>
                <p className="text-[var(--grey-text)] text-[15px] leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WRITING TEASER */}
      <section className="section-light border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="eyebrow mb-6" data-reveal>Writing</span>
              <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-4 max-w-[760px]" data-reveal>
                Thinking out loud.
              </h2>
              <p className="text-[var(--grey-text)] text-[18px] leading-relaxed max-w-[600px]" data-reveal>
                Samuel writes about service design, delivery and transformation. Three recent articles below.
              </p>
            </div>
            <Link to="/articles" className="btn-secondary" data-reveal>
              All articles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
          <LatestArticles limit={3} />
        </div>
      </section>

      {/* 5. CONTACT */}
      <section className="section-navy on-dark">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[96px] text-center">
          <span className="eyebrow justify-center mb-6" data-reveal>Start a conversation</span>
          <h2 className="text-white text-[36px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.1] mb-6" data-reveal>
            Let's talk.
          </h2>
          <p className="text-[#A9B4C6] text-[18px] md:text-[19px] leading-relaxed max-w-2xl mx-auto mb-10" data-reveal>
            If your institution is transforming and nobody holds the design and service view, we should have a conversation.
          </p>
          <CalendlyButton className="btn-primary">
            Book a call
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </CalendlyButton>
          <p className="text-[#A9B4C6] text-[14px] mt-10">
            <a href="mailto:samuel.field@eddystonemersey.com" className="hover:text-[var(--gold)] transition-colors">
              samuel.field@eddystonemersey.com
            </a>
            <span className="mx-3 opacity-40">|</span>
            <span>eddystonemersey.com</span>
          </p>
        </div>
      </section>
    </>
  )
}

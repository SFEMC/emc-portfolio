import CalendlyButton from '../components/CalendlyButton'
import ThinkingInServices from '../components/diagrams/ThinkingInServices'
import TheGap from '../components/diagrams/TheGap'
import Funnel from '../components/diagrams/Funnel'
import TestLoop from '../components/diagrams/TestLoop'
import Handover from '../components/diagrams/Handover'

/**
 * Long-form landing page — 13 sections, single scroll.
 * Built to the Eddystone Mersey design system: navy leads, gold accents only,
 * Inter throughout, modest radii, single soft shadow, generous whitespace.
 */
export default function Home() {
  return (
    <>
      {/* 1. HERO — navy primary */}
      <section className="section-navy on-dark">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-28 md:py-36 text-center">
          <img src="/mark-white.png" alt="" className="h-20 w-auto mx-auto mb-10" />
          <span className="eyebrow justify-center mb-8" style={{ color: 'var(--gold)' }}>Eddystone Mersey Consulting</span>
          <h1 className="text-white text-[44px] sm:text-[56px] md:text-[68px] font-semibold leading-[1.06] tracking-[-0.025em] max-w-4xl mx-auto mb-6">
            Design authority for higher education.
          </h1>
          <p className="italic text-[22px] text-[#A9B4C6] max-w-2xl mx-auto mb-12">
            Service design and delivery for the public sector.
          </p>
          <p className="text-white/80 text-[17px] md:text-[18px] leading-relaxed max-w-2xl mx-auto mb-10">
            We combine governance and delivery to ensure your transformation builds the right thing, first time. Product management, service design and delivery leadership across your portfolio.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <CalendlyButton className="btn-primary">
              Book a call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </CalendlyButton>
            <a href="#approach" className="btn-secondary">See how we work</a>
          </div>
        </div>
      </section>

      {/* 2. THINKING IN SERVICES — light */}
      <section className="section-light" id="approach">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6">The shift</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]">
            Thinking in services.
          </h2>
          <div className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed space-y-5 mb-16">
            <p>
              Universities organise around teams and systems, not around the services students use. Your admissions team runs admissions. A student's experience of admissions crosses multiple teams, external bodies and systems that no single department controls. Nobody maps that journey end to end.
            </p>
            <p>
              When you start thinking in services, you see how wide they are. You see the handoffs between teams, the gaps where students wait and the decisions that land on someone in a different part of the organisation. You make better decisions because you see the whole picture.
            </p>
          </div>
          <ThinkingInServices />
        </div>
      </section>

      {/* 3. THE GAP — light */}
      <section className="section-light border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6">The problem</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]">
            The gap.
          </h2>
          <p className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-16">
            Project teams manage their own workstreams. Boards oversee strategy. Between those two layers, nobody holds the design and service-level view. One team changes a process and creates a dependency that another team discovers too late. Each programme has its own governance and nobody checks whether decisions in one area conflict with or undermine work in another.
          </p>
          <TheGap />
        </div>
      </section>

      {/* 4. STATEMENT — navy band */}
      <section className="section-navy on-dark">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[96px] text-center">
          <div className="w-14 h-[2px] bg-[var(--gold)] mx-auto mb-7" />
          <p className="text-white text-[34px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.1] max-w-3xl mx-auto">
            Design authority fills the gap.
          </p>
        </div>
      </section>

      {/* 5. HOW DESIGN AUTHORITY WORKS — light */}
      <section className="section-light">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6">The mechanism</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]">
            How design authority works.
          </h2>
          <p className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-16">
            We funnel every design and service decision through a single point. We catch what comes in and check it against active delivery and the operating model. We route it to the right table with a written recommendation. We make the decisions we can and log them. Where we cannot, we hold the change and escalate with a recommendation for the appropriate board.
          </p>
          <Funnel />
        </div>
      </section>

      {/* 6. WHAT WE BRING — surface white, 3 cards */}
      <section className="section-surface border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6">Our disciplines</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-12 max-w-[760px]">
            What we bring.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                title: 'Product management',
                body: 'We own the backlog, the roadmap and the prioritisation decisions. We work with delivery teams to turn user needs into requirements and make sure teams build what matters most. We bring product discipline to transformation programmes that lack a product function.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h6M7 16h8"/>
                  </svg>
                ),
              },
              {
                title: 'Service design',
                body: 'We research user needs, map end-to-end journeys and blueprint the service across every channel and handoff. We design around the student, not around the org chart. We bring GDS-grade service design rigour to higher education.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>
                  </svg>
                ),
              },
              {
                title: 'Delivery leadership',
                body: 'We lead multidisciplinary teams from discovery through to live. We run controlled prototypes to test assumptions before committing resource. We coach teams on ownership and make sure capability stays after we leave.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
                  </svg>
                ),
              },
            ].map((card) => (
              <div key={card.title} className="emc-card">
                <div className="text-[var(--navy-primary)] mb-5">{card.icon}</div>
                <h3 className="text-navy text-[22px] font-semibold mb-3">{card.title}</h3>
                <p className="text-[var(--grey-text)] text-[15px] leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. START WITH THE STUDENT — light */}
      <section className="section-light border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6">The principle</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]">
            Start with the student.
          </h2>
          <p className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-16">
            Human-centred service design sits at the core of everything we do. Every governance decision starts from the student and works back through the teams who deliver the service. We write design and delivery principles the institution adopts as its standard. Teams check their work against these principles across every workstream.
          </p>
          <div className="text-center max-w-4xl mx-auto pt-6 pb-2">
            <div className="w-14 h-[2px] bg-[var(--gold)] mx-auto mb-7" />
            <p className="text-navy text-[28px] md:text-[40px] font-semibold tracking-[-0.02em] leading-tight">
              Every governance decision starts from the student.
            </p>
          </div>
        </div>
      </section>

      {/* 8. TEST BEFORE YOU COMMIT — light */}
      <section className="section-light border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6">The method</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]">
            Test before you commit.
          </h2>
          <p className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-16">
            We run controlled prototypes to test assumptions before teams commit resource. Each cycle teaches you what to change before you start the next. You build the right thing first time and avoid rework and wasted spend.
          </p>
          <TestLoop />
        </div>
      </section>

      {/* 9. BUILD FOR THE FUTURE — light */}
      <section className="section-light border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6">The legacy</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]">
            Build for the future.
          </h2>
          <p className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-16">
            We write the principles your institution adopts as its standard, coach your staff on human-centred service design and train a successor. Your teams think in services, your governance catches conflicts and your investment delivers what students need.
          </p>
          <Handover />
        </div>
      </section>

      {/* 10. WHAT WE PROTECT — navy band */}
      <section className="section-navy on-dark">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[96px] text-center">
          <p className="text-white text-[28px] md:text-[44px] font-semibold tracking-[-0.02em] leading-tight">
            The student experience.
          </p>
          <div className="w-14 h-[2px] bg-[var(--gold)] mx-auto my-7" />
          <p className="text-white text-[28px] md:text-[44px] font-semibold tracking-[-0.02em] leading-tight">
            Your investment.
          </p>
        </div>
      </section>

      {/* 11. HOW WE WORK WITH YOU — surface white */}
      <section className="section-surface">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6">Ways to work with us</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-12 max-w-[760px]">
            How we work with you.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                ol: 'Option A',
                title: 'Embedded design authority',
                body: 'Our consultant embeds across your workstreams as product manager and service design lead while holding the governance view. We design the operating model, blueprint journeys, write requirements and coach teams. We train a successor so you keep the capability.',
                outcome: 'Governance and delivery in one role.',
                feat: true,
              },
              {
                ol: 'Option B',
                title: 'Framework and coaching',
                body: 'You have someone who can hold the role. You need the model. We design the governance framework, build the artefacts, write the principles and coach your teams. You run it from there.',
                outcome: 'The model and the methodology.',
                feat: false,
              },
              {
                ol: 'Option C',
                title: 'Service design review',
                body: 'You have already invested. You need to know where it breaks. We map the end-to-end user journey and identify where handoffs fail.',
                outcome: 'A findings report with prioritised recommendations.',
                feat: false,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="emc-card flex flex-col"
                style={card.feat ? { boxShadow: '0 0 0 2px var(--gold), 0 1px 2px rgba(15,26,48,.04), 0 4px 16px rgba(15,26,48,.06)', borderColor: 'transparent' } : undefined}
              >
                <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--gold)] mb-3">{card.feat ? 'Recommended' : card.ol}</span>
                <h3 className="text-navy text-[24px] font-semibold mb-3">{card.title}</h3>
                <p className="text-[var(--grey-text)] text-[15px] leading-relaxed mb-6 flex-1">{card.body}</p>
                <div className="pt-4 border-t border-[color:var(--border-card)]">
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--gold)] mb-1">You get</p>
                  <p className="text-navy text-[15px] font-semibold">{card.outcome}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[var(--grey-text)] text-[15px] text-center mt-10 max-w-2xl mx-auto">
            Your institution may need support in a different shape. We are happy to discuss how we might work with your programme or organisation in other ways.
          </p>
        </div>
      </section>

      {/* 12. ABOUT — light with stat */}
      <section className="section-light border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <span className="eyebrow mb-6">About us</span>
              <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6">
                About us.
              </h2>
              <p className="text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed">
                Eddystone Mersey Consulting delivers products and services across UK central government and higher education. Our founder, Samuel Field, spent years delivering in central government under GDS service standards, where teams assess every service against 14 points from user research through to live performance. We apply that same discipline to higher education.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <p className="text-[var(--gold)] text-[96px] md:text-[120px] font-semibold leading-none tracking-[-0.03em]">14</p>
              <p className="text-navy text-[16px] font-semibold tracking-wide mt-3">Service Standard points</p>
              <p className="text-[var(--grey-text)] text-[14px] mt-1">we apply to every engagement</p>
            </div>
          </div>
        </div>
      </section>

      {/* 13. CTA / CONTACT — navy deep band */}
      <section className="section-navy-deep on-dark">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px] text-center">
          <span className="eyebrow justify-center mb-6">Start a conversation</span>
          <h2 className="text-white text-[36px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.1] mb-6">
            Let's talk.
          </h2>
          <p className="text-[#A9B4C6] text-[18px] md:text-[19px] leading-relaxed max-w-2xl mx-auto mb-10">
            If any of this sounds like your institution, we should have a conversation.
          </p>
          <CalendlyButton className="btn-primary">
            Book a call
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </CalendlyButton>
          <p className="text-[#A9B4C6] text-[14px] mt-10">
            <a href="mailto:samuel.field@eddystonemersey.com" className="hover:text-[var(--gold)] transition-colors">
              samuel.field@eddystonemersey.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}

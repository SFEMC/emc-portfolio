import CalendlyButton from '../components/CalendlyButton'
import ThinkingInServices from '../components/diagrams/ThinkingInServices'
import TheGap from '../components/diagrams/TheGap'
import Funnel from '../components/diagrams/Funnel'
import TestLoop from '../components/diagrams/TestLoop'
import Handover from '../components/diagrams/Handover'

/**
 * Long-form landing page — 13 sections, single scroll.
 * Alternates between warm-white content sections and navy statement bands.
 * Sections numbered to match website-redesign-brief.md.
 */
export default function Home() {
  return (
    <>
      {/* 1. HERO — deep navy */}
      <section className="section-navy-deep">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 text-center">
          <div className="inline-block mb-8 bg-white rounded-xl p-2 shadow-sm">
            <img src="/logo-navy.jpg" alt="" className="h-20 w-auto" />
          </div>
          <p className="text-accent text-[12px] font-semibold tracking-[0.22em] uppercase mb-6">
            Eddystone Mersey Consulting
          </p>
          <h1 className="text-white text-[40px] sm:text-[56px] md:text-[68px] font-bold leading-[1.05] tracking-tight mb-4">
            Design Authority for<br />Higher Education
          </h1>
          <div className="w-16 h-[2px] bg-accent mx-auto my-6" />
          <p className="text-white/80 text-[18px] md:text-[20px] font-medium mb-10">
            Service Design and Delivery for the Public Sector
          </p>
          <p className="text-white/70 text-[16px] md:text-[17px] leading-relaxed max-w-2xl mx-auto mb-10">
            We combine governance and delivery to ensure your transformation builds the right thing, first time. Product management, service design and delivery leadership across your portfolio.
          </p>
          <CalendlyButton className="btn-primary">
            Book a call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </CalendlyButton>
        </div>
      </section>

      {/* 2. THINKING IN SERVICES — light */}
      <section className="section-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-28">
          <p className="eyebrow mb-6">The shift</p>
          <h2 className="text-navy text-[36px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-8">
            Thinking in services.
          </h2>
          <div className="max-w-3xl text-muted text-[17px] md:text-[18px] leading-relaxed space-y-5 mb-16">
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
      <section className="section-light border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-28">
          <p className="eyebrow mb-6">The problem</p>
          <h2 className="text-navy text-[36px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-8">
            The gap.
          </h2>
          <p className="max-w-3xl text-muted text-[17px] md:text-[18px] leading-relaxed mb-16">
            Project teams manage their own workstreams. Boards oversee strategy. Between those two layers, nobody holds the design and service-level view. One team changes a process and creates a dependency that another team discovers too late. Each programme has its own governance and nobody checks whether decisions in one area conflict with or undermine work in another.
          </p>
          <TheGap />
        </div>
      </section>

      {/* 4. STATEMENT — navy band */}
      <section className="section-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
          <div className="w-16 h-[2px] bg-accent mx-auto mb-8" />
          <p className="text-white text-[32px] md:text-[48px] font-bold tracking-tight leading-tight">
            Design authority fills the gap.
          </p>
          <div className="w-16 h-[2px] bg-accent mx-auto mt-8" />
        </div>
      </section>

      {/* 5. HOW DESIGN AUTHORITY WORKS — light */}
      <section className="section-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-28">
          <p className="eyebrow mb-6">The mechanism</p>
          <h2 className="text-navy text-[36px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-8">
            How design authority works.
          </h2>
          <p className="max-w-3xl text-muted text-[17px] md:text-[18px] leading-relaxed mb-16">
            We funnel every design and service decision through a single point. We catch what comes in and check it against active delivery and the operating model. We route it to the right table with a written recommendation. We make the decisions we can and log them. Where we cannot, we hold the change and escalate with a recommendation for the appropriate board.
          </p>
          <Funnel />
        </div>
      </section>

      {/* 6. WHAT WE BRING — light, 3 cards */}
      <section className="section-light border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-28">
          <p className="eyebrow mb-6">Our disciplines</p>
          <h2 className="text-navy text-[36px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-12">
            What we bring.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Product management',
                body: 'We own the backlog, the roadmap and the prioritisation decisions. We work with delivery teams to turn user needs into requirements and make sure teams build what matters most. We bring product discipline to transformation programmes that lack a product function.',
              },
              {
                title: 'Service design',
                body: 'We research user needs, map end-to-end journeys and blueprint the service across every channel and handoff. We design around the student, not around the org chart. We bring GDS-grade service design rigour to higher education.',
              },
              {
                title: 'Delivery leadership',
                body: 'We lead multidisciplinary teams from discovery through to live. We run controlled prototypes to test assumptions before committing resource. We coach teams on ownership and make sure capability stays after we leave.',
              },
            ].map((card) => (
              <div key={card.title} className="emc-card">
                <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent flex items-center justify-center mb-5">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <h3 className="text-navy text-[20px] font-bold mb-3">{card.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. START WITH THE STUDENT — light */}
      <section className="section-light border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-28">
          <p className="eyebrow mb-6">The principle</p>
          <h2 className="text-navy text-[36px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-8">
            Start with the student.
          </h2>
          <p className="max-w-3xl text-muted text-[17px] md:text-[18px] leading-relaxed mb-16">
            Human-centred service design sits at the core of everything we do. Every governance decision starts from the student and works back through the teams who deliver the service. We write design and delivery principles the institution adopts as its standard. Teams check their work against these principles across every workstream.
          </p>
          <div className="text-center max-w-4xl mx-auto pt-8 pb-4">
            <p className="text-accent text-[28px] md:text-[40px] font-bold tracking-tight leading-tight">
              "Every governance decision starts from the student."
            </p>
          </div>
        </div>
      </section>

      {/* 8. TEST BEFORE YOU COMMIT — light */}
      <section className="section-light border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-28">
          <p className="eyebrow mb-6">The method</p>
          <h2 className="text-navy text-[36px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-8">
            Test before you commit.
          </h2>
          <p className="max-w-3xl text-muted text-[17px] md:text-[18px] leading-relaxed mb-16">
            We run controlled prototypes to test assumptions before teams commit resource. Each cycle teaches you what to change before you start the next. You build the right thing first time and avoid rework and wasted spend.
          </p>
          <TestLoop />
        </div>
      </section>

      {/* 9. BUILD FOR THE FUTURE — light */}
      <section className="section-light border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-28">
          <p className="eyebrow mb-6">The legacy</p>
          <h2 className="text-navy text-[36px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-8">
            Build for the future.
          </h2>
          <p className="max-w-3xl text-muted text-[17px] md:text-[18px] leading-relaxed mb-16">
            We write the principles your institution adopts as its standard, coach your staff on human-centred service design and train a successor. Your teams think in services, your governance catches conflicts and your investment delivers what students need.
          </p>
          <Handover />
        </div>
      </section>

      {/* 10. WHAT WE PROTECT — navy band */}
      <section className="section-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
          <p className="text-white text-[28px] md:text-[44px] font-bold tracking-tight leading-tight">
            The student experience.
          </p>
          <div className="w-16 h-[2px] bg-accent mx-auto my-6" />
          <p className="text-white text-[28px] md:text-[44px] font-bold tracking-tight leading-tight">
            Your investment.
          </p>
        </div>
      </section>

      {/* 11. HOW WE WORK WITH YOU — light, 3 engagement cards */}
      <section className="section-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-28">
          <p className="eyebrow mb-6">Engagements</p>
          <h2 className="text-navy text-[36px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-12">
            How we work with you.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Embedded design authority',
                body: 'Our consultant embeds across your workstreams as product manager and service design lead while holding the governance view. We design the operating model, blueprint journeys, write requirements and coach teams. We train a successor so you keep the capability.',
                outcome: 'Governance and delivery in one role.',
              },
              {
                title: 'Framework and coaching',
                body: 'You have someone who can hold the role. You need the model. We design the governance framework, build the artefacts, write the principles and coach your teams. You run it from there.',
                outcome: 'The model and the methodology.',
              },
              {
                title: 'Service design review',
                body: 'You have already invested. You need to know where it breaks. We map the end-to-end user journey and identify where handoffs fail.',
                outcome: 'A findings report with prioritised recommendations.',
              },
            ].map((card) => (
              <div key={card.title} className="emc-card flex flex-col">
                <h3 className="text-navy text-[20px] font-bold mb-3">{card.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed mb-6 flex-1">{card.body}</p>
                <div className="pt-5 border-t border-border">
                  <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-accent mb-1">You get</p>
                  <p className="text-navy text-[15px] font-medium">{card.outcome}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted text-[15px] text-center mt-10 max-w-2xl mx-auto">
            Your institution may need support in a different shape. We are happy to discuss how we might work with your programme or organisation in other ways.
          </p>
        </div>
      </section>

      {/* 12. ABOUT — light with pull-out stat */}
      <section className="section-light border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-7">
              <p className="eyebrow mb-6">About us</p>
              <h2 className="text-navy text-[36px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-8">
                About us.
              </h2>
              <div className="text-muted text-[17px] md:text-[18px] leading-relaxed space-y-5">
                <p>
                  Eddystone Mersey Consulting delivers products and services across UK central government and higher education. Our founder, Samuel Field, spent years delivering in central government under GDS service standards, where teams assess every service against 14 points from user research through to live performance. We apply that same discipline to higher education.
                </p>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center pt-8 md:pt-16">
              <p className="text-accent text-[120px] md:text-[160px] font-bold leading-none tracking-tighter">14</p>
              <p className="text-navy text-[15px] font-semibold tracking-wide mt-2">Service Standard points</p>
              <img src="/logo-navy.jpg" alt="" className="h-20 w-auto mix-blend-multiply mt-8 opacity-90" />
            </div>
          </div>
        </div>
      </section>

      {/* 13. CTA / CONTACT — navy band */}
      <section className="section-navy-deep">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-28 text-center">
          <h2 className="text-white text-[36px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-6">
            Let's talk.
          </h2>
          <p className="text-white/75 text-[17px] md:text-[18px] leading-relaxed max-w-2xl mx-auto mb-10">
            If any of this sounds like your institution, we should have a conversation.
          </p>
          <CalendlyButton className="btn-primary">
            Book a call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </CalendlyButton>
          <p className="text-white/60 text-[14px] mt-10">
            <a href="mailto:samuel.field@eddystonemersey.com" className="hover:text-accent transition-colors">
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

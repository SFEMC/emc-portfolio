import { useEffect, useRef, useState } from 'react'
import CalendlyButton from '../components/CalendlyButton'
import { useRevealOnScroll, gsap, ScrollTrigger, prefersReducedMotion } from '../hooks/useScrollAnim'

const scenarios = [
  {
    key: 'role',
    headline: 'We need someone in the role',
    blurb: 'Nobody holds the design view across our workstreams. We need someone to fill it and deliver.',
    tier: {
      name: 'Embedded design authority',
      ol: 'Tier 1',
      what: 'Our consultant embeds across your workstreams as product manager and service design lead while holding the governance view across all of them. We design the future state operating model and blueprint end-to-end journeys. We write the user-centred requirements your delivery teams build from and test the riskiest assumptions through controlled prototypes before you commit resource. We coach your staff on human-centred service design and train a successor so you keep the capability after we leave.',
      get: [
        'Governance and delivery in one role',
        'Future state operating model',
        'End-to-end service blueprints',
        'User-centred requirements for your delivery teams',
        'Design and delivery principles the institution adopts as its standard',
        'A trained successor who carries the capability forward',
      ],
      shape: 'Full-time contract. Duration depends on the transformation scope. We scope this together.',
    },
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="2.5"/>
      </svg>
    ),
  },
  {
    key: 'model',
    headline: 'We have someone, we need the model',
    blurb: 'We have a person who could hold this role but no governance framework or methodology to give them.',
    tier: {
      name: 'Framework and coaching',
      ol: 'Tier 2',
      what: 'We design your governance framework and build the artefacts: intake records, recommendation templates, change register and authority levels. We write the design and delivery principles and coach your teams on service ownership and delivery. We hand over the methodology and you run it from there.',
      get: [
        'A complete governance framework with ready-to-use artefacts',
        'Design and delivery principles',
        'Coached teams who understand service ownership',
        'The methodology to run it independently',
      ],
      shape: 'Shorter engagement, typically weeks to a few months. We design, coach and hand over.',
    },
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/>
      </svg>
    ),
  },
  {
    key: 'review',
    headline: "We've invested but the service has come unstuck",
    blurb: "We've put resource into a transformation or technology programme and need to understand where it breaks.",
    tier: {
      name: 'Service design review',
      ol: 'Tier 3',
      what: 'We review your existing transformation, technology programme or service redesign through a service design lens. We map the end-to-end user journey and identify where handoffs fail and where teams work around the system rather than through it.',
      get: [
        'End-to-end user journey map',
        'Identification of where handoffs break',
        'A findings report with prioritised recommendations you can act on',
        'Clear view of what to fix before committing more resource',
      ],
      shape: 'Fixed-scope review, typically 4 to 8 weeks. We diagnose and recommend.',
    },
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    ),
  },
] as const

export default function DesignAuthority() {
  useRevealOnScroll()
  const [selected, setSelected] = useState<string>('role')

  // ===== Animated diagrams =====
  const journeyLineRef = useRef<SVGLineElement | null>(null)
  const journeyDotsRef = useRef<SVGGElement | null>(null)
  const journeyLabelsRef = useRef<HTMLDivElement | null>(null)
  const journeyContainerRef = useRef<HTMLDivElement | null>(null)

  const gapTopRef = useRef<HTMLDivElement | null>(null)
  const gapBottomRef = useRef<HTMLDivElement | null>(null)
  const gapMiddleRef = useRef<HTMLDivElement | null>(null)
  const gapContainerRef = useRef<HTMLDivElement | null>(null)

  const funnelPathRef = useRef<SVGPathElement | null>(null)
  const funnelInputsRef = useRef<HTMLDivElement | null>(null)
  const funnelOutputsRef = useRef<HTMLDivElement | null>(null)

  const loopCircleRef = useRef<SVGCircleElement | null>(null)
  const loopNodesRef = useRef<HTMLDivElement | null>(null)
  const loopCommitRef = useRef<HTMLDivElement | null>(null)
  const loopArrowRef = useRef<SVGPathElement | null>(null)
  const loopContainerRef = useRef<HTMLDivElement | null>(null)

  const handoverLeftRef = useRef<HTMLDivElement | null>(null)
  const handoverRightRef = useRef<HTMLDivElement | null>(null)
  const handoverArrowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const triggers: ScrollTrigger[] = []

    // ----- Journey line + dots + labels -----
    if (journeyLineRef.current && journeyContainerRef.current) {
      const line = journeyLineRef.current
      const length = line.getTotalLength?.() ?? 400
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      const dots = journeyDotsRef.current?.querySelectorAll('circle') ?? []
      const labels = journeyLabelsRef.current?.querySelectorAll('[data-journey-label]') ?? []
      gsap.set(dots, { opacity: 0, scale: 0, transformOrigin: 'center' })
      gsap.set(labels, { opacity: 0, y: 8 })
      triggers.push(
        ScrollTrigger.create({
          trigger: journeyContainerRef.current,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline()
            tl.to(line, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' })
              .to(dots, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.2, ease: 'back.out(2)' }, '-=0.4')
              .to(labels, { opacity: 1, y: 0, duration: 0.4, stagger: 0.2, ease: 'power2.out' }, '-=0.6')
          },
        })
      )
    }

    // ----- Gap layers -----
    if (gapContainerRef.current && gapTopRef.current && gapBottomRef.current && gapMiddleRef.current) {
      gsap.set(gapTopRef.current, { opacity: 0, x: -40 })
      gsap.set(gapBottomRef.current, { opacity: 0, x: 40 })
      gsap.set(gapMiddleRef.current, { opacity: 0, scale: 0.96 })
      triggers.push(
        ScrollTrigger.create({
          trigger: gapContainerRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline()
            tl.to(gapTopRef.current, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
              .to(gapBottomRef.current, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
              .to(gapMiddleRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '+=0.2')
          },
        })
      )
    }

    // ----- Funnel draw + inputs/outputs slide -----
    if (funnelPathRef.current) {
      const p = funnelPathRef.current
      const len = p.getTotalLength()
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      const inputs = funnelInputsRef.current?.querySelectorAll('[data-funnel-input]') ?? []
      const outputs = funnelOutputsRef.current?.querySelectorAll('[data-funnel-output]') ?? []
      gsap.set(inputs, { opacity: 0, x: -30 })
      gsap.set(outputs, { opacity: 0, x: 30 })
      triggers.push(
        ScrollTrigger.create({
          trigger: p,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline()
            tl.to(p, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' })
              .to(inputs, { opacity: 1, x: 0, duration: 0.5, stagger: 0.2, ease: 'power2.out' }, '-=0.4')
              .to(outputs, { opacity: 1, x: 0, duration: 0.5, stagger: 0.25, ease: 'power2.out' }, '-=0.6')
          },
        })
      )
    }

    // ----- Loop animation -----
    if (loopCircleRef.current && loopContainerRef.current && loopNodesRef.current) {
      const c = loopCircleRef.current
      const len = 2 * Math.PI * 100
      gsap.set(c, { strokeDasharray: len, strokeDashoffset: len })
      const nodes = loopNodesRef.current.querySelectorAll('[data-loop-node]')
      gsap.set(nodes, { opacity: 0, scale: 0.8, transformOrigin: 'center' })
      if (loopCommitRef.current) gsap.set(loopCommitRef.current, { opacity: 0, x: 20 })
      if (loopArrowRef.current) {
        const al = loopArrowRef.current.getTotalLength()
        gsap.set(loopArrowRef.current, { strokeDasharray: al, strokeDashoffset: al })
      }
      triggers.push(
        ScrollTrigger.create({
          trigger: loopContainerRef.current,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline()
            tl.to(nodes, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.3, ease: 'back.out(2)' })
              .to(c, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, '-=0.4')
            if (loopArrowRef.current) {
              tl.to(loopArrowRef.current, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, '+=0.1')
            }
            if (loopCommitRef.current) {
              tl.to(loopCommitRef.current, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
            }
          },
        })
      )
    }

    // ----- Handover cards -----
    if (handoverLeftRef.current && handoverRightRef.current && handoverArrowRef.current) {
      gsap.set(handoverLeftRef.current, { opacity: 0, x: -40 })
      gsap.set(handoverRightRef.current, { opacity: 0, x: 40 })
      gsap.set(handoverArrowRef.current, { opacity: 0, scale: 0.8 })
      triggers.push(
        ScrollTrigger.create({
          trigger: handoverLeftRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline()
            tl.to(handoverLeftRef.current, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
              .to(handoverArrowRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, '-=0.2')
              .to(handoverRightRef.current, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
          },
        })
      )
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <>
      {/* 1. HERO */}
      <section className="section-navy-deep on-dark min-h-[calc(100vh-84px)] flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 text-center w-full">
          <img src="/logo-white.png" alt="Eddystone Mersey Consulting" className="h-24 md:h-28 w-auto mx-auto mb-10" data-reveal />
          <h1 className="text-white text-[56px] sm:text-[72px] md:text-[88px] font-semibold leading-[1.04] tracking-[-0.03em] mb-6" data-reveal>
            Design Authority.
          </h1>
          <p className="text-white text-[20px] md:text-[24px] font-semibold mb-3" data-reveal>
            Service design and delivery for higher education.
          </p>
          <p className="italic text-[18px] md:text-[20px] text-[var(--gold)] max-w-2xl mx-auto mb-12" data-reveal>
            Ensuring the success of your transformation portfolio.
          </p>
          <div className="w-16 h-[2px] bg-[var(--gold)] mx-auto mb-12" data-reveal />
          <div className="flex justify-center" aria-hidden="true">
            <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#A9B4C6] mb-3">Scroll to explore</p>
          </div>
          <div className="flex justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </div>
      </section>

      {/* 2. THINKING IN SERVICES */}
      <section className="section-light">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6" data-reveal>The shift</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]" data-reveal>
            Thinking in services.
          </h2>
          <div className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed space-y-5 mb-16">
            <p data-reveal>
              Universities organise around teams and systems, not around the services students use. Your admissions team runs admissions. A student's experience of admissions crosses multiple teams, external bodies and systems that no single department controls. Nobody maps that journey end to end.
            </p>
            <p data-reveal>
              When you start thinking in services, you see how wide they are. You see the handoffs between teams, the gaps where students wait and the decisions that land on someone in a different part of the organisation.
            </p>
          </div>

          {/* Two panels */}
          <div ref={journeyContainerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: teams */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 rounded-full border border-[var(--gold)] flex items-center justify-center text-[12px] font-semibold text-[var(--gold)]">A</span>
                <span className="text-[15px] font-semibold text-navy">Thinking in teams</span>
              </div>
              <div className="grid grid-cols-2 gap-4" data-reveal-stagger>
                {['Admissions', 'IT', 'Accommodation', 'Finance'].map((t) => (
                  <div key={t} className="bg-white border border-navy rounded-lg py-12 flex items-center justify-center" data-reveal>
                    <span className="text-[16px] font-semibold text-navy">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: services with overlay line */}
            <div className="lg:border-l lg:border-[color:var(--border-light)] lg:pl-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 rounded-full border border-[var(--gold)] flex items-center justify-center text-[12px] font-semibold text-[var(--gold)]">B</span>
                <span className="text-[15px] font-semibold text-navy">Thinking in services</span>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {['Admissions', 'IT', 'Accommodation', 'Finance'].map((t) => (
                    <div key={t} className="bg-white border border-[color:var(--border-card)] rounded-lg py-12 flex items-center justify-center">
                      <span className="text-[16px] font-semibold text-navy opacity-60">{t}</span>
                    </div>
                  ))}
                </div>
                <svg viewBox="0 0 400 40" className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-10 pointer-events-none" preserveAspectRatio="none">
                  <line ref={journeyLineRef} x1="20" y1="20" x2="380" y2="20" stroke="var(--gold)" strokeWidth="2" />
                  <g ref={journeyDotsRef}>
                    {[40, 140, 260, 360].map((cx) => (
                      <circle key={cx} cx={cx} cy="20" r="5" fill="var(--gold)" />
                    ))}
                  </g>
                </svg>
                <div ref={journeyLabelsRef} className="grid grid-cols-4 gap-2 absolute left-0 right-0 top-1/2 -translate-y-[260%] text-[11px] font-semibold text-navy uppercase tracking-wider pointer-events-none">
                  <span className="text-left pl-2" data-journey-label>Apply</span>
                  <span className="text-center" data-journey-label>Offer</span>
                  <span className="text-center" data-journey-label>Enrol</span>
                  <span className="text-right pr-2" data-journey-label>Arrive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE GAP */}
      <section className="section-light border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6" data-reveal>The problem</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]" data-reveal>
            The gap.
          </h2>
          <p className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-16" data-reveal>
            Project teams manage their own workstreams. Boards oversee strategy. Between those two layers, nobody holds the design and service-level view. One team changes a process and creates a dependency that another team discovers too late. Each programme has its own governance and nobody checks whether decisions in one area conflict with or undermine work in another.
          </p>
          <div ref={gapContainerRef} className="flex flex-col gap-5 max-w-4xl mx-auto">
            <div ref={gapTopRef} className="bg-navy rounded-lg px-8 py-7 flex items-center justify-between">
              <span className="text-white font-semibold text-[18px]">Strategy and governance</span>
              <span className="text-white/60 text-[14px] hidden sm:block">Boards, committees, strategic direction</span>
            </div>
            <div ref={gapMiddleRef}>
              <p className="eyebrow inline-flex justify-center w-full mb-4">Nobody holds this view</p>
              <div className="border-2 border-dashed border-[var(--gold)] rounded-lg px-8 py-7 flex items-center justify-between">
                <span className="text-[var(--gold)] font-semibold text-[18px]">Design and service-level view</span>
                <span className="text-[var(--grey-text)] text-[14px] hidden sm:block">No owner. Conflicts surface too late.</span>
              </div>
            </div>
            <div ref={gapBottomRef} className="bg-navy rounded-lg px-8 py-7 flex items-center justify-between">
              <span className="text-white font-semibold text-[18px]">Workstream delivery</span>
              <span className="text-white/60 text-[14px] hidden sm:block">Project teams, sprint cadences, technical build</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATEMENT */}
      <section className="section-navy on-dark min-h-[60vh] flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 text-center w-full">
          <div className="w-14 h-[2px] bg-[var(--gold)] mx-auto mb-8" data-reveal />
          <p className="text-white text-[36px] md:text-[60px] font-semibold tracking-[-0.02em] leading-[1.08] max-w-3xl mx-auto" data-reveal>
            Design authority fills the gap.
          </p>
          <div className="w-14 h-[2px] bg-[var(--gold)] mx-auto mt-8" data-reveal />
        </div>
      </section>

      {/* 5. THE FUNNEL */}
      <section className="section-light">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6" data-reveal>The mechanism</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]" data-reveal>
            How design authority works.
          </h2>
          <p className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-16" data-reveal>
            We funnel every design and service decision through a single point. We catch what comes in and check it against active delivery and the operating model. We route it to the right table with a written recommendation. We make the decisions we can and log them. Where we cannot, we hold the change and escalate with a recommendation for the appropriate board.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div ref={funnelInputsRef} className="md:col-span-4 flex flex-col gap-3">
              {['Workstream A', 'Workstream B', 'External body', 'Programme board'].map((input) => (
                <div key={input} data-funnel-input className="border border-navy rounded-full px-6 py-3 text-center bg-white">
                  <span className="text-[15px] font-medium text-navy">{input}</span>
                </div>
              ))}
            </div>
            <div className="md:col-span-4 flex flex-col items-center">
              <p className="text-[13px] font-semibold text-navy mb-3 text-center">All design &amp; service decisions</p>
              <svg viewBox="0 0 220 200" className="w-full max-w-[260px] h-auto" aria-hidden="true">
                <path ref={funnelPathRef} d="M 10 10 L 210 10 L 130 140 L 130 190 L 90 190 L 90 140 Z" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinejoin="round" />
                <text x="110" y="80" textAnchor="middle" fill="var(--navy)" fontSize="14" fontWeight="600" fontFamily="Inter">Design authority</text>
                <text x="110" y="98" textAnchor="middle" fill="var(--grey-text)" fontSize="11" fontFamily="Inter">The triage point</text>
                <line x1="90" y1="115" x2="130" y2="115" stroke="var(--gold)" strokeWidth="2" />
              </svg>
            </div>
            <div ref={funnelOutputsRef} className="md:col-span-4 flex flex-col gap-3">
              {[
                { title: 'Decide and log', sub: 'We make the call and record it.', colour: '#5BA56B' },
                { title: 'Hold and flag', sub: 'Conflicts with active delivery.', colour: '#C9A44B' },
                { title: 'Escalate with recommendation', sub: 'Route to the appropriate board.', colour: 'var(--navy)' },
              ].map((out) => (
                <div key={out.title} data-funnel-output className="border border-navy rounded-lg px-4 py-3 bg-white flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ background: out.colour }} />
                  <div>
                    <p className="text-[15px] font-semibold text-navy leading-snug">{out.title}</p>
                    <p className="text-[13px] text-[var(--grey-text)] mt-0.5">{out.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. START WITH THE STUDENT */}
      <section className="section-light border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6" data-reveal>The principle</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]" data-reveal>
            Start with the end user.
          </h2>
          <p className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-16" data-reveal>
            Human-centred service design sits at the core of everything we do. Every governance decision starts from the end user and works back through the teams who deliver the service. We write design and delivery principles the institution adopts as its standard. Teams check their work against these principles across every workstream.
          </p>
          <div className="text-center max-w-4xl mx-auto pt-6 pb-2">
            <p className="text-[32px] md:text-[48px] font-semibold tracking-[-0.02em] leading-tight">
              <span className="text-navy" data-reveal>Every governance decision </span>
              <span className="text-[var(--gold)]" data-reveal>starts from the end user.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 7. TEST BEFORE YOU COMMIT */}
      <section className="section-light border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6" data-reveal>The method</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]" data-reveal>
            Test before you commit.
          </h2>
          <p className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-16" data-reveal>
            We run controlled prototypes to test assumptions before teams commit resource. Each cycle teaches you what to change before you start the next. You build the right thing first time and avoid rework and wasted spend.
          </p>
          <div ref={loopContainerRef} className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="relative w-[360px] h-[280px]">
              <svg viewBox="0 0 360 280" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <circle ref={loopCircleRef} cx="180" cy="140" r="100" fill="none" stroke="var(--navy)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                <text x="180" y="135" textAnchor="middle" fill="var(--gold)" fontSize="12" fontWeight="600" fontFamily="Inter" letterSpacing="0.1em">REPEAT UNTIL</text>
                <text x="180" y="152" textAnchor="middle" fill="var(--gold)" fontSize="12" fontWeight="600" fontFamily="Inter" letterSpacing="0.1em">CONFIDENT</text>
              </svg>
              <div ref={loopNodesRef}>
                <div data-loop-node className="absolute top-0 left-1/2 -translate-x-1/2 bg-white border border-navy rounded-md px-5 py-2.5">
                  <span className="text-[15px] font-semibold text-navy">Prototype</span>
                </div>
                <div data-loop-node className="absolute top-1/2 right-0 -translate-y-1/2 bg-white border border-navy rounded-md px-5 py-2.5">
                  <span className="text-[15px] font-semibold text-navy">Test</span>
                </div>
                <div data-loop-node className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border border-navy rounded-md px-5 py-2.5">
                  <span className="text-[15px] font-semibold text-navy">Learn</span>
                </div>
                <div data-loop-node className="absolute top-1/2 left-0 -translate-y-1/2 bg-white border border-navy rounded-md px-5 py-2.5">
                  <span className="text-[15px] font-semibold text-navy">Refine</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg width="48" height="20" viewBox="0 0 48 20" className="text-[var(--gold)]" aria-hidden="true">
                <path ref={loopArrowRef} d="M 0 10 L 38 10" stroke="currentColor" strokeWidth="2" fill="none" />
                <polygon points="48,10 38,5 38,15" fill="currentColor" />
              </svg>
              <div ref={loopCommitRef} className="border-2 border-[var(--gold)] rounded-md px-6 py-3 bg-white">
                <span className="text-[16px] font-semibold text-navy">Commit resource</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BUILD FOR THE FUTURE */}
      <section className="section-light border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6" data-reveal>The legacy</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6 max-w-[760px]" data-reveal>
            Build for the future.
          </h2>
          <p className="max-w-[680px] text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-16" data-reveal>
            We write the principles your institution adopts as its standard, coach your staff on human-centred service design and train a successor. Your teams think in services, your governance catches conflicts and your investment delivers what students need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-stretch">
            <div ref={handoverLeftRef} className="bg-navy rounded-lg p-8 flex flex-col">
              <p className="text-[var(--gold)] text-[12px] font-semibold tracking-[0.18em] uppercase mb-4">During</p>
              <h3 className="text-white text-[24px] font-semibold mb-3">Our engagement</h3>
              <p className="text-white/75 text-[15px] leading-relaxed">
                We design the operating model, blueprint journeys, write principles and lead delivery, coaching your teams alongside the work.
              </p>
            </div>
            <div ref={handoverArrowRef} className="flex md:flex-col items-center justify-center gap-3 py-4 md:py-0">
              <div className="w-12 h-12 rounded-full border-2 border-[var(--gold)] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
              <p className="text-[var(--gold)] text-[11px] font-semibold tracking-[0.18em] uppercase text-center">Clean<br className="hidden md:block" /> handover</p>
            </div>
            <div ref={handoverRightRef} className="bg-white border border-[color:var(--border-card)] rounded-lg p-8 flex flex-col">
              <p className="text-[var(--gold)] text-[12px] font-semibold tracking-[0.18em] uppercase mb-4">After</p>
              <h3 className="text-navy text-[24px] font-semibold mb-3">Your capability</h3>
              <p className="text-[var(--grey-text)] text-[15px] leading-relaxed">
                A trained successor holds the role. The principles, artefacts and methodology stay with your institution and keep working.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. STATEMENT 2 */}
      <section className="section-navy on-dark min-h-[60vh] flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 text-center w-full">
          <p className="text-white text-[28px] md:text-[48px] font-semibold tracking-[-0.02em] leading-tight" data-reveal>
            The student experience.
          </p>
          <div className="w-14 h-[2px] bg-[var(--gold)] mx-auto my-8" data-reveal />
          <p className="text-white text-[28px] md:text-[48px] font-semibold tracking-[-0.02em] leading-tight" data-reveal>
            Your investment.
          </p>
        </div>
      </section>

      {/* 10. INTERACTIVE ENGAGEMENT CHOOSER */}
      <section className="section-light">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <span className="eyebrow mb-6" data-reveal>Engagements</span>
          <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-3 max-w-[760px]" data-reveal>
            How we work with you.
          </h2>
          <p className="text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-12" data-reveal>
            What does your institution need?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10" data-reveal-stagger>
            {scenarios.map((s) => {
              const active = selected === s.key
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSelected(s.key)}
                  data-reveal
                  className="text-left p-6 rounded-lg transition-all duration-200 bg-white"
                  style={{
                    border: active ? '2px solid var(--gold)' : '1px solid var(--border-card)',
                    opacity: active ? 1 : 0.75,
                    boxShadow: active ? 'var(--shadow-card)' : 'none',
                  }}
                  aria-pressed={active}
                >
                  <div className="text-[var(--gold)] mb-4">{s.icon}</div>
                  <h3 className="text-navy text-[18px] font-semibold leading-snug mb-3">{s.headline}</h3>
                  <p className="text-[var(--grey-text)] text-[14px] leading-relaxed">{s.blurb}</p>
                </button>
              )
            })}
          </div>

          {/* Expanded tier */}
          {scenarios.map((s) => {
            if (s.key !== selected) return null
            return (
              <div
                key={s.key}
                className="emc-card mt-2"
                style={{ borderColor: 'var(--gold)', borderWidth: '1px' }}
              >
                <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
                  <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[var(--gold)]">{s.tier.ol}</span>
                  <h4 className="text-navy text-[26px] font-semibold flex-1">{s.tier.name}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-7">
                    <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--gold)] mb-3">What we do</p>
                    <p className="text-[var(--grey-text)] text-[16px] leading-relaxed">{s.tier.what}</p>
                    <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--gold)] mt-7 mb-2">Engagement shape</p>
                    <p className="text-[var(--grey-text)] text-[15px] leading-relaxed">{s.tier.shape}</p>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--gold)] mb-3">What you get</p>
                    <ul className="space-y-2.5">
                      {s.tier.get.map((g) => (
                        <li key={g} className="text-[var(--grey-text)] text-[15px] leading-relaxed flex items-start gap-2.5">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-7 pt-6 border-t border-[color:var(--border-card)] flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[var(--grey-text)] text-[14px]">Sound like a fit?</p>
                  <CalendlyButton className="btn-primary">
                    Book a call
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </CalendlyButton>
                </div>
              </div>
            )
          })}

          <p className="text-[var(--grey-text)] text-[15px] text-center mt-10 max-w-2xl mx-auto">
            Your institution may need support in a different shape. We are happy to discuss how we might work with your programme or organisation in other ways.
          </p>
        </div>
      </section>

      {/* 11. ABOUT */}
      <section className="section-light border-t border-[color:var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <span className="eyebrow mb-6" data-reveal>About us</span>
              <h2 className="text-navy text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.12] mt-5 mb-6" data-reveal>
                About us.
              </h2>
              <p className="text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed" data-reveal>
                Eddystone Mersey Consulting delivers products and services across UK central government and higher education. Our founder, Samuel Field, spent years delivering in central government under GDS service standards, where teams assess every service against 14 points from user research through to live performance. We apply that same discipline to higher education.
              </p>
            </div>
            <div className="md:col-span-5 bg-navy rounded-lg p-10 text-center" data-reveal>
              <p className="text-[var(--gold)] text-[120px] md:text-[140px] font-semibold leading-none tracking-[-0.03em]">14</p>
              <p className="text-white text-[16px] font-semibold tracking-wide mt-3">Service Standard points</p>
              <p className="text-[#A9B4C6] text-[14px] mt-2">we apply to every engagement</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CONTACT */}
      <section className="section-navy on-dark">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-[110px] text-center">
          <img src="/logo-white.png" alt="Eddystone Mersey Consulting" className="h-20 w-auto mx-auto mb-8" data-reveal />
          <span className="eyebrow justify-center mb-6" data-reveal>Start a conversation</span>
          <h2 className="text-white text-[36px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.1] mb-6" data-reveal>
            Let's talk.
          </h2>
          <p className="text-[#A9B4C6] text-[17px] mb-2" data-reveal>
            <strong className="text-white font-semibold">Samuel Field</strong>
          </p>
          <p className="text-[#A9B4C6] text-[15px] mb-10" data-reveal>
            <a href="mailto:samuel.field@eddystonemersey.com" className="hover:text-[var(--gold)] transition-colors">
              samuel.field@eddystonemersey.com
            </a>
            <span className="mx-3 opacity-40">|</span>
            <span>eddystonemersey.com</span>
          </p>
          <CalendlyButton className="btn-primary">
            Book a call
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </CalendlyButton>
        </div>
      </section>
    </>
  )
}

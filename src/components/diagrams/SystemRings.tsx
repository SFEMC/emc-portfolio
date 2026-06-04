import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../hooks/useScrollAnim'

/**
 * System rings — Design Authority "Thinking in systems" diagram.
 *
 * Concentric rings showing systems nesting inside systems.
 *   Inner:  the service (the user journey)
 *   Middle: institutional systems (governance, technology, funding, team structures)
 *   Outer:  external systems (sector regulation, government policy, market conditions)
 *
 * Gold radial lines cross between the rings to show different systems acting on
 * the same service at the same time.
 *
 * Self-animating via its own ScrollTrigger. Respects reduced-motion: when motion
 * is off, everything renders visible with no entrance animation.
 *
 * Centering and the entrance animation are kept on SEPARATE elements. An outer
 * wrapper holds the absolute position and the -translate-x/y-1/2 centering; an
 * inner element carries the GSAP opacity/scale. This stops GSAP overwriting the
 * centering transform when it animates scale.
 */

interface Chip {
  label: string
  /** position of the chip centre, as a percentage of the square container */
  left: string
  top: string
}

const middleChips: Chip[] = [
  { label: 'Governance', left: '50%', top: '19%' },
  { label: 'Technology', left: '81%', top: '50%' },
  { label: 'Funding', left: '50%', top: '81%' },
  { label: 'Team structures', left: '19%', top: '50%' },
]

const outerChips: Chip[] = [
  { label: 'Sector regulation', left: '50%', top: '3.5%' },
  { label: 'Government policy', left: '17%', top: '85%' },
  { label: 'Market conditions', left: '83%', top: '85%' },
]

export default function SystemRings() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const ringsRef = useRef<SVGGElement | null>(null)
  const linesRef = useRef<SVGGElement | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const container = containerRef.current
    const ringsGroup = ringsRef.current
    const linesGroup = linesRef.current
    if (!container || !ringsGroup) return

    const rings = Array.from(ringsGroup.querySelectorAll('circle'))
    const lines = linesGroup ? Array.from(linesGroup.querySelectorAll('line')) : []
    const chips = Array.from(container.querySelectorAll<HTMLElement>('[data-ring-chip]'))
    const core = container.querySelector<HTMLElement>('[data-ring-core]')

    gsap.set(rings, { opacity: 0, scale: 0.7, svgOrigin: '240 240' })
    gsap.set(lines, { opacity: 0 })
    gsap.set(chips, { opacity: 0, scale: 0.85, transformOrigin: 'center' })
    if (core) gsap.set(core, { opacity: 0, scale: 0.8, transformOrigin: 'center' })

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline()
        if (core) tl.to(core, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' })
        tl.to(rings, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.18, ease: 'power3.out' }, '-=0.2')
          .to(lines, { opacity: 0.5, duration: 0.6, ease: 'power2.out' }, '-=0.4')
          .to(chips, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(1.6)' }, '-=0.4')
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div className="max-w-[560px] mx-auto" data-reveal>
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--grey-text)] mb-6 text-center">
        Systems nest inside systems
      </p>

      <div ref={containerRef} className="relative w-full aspect-square">
        {/* Rings + connector lines */}
        <svg viewBox="0 0 480 480" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <g ref={linesRef} stroke="var(--gold)" strokeWidth="1.5">
            <line x1="240" y1="240" x2="240" y2="30" />
            <line x1="240" y1="240" x2="422" y2="345" />
            <line x1="240" y1="240" x2="58" y2="345" />
          </g>
          <g ref={ringsRef} fill="none" stroke="var(--navy)">
            <circle cx="240" cy="240" r="210" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.55" />
            <circle cx="240" cy="240" r="140" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.7" />
            <circle cx="240" cy="240" r="78" strokeWidth="1.5" />
          </g>
        </svg>

        {/* Ring band label */}
        <span className="absolute left-1/2 -translate-x-1/2 top-[26%] text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--gold)] pointer-events-none">
          Institutional systems
        </span>

        {/* Core (outer = position + centring, inner = animated) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[27%] aspect-square">
          <div
            data-ring-core
            className="w-full h-full rounded-full bg-navy flex flex-col items-center justify-center text-center px-2"
          >
            <span className="text-white text-[13px] md:text-[15px] font-semibold leading-tight">The service</span>
            <span className="text-[#A9B4C6] text-[10px] md:text-[11px] mt-0.5">The user journey</span>
          </div>
        </div>

        {/* Middle ring chips */}
        {middleChips.map((c) => (
          <span
            key={c.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: c.left, top: c.top }}
          >
            <span
              data-ring-chip
              className="block bg-white border border-navy rounded-full px-3 py-1.5 text-[11px] md:text-[12px] font-semibold text-navy whitespace-nowrap shadow-sm"
            >
              {c.label}
            </span>
          </span>
        ))}

        {/* Outer ring chips */}
        {outerChips.map((c) => (
          <span
            key={c.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: c.left, top: c.top }}
          >
            <span
              data-ring-chip
              className="block bg-[var(--surface,#f7f8fa)] border border-dashed border-[var(--grey-text)] rounded-full px-3 py-1.5 text-[11px] md:text-[12px] font-medium text-[var(--grey-text)] whitespace-nowrap"
            >
              {c.label}
            </span>
          </span>
        ))}
      </div>

      <p className="italic text-[var(--grey-text)] text-[13px] leading-relaxed mt-6 max-w-2xl mx-auto text-center">
        Different systems act on the same service at the same time. Change the service without reading the system and the same failure returns.
      </p>
    </div>
  )
}

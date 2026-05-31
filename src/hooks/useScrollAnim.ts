import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Returns true if the visitor has set prefers-reduced-motion.
 * When true, animation code paths should skip the animation and show
 * the final state immediately.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Standard "fade up" entry animation for a single element. Fades opacity
 * 0→1 and translates Y +20px → 0 as the element enters the viewport.
 * Respects prefers-reduced-motion by no-op-ing and leaving the element visible.
 */
export function useFadeUp(ref: React.RefObject<HTMLElement | null>, opts?: { delay?: number; y?: number }) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }
    gsap.set(el, { opacity: 0, y: opts?.y ?? 20 })
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay: opts?.delay ?? 0, ease: 'power2.out' })
      },
    })
    return () => { trigger.kill() }
  }, [ref, opts?.delay, opts?.y])
}

/**
 * Apply a class-based reveal to any element marked with [data-reveal].
 * Stagger children within a container by setting data-reveal-stagger on
 * the container. Call once at the top of any page component.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    const triggers: ScrollTrigger[] = []

    // Single elements
    document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-stagger] [data-reveal])').forEach((el) => {
      gsap.set(el, { opacity: 0, y: 20 })
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
        })
      )
    })

    // Stagger containers
    document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((container) => {
      const children = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal]'))
      if (!children.length) return
      gsap.set(children, { opacity: 0, y: 20 })
      triggers.push(
        ScrollTrigger.create({
          trigger: container,
          start: 'top 85%',
          once: true,
          onEnter: () =>
            gsap.to(children, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15 }),
        })
      )
    })

    return () => triggers.forEach((t) => t.kill())
  }, [])
}

/**
 * Draws an SVG path/line from 0 to full length as the host element enters
 * the viewport. Caller must give the path a stroke and call this with a
 * ref to the path element.
 */
export function useDrawPath(ref: React.RefObject<SVGPathElement | SVGLineElement | SVGPolylineElement | null>, opts?: { duration?: number; delay?: number }) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const length = (el as SVGGeometryElement).getTotalLength?.() ?? 1000
    if (prefersReducedMotion()) {
      el.style.strokeDasharray = ''
      el.style.strokeDashoffset = ''
      return
    }
    el.style.strokeDasharray = `${length}`
    el.style.strokeDashoffset = `${length}`
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: opts?.duration ?? 1.2,
          delay: opts?.delay ?? 0,
          ease: 'power2.inOut',
        })
      },
    })
    return () => { trigger.kill() }
  }, [ref, opts?.duration, opts?.delay])
}

export { gsap, ScrollTrigger }

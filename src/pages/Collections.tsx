import { Link } from 'react-router-dom'
import { useRevealOnScroll } from '../hooks/useScrollAnim'
import { useNoIndex } from '../hooks/useNoIndex'
import { COLLECTIONS_TITLE, collections } from '../content/collections'

/**
 * Private collections hub.
 *
 * Shared by direct link only; not linked anywhere on the site; noindex/nofollow.
 * Lists the private collections and links into each. Reads from the manifest,
 * so a new collection appears the moment its entry exists.
 */
export default function Collections() {
  useRevealOnScroll()
  useNoIndex(COLLECTIONS_TITLE)

  return (
    <section className="section-light">
      <div className="max-w-[760px] mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-24 md:pb-[110px]">
        <span className="eyebrow mb-6" data-reveal>Private</span>
        <h1 className="text-navy text-[44px] md:text-[56px] font-semibold tracking-[-0.025em] leading-[1.06] mt-5 mb-8" data-reveal>
          {COLLECTIONS_TITLE}.
        </h1>
        <p className="text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-14 max-w-[60ch]" data-reveal>
          A private home for the writing I share by hand. Pick a collection to begin.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7" data-reveal-stagger>
          {collections.map((c) => (
            <Link key={c.path} to={c.path} className="emc-card group flex flex-col" data-reveal>
              <h2 className="text-navy text-[24px] font-semibold leading-snug mb-3 group-hover:text-[var(--gold)] transition-colors">
                {c.title}
              </h2>
              <p className="text-[var(--grey-text)] text-[15px] leading-relaxed flex-1">
                {c.blurb}
              </p>
              <span className="mt-6 text-[13px] font-semibold text-navy inline-flex items-center gap-1.5 group-hover:text-[var(--gold)] transition-colors">
                Open the collection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

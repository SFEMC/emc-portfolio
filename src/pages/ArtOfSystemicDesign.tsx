import { Link } from 'react-router-dom'
import { useRevealOnScroll } from '../hooks/useScrollAnim'
import { useNoIndex } from '../hooks/useNoIndex'
import {
  SERIES_TITLE,
  AOSD_BASE,
  aosdOrdered,
  aosdDisplayTitle,
} from '../content/art-of-systemic-design/manifest'

/**
 * The Art of Systemic Design — private series index.
 *
 * This is the page shared by direct link. It is not linked from anywhere on
 * the site and carries noindex/nofollow. The list reads from the manifest, so
 * a new essay appears here the moment its manifest entry exists.
 */
export default function ArtOfSystemicDesign() {
  useRevealOnScroll()
  useNoIndex(SERIES_TITLE)

  return (
    <section className="section-light">
      <div className="max-w-[760px] mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-24 md:pb-[110px]">
        <span className="eyebrow mb-6" data-reveal>Private series</span>
        <h1 className="text-navy text-[44px] md:text-[56px] font-semibold tracking-[-0.025em] leading-[1.06] mt-5 mb-8" data-reveal>
          {SERIES_TITLE}.
        </h1>
        <p className="text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed mb-14" data-reveal>
          A private series of personal essays. I write here about systems, the ones we design and the ones we live inside. Each part builds on the last, so read them in order or open the one that draws you in.
        </p>

        <ol className="flex flex-col" data-reveal-stagger>
          {aosdOrdered.map((entry) => (
            <li key={entry.slug} data-reveal className="border-t border-[color:var(--border-light)] last:border-b">
              <Link
                to={`${AOSD_BASE}/${entry.slug}`}
                className="group flex items-baseline gap-5 py-6"
              >
                <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--gold)] shrink-0 w-[58px] pt-1">
                  Part {entry.part}
                </span>
                <span className="text-navy text-[22px] md:text-[24px] font-semibold leading-snug group-hover:text-[var(--gold)] transition-colors">
                  {aosdDisplayTitle(entry.title)}
                </span>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  className="text-navy group-hover:text-[var(--gold)] transition-colors ml-auto shrink-0 self-center"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

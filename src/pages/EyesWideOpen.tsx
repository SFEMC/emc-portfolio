import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { marked } from 'marked'
import { useRevealOnScroll } from '../hooks/useScrollAnim'
import { useNoIndex } from '../hooks/useNoIndex'
import {
  COLLECTION_TITLE,
  EWO_BASE,
  ewoForeword,
  ewoOrdered,
} from '../content/eyes-wide-open/manifest'

/**
 * Eyes Wide Open — private collection landing page.
 *
 * Shared by direct link only; not linked anywhere on the site; noindex/nofollow.
 * Opens with the foreword in full, then lists the essays in reading order.
 * Reads from the manifest, so a new essay appears the moment its entry exists.
 */

const mdModules = import.meta.glob('/src/content/eyes-wide-open/*.md', { query: '?raw', import: 'default' })

function stripFrontmatter(raw: string): string {
  const match = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)
  return match ? match[1] : raw
}

export default function EyesWideOpen() {
  useRevealOnScroll()
  useNoIndex(COLLECTION_TITLE)

  const [forewordHtml, setForewordHtml] = useState<string | null>(null)
  useEffect(() => {
    let live = true
    const loader = mdModules[`/src/content/eyes-wide-open/${ewoForeword.slug}.md`]
    if (!loader) { setForewordHtml(''); return }
    loader().then(async (raw) => {
      const out = await marked(stripFrontmatter(raw as string), { gfm: true, breaks: true })
      if (live) setForewordHtml(out)
    })
    return () => { live = false }
  }, [])

  return (
    <section className="section-light">
      <div className="max-w-[760px] mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-24 md:pb-[110px]">
        <span className="eyebrow mb-6" data-reveal>Private collection</span>
        <h1 className="text-navy text-[44px] md:text-[56px] font-semibold tracking-[-0.025em] leading-[1.06] mt-5 mb-10" data-reveal>
          {COLLECTION_TITLE}.
        </h1>

        {/* Foreword — the welcome, shown in full */}
        <div data-reveal>
          <p className="eyebrow mb-5">{ewoForeword.title}</p>
          {forewordHtml === null ? (
            <p className="text-[var(--grey-text)] text-[15px]">Loading…</p>
          ) : (
            <article className="article-content max-w-[70ch]" dangerouslySetInnerHTML={{ __html: forewordHtml }} />
          )}
        </div>

        {/* The way in — essays in reading order */}
        <div className="mt-16" data-reveal>
          <p className="eyebrow mb-4">The essays</p>
          <ol className="flex flex-col" data-reveal-stagger>
            {ewoOrdered.map((entry) => (
              <li key={entry.slug} data-reveal className="border-t border-[color:var(--border-light)] last:border-b">
                <Link to={`${EWO_BASE}/${entry.slug}`} className="group flex items-baseline gap-5 py-6">
                  <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--gold)] shrink-0 w-[34px] pt-1 tabular-nums">
                    {String(entry.order).padStart(2, '0')}
                  </span>
                  <span className="text-navy text-[22px] md:text-[24px] font-semibold leading-snug group-hover:text-[var(--gold)] transition-colors">
                    {entry.title}
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
      </div>
    </section>
  )
}

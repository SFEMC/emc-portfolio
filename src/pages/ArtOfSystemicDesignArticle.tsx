import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import { useNoIndex } from '../hooks/useNoIndex'
import {
  SERIES_TITLE,
  AOSD_BASE,
  aosdLocate,
  aosdDisplayTitle,
} from '../content/art-of-systemic-design/manifest'

/**
 * The Art of Systemic Design — one private essay.
 *
 * The slug, the heading, the part number, the theme and the previous/next
 * links all come from the manifest. The body comes from the matching markdown
 * file. Carries noindex/nofollow and is not linked from anywhere on the site.
 */

// Every essay markdown file in the series folder.
const mdModules = import.meta.glob('/src/content/art-of-systemic-design/*.md', { query: '?raw', import: 'default' })

function stripFrontmatter(raw: string): string {
  const match = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)
  return match ? match[1] : raw
}

export default function ArtOfSystemicDesignArticle() {
  const { slug } = useParams<{ slug: string }>()
  const located = slug ? aosdLocate(slug) : null

  const [html, setHtml] = useState<string | null>(null)
  useNoIndex(located ? `${aosdDisplayTitle(located.essay.title)} — ${SERIES_TITLE}` : SERIES_TITLE)

  useEffect(() => {
    if (!located) return
    let live = true
    const path = `/src/content/art-of-systemic-design/${located.essay.slug}.md`
    const loader = mdModules[path]
    if (!loader) { setHtml(''); return }
    loader().then(async (raw) => {
      const out = await marked(stripFrontmatter(raw as string), { gfm: true, breaks: true })
      if (live) setHtml(out)
    })
    return () => { live = false }
  }, [located])

  if (!located) {
    return (
      <section className="section-light">
        <div className="max-w-[760px] mx-auto px-6 lg:px-10 py-24 text-center">
          <h1 className="text-navy text-[32px] font-semibold mb-4">Essay not found</h1>
          <Link to={AOSD_BASE} className="link-accent">Back to the series</Link>
        </div>
      </section>
    )
  }

  const { essay, group, prev, next } = located

  return (
    <section className="section-light">
      <div className="max-w-[760px] mx-auto px-6 lg:px-10 py-14 md:py-20">
        {/* Back to series */}
        <Link
          to={AOSD_BASE}
          className="text-[14px] font-medium text-[var(--grey-text)] hover:text-[var(--gold)] transition-colors inline-flex items-center gap-2 mb-12"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {SERIES_TITLE}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[var(--gold)]">
            {group.title} &middot; Part {essay.part}
          </span>
          <h1 className="text-navy text-[34px] md:text-[46px] font-semibold tracking-[-0.02em] leading-[1.1] mt-4">
            {aosdDisplayTitle(essay.title)}
          </h1>
        </header>

        {/* Body — constrained to a comfortable 65 to 75 character measure */}
        {html === null ? (
          <p className="text-[var(--grey-text)] text-[15px]">Loading…</p>
        ) : (
          <article
            className="article-content max-w-[70ch]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}

        {/* Foot navigation — previous and next within this theme */}
        <nav className="border-t border-[color:var(--border-light)] mt-16 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            {prev && (
              <Link to={`${AOSD_BASE}/${prev.slug}`} className="group block">
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--gold)]">Part {prev.part}</span>
                <span className="mt-2 flex items-center gap-2 text-navy text-[18px] font-semibold leading-snug group-hover:text-[var(--gold)] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  {aosdDisplayTitle(prev.title)}
                </span>
              </Link>
            )}
          </div>
          <div className="sm:text-right">
            {next && (
              <Link to={`${AOSD_BASE}/${next.slug}`} className="group block">
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--gold)]">Part {next.part}</span>
                <span className="mt-2 flex items-center sm:justify-end gap-2 text-navy text-[18px] font-semibold leading-snug group-hover:text-[var(--gold)] transition-colors">
                  {aosdDisplayTitle(next.title)}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </Link>
            )}
          </div>
        </nav>

        {/* Always a link back to the series home */}
        <div className="mt-12 text-center">
          <Link to={AOSD_BASE} className="link-accent text-[14px] font-medium">
            Back to the series
          </Link>
        </div>
      </div>
    </section>
  )
}

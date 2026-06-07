import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import { useNoIndex } from '../hooks/useNoIndex'
import {
  COLLECTION_TITLE,
  EWO_BASE,
  ewoBySlug,
  ewoNeighbours,
  ewoNumber,
} from '../content/eyes-wide-open/manifest'

/**
 * Eyes Wide Open — one private essay.
 *
 * Same reading layout as The Art of Systemic Design. The slug, title and
 * previous/next links come from the manifest; the body comes from the markdown
 * file. Carries noindex/nofollow and is not linked from anywhere on the site.
 */

const mdModules = import.meta.glob('/src/content/eyes-wide-open/*.md', { query: '?raw', import: 'default' })

function stripFrontmatter(raw: string): string {
  const match = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)
  return match ? match[1] : raw
}

/**
 * Split a quieter source note off the foot of an essay.
 * Convention: the LAST thematic break (a line of three or more dashes) starts
 * the source note. Everything after it renders in the smaller, quieter style.
 * An essay with no source note simply does not end with such a break.
 */
function splitSourceNote(body: string): { body: string; note: string | null } {
  const lines = body.split('\n')
  let idx = -1
  for (let i = lines.length - 1; i >= 0; i--) {
    if (/^-{3,}$/.test(lines[i].trim())) { idx = i; break }
  }
  if (idx === -1) return { body, note: null }
  const after = lines.slice(idx + 1).join('\n').trim()
  if (!after) return { body, note: null }
  return { body: lines.slice(0, idx).join('\n').trim(), note: after }
}

export default function EyesWideOpenEssay() {
  const { slug } = useParams<{ slug: string }>()
  const essay = slug ? ewoBySlug(slug) : undefined
  const { prev, next } = slug ? ewoNeighbours(slug) : { prev: null, next: null }

  const [content, setContent] = useState<{ body: string; note: string | null } | null>(null)
  useNoIndex(essay ? `${essay.title} — ${COLLECTION_TITLE}` : COLLECTION_TITLE)

  useEffect(() => {
    if (!essay) return
    let live = true
    const loader = mdModules[`/src/content/eyes-wide-open/${essay.slug}.md`]
    if (!loader) { setContent({ body: '', note: null }); return }
    loader().then(async (raw) => {
      const parts = splitSourceNote(stripFrontmatter(raw as string))
      const body = await marked(parts.body, { gfm: true, breaks: true })
      const note = parts.note ? await marked(parts.note, { gfm: true, breaks: true }) : null
      if (live) setContent({ body, note })
    })
    return () => { live = false }
  }, [essay])

  if (!essay) {
    return (
      <section className="section-light">
        <div className="max-w-[760px] mx-auto px-6 lg:px-10 py-24 text-center">
          <h1 className="text-navy text-[32px] font-semibold mb-4">Essay not found</h1>
          <Link to={EWO_BASE} className="link-accent">Back to the collection</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section-light">
      <div className="max-w-[760px] mx-auto px-6 lg:px-10 py-14 md:py-20">
        {/* Back to collection */}
        <Link
          to={EWO_BASE}
          className="text-[14px] font-medium text-[var(--grey-text)] hover:text-[var(--gold)] transition-colors inline-flex items-center gap-2 mb-12"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {COLLECTION_TITLE}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[var(--gold)]">
            {COLLECTION_TITLE}
          </span>
          <h1 className="text-navy text-[34px] md:text-[46px] font-semibold tracking-[-0.02em] leading-[1.1] mt-4">
            {essay.title}
          </h1>
        </header>

        {/* Body — comfortable 65 to 75 character measure */}
        {content === null ? (
          <p className="text-[var(--grey-text)] text-[15px]">Loading…</p>
        ) : (
          <div className="max-w-[70ch]">
            <article className="article-content" dangerouslySetInnerHTML={{ __html: content.body }} />
            {content.note && (
              <>
                <hr className="mt-12 mb-6" style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
                <div className="source-note" dangerouslySetInnerHTML={{ __html: content.note }} />
              </>
            )}
          </div>
        )}

        {/* Foot navigation — previous and next in reading order */}
        <nav className="border-t border-[color:var(--border-light)] mt-16 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            {prev && (
              <Link to={`${EWO_BASE}/${prev.slug}`} className="group block">
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--gold)] tabular-nums">{String(ewoNumber(prev.slug)).padStart(2, '0')}</span>
                <span className="mt-2 flex items-center gap-2 text-navy text-[18px] font-semibold leading-snug group-hover:text-[var(--gold)] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div className="sm:text-right">
            {next && (
              <Link to={`${EWO_BASE}/${next.slug}`} className="group block">
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--gold)] tabular-nums">{String(ewoNumber(next.slug)).padStart(2, '0')}</span>
                <span className="mt-2 flex items-center sm:justify-end gap-2 text-navy text-[18px] font-semibold leading-snug group-hover:text-[var(--gold)] transition-colors">
                  {next.title}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </Link>
            )}
          </div>
        </nav>

        {/* Always a link back to the landing page */}
        <div className="mt-12 text-center">
          <Link to={EWO_BASE} className="link-accent text-[14px] font-medium">
            Back to the collection
          </Link>
        </div>
      </div>
    </section>
  )
}

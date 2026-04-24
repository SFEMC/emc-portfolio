import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { marked } from 'marked'

interface ArticleEntry {
  title: string
  date: string
  summary: string
  tags: string[]
  slug?: string
  url?: string
  body?: string
  html?: string
}

function parseFrontmatter(content: string): { meta: Omit<ArticleEntry, 'body' | 'html'>; body: string } | null {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null
  const frontmatter = match[1]
  const body = match[2]

  const meta: Record<string, string | string[]> = {}
  for (const line of frontmatter.split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/)
    if (m) {
      let value: string | string[] = m[2].trim()
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
      if (value.startsWith('[')) {
        try { value = JSON.parse(value) } catch { /* keep as string */ }
      }
      meta[m[1]] = value
    }
  }

  return {
    meta: {
      title: meta.title as string || '',
      date: meta.date as string || '',
      summary: meta.summary as string || '',
      tags: (Array.isArray(meta.tags) ? meta.tags : [meta.tags as string]).filter(Boolean),
      slug: meta.slug as string || undefined,
    },
    body,
  }
}

function getExternalSource(url: string): string {
  if (url.includes('linkedin.com')) return 'LinkedIn'
  if (url.includes('medium.com')) return 'Medium'
  if (url.includes('gov.uk')) return 'GOV.UK'
  if (url.includes('substack.com')) return 'Substack'
  return 'External'
}

function readingTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 220))
}

const mdModules = import.meta.glob('/src/content/articles/*.md', { query: '?raw', import: 'default' })

export default function Articles() {
  const [articles, setArticles] = useState<ArticleEntry[]>([])
  const [activeTag, setActiveTag] = useState<string>('')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function loadArticles() {
      const all: ArticleEntry[] = []

      for (const path in mdModules) {
        const content = await mdModules[path]() as string
        const parsed = parseFrontmatter(content)
        if (parsed) {
          const html = await marked(parsed.body, { gfm: true, breaks: true })
          all.push({ ...parsed.meta, body: parsed.body, html })
        }
      }

      try {
        const ext = await import('../content/articles/external.json')
        const external = ext.default as ArticleEntry[]
        for (const a of external) {
          all.push({ ...a, slug: undefined })
        }
      } catch { /* no external file */ }

      all.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      setArticles(all)
      setLoaded(true)
    }
    loadArticles()
  }, [])

  const allTags = [...new Set(articles.flatMap(a => a.tags))].sort()
  const filtered = activeTag
    ? articles.filter(a => a.tags.includes(activeTag))
    : articles

  function toggle(i: number) {
    setExpanded(expanded === i ? null : i)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      {/* Header */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-10">
          <p className="eyebrow mb-6">Writing</p>
          <h1 className="font-display text-[44px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-tight text-ink font-medium mb-8">
            Notes on services, delivery and how organisations change.
          </h1>
          <p className="text-[18px] md:text-[19px] text-ink-soft leading-relaxed max-w-2xl">
            Short pieces from the work. Some published here, some on LinkedIn. Click a piece to read in place, or follow the link for the original.
          </p>
        </div>
      </div>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div
          className="flex flex-wrap gap-2 mb-14 pb-10 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <button
            onClick={() => setActiveTag('')}
            className={`px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all ${
              !activeTag
                ? 'bg-ink text-bg border border-ink'
                : 'border text-muted hover:text-ink border-border-strong'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all ${
                activeTag === tag
                  ? 'bg-ink text-bg border border-ink'
                  : 'border text-muted hover:text-ink border-border-strong'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Articles list */}
      {!loaded ? (
        <p className="text-muted text-[14px] py-12 text-center">Loading articles...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted text-[14px] py-12 text-center">No articles yet.</p>
      ) : (
        <div
          className="border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          {filtered.map((article, i) => {
            const isExternal = !!article.url
            const isLocal = !!article.html && !isExternal
            const isReadable = isLocal || (isExternal && !!article.html)
            const isExpanded = expanded === i

            return (
              <article
                key={i}
                className="border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <div
                  className={`grid grid-cols-12 gap-6 py-10 md:py-12 transition-colors ${
                    isReadable ? 'cursor-pointer hover:bg-bg-elevated' : ''
                  } px-2 -mx-2`}
                  onClick={() => {
                    if (isReadable) toggle(i)
                  }}
                >
                  <div className="col-span-12 md:col-span-2">
                    {article.date && (
                      <time className="text-[13px] text-muted block">
                        {format(parseISO(article.date), 'MMM yyyy')}
                      </time>
                    )}
                    {isExternal && (
                      <span className="text-[12px] text-muted mt-1 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                        {getExternalSource(article.url!)}
                      </span>
                    )}
                    {isReadable && article.html && (
                      <span className="text-[12px] text-muted mt-1 block">
                        {readingTime(article.html)} min read
                      </span>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-7">
                    <h2 className="font-display text-[24px] md:text-[30px] font-medium leading-tight text-ink mb-3 group-hover:text-accent">
                      {article.title}
                    </h2>
                    <p className="text-[16px] text-ink-soft leading-relaxed max-w-2xl">
                      {article.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {article.tags.map(tag => (
                        <span key={tag} className="chip">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-3 flex md:justify-end items-start gap-3">
                    {isExternal && (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-secondary text-[12px] py-2 px-3.5"
                      >
                        Open on {getExternalSource(article.url!)}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                      </a>
                    )}
                    {isReadable && (
                      <span className="text-[13px] font-medium text-accent self-center">
                        {isExpanded ? '— Close' : 'Read →'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded body */}
                {isExpanded && article.html && (
                  <div
                    className="pb-14 pt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 md:col-span-10 md:col-start-2">
                        <article
                          className="article-content"
                          dangerouslySetInnerHTML={{ __html: article.html }}
                        />
                        <button
                          onClick={() => toggle(i)}
                          className="mt-10 text-[13px] font-medium text-muted hover:text-accent transition-colors"
                        >
                          ↑ Close article
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

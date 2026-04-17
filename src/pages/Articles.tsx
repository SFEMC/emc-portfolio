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
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="border-b border-border pb-12 mb-12">
        <p className="text-xs text-muted uppercase tracking-widest font-body mb-3">Articles</p>
        <h1 className="font-body font-semibold text-3xl md:text-4xl text-ink leading-tight mb-4">
          What I write
        </h1>
        <p className="text-muted font-body font-light text-base leading-relaxed max-w-2xl">
          Thoughts on product delivery, service design, technology, and building things that work. Click to read, or follow the link for pieces published elsewhere.
        </p>
      </div>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag('')}
            className={`px-3 py-1.5 text-xs font-body font-semibold rounded-lg transition-opacity ${
              !activeTag ? 'bg-white text-gray-900' : 'border border-border text-muted hover:text-ink'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
              className={`px-3 py-1.5 text-xs font-body font-semibold rounded-lg transition-opacity ${
                activeTag === tag ? 'bg-white text-gray-900' : 'border border-border text-muted hover:text-ink'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Articles list */}
      {!loaded ? (
        <p className="text-muted font-body text-sm py-12 text-center">Loading articles...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted font-body text-sm py-12 text-center">No articles yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, i) => {
            const isExternal = !!article.url
            const isLocal = !!article.html
            const isReadable = isLocal || (isExternal && !!article.html)
            const isExpanded = expanded === i

            return (
              <div
                key={i}
                className={`border rounded-lg transition-all flex flex-col ${
                  isExpanded
                    ? 'border-white col-span-1 md:col-span-2 lg:col-span-3 bg-surface'
                    : 'border-border hover:border-white group cursor-pointer'
                }`}
                onClick={() => {
                  if (isReadable) toggle(i)
                }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {article.date && (
                      <time className="text-xs text-muted font-body">
                        {format(parseISO(article.date), 'd MMMM yyyy')}
                      </time>
                    )}
                    {isExternal && (
                      <span className="text-xs text-muted font-body">&#8599; {getExternalSource(article.url!)}</span>
                    )}
                    {isReadable && !isExpanded && (
                      <span className="text-xs text-muted font-body">Click to read</span>
                    )}
                  </div>
                  <h2 className={`font-body font-semibold text-lg leading-snug mb-2 transition-colors ${
                    isExpanded ? 'text-white' : 'text-ink group-hover:text-white'
                  }`}>
                    {article.title}
                  </h2>
                  <p className="text-muted font-body font-light text-sm leading-relaxed mb-4">
                    {article.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="text-xs text-muted font-body border border-border px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                    {isExternal && (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-xs font-body font-semibold text-white border border-white rounded px-3 py-1.5 hover:opacity-70 transition-opacity"
                        onClick={e => e.stopPropagation()}
                      >
                        Read on {getExternalSource(article.url!)} &#8599;
                      </a>
                    )}
                    {isReadable && isExpanded && (
                      <button
                        onClick={(e) => { e.stopPropagation(); toggle(i) }}
                        className="ml-auto text-xs font-body text-muted hover:text-ink transition-colors"
                      >
                        Collapse ▲
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded article content */}
                {isExpanded && article.html && (
                  <div
                    className="border-t border-border px-6 pb-8 pt-6"
                    onClick={e => e.stopPropagation()}
                  >
                    <article
                      className="article-content max-w-3xl"
                      dangerouslySetInnerHTML={{ __html: article.html }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

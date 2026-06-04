import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { useRevealOnScroll } from '../hooks/useScrollAnim'

interface ArticleEntry {
  title: string
  date: string
  summary: string
  tags: string[]
  slug?: string
  url?: string
  linkedinUrl?: string
  pinned?: boolean
}

function parseFrontmatter(content: string): Omit<ArticleEntry, 'pinned'> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const meta: Record<string, string | string[]> = {}
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/)
    if (!m) continue
    let value: string | string[] = m[2].trim()
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
    if (value.startsWith('[')) {
      try { value = JSON.parse(value) } catch { /* keep as string */ }
    }
    meta[m[1]] = value
  }
  return {
    title: (meta.title as string) || '',
    date: (meta.date as string) || '',
    summary: (meta.summary as string) || '',
    tags: (Array.isArray(meta.tags) ? meta.tags : [meta.tags as string]).filter(Boolean),
    slug: (meta.slug as string) || undefined,
    linkedinUrl: (meta.linkedinUrl as string) || undefined,
  }
}

const mdModules = import.meta.glob('/src/content/articles/*.md', { query: '?raw', import: 'default' })

const TOPIC_FILTERS = [
  'All',
  'Service Design',
  'Systems Thinking',
  'Delivery',
  'Higher Education',
  'Transformation',
  'Government',
  'User-Centred Design',
]

const PINNED_SLUGS = new Set([
  'thinking-in-services',
  'why-services-keep-breaking',
  'test-before-you-transform',
  'first-6-months-higher-education',
])

export default function Articles() {
  useRevealOnScroll()
  const [articles, setArticles] = useState<ArticleEntry[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all(
      Object.entries(mdModules).map(async ([, loader]) => parseFrontmatter((await loader()) as string))
    ).then(async (loaded) => {
      const all: ArticleEntry[] = loaded
        .filter((a): a is Omit<ArticleEntry, 'pinned'> => a !== null)
        .map((a) => ({ ...a, pinned: a.slug ? PINNED_SLUGS.has(a.slug) : false }))
      try {
        const ext = await import('../content/articles/external.json')
        const external = ext.default as ArticleEntry[]
        for (const a of external) all.push({ ...a, pinned: false })
      } catch { /* no external file */ }
      all.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
        return (b.date || '').localeCompare(a.date || '')
      })
      setArticles(all)
      setLoaded(true)
    })
  }, [])

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return articles
    return articles.filter((a) => a.tags.includes(activeFilter))
  }, [articles, activeFilter])

  return (
    <>
      {/* Header */}
      <section className="section-light">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-12">
          <span className="eyebrow mb-6">Writing</span>
          <h1 className="text-navy text-[44px] md:text-[56px] font-semibold tracking-[-0.025em] leading-[1.06] mt-5 mb-8 max-w-3xl">
            Thinking out loud.
          </h1>
          <p className="text-[var(--grey-text)] text-[18px] md:text-[19px] leading-relaxed max-w-[680px]">
            Samuel writes about service design, systems thinking, delivery and transformation in higher education and government.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="section-light pb-24 md:pb-[110px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          {/* Topic filter pills */}
          <div className="flex flex-wrap gap-2 mb-12 pb-10 border-b border-[color:var(--border-light)]">
            {TOPIC_FILTERS.map((topic) => {
              const active = activeFilter === topic
              return (
                <button
                  key={topic}
                  onClick={() => setActiveFilter(topic)}
                  className="px-4 py-2 text-[13px] font-semibold rounded-full transition-all"
                  style={{
                    background: active ? 'var(--gold)' : 'transparent',
                    color: active ? 'var(--navy)' : 'var(--navy)',
                    border: active ? '1px solid var(--gold)' : '1px solid var(--border-strong)',
                  }}
                >
                  {topic}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          {!loaded ? (
            <p className="text-[var(--grey-text)] text-[14px] py-12 text-center">Loading articles…</p>
          ) : filtered.length === 0 ? (
            <p className="text-[var(--grey-text)] text-[14px] py-12 text-center">No articles in this topic yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-reveal-stagger>
              {filtered.map((article, i) => {
                const isExternal = !!article.url
                const href = isExternal ? article.url! : `/articles/${article.slug}`
                const CardBody = (
                  <article
                    key={i}
                    data-reveal
                    className="emc-card group h-full flex flex-col relative overflow-hidden"
                    style={article.pinned ? { borderColor: 'var(--gold)', boxShadow: 'var(--shadow-card)' } : undefined}
                  >
                    {article.pinned && (
                      <span className="absolute top-4 right-4 text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--gold)]">
                        Featured
                      </span>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm"
                          style={{ background: 'rgba(201,164,75,0.12)', color: 'var(--gold)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-navy text-[22px] font-semibold leading-snug mb-3 group-hover:text-[var(--gold)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-[var(--grey-text)] text-[15px] leading-relaxed mb-5 flex-1">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[color:var(--border-card)]">
                      <div className="flex items-center gap-3">
                        {article.date && (
                          <time className="text-[13px] text-[var(--grey-text)]">
                            {format(parseISO(article.date), 'MMM yyyy')}
                          </time>
                        )}
                        {isExternal && (
                          <span className="text-[11px] font-semibold tracking-wider uppercase text-[var(--grey-text)]">
                            On LinkedIn
                          </span>
                        )}
                      </div>
                      <span className="text-[13px] font-semibold text-navy inline-flex items-center gap-1.5 group-hover:text-[var(--gold)] transition-colors">
                        Read
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          {isExternal ? <path d="M7 17L17 7M7 7h10v10"/> : <path d="M5 12h14M13 6l6 6-6 6"/>}
                        </svg>
                      </span>
                    </div>
                  </article>
                )
                if (isExternal) {
                  return (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="block">
                      {CardBody}
                    </a>
                  )
                }
                return (
                  <Link key={i} to={href} className="block">
                    {CardBody}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

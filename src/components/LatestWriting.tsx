import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

interface ArticleEntry {
  title: string
  date: string
  summary: string
  tags: string[]
  slug?: string
  url?: string
}

function parseFrontmatter(content: string): { meta: ArticleEntry } | null {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null
  const frontmatter = match[1]

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
      title: (meta.title as string) || '',
      date: (meta.date as string) || '',
      summary: (meta.summary as string) || '',
      tags: (Array.isArray(meta.tags) ? meta.tags : [meta.tags as string]).filter(Boolean),
      slug: (meta.slug as string) || undefined,
    },
  }
}

const mdModules = import.meta.glob('/src/content/articles/*.md', { query: '?raw', import: 'default' })

export default function LatestWriting() {
  const [articles, setArticles] = useState<ArticleEntry[]>([])

  useEffect(() => {
    async function load() {
      const all: ArticleEntry[] = []
      for (const path in mdModules) {
        const content = await mdModules[path]() as string
        const parsed = parseFrontmatter(content)
        if (parsed) all.push(parsed.meta)
      }
      try {
        const ext = await import('../content/articles/external.json')
        const external = ext.default as ArticleEntry[]
        for (const a of external) all.push(a)
      } catch { /* no external file */ }

      all.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      setArticles(all.slice(0, 3))
    }
    load()
  }, [])

  if (articles.length === 0) return null

  return (
    <section
      className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="grid grid-cols-12 gap-6 mb-14">
        <div className="col-span-12 md:col-span-7">
          <p className="eyebrow mb-4">Writing</p>
          <h2 className="font-display text-[36px] md:text-[44px] leading-[1.05] tracking-tight text-ink font-medium">
            What I've been thinking about.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-end justify-start md:justify-end">
          <Link to="/articles" className="btn-secondary text-[13px]">
            All writing
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {articles.map((a) => {
          const target = a.url || (a.slug ? `/articles/${a.slug}` : '/articles')
          const isExternal = !!a.url
          return (
            <a
              key={a.title}
              href={target}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                {a.date && (
                  <time className="text-[13px] text-muted">
                    {format(parseISO(a.date), 'MMM yyyy')}
                  </time>
                )}
                {isExternal && (
                  <span className="text-[12px] text-muted flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                    LinkedIn
                  </span>
                )}
              </div>
              <h3 className="font-display text-[22px] md:text-[24px] leading-tight font-medium text-ink group-hover:text-accent transition-colors mb-3">
                {a.title}
              </h3>
              <p className="text-[15px] text-ink-soft leading-relaxed mb-4 flex-1">
                {a.summary}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {a.tags.slice(0, 2).map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}

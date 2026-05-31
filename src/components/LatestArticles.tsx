import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

interface ArticleMeta {
  title: string
  date: string
  summary: string
  tags: string[]
  slug: string
}

function parseFrontmatter(content: string): ArticleMeta | null {
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
    slug: (meta.slug as string) || '',
  }
}

const mdModules = import.meta.glob('/src/content/articles/*.md', { query: '?raw', import: 'default' })

export default function LatestArticles({ limit = 3 }: { limit?: number }) {
  const [articles, setArticles] = useState<ArticleMeta[]>([])

  useEffect(() => {
    Promise.all(
      Object.entries(mdModules).map(async ([, loader]) => {
        const raw = (await loader()) as string
        return parseFrontmatter(raw)
      })
    ).then((all) => {
      const valid = all.filter((a): a is ArticleMeta => a !== null && !!a.date)
      valid.sort((a, b) => (a.date < b.date ? 1 : -1))
      setArticles(valid.slice(0, limit))
    })
  }, [limit])

  if (!articles.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-7" data-reveal-stagger>
      {articles.map((article) => (
        <Link
          key={article.slug}
          to={`/articles/${article.slug}`}
          className="emc-card group flex flex-col"
          data-reveal
        >
          {article.tags[0] && (
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--gold)] mb-3">
              {article.tags[0]}
            </span>
          )}
          <h3 className="text-navy text-[20px] font-semibold leading-snug mb-3 group-hover:text-[var(--gold)] transition-colors">
            {article.title}
          </h3>
          <p className="text-[var(--grey-text)] text-[15px] leading-relaxed flex-1">
            {article.summary}
          </p>
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-[color:var(--border-card)]">
            <time className="text-[13px] text-[var(--grey-text)]">
              {format(parseISO(article.date), 'MMM yyyy')}
            </time>
            <span className="text-[13px] font-semibold text-navy inline-flex items-center gap-1.5 group-hover:text-[var(--gold)] transition-colors">
              Read
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import { format, parseISO } from 'date-fns'

interface ArticleMeta {
  title: string
  date: string
  summary: string
  tags: string[]
  slug: string
}

function parseFrontmatter(content: string): { meta: ArticleMeta; body: string } | null {
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
      slug: meta.slug as string || '',
    },
    body,
  }
}

function readingTime(text: string): number {
  const words = text.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 220))
}

const mdModules = import.meta.glob('/src/content/articles/*.md', { query: '?raw', import: 'default' })

export default function Article() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<{ meta: ArticleMeta; html: string } | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      for (const path in mdModules) {
        const content = await mdModules[path]() as string
        const parsed = parseFrontmatter(content)
        if (parsed && parsed.meta.slug === slug) {
          const html = await marked(parsed.body, {
            gfm: true,
            breaks: true,
          })
          setArticle({ meta: parsed.meta, html })
          window.scrollTo(0, 0)
          return
        }
      }
      setNotFound(true)
    }
    load()
  }, [slug])

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-[32px] font-medium text-ink mb-4">Article not found</h1>
        <Link to="/articles" className="link-accent">Back to writing</Link>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-muted">Loading...</p>
      </div>
    )
  }

  const mins = readingTime(article.html)

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-20">
      {/* Back link */}
      <Link
        to="/articles"
        className="text-[14px] font-medium text-muted hover:text-accent transition-colors inline-flex items-center gap-2 mb-14"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        All writing
      </Link>

      <div className="grid grid-cols-12 gap-6">
        {/* Header */}
        <header className="col-span-12 md:col-span-10 md:col-start-2 mb-14">
          <div className="flex items-center gap-3 flex-wrap mb-8">
            {article.meta.date && (
              <time className="text-[13px] text-muted">
                {format(parseISO(article.meta.date), 'MMMM yyyy')}
              </time>
            )}
            <span className="h-1 w-1 rounded-full" style={{ background: 'var(--muted)' }} />
            <span className="text-[13px] text-muted">{mins} min read</span>
          </div>
          <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-tight text-ink font-medium mb-6">
            {article.meta.title}
          </h1>
          <p className="text-[19px] md:text-[21px] text-ink-soft leading-relaxed max-w-2xl mb-6">
            {article.meta.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {article.meta.tags.map(tag => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>
        </header>

        {/* Body */}
        <div className="col-span-12 md:col-span-8 md:col-start-3">
          <article
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          {/* Footer */}
          <div
            className="border-t mt-16 pt-10 flex flex-wrap justify-between items-center gap-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <Link to="/articles" className="text-[14px] font-medium text-muted hover:text-accent transition-colors inline-flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              All writing
            </Link>
            <a
              href="mailto:Samuel.Field@eddystonemersey.com"
              className="btn-secondary text-[13px]"
            >
              Discuss this piece
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

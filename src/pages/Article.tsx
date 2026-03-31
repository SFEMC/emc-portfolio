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
        <h1 className="font-body font-semibold text-2xl text-ink mb-4">Article not found</h1>
        <Link to="/articles" className="text-muted font-body hover:text-ink transition-colors">
          &larr; Back to articles
        </Link>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-muted font-body">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link to="/articles" className="text-sm text-muted font-body hover:text-ink transition-colors mb-8 inline-block">
        &larr; All articles
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          {article.meta.date && (
            <time className="text-sm text-muted font-body">
              {format(parseISO(article.meta.date), 'd MMMM yyyy')}
            </time>
          )}
        </div>
        <h1 className="font-body font-semibold text-3xl md:text-4xl text-ink leading-tight mb-4">
          {article.meta.title}
        </h1>
        <p className="text-muted font-body font-light text-lg leading-relaxed">
          {article.meta.summary}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {article.meta.tags.map(tag => (
            <span key={tag} className="text-xs text-muted font-body border border-border px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article body */}
      <article
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />

      {/* Footer */}
      <div className="border-t border-border mt-16 pt-8 flex justify-between items-center">
        <Link to="/articles" className="text-sm text-muted font-body hover:text-ink transition-colors">
          &larr; All articles
        </Link>
        <a
          href="mailto:Samuel.Field@eddystonemersey.com"
          className="text-sm text-muted font-body hover:text-ink transition-colors"
        >
          Discuss this article &rarr;
        </a>
      </div>
    </div>
  )
}

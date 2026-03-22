import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

type Article = {
  title: string
  link: string
  pubDate: string
  description: string
  source: string
}

type Category = 'public-sector' | 'higher-education' | 'ai'

const feeds: Record<Category, { name: string; url: string }[]> = {
  'public-sector': [
    { name: 'GDS Blog', url: 'https://gds.blog.gov.uk/feed/' },
    { name: 'Public Digital', url: 'https://public.digital/feed' },
    { name: 'CDDO', url: 'https://cddo.blog.gov.uk/feed/' },
    { name: 'Defra Digital', url: 'https://defradigital.blog.gov.uk/feed/' },
  ],
  'higher-education': [
    { name: 'Wonkhe', url: 'https://wonkhe.com/feed/' },
    { name: 'JISC', url: 'https://www.jisc.ac.uk/blog/rss' },
    { name: 'HEPI', url: 'https://www.hepi.ac.uk/feed/' },
  ],
  'ai': [
    { name: 'MIT Tech Review – AI', url: 'https://www.technologyreview.com/feed/' },
    { name: 'The Rundown AI', url: 'https://www.therundown.ai/rss' },
    { name: 'Import AI', url: 'https://jack-clark.net/feed/' },
  ],
}

const categoryLabels: Record<Category, string> = {
  'public-sector': 'Public Sector & Digital Government',
  'higher-education': 'Higher Education',
  'ai': 'Artificial Intelligence',
}

async function fetchFeed(url: string, sourceName: string): Promise<Article[]> {
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
    const res = await fetch(proxyUrl)
    const data = await res.json()
    const parser = new DOMParser()
    const xml = parser.parseFromString(data.contents, 'text/xml')
    const items = Array.from(xml.querySelectorAll('item')).slice(0, 5)
    return items.map((item) => ({
      title: item.querySelector('title')?.textContent?.trim() ?? '',
      link: item.querySelector('link')?.textContent?.trim() ?? '',
      pubDate: item.querySelector('pubDate')?.textContent?.trim() ?? '',
      description: item.querySelector('description')?.textContent?.replace(/<[^>]*>/g, '').trim().slice(0, 160) ?? '',
      source: sourceName,
    }))
  } catch {
    return []
  }
}

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState<Category>('public-sector')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setArticles([])
    const sources = feeds[activeCategory]
    Promise.all(sources.map((s) => fetchFeed(s.url, s.name))).then((results) => {
      const all = results.flat().sort((a, b) => {
        const da = a.pubDate ? new Date(a.pubDate).getTime() : 0
        const db = b.pubDate ? new Date(b.pubDate).getTime() : 0
        return db - da
      })
      setArticles(all)
      setLoading(false)
    })
  }, [activeCategory])

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="border-b border-border pb-12 mb-12">
        <p className="text-xs text-muted uppercase tracking-widest font-body mb-3">Resources</p>
        <h1 className="font-body font-semibold text-4xl md:text-5xl text-ink mb-4">
          Useful Reading
        </h1>
        <p className="text-muted font-body font-light text-base max-w-xl">
          A curated feed of articles and insights across public sector digital transformation, higher education, and artificial intelligence.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-6 mb-10 border-b border-border">
        {(Object.keys(feeds) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pb-3 text-sm font-body border-b-2 transition-colors -mb-px ${
              activeCategory === cat
                ? 'border-ink text-ink font-medium'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Source tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {feeds[activeCategory].map((s) => (
          <span key={s.name} className="text-xs font-body text-muted border border-border px-3 py-1">
            {s.name}
          </span>
        ))}
      </div>

      {/* Articles */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-t border-border pt-6 pb-6 animate-pulse">
              <div className="h-3 w-24 bg-border rounded mb-3" />
              <div className="h-5 w-2/3 bg-border rounded mb-2" />
              <div className="h-3 w-full bg-border rounded" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p className="text-muted font-body font-light text-sm py-12 text-center">
          No articles loaded. Some feeds may be temporarily unavailable.
        </p>
      ) : (
        <div className="flex flex-col">
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-t border-border py-6 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 hover:bg-surface transition-colors px-0 hover:px-4 -mx-0 hover:-mx-4"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-body text-muted">{article.source}</span>
                {article.pubDate && (
                  <span className="text-xs font-body text-muted/60">
                    {(() => {
                      try {
                        return formatDistanceToNow(new Date(article.pubDate), { addSuffix: true })
                      } catch {
                        return ''
                      }
                    })()}
                  </span>
                )}
              </div>
              <div className="md:col-span-3">
                <h3 className="font-body font-medium text-ink text-base leading-snug group-hover:text-blue transition-colors mb-1">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-muted font-body font-light text-sm leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

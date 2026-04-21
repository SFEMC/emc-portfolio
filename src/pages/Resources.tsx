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
    { name: 'dxw', url: 'https://www.dxw.com/feed/' },
    { name: 'mySociety', url: 'https://www.mysociety.org/feed/' },
    { name: 'Giles Turnbull', url: 'https://gilest.org/feed/' },
    { name: 'Co-op Digital', url: 'https://digitalblog.coop.co.uk/feed/' },
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
  'public-sector': 'Service Design',
  'higher-education': 'Higher Education',
  'ai': 'Artificial Intelligence',
}

type BookCard = {
  category: string
  title: string
  author?: string
  description: string
  url: string
}

type Person = {
  name: string
  description: string
  url: string
  linkLabel: string
}

const books: BookCard[] = [
  { category: 'Public Digital', title: 'Digital Transformation at Scale', author: 'Greenway, Terrett, Bracken, Loosemore', description: 'Built from the experience of creating GDS. Second edition covers Covid response.', url: 'https://public.digital/pd-books' },
  { category: 'Public Digital', title: 'Test and Learn', author: 'Public Digital', description: 'How to adopt a test and learn mindset in transformation.', url: 'https://public.digital/pd-books/test-and-learn' },
  { category: 'Public Digital', title: 'Shaping Technology for Transformation', author: 'Public Digital', description: 'Paying down technical debt and building technological strength.', url: 'https://public.digital/pd-books/pd-technology-book' },
  { category: 'Public Digital', title: 'Competitive Advantage by Design', author: 'Public Digital', description: 'How design approaches shape how modern organisations operate.', url: 'https://public.digital/pd-insights/publications' },
  { category: 'UK Digital & Public Sector', title: 'Good Services', author: 'Lou Downe', description: 'Fifteen principles for what makes a good service.', url: 'https://good.services/' },
  { category: 'UK Digital & Public Sector', title: 'An Internet for the People', author: 'Ben Tarnoff', description: 'How to think about public digital infrastructure.', url: 'https://www.versobooks.com/products/2560-internet-for-the-people' },
  { category: 'Service Design', title: 'User Research', author: 'Stephanie Marsh', description: 'Written by the former Head of User Research at GDS. Practical, not academic.', url: 'https://www.koganpage.com/marketing-communications/user-research-9781398603929' },
  { category: 'Service Design', title: 'Service Design: From Insight to Implementation', author: 'Polaine, Reason, Løvlie', description: 'Grounded in real public sector work.', url: 'https://www.rosenfeldmedia.com/books/service-design/' },
  { category: 'Product & Delivery', title: 'Inspired', author: 'Marty Cagan', description: 'How to build products customers love.', url: 'https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love-2nd-edition/' },
  { category: 'Product & Delivery', title: 'Empowered', author: 'Marty Cagan', description: 'How to build empowered product teams.', url: 'https://www.svpg.com/books/empowered-ordinary-people-extraordinary-products/' },
  { category: 'Product & Delivery', title: 'Team Topologies', author: 'Skelton, Pais', description: 'How to organise teams for fast flow.', url: 'https://teamtopologies.com/book' },
  { category: 'Product & Delivery', title: 'Radical Focus', author: 'Christina Wodtke', description: 'OKRs done properly.', url: 'https://cwodtke.com/writing-2/' },
  { category: 'AI', title: 'Co-Intelligence', author: 'Ethan Mollick', description: "AI's practical implications for work and education.", url: 'https://www.penguinrandomhouse.com/books/741805/co-intelligence-by-ethan-mollick/' },
]

const articleCards: BookCard[] = [
  { category: 'Articles', title: 'Adopting a Prototype Mindset', author: 'Public Digital', description: 'The case for prototyping as a way of thinking, not just a phase.', url: 'https://public.digital/pd-insights/blog/2024/03/adopting-a-prototype-mindset' },
  { category: 'Articles', title: 'Doing User Research to Inform Strategy', author: 'Public Digital', description: 'How user research connects to strategic decisions, not just interface design.', url: 'https://public.digital/pd-insights/blog/2024/02/doing-user-research-to-inform-strategy' },
  { category: 'Articles', title: 'Working in the Open', author: 'Public Digital', description: 'Why showing your working builds trust and invites useful feedback.', url: 'https://public.digital/pd-books/test-and-learn/working-in-the-open-why-showing-your-working-out-matters-for-test-and-learn' },
  { category: 'Articles', title: 'Test and Learn as Competitive Advantage', author: 'Public Digital', description: 'The strategic case for test and learn as an organisational capability.', url: 'https://public.digital/pd-books/test-and-learn/why-test-and-learn-is-the-competitive-advantage-every-business-needs' },
  { category: 'Articles', title: 'The GOV.UK Service Standard', author: 'GOV.UK', description: 'The 14-point standard for designing and delivering public services.', url: 'https://www.gov.uk/service-manual/service-standard' },
  { category: 'Articles', title: 'Why We Created the Term Dynamic Operating Models', author: 'Public Digital', description: 'Why organisations need permanent feedback loops rather than a fixed future state.', url: 'https://public.digital/pd-insights/blog/2025/04/why-we-created-the-term-dynamic-operating-models' },
  { category: 'Articles', title: 'Operating Model', author: 'Public Digital', description: "Public Digital's approach to building organisations that stay adaptable.", url: 'https://public.digital/our-services/operating-model' },
  { category: 'Articles', title: 'Designing Operating Models That Deliver', author: 'Sullivan Stanley', description: 'What gets in the way of operating model change, and what helps.', url: 'https://www.sullivanstanley.com/insights/designing-operating-models-that-deliver-what-gets-in-the-way-and-what-helps/' },
  { category: 'Newsletters', title: 'One Useful Thing', author: 'Ethan Mollick', description: 'Thoughtful takes on AI in work and education. No hype.', url: 'https://www.oneusefulthing.org/' },
  { category: 'Newsletters', title: 'How to AI', author: 'Ruben Hassid', description: 'Practical AI workflows with screenshots. Step-by-step.', url: 'https://ruben.substack.com/' },
  { category: 'Newsletters', title: 'Andrew Greenway', description: 'Public Digital founder on government and digital reform.', url: 'https://andrewgreenway.substack.com/' },
  { category: 'Newsletters', title: "Lenny's Newsletter", author: 'Lenny Rachitsky', description: 'The biggest product management newsletter on Substack.', url: 'https://www.lennysnewsletter.com/' },
  { category: 'Newsletters', title: 'SVPG Newsletter', author: 'Marty Cagan', description: 'Strategic product leadership from the author of Inspired.', url: 'https://www.svpg.com/articles/' },
  { category: 'Blogs', title: 'GDS Blog', description: 'Official Government Digital Service blog. Policy, delivery, and the 2025-2030 digital roadmap.', url: 'https://gds.blog.gov.uk/' },
  { category: 'Blogs', title: 'Technology in Government', description: 'Technical counterpart to the GDS blog.', url: 'https://technology.blog.gov.uk/' },
  { category: 'Blogs', title: 'Government Digital and Data', description: 'Cross-government digital community blog.', url: 'https://cddo.blog.gov.uk/' },
  { category: 'Blogs', title: 'Design in Government', description: 'For people designing public services.', url: 'https://designnotes.blog.gov.uk/' },
  { category: 'Blogs', title: 'Digital People', description: 'Capability, careers, and the DDaT framework.', url: 'https://digitalpeople.blog.gov.uk/' },
  { category: 'Blogs', title: 'Public Digital Insights', description: 'Dynamic operating models, test and learn, prototyping, user research.', url: 'https://public.digital/pd-insights' },
  { category: 'Higher Education', title: 'Wonkhe', description: 'UK higher education policy analysis and debate.', url: 'https://wonkhe.com/' },
  { category: 'Higher Education', title: 'Jisc', description: 'Digital, data and technology guidance for UK universities.', url: 'https://www.jisc.ac.uk/' },
  { category: 'Higher Education', title: 'UCISA', description: 'Digital practitioners across UK universities and colleges.', url: 'https://www.ucisa.ac.uk/' },
  { category: 'Higher Education', title: 'HEPI', description: 'Independent UK higher education policy research.', url: 'https://www.hepi.ac.uk/' },
]

type PersonWithCategory = Person & { category: string }

const people: PersonWithCategory[] = [
  { category: 'UK Digital & Government', name: 'Lou Downe', description: 'Founded service design in UK government. Author of Good Services.', url: 'https://loudowne.com/', linkLabel: 'Website' },
  { category: 'UK Digital & Government', name: 'Janet Hughes', description: 'Former GDS, former DEFRA Programme Director. Writes about delivery and digital transformation.', url: 'https://www.linkedin.com/in/janet-hughes/', linkLabel: 'LinkedIn' },
  { category: 'UK Digital & Government', name: 'Tom Loosemore', description: 'Co-founded GDS. Now at Public Digital.', url: 'https://public.digital/people/tom-loosemore', linkLabel: 'Public Digital' },
  { category: 'UK Digital & Government', name: 'Emily Middleton', description: 'Director General for Digital Transformation at GDS.', url: 'https://www.gov.uk/government/people/emily-middleton', linkLabel: 'GOV.UK' },
  { category: 'UK Digital & Government', name: 'Richard Pope', description: 'Founding product manager at GOV.UK. Writes Platformland on government as a platform.', url: 'https://www.platformland.xyz/', linkLabel: 'Website' },
  { category: 'UK Digital & Government', name: 'Ben Holliday', description: 'Chief Design Officer at TPXimpact. Previously NHS and DWP.', url: 'https://www.benholliday.com/', linkLabel: 'Website' },
  { category: 'UK Digital & Government', name: 'Kit Collingwood', description: 'Co-founded OneTeamGov. Design and delivery leadership across DWP, MOJ and GDS.', url: 'https://medium.com/@kcollingwood', linkLabel: 'Medium' },
  { category: 'UK Digital & Government', name: 'Giles Turnbull', description: 'Wrote The Agile Comms Handbook. Works with public sector teams on communicating change.', url: 'https://gilest.org/', linkLabel: 'Website' },
  { category: 'UK Digital & Government', name: 'Matt Jukes', description: 'Head of Products at GDS National Data Library. Blogs about digital in government.', url: 'https://www.linkedin.com/in/jukesie/', linkLabel: 'LinkedIn' },
  { category: 'Higher Education', name: 'Lawrie Phipps', description: 'Senior Research Lead at Jisc. Writes about digital leadership and transformation in universities.', url: 'https://lawriephipps.co.uk/', linkLabel: 'Website' },
  { category: 'AI Trends & Skills', name: 'Benedict Evans', description: 'Former Andreessen Horowitz analyst. Annual essays on technology and industry change.', url: 'https://www.ben-evans.com/', linkLabel: 'Website' },
  { category: 'AI Trends & Skills', name: 'Dan Shipper', description: 'Co-founder of Every. Deep practical essays on AI in real work.', url: 'https://every.to/chain-of-thought', linkLabel: 'Website' },
  { category: 'AI Trends & Skills', name: 'Allie K. Miller', description: 'Former Amazon AI lead. Practical takes on AI for business.', url: 'https://www.alliekmiller.com/', linkLabel: 'Website' },
  { category: 'AI Trends & Skills', name: 'Donald Clark', description: 'UK-based. Writes on AI in education, learning, and skills.', url: 'https://donaldclarkplanb.blogspot.com/', linkLabel: 'Website' },
  { category: 'AI Trends & Skills', name: 'Jeni Tennison', description: 'Open Data Institute. AI policy and what it means for public services.', url: 'https://www.jenitennison.com/', linkLabel: 'Website' },
  { category: 'AI Trends & Skills', name: 'Paul Roetzer', description: 'Marketing AI Institute. AI adoption and capability building in organisations.', url: 'https://www.marketingaiinstitute.com/', linkLabel: 'Website' },
]

async function fetchFeed(url: string, sourceName: string): Promise<Article[]> {
  try {
    const res = await fetch(`/api/feed?url=${encodeURIComponent(url)}`)
    const text = await res.text()
    const parser = new DOMParser()
    const xml = parser.parseFromString(text, 'text/xml')
    const items = Array.from(xml.querySelectorAll('item')).slice(0, 5)
    return items.map((item) => {
      const linkEl = item.getElementsByTagName('link')[0]
      const link = linkEl?.textContent?.trim() || linkEl?.getAttribute('href') || ''
      return {
        title: item.getElementsByTagName('title')[0]?.textContent?.trim() ?? '',
        link,
        pubDate: item.getElementsByTagName('pubDate')[0]?.textContent?.trim() ?? '',
        description: item.getElementsByTagName('description')[0]?.textContent?.replace(/<[^>]*>/g, '').trim().slice(0, 160) ?? '',
        source: sourceName,
      }
    })
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

  const cardBase = "flex flex-col gap-2 p-6 rounded-xl transition-all hover:-translate-y-0.5"
  const cardStyle = { background: 'var(--bg-elevated)', border: '1px solid var(--border)' }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      {/* Header */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-10">
          <p className="eyebrow mb-6">Resources</p>
          <h1 className="font-display text-[44px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-tight text-ink font-medium mb-8">
            The sources I come back to.
          </h1>
          <p className="text-[18px] md:text-[19px] text-ink-soft leading-relaxed max-w-2xl">
            Books, newsletters, blogs and people that shape how I think and work. Plus live feeds from the writers and organisations worth following today.
          </p>
        </div>
      </div>

      {/* Books */}
      <section
        className="mb-20 pt-14 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="eyebrow mb-8">Books</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.map((book, i) => (
            <a key={i} href={book.url} target="_blank" rel="noopener noreferrer" className={cardBase} style={cardStyle}>
              <span className="eyebrow text-[11px]">{book.category}</span>
              <h3 className="font-display text-[19px] font-medium text-ink leading-snug">{book.title}</h3>
              {book.author && <p className="text-[13px] text-muted">{book.author}</p>}
              <p className="text-[14px] text-ink-soft leading-relaxed mt-1">{book.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Articles, Newsletters & Blogs */}
      <section
        className="mb-20 pt-14 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="eyebrow mb-8">Articles, newsletters &amp; blogs</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articleCards.map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className={cardBase} style={cardStyle}>
              <span className="eyebrow text-[11px]">{item.category}</span>
              <h3 className="font-display text-[19px] font-medium text-ink leading-snug">{item.title}</h3>
              {item.author && <p className="text-[13px] text-muted">{item.author}</p>}
              <p className="text-[14px] text-ink-soft leading-relaxed mt-1">{item.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* People */}
      <section
        className="mb-20 pt-14 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="eyebrow mb-8">People to follow</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {people.map((person, i) => (
            <div key={i} className="flex flex-col gap-3 p-6 rounded-xl" style={cardStyle}>
              <span className="eyebrow text-[11px]">{person.category}</span>
              <h3 className="font-display text-[19px] font-medium text-ink leading-snug">{person.name}</h3>
              <p className="text-[14px] text-ink-soft leading-relaxed flex-1">{person.description}</p>
              <a
                href={person.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium rounded-full px-3 py-1.5 self-start transition-colors"
                style={{ border: '1px solid var(--border-strong)', color: 'var(--ink)' }}
              >
                {person.linkLabel} ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Live feeds */}
      <section
        className="pt-14 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-12 md:col-span-7">
            <p className="eyebrow mb-3">Live feeds</p>
            <h2 className="font-display text-[32px] md:text-[40px] leading-tight tracking-tight text-ink font-medium">
              Latest from the field.
            </h2>
          </div>
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-6 mb-8 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          {(Object.keys(feeds) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-3 text-[14px] font-medium transition-colors relative -mb-px`}
              style={{
                color: activeCategory === cat ? 'var(--ink)' : 'var(--muted)',
                borderBottom: activeCategory === cat ? '2px solid var(--accent)' : '2px solid transparent',
              }}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Source chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {feeds[activeCategory].map((s) => (
            <span key={s.name} className="chip">{s.name}</span>
          ))}
        </div>

        {/* Feed items */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="border-t pt-6 pb-6 animate-pulse"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="h-3 w-24 rounded mb-3" style={{ background: 'var(--border)' }} />
                <div className="h-5 w-2/3 rounded mb-2" style={{ background: 'var(--border)' }} />
                <div className="h-3 w-full rounded" style={{ background: 'var(--border)' }} />
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <p className="text-muted text-[14px] py-12 text-center">
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
                className="group border-t py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 hover:bg-bg-elevated transition-colors px-2 -mx-2"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="md:col-span-3 flex flex-col gap-1">
                  <span className="text-[13px] font-medium text-ink-soft">{article.source}</span>
                  {article.pubDate && (
                    <span className="text-[12px] text-muted">
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
                <div className="md:col-span-9">
                  <h3 className="font-display text-[19px] md:text-[21px] font-medium text-ink leading-snug group-hover:text-accent transition-colors mb-1.5">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-muted text-[14px] leading-relaxed line-clamp-2">
                      {article.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

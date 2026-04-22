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
  // Service Design
  { category: 'Service Design', title: 'Good Services', author: 'Lou Downe', description: 'Lou Downe, former Head of Design at GDS, sets out 15 principles for designing services that work for users. I use these principles to assess admissions, enrolment and partner-facing services.', url: 'https://good.services/' },
  { category: 'Service Design', title: 'This Is Service Design Doing', author: 'Stickdorn, Hormess, Lawrence, Schneider', description: 'A practical methods handbook covering workshops, prototyping, journey mapping and implementation. Teams pick up specific techniques for running discovery sessions or mapping end-to-end student journeys.', url: 'https://www.thisisservicedesigndoing.com/' },
  { category: 'Service Design', title: 'This Is Service Design Thinking', author: 'Marc Stickdorn, Jakob Schneider', description: 'The foundational companion to Doing. Covers the mindset and theory behind service design. Read this first if the approach is new to you.', url: 'https://www.thisisservicedesignthinking.com/' },
  { category: 'Service Design', title: 'Service Design for Business', author: 'Reason, Løvlie, Brand Flu (Livework)', description: 'Connects service design methods to commercial and organisational outcomes. Useful when you need to build a business case for investing in service improvement.', url: 'https://www.liveworkstudio.com/book' },

  // Strategy
  { category: 'Strategy', title: 'Playing to Win', author: 'A.G. Lafley, Roger Martin', description: 'A strategy framework built around five questions: where to play, how to win, what capabilities you need and what management systems to build. Apply it to decisions about which markets to serve and how to differentiate.', url: 'https://rogerlmartin.com/lets-read/playing-to-win' },
  { category: 'Strategy', title: 'The Design of Business', author: 'Roger Martin', description: 'Martin argues that organisations gain competitive advantage by moving from analytical thinking to design thinking. Relevant when leadership needs to treat design as a strategic capability rather than a cosmetic function.', url: 'https://rogerlmartin.com/lets-read/the-design-of-business' },
  { category: 'Strategy', title: 'Competing Against Luck', author: 'Christensen, Hall, Dillon, Duncan', description: 'The Jobs to Be Done framework in full. Reframes competitive advantage around what users need to accomplish. Apply it to understand why students and partners choose your institution over alternatives.', url: 'https://www.christenseninstitute.org/books/competing-against-luck/' },
  { category: 'Strategy', title: 'Change by Design', author: 'Tim Brown', description: 'Tim Brown of IDEO explains how organisations embed design thinking as a strategic tool. A good starting point for leaders who want to understand what design-led means in practice.', url: 'https://www.ideo.com/journal/change-by-design' },
  { category: 'Strategy', title: 'Good Strategy Bad Strategy', author: 'Richard Rumelt', description: 'Rumelt distinguishes real strategy (a diagnosis, a guiding policy and coherent actions) from aspirational goal-setting. Read this when you need to challenge vague strategic statements and demand specifics.', url: 'https://goodbadstrategy.com/' },
  { category: 'Strategy', title: 'Competitive Advantage by Design', author: 'Public Digital', description: 'Public Digital explores how design-led approaches create lasting institutional advantage. Draws on public sector and commercial examples.', url: 'https://public.digital/pd-insights/publications' },

  // Transformation
  { category: 'Transformation', title: 'Digital Transformation at Scale', author: 'Greenway, Terrett, Bracken, Loosemore', description: 'Written by the team who built GDS. Covers what leaders need to know about digital transformation in large institutions, from governance to culture. Directly applicable to multi-campus expansion and institutional reform.', url: 'https://public.digital/pd-books' },
  { category: 'Transformation', title: 'Technology for Transformation', author: 'Public Digital', description: "Public Digital's guide to making technology decisions that support transformation rather than constrain it. Useful when evaluating platforms and systems.", url: 'https://public.digital/pd-books/pd-technology-book' },
  { category: 'Transformation', title: 'Test and Learn', author: 'Public Digital', description: 'A short, practical guide to running experiments and pilots before committing to large-scale delivery. Apply it when you want to reduce risk on new initiatives by testing assumptions early.', url: 'https://public.digital/pd-books/test-and-learn' },
  { category: 'Transformation', title: 'Leading Public Design', author: 'Christian Bason', description: 'Bason, former head of MindLab in Denmark, examines how public sector leaders create the conditions for design and innovation. Read this when your challenge is senior buy-in rather than method.', url: 'https://policy.bristoluniversitypress.co.uk/leading-public-design' },
  { category: 'Transformation', title: 'Switch', author: 'Chip Heath, Dan Heath', description: 'A behaviour change framework (rider, elephant, path) for leading change without relying on authority alone. Use the framework to design change interventions for staff adoption of new processes and systems.', url: 'https://heathbrothers.com/books/switch/' },
  { category: 'Transformation', title: 'Sense and Respond', author: 'Jeff Gothelf, Josh Seiden', description: 'Argues that continuous learning loops outperform big-bang transformation programmes. Apply it when shifting from project-based delivery to ongoing, outcome-focused improvement.', url: 'https://senseandrespond.co/' },
  { category: 'Transformation', title: 'Escaping the Build Trap', author: 'Melissa Perri', description: 'Perri explains how organisations move from shipping features to delivering outcomes. Relevant when you want teams to focus on whether something worked rather than whether it launched.', url: 'https://melissaperri.com/books/escaping-build-trap' },

  // Systems & Org Design
  { category: 'Systems & Org Design', title: 'Thinking in Systems', author: 'Donella Meadows', description: 'Meadows provides mental models for understanding feedback loops, delays and unintended consequences. Read this to see why optimising one part of a service can damage another.', url: 'https://donellameadows.org/thinking-in-systems-book/' },
  { category: 'Systems & Org Design', title: 'Team Topologies', author: 'Skelton, Pais', description: 'Treats organisational structure as a design problem. Offers four team types and three interaction modes. Use it when deciding how to structure teams and capabilities across multiple campuses.', url: 'https://teamtopologies.com/book' },
  { category: 'Systems & Org Design', title: 'The Art of Action', author: 'Stephen Bungay', description: 'Bungay applies military strategy principles to business, arguing for clarity of intent and decentralised execution. Useful when leaders want to set direction without micromanaging delivery.', url: 'https://www.hachette.co.uk/titles/stephen-bungay/the-art-of-action/9781857885590/' },
  { category: 'Systems & Org Design', title: 'Wardley Maps', author: 'Simon Wardley', description: 'A free, open strategy tool that maps value chains by evolution stage. Helps you see where to invest, where to use commodity platforms and where competitors will move next.', url: 'https://learnwardleymapping.com/' },

  // Leadership
  { category: 'Leadership', title: 'Turn the Ship Around!', author: 'L. David Marquet', description: 'Marquet transformed a nuclear submarine crew by pushing decision-making authority down the chain. Read this when leaders say they want empowered teams but keep pulling decisions upward.', url: 'https://davidmarquet.com/turn-the-ship-around-book/' },
  { category: 'Leadership', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', description: 'Kahneman explains the two systems that drive human judgement: fast intuition and slow deliberation. Foundational reading for anyone making decisions under uncertainty.', url: 'https://us.macmillan.com/books/9780374533557/thinkingfastandslow' },
  { category: 'Leadership', title: 'Radical Uncertainty', author: 'John Kay, Mervyn King', description: 'Kay and King (a former Bank of England governor) argue against false precision in planning and for narrative-based decision-making. Read this when detailed forecasts keep proving wrong.', url: 'https://www.littlebrown.co.uk/titles/mervyn-king/radical-uncertainty/9781408712580/' },
  { category: 'Leadership', title: 'An Elegant Puzzle', author: 'Will Larson', description: 'Larson writes about managing teams through growth and change. The sections on organisational design and migration apply well beyond software engineering.', url: 'https://lethain.com/elegant-puzzle/' },
  { category: 'Leadership', title: 'Lean Enterprise', author: "Humble, Molesky, O'Reilly", description: 'Extends lean startup principles to large organisations. Covers portfolio management, governance and culture change alongside delivery practices.', url: 'https://www.oreilly.com/library/view/lean-enterprise/9781491946527/' },
  { category: 'Leadership', title: 'Accelerate', author: 'Forsgren, Humble, Kim', description: 'Research-backed evidence connecting delivery performance to organisational performance. Gives you metrics and benchmarks to measure whether transformation efforts produce results.', url: 'https://itrevolution.com/product/accelerate/' },
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

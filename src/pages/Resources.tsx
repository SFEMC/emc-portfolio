import { useState } from 'react'

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
  isNew?: boolean
}

const books: BookCard[] = [
  // Service Design
  { category: 'Service Design', title: 'Good Services', author: 'Lou Downe', description: 'Lou Downe, former Head of Design at GDS, sets out 15 principles for designing services that work for users. I use these principles to assess admissions, enrolment and partner-facing services.', url: 'https://good.services/' },
  { category: 'Service Design', title: 'This Is Service Design Doing', author: 'Stickdorn, Hormess, Lawrence, Schneider', description: 'A practical methods handbook covering workshops, prototyping, journey mapping and implementation. Teams pick up specific techniques for running discovery sessions or mapping end-to-end student journeys.', url: 'https://www.thisisservicedesigndoing.com/' },
  { category: 'Service Design', title: 'This Is Service Design Thinking', author: 'Marc Stickdorn, Jakob Schneider', description: 'The foundational companion to Doing. Covers the mindset and theory behind service design. Read this first if the approach is new to you.', url: 'https://www.thisisservicedesignthinking.com/' },
  { category: 'Service Design', title: 'Service Design for Business', author: 'Reason, Løvlie, Brand Flu (Livework)', description: 'Connects service design methods to commercial and organisational outcomes. Useful when you need to build a business case for investing in service improvement.', url: 'https://www.liveworkstudio.com/book' },
  { category: 'Service Design', title: 'Product in Service', author: 'Scott Colfer', description: 'A short, sharp manifesto for pragmatic product management in complex services. Draws on work across local and central government, the NHS, education and charities.', url: 'https://scottcolfer.com/ProductInService/' },

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
  { category: 'Articles', title: "Most of What We Call a 'Service' Isn't One", author: 'Scott Colfer', description: 'On working out the landscape of a complex service and why most things labelled as services fall short of the definition.', url: 'https://productinservice.substack.com/p/most-of-what-we-call-a-service-isnt' },
  { category: 'Articles', title: 'Product Management vs Service Design', author: 'Scott Colfer', description: 'The differences between product management and service design as professions, and where each one helps.', url: 'https://productinservice.substack.com/p/product-management-vs-service-design' },
  { category: 'Newsletters', title: 'Product in Service', author: 'Scott Colfer', description: 'Monthly long-form for product people in complex services. Government, health, education, non-profit.', url: 'https://productinservice.substack.com/' },
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

const people: Person[] = [
  { name: 'Lou Downe', description: 'Founded service design in UK government. Author of Good Services.', url: 'https://loudowne.com/', linkLabel: 'Website' },
  { name: 'Janet Hughes', description: 'Former GDS, former DEFRA Programme Director.', url: 'https://www.linkedin.com/in/janet-hughes/', linkLabel: 'LinkedIn' },
  { name: 'Tom Loosemore', description: 'Co-founded GDS. Now at Public Digital.', url: 'https://public.digital/people/tom-loosemore', linkLabel: 'Public Digital' },
  { name: 'Emily Middleton', description: 'Director General for Digital Transformation at GDS.', url: 'https://www.gov.uk/government/people/emily-middleton', linkLabel: 'GOV.UK' },
  { name: 'Richard Pope', description: 'Founding product manager at GOV.UK. Writes Platformland.', url: 'https://www.platformland.xyz/', linkLabel: 'Website' },
  { name: 'Ben Holliday', description: 'Chief Design Officer at TPXimpact. Previously NHS and DWP.', url: 'https://www.benholliday.com/', linkLabel: 'Website' },
  { name: 'Kit Collingwood', description: 'Co-founded OneTeamGov. Design and delivery across DWP, MOJ and GDS.', url: 'https://medium.com/@kcollingwood', linkLabel: 'Medium' },
  { name: 'Giles Turnbull', description: 'Wrote The Agile Comms Handbook. Public sector comms.', url: 'https://gilest.org/', linkLabel: 'Website' },
  { name: 'Matt Jukes', description: 'Head of Products at GDS National Data Library.', url: 'https://www.linkedin.com/in/jukesie/', linkLabel: 'LinkedIn' },
  { name: 'Scott Colfer', description: 'Twenty years leading product and digital transformation. Writes Product in Service.', url: 'https://scottcolfer.com/', linkLabel: 'Website' },
  { name: 'Lawrie Phipps', description: 'Senior Research Lead at Jisc. Digital leadership in universities.', url: 'https://lawriephipps.co.uk/', linkLabel: 'Website' },
  { name: 'Benedict Evans', description: 'Former Andreessen Horowitz analyst. Annual essays on technology change.', url: 'https://www.ben-evans.com/', linkLabel: 'Website' },
  { name: 'Dan Shipper', description: 'Co-founder of Every. Practical essays on AI in real work.', url: 'https://every.to/chain-of-thought', linkLabel: 'Website' },
  { name: 'Allie K. Miller', description: 'Former Amazon AI lead. Practical AI for business.', url: 'https://www.alliekmiller.com/', linkLabel: 'Website' },
  { name: 'Donald Clark', description: 'UK-based. Writes on AI in education, learning and skills.', url: 'https://donaldclarkplanb.blogspot.com/', linkLabel: 'Website' },
  { name: 'Jeni Tennison', description: 'Open Data Institute. AI policy and public services.', url: 'https://www.jenitennison.com/', linkLabel: 'Website' },
  { name: 'Paul Roetzer', description: 'Marketing AI Institute. AI adoption in organisations.', url: 'https://www.marketingaiinstitute.com/', linkLabel: 'Website' },
  { name: 'Sarah Drummond', description: 'Snook founder, public sector service design.', url: 'https://wearesnook.com', linkLabel: 'Website', isNew: true },
  { name: 'Mike Bracken', description: 'Co-founded GDS, Public Digital.', url: 'https://public.digital', linkLabel: 'Public Digital', isNew: true },
  { name: 'Will Myddelton', description: 'Design practice in government.', url: 'https://www.myddelton.co.uk', linkLabel: 'Website', isNew: true },
  { name: 'Stefan Czerniawski', description: 'Strategic writing on digital government.', url: 'https://blog.czerniawski.org', linkLabel: 'Website', isNew: true },
  { name: 'Cathy Dutton', description: 'Service and interaction design, Defra.', url: 'https://cathydutton.co.uk', linkLabel: 'Website', isNew: true },
  { name: 'Teresa Torres', description: 'Continuous discovery habits.', url: 'https://www.producttalk.org', linkLabel: 'Website', isNew: true },
  { name: 'Cassie Kozyrkov', description: 'Applied AI and decision science.', url: 'https://kozyrkov.com', linkLabel: 'Website', isNew: true },
  { name: 'Shreyas Doshi', description: 'Product craft and prioritisation.', url: 'https://shreyas.substack.com', linkLabel: 'Substack', isNew: true },
]

type SectionFilter = 'all' | 'books' | 'reading' | 'people'

const tabs: { value: SectionFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'books', label: 'Books' },
  { value: 'reading', label: 'Reading' },
  { value: 'people', label: 'People' },
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

const cardBase = 'flex flex-col gap-2 p-6 rounded-xl transition-all hover:-translate-y-0.5'

export default function Resources() {
  const [filter, setFilter] = useState<SectionFilter>('all')
  const [showAllBooks, setShowAllBooks] = useState(false)
  const [showAllArticles, setShowAllArticles] = useState(false)

  const cardStyle = { background: 'var(--bg-elevated)', border: '1px solid var(--border)' }

  const showBooks = filter === 'all' || filter === 'books'
  const showReading = filter === 'all' || filter === 'reading'
  const showPeople = filter === 'all' || filter === 'people'

  const initialCount = 6
  const booksHead = books.slice(0, initialCount)
  const booksTail = books.slice(initialCount)
  const articlesHead = articleCards.slice(0, initialCount)
  const articlesTail = articleCards.slice(initialCount)

  function renderCard(item: BookCard, i: number) {
    return (
      <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className={cardBase} style={cardStyle}>
        <span className="eyebrow text-[11px]">{item.category}</span>
        <h3 className="font-display text-[19px] font-medium text-ink leading-snug">{item.title}</h3>
        {item.author && <p className="text-[13px] text-muted">{item.author}</p>}
        <p className="text-[14px] text-ink-soft leading-relaxed mt-1">{item.description}</p>
      </a>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      {/* Header */}
      <div className="grid grid-cols-12 gap-6 mb-12 md:mb-14">
        <div className="col-span-12 md:col-span-10">
          <p className="eyebrow mb-6">Resources</p>
          <h1 className="font-display text-[44px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-tight text-ink font-medium mb-8">
            The sources I come back to.
          </h1>
          <p className="text-[18px] md:text-[19px] text-ink-soft leading-relaxed max-w-2xl">
            Books, newsletters, blogs and people that shape how I think and work.
          </p>
        </div>
      </div>

      {/* Section nav */}
      <div
        className="flex flex-wrap gap-2 mb-14 pb-8 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all ${
              filter === tab.value
                ? 'bg-ink text-bg border border-ink'
                : 'border text-muted hover:text-ink border-border-strong'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Books */}
      {showBooks && (
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
            <p className="eyebrow">Books</p>
            <span className="text-[13px] text-muted">{books.length} total</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {booksHead.map(renderCard)}
          </div>
          <div
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            style={{ maxHeight: showAllBooks ? '8000px' : '0px' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {booksTail.map((b, i) => renderCard(b, i + initialCount))}
            </div>
          </div>
          {booksTail.length > 0 && (
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setShowAllBooks(!showAllBooks)}
                className="btn-secondary text-[13px]"
              >
                {showAllBooks ? 'Show less' : `Show all ${books.length}`}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showAllBooks ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
          )}
        </section>
      )}

      {/* Articles, Newsletters & Blogs */}
      {showReading && (
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
            <p className="eyebrow">Articles, newsletters &amp; blogs</p>
            <span className="text-[13px] text-muted">{articleCards.length} total</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articlesHead.map(renderCard)}
          </div>
          <div
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            style={{ maxHeight: showAllArticles ? '8000px' : '0px' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {articlesTail.map((a, i) => renderCard(a, i + initialCount))}
            </div>
          </div>
          {articlesTail.length > 0 && (
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setShowAllArticles(!showAllArticles)}
                className="btn-secondary text-[13px]"
              >
                {showAllArticles ? 'Show less' : `Show all ${articleCards.length}`}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showAllArticles ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
          )}
        </section>
      )}

      {/* People to follow */}
      {showPeople && (
        <section className="mb-12">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
            <p className="eyebrow">People to follow</p>
            <span className="text-[13px] text-muted">{people.length} total</span>
          </div>
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            {people.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-4 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
                  style={{ background: 'var(--bg-elevated)', color: 'var(--ink)', border: '1px solid var(--border)' }}
                  aria-hidden="true"
                >
                  {getInitials(p.name)}
                </div>
                <div className="flex-1 min-w-0 text-[14px] leading-snug">
                  <span className="font-semibold text-ink">{p.name}</span>
                  {p.isNew && (
                    <span
                      className="ml-2 inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded uppercase tracking-wide text-white align-middle"
                      style={{ background: '#16a34a' }}
                    >
                      new
                    </span>
                  )}
                  <span className="text-muted"> · {p.description}</span>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-medium text-ink-soft hover:text-accent transition-colors shrink-0 ml-2 whitespace-nowrap"
                >
                  {p.linkLabel} ↗
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

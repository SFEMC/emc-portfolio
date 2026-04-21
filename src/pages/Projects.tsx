import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import projectsData from '../content/projects.json'
import ProjectPreview from '../components/ProjectPreviews'

interface ProjectDetail {
  what: string
  how: string
  built: string
  hosting: string
  bots: string
  stack: string[]
}

interface Project {
  title: string
  date: string
  summary: string
  tags: string[]
  category: string
  liveUrl: string
  repoUrl: string
  detail?: ProjectDetail
}

const categories = ['All', 'Code', 'AI Experiment', 'Creative']

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expanded, setExpanded] = useState<number | null>(null)

  const projects = projectsData as Project[]
  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  function toggle(i: number) {
    setExpanded(expanded === i ? null : i)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      {/* Header */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-10">
          <p className="eyebrow mb-6">Projects</p>
          <h1 className="font-display text-[44px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-tight text-ink font-medium mb-8">
            Things I've built for the fun of it.
          </h1>
          <p className="text-[18px] md:text-[19px] text-ink-soft leading-relaxed max-w-2xl">
            Experiments, hobby builds and creative work outside of client delivery. Most are built conversationally with Claude Code in a weekend.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        className="flex flex-wrap gap-2 mb-12 pb-10 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setExpanded(null) }}
            className={`px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all ${
              activeCategory === cat
                ? 'bg-ink text-bg border border-ink'
                : 'border text-muted hover:text-ink border-border-strong'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project cards */}
      {filtered.length === 0 ? (
        <p className="text-muted text-[14px] py-12 text-center">No projects in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, i) => {
            const isExpanded = expanded === i
            const detail = project.detail

            return (
              <article
                key={i}
                className={`rounded-2xl transition-all cursor-pointer flex flex-col ${
                  isExpanded
                    ? 'col-span-1 md:col-span-2'
                    : 'hover:-translate-y-0.5'
                }`}
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                }}
                onClick={() => toggle(i)}
              >
                <div className="p-7 md:p-8">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="chip">{project.category}</span>
                      {project.date && (
                        <time className="text-[12px] text-muted">
                          {format(parseISO(project.date), 'MMM yyyy')}
                        </time>
                      )}
                    </div>
                    <span className="text-[12px] text-muted">
                      {isExpanded ? '— Close' : 'Open'}
                    </span>
                  </div>

                  <h2 className="font-display text-[24px] md:text-[28px] font-medium text-ink leading-tight mb-3">
                    {project.title}
                  </h2>
                  <p className="text-[15px] text-ink-soft leading-relaxed mb-5">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[12px] font-medium px-2.5 py-1 rounded-md"
                        style={{ background: 'var(--bg)', color: 'var(--ink-soft)', border: '1px solid var(--border)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && detail && (
                  <div
                    className="border-t px-7 md:px-8 pb-8 pt-6"
                    style={{ borderColor: 'var(--border)' }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="mb-10 rounded-xl overflow-hidden">
                      <ProjectPreview title={project.title} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <p className="eyebrow mb-2">What it does</p>
                        <p className="text-[15px] text-ink-soft leading-relaxed">{detail.what}</p>
                      </div>
                      <div>
                        <p className="eyebrow mb-2">How it works</p>
                        <p className="text-[15px] text-ink-soft leading-relaxed">{detail.how}</p>
                      </div>
                      <div>
                        <p className="eyebrow mb-2">How it was built</p>
                        <p className="text-[15px] text-ink-soft leading-relaxed">{detail.built}</p>
                      </div>
                      <div>
                        <p className="eyebrow mb-2">Hosting</p>
                        <p className="text-[15px] text-ink-soft leading-relaxed mb-4">{detail.hosting}</p>
                        {detail.bots && detail.bots !== 'None.' && detail.bots !== 'No bots — browser-based only.' && (
                          <>
                            <p className="eyebrow mb-2 mt-4">Bots &amp; automation</p>
                            <p className="text-[15px] text-ink-soft leading-relaxed">{detail.bots}</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div
                      className="pt-6 border-t"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <p className="eyebrow mb-3">Full stack</p>
                      <div className="flex flex-wrap gap-2">
                        {detail.stack.map(tech => (
                          <span
                            key={tech}
                            className="text-[12px] font-medium px-2.5 py-1 rounded-md"
                            style={{ background: 'var(--bg)', color: 'var(--ink)', border: '1px solid var(--border)' }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

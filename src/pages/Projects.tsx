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
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="border-b border-border pb-12 mb-12">
        <p className="text-xs text-muted uppercase tracking-widest font-body mb-3">Side Projects</p>
        <h1 className="font-body font-semibold text-3xl md:text-4xl text-ink leading-tight mb-4">
          What I've built
        </h1>
        <p className="text-muted font-body font-light text-base leading-relaxed max-w-2xl">
          Experiments, hobby builds, and creative work outside of client delivery. Click a project to see the full breakdown.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setExpanded(null) }}
            className={`px-3 py-1.5 text-xs font-body font-semibold rounded-lg transition-opacity ${
              activeCategory === cat ? 'bg-white text-gray-900' : 'border border-border text-muted hover:text-ink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project cards */}
      {filtered.length === 0 ? (
        <p className="text-muted font-body text-sm py-12 text-center">No projects in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            const isExpanded = expanded === i
            const detail = project.detail

            return (
              <div
                key={i}
                className={`border rounded-lg transition-all cursor-pointer flex flex-col ${
                  isExpanded
                    ? 'border-white col-span-1 md:col-span-2 lg:col-span-3 bg-surface'
                    : 'border-border hover:border-white group'
                }`}
                onClick={() => toggle(i)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    {project.date && (
                      <time className="text-xs text-muted font-body">
                        {format(parseISO(project.date), 'd MMMM yyyy')}
                      </time>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-body text-muted border border-border px-2 py-0.5 rounded">
                        {project.category}
                      </span>
                      <span className="text-xs text-muted">
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>
                  <h2 className={`font-body font-semibold text-lg leading-snug mb-2 transition-colors ${
                    isExpanded ? 'text-white' : 'text-ink group-hover:text-white'
                  }`}>
                    {project.title}
                  </h2>
                  <p className="text-muted font-body font-light text-sm leading-relaxed mb-4">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs text-muted font-body border border-border px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && detail && (
                  <div className="border-t border-border px-6 pb-6 pt-5" onClick={e => e.stopPropagation()}>
                    <div className="mb-8">
                      <ProjectPreview title={project.title} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xs text-muted uppercase tracking-widest font-body mb-2">What it does</h3>
                        <p className="text-sm font-body font-light text-ink leading-relaxed">{detail.what}</p>
                      </div>
                      <div>
                        <h3 className="text-xs text-muted uppercase tracking-widest font-body mb-2">How it works</h3>
                        <p className="text-sm font-body font-light text-ink leading-relaxed">{detail.how}</p>
                      </div>
                      <div>
                        <h3 className="text-xs text-muted uppercase tracking-widest font-body mb-2">How it was built</h3>
                        <p className="text-sm font-body font-light text-ink leading-relaxed">{detail.built}</p>
                      </div>
                      <div>
                        <h3 className="text-xs text-muted uppercase tracking-widest font-body mb-2">Hosting</h3>
                        <p className="text-sm font-body font-light text-ink leading-relaxed mb-4">{detail.hosting}</p>

                        {detail.bots && detail.bots !== 'None.' && detail.bots !== 'No bots — browser-based only.' && (
                          <>
                            <h3 className="text-xs text-muted uppercase tracking-widest font-body mb-2">Bots & automation</h3>
                            <p className="text-sm font-body font-light text-ink leading-relaxed">{detail.bots}</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Full tech stack */}
                    <div className="mt-6 pt-5 border-t border-border">
                      <h3 className="text-xs text-muted uppercase tracking-widest font-body mb-3">Full stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {detail.stack.map(tech => (
                          <span key={tech} className="text-xs font-body text-ink border border-border px-2.5 py-1 rounded-lg bg-bg">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

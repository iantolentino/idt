import { useState, useEffect } from 'react'
import { ExternalLink, Star, GitFork, Search, Loader2 } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { fetchGitHubProjects, type Project, type CategoryClass } from '@/lib/github'

type FilterKey = 'all' | 'live' | CategoryClass

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'web-apps', label: 'Web Apps' },
  { key: 'python', label: 'Python' },
  { key: 'desktop', label: 'Desktop' },
  { key: 'automation', label: 'Automation' },
  { key: 'utilities', label: 'Utilities' },
]

function getCounts(projects: Project[]): Record<FilterKey, number> {
  const counts: Record<string, number> = { all: projects.length, live: 0 }
  for (const p of projects) {
    counts[p.categoryClass] = (counts[p.categoryClass] || 0) + 1
    if (p.homepage) counts.live = (counts.live || 0) + 1
  }
  return counts as Record<FilterKey, number>
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState<FilterKey>('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchGitHubProjects().then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  const counts = getCounts(projects)

  const filtered = projects.filter((p) => {
    const matchCat = active === 'all' || (active === 'live' ? !!p.homepage : p.categoryClass === active)
    const q = query.toLowerCase()
    const matchSearch =
      q === '' ||
      p.name.toLowerCase().includes(q) ||
      p.language.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-8">
      <div className="space-y-2">
        <span className="inline-block border-2 border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-primary)]">Work</span>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight">Projects</h1>
        <p className="mt-1 text-[var(--color-muted-foreground)]">
          {loading ? 'Loading from GitHub...' : `${projects.length} projects across all categories`}
        </p>
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(({ key, label }) => {
            const count = counts[key] ?? 0
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium transition-all duration-150 flex items-center gap-1.5',
                  active === key
                    ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                    : 'bg-[var(--color-card)] text-[var(--color-foreground)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                )}
              >
                {label}
                {!loading && (
                  <span
                    className={cn(
                      'px-1.5 py-0.5 text-[10px] font-bold leading-none',
                      active === key
                        ? 'bg-[var(--color-primary-foreground)]/20 text-[var(--color-primary-foreground)]'
                        : 'bg-[var(--color-border)] text-[var(--color-foreground)]'
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="relative sm:ml-auto">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 w-full sm:w-56 border-2 border-[var(--color-border)] bg-[var(--color-card)] pl-8 pr-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-[var(--color-muted-foreground)]">
          <Loader2 size={28} className="animate-spin text-[var(--color-primary)]" />
          <p className="text-sm">Fetching projects from GitHub...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-[var(--color-muted-foreground)]">
          No projects match your search.
          {query && (
            <button
              onClick={() => setQuery('')}
              className="ml-2 text-[var(--color-primary)] hover:underline text-sm"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((proj) => (
            <Card
              key={proj.name}
              className="flex flex-col overflow-hidden hover:border-[var(--color-primary)]/40 hover:-translate-y-1 cursor-pointer p-0"
              onClick={() => window.open(proj.url, '_blank', 'noopener,noreferrer')}
            >
              <img
                src={`https://opengraph.githubassets.com/portfolio/iantolentino/${proj.name}`}
                alt={proj.name}
                className="w-full h-[calc(var(--spacing)*35)] object-cover border-b border-[var(--color-border)]"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <CardHeader className="px-4 pt-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-snug">{proj.name}</CardTitle>
                  <ExternalLink size={14} className="shrink-0 mt-0.5 text-[var(--color-muted-foreground)]" />
                </div>
                <CardDescription className="mt-2 line-clamp-2">{proj.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 px-4 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="default" className="text-[10px]">{proj.language}</Badge>
                  {proj.category !== proj.language && (
                    <Badge variant="secondary" className="text-[10px]">{proj.category}</Badge>
                  )}
                  {proj.homepage && (
                    <Badge variant="success" className="text-[10px]">Live</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="px-4 pb-3 text-xs text-[var(--color-muted-foreground)]">
                <span className="flex items-center gap-1"><Star size={12} /> {proj.stars}</span>
                <span className="flex items-center gap-1 ml-3"><GitFork size={12} /> {proj.forks}</span>
                <span className="ml-auto text-[10px]">{proj.updated}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-7 px-2 text-xs"
                  onClick={(e) => { e.stopPropagation(); window.open(proj.url, '_blank', 'noopener,noreferrer') }}
                >
                  <GithubIcon size={13} /> View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

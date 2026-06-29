import { useState, useEffect } from 'react'
import { ExternalLink, Star, GitFork, Search, Loader2 } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { fetchGitHubProjects, type Project, type CategoryClass } from '@/lib/github'

type FilterKey = 'all' | CategoryClass

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'web-apps', label: 'Web Apps' },
  { key: 'python', label: 'Python' },
  { key: 'desktop', label: 'Desktop' },
  { key: 'extensions', label: 'Extensions' },
  { key: 'automation', label: 'Automation' },
  { key: 'utilities', label: 'Utilities' },
]

function getCounts(projects: Project[]): Record<FilterKey, number> {
  const counts: Record<string, number> = { all: projects.length }
  for (const p of projects) {
    counts[p.categoryClass] = (counts[p.categoryClass] || 0) + 1
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
    const matchCat = active === 'all' || p.categoryClass === active
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
      <div>
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
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 flex items-center gap-1.5',
                  active === key
                    ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                    : 'bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-foreground)]'
                )}
              >
                {label}
                {!loading && (
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none',
                      active === key
                        ? 'bg-[var(--color-primary-foreground)]/20 text-[var(--color-primary-foreground)]'
                        : 'bg-[var(--color-border)] text-[var(--color-muted-foreground)]'
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
            className="h-9 w-full sm:w-56 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] pl-8 pr-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent"
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
              className="flex flex-col hover:border-[var(--color-primary)]/40 hover:-translate-y-1 cursor-pointer"
              onClick={() => window.open(proj.url, '_blank', 'noopener,noreferrer')}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-snug">{proj.name}</CardTitle>
                  <ExternalLink size={14} className="shrink-0 mt-0.5 text-[var(--color-muted-foreground)]" />
                </div>
                <CardDescription className="mt-2 line-clamp-3">{proj.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="default" className="text-[10px]">{proj.language}</Badge>
                  <Badge variant="secondary" className="text-[10px]">{proj.category}</Badge>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-[var(--color-muted-foreground)]">
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

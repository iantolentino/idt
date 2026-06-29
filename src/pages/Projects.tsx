import { useState } from 'react'
import { ExternalLink, Star, GitFork, Search } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const projects = [
  { name: 'Adaptive Brightness System', desc: 'Computer vision system using OpenCV and Python to dynamically adjust display brightness based on ambient lighting and user proximity.', tags: ['Python', 'OpenCV', 'Computer Vision', 'Automation'], category: 'ml', stars: 12, forks: 3 },
  { name: 'FastAPI REST Backend', desc: 'Production-ready REST API with JWT authentication, PostgreSQL, async endpoints, rate limiting, and full OpenAPI documentation.', tags: ['Python', 'FastAPI', 'PostgreSQL', 'JWT'], category: 'backend', stars: 8, forks: 2 },
  { name: 'IT Automation Toolkit', desc: 'PowerShell and Python scripts for bulk user provisioning, server monitoring via Radmin, and automated IT ops reporting.', tags: ['PowerShell', 'Python', 'Automation'], category: 'automation', stars: 15, forks: 5 },
  { name: 'Flask Web Application', desc: 'Full-featured web app with user auth, dashboard, REST API, and HTMX-powered dynamic UI updates.', tags: ['Python', 'Flask', 'HTMX', 'SQLite'], category: 'backend', stars: 6, forks: 1 },
  { name: 'Desktop Productivity Suite', desc: 'PyQt5 desktop application with PDF processing, QR generation, speech recognition, and data visualization modules.', tags: ['Python', 'PyQt5', 'Desktop'], category: 'desktop', stars: 9, forks: 2 },
  { name: 'React Portfolio Dashboard', desc: 'Interactive developer portfolio built with React, TypeScript, Vite, and shadcn/ui with GitHub API integration.', tags: ['React', 'TypeScript', 'Tailwind'], category: 'frontend', stars: 5, forks: 1 },
  { name: 'E-Commerce Backend', desc: 'Django REST framework backend for an e-commerce platform with product management, orders, and payment integration.', tags: ['Python', 'Django', 'PostgreSQL', 'REST'], category: 'backend', stars: 7, forks: 2 },
  { name: 'Web Scraping Framework', desc: 'Selenium-based web scraping framework with Playwright support, proxy rotation, and structured data extraction pipelines.', tags: ['Python', 'Selenium', 'Playwright'], category: 'automation', stars: 11, forks: 4 },
  { name: 'Kivy Mobile App', desc: 'Cross-platform mobile app built with Kivy for Android and iOS, featuring real-time data sync and offline support.', tags: ['Python', 'Kivy', 'Mobile'], category: 'desktop', stars: 4, forks: 1 },
]

const filters = [
  { key: 'all', label: 'All' },
  { key: 'backend', label: 'Backend' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'automation', label: 'Automation' },
  { key: 'desktop', label: 'Desktop' },
  { key: 'ml', label: 'ML / CV' },
]

export function Projects() {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = projects.filter((p) => {
    const matchCat = active === 'all' || p.category === active
    const matchSearch = query === '' || p.name.toLowerCase().includes(query.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    return matchCat && matchSearch
  })

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight">Projects</h1>
        <p className="mt-1 text-[var(--color-muted-foreground)]">70+ projects across backend, automation, and more</p>
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150',
                active === key
                  ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                  : 'bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-foreground)]'
              )}
            >
              {label}
            </button>
          ))}
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
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-[var(--color-muted-foreground)]">No projects match your search.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((proj) => (
            <Card
              key={proj.name}
              className="flex flex-col hover:border-[var(--color-primary)]/40 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{proj.name}</CardTitle>
                  <ExternalLink size={14} className="shrink-0 mt-0.5 text-[var(--color-muted-foreground)]" />
                </div>
                <CardDescription className="mt-2">{proj.desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="text-xs text-[var(--color-muted-foreground)]">
                <span className="flex items-center gap-1"><Star size={12} /> {proj.stars}</span>
                <span className="flex items-center gap-1 ml-3"><GitFork size={12} /> {proj.forks}</span>
                <Button variant="ghost" size="sm" className="ml-auto h-7 px-2 text-xs" asChild>
                  <a href="https://github.com/iantolentino" target="_blank" rel="noopener noreferrer">
                    <GithubIcon size={13} /> View
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

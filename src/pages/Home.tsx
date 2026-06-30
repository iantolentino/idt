import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Mail, ArrowRight, Code2, Server, Shield,
  Star, GitFork, ExternalLink, MapPin, Calendar, FolderOpen,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { fetchGitHubStats, fetchGitHubProjects, type GitHubStats, type Project } from '@/lib/github'

const STATIC_STATS = [
  { value: '70+', label: 'Projects' },
  { value: '1+', label: 'Years Exp.' },
  { value: '25+', label: 'Technologies' },
  { value: '4', label: 'Certifications' },
]

const primarySkills = ['Python', 'Flask', 'FastAPI', 'JavaScript', 'WordPress', 'MySQL']
const secondarySkills = ['React', 'TypeScript', 'PowerShell', 'Linux', 'Git']

const PHRASES = [
  'build full-stack web applications.',
  'develop WordPress sites & REST APIs.',
  'automate IT operations with Python.',
  'love clean, maintainable code.',
]

function useTypewriter(phrases: string[]) {
  const [state, setState] = useState({ text: '', idx: 0, deleting: false })
  useEffect(() => {
    const phrase = phrases[state.idx % phrases.length]
    if (!state.deleting && state.text === phrase) {
      const t = setTimeout(() => setState(s => ({ ...s, deleting: true })), 2200)
      return () => clearTimeout(t)
    }
    const delay = state.deleting ? 28 : 62
    const t = setTimeout(() => {
      setState(s => {
        if (!s.deleting) return { ...s, text: phrase.slice(0, s.text.length + 1) }
        const next = s.text.slice(0, -1)
        return next === '' ? { text: '', idx: s.idx + 1, deleting: false } : { ...s, text: next }
      })
    }, delay)
    return () => clearTimeout(t)
  }, [state, phrases])
  return state.text
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-primary)]">
      {children}
    </span>
  )
}

export function Home() {
  const typed = useTypewriter(PHRASES)
  const [liveStats, setLiveStats] = useState<GitHubStats | null>(null)
  const [featured, setFeatured] = useState<Project[]>([])

  useEffect(() => {
    fetchGitHubStats().then(setLiveStats)
    fetchGitHubProjects().then((projects) => {
      const top = [...projects]
        .sort((a, b) => (b.stars + b.forks) - (a.stars + a.forks))
        .slice(0, 3)
      setFeatured(top)
    })
  }, [])

  const stats = liveStats
    ? [
        { value: `${liveStats.repos}`, label: 'Projects' },
        { value: '1+', label: 'Years Exp.' },
        { value: `${liveStats.languages}`, label: 'Technologies' },
        { value: '4', label: 'Certifications' },
      ]
    : STATIC_STATS

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">

      {/* Hero — browser frame */}
      <section className="rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-[8px_8px_0px_var(--color-primary)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 bg-[var(--color-secondary)] px-4 py-3 border-b border-[var(--color-border)]">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1 rounded-md bg-[var(--color-background)] px-3 py-1 text-xs text-[var(--color-muted-foreground)] text-center">
            iantolentino.dev
          </div>
        </div>
        <div className="bg-[var(--color-card)] p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="shrink-0">
          <div className="relative">
            <img
              src="/avatar.jpg"
              alt="Ian Tolentino"
              className="h-32 w-32 sm:h-40 sm:w-40 rounded-2xl object-cover border-2 border-[var(--color-border)] shadow-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Ian+Tolentino&background=1e3a5f&color=58a6ff&size=160'
              }}
            />
            <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-success)] border-2 border-[var(--color-background)]" aria-label="Available for work" />
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] tracking-tight">
              Ian Tolentino
            </h1>
            <p className="mt-1 text-lg text-[var(--color-primary)] font-medium">
              Full-Stack Web Developer
            </p>
            {/* Terminal typewriter line */}
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 font-mono text-sm">
              <span className="text-[var(--color-success)]">&gt;</span>
              <span className="text-[var(--color-foreground)]">I {typed}</span>
              <span className="inline-block w-0.5 h-4 bg-[var(--color-primary)]" style={{ animation: 'blink 1s step-end infinite' }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[var(--color-muted-foreground)]">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> Mabalacat, Pampanga</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Available</span>
          </div>

          <p className="text-[var(--color-muted-foreground)] leading-relaxed max-w-xl">
            I build full-stack web applications, REST APIs, and automation tools with a focus on
            clean, maintainable code. Currently working as a Web Developer at{' '}
            <span className="text-[var(--color-foreground)] font-medium">Strata Staff Global</span>.
          </p>

          <div className="flex flex-wrap gap-2">
            {primarySkills.map((s) => <Badge key={s} variant="default">{s}</Badge>)}
            {secondarySkills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button asChild>
              <Link to="/projects"><FolderOpen size={16} /> View Projects</Link>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://github.com/iantolentino" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} /> GitHub
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://www.linkedin.com/in/iantolentino" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:iantolentino0110@gmail.com"><Mail size={16} /> Email Me</a>
            </Button>
          </div>
        </div>
        </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ value, label }) => (
          <div key={label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-center">
            <div className="text-2xl font-bold text-[var(--color-primary)]">{value}</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">{label}</div>
          </div>
        ))}
      </div>

      {/* What I do */}
      <section className="space-y-4">
        <div className="text-center space-y-2">
          <SectionLabel>Services</SectionLabel>
          <h2 className="text-xl font-bold text-[var(--color-foreground)]">What I Do</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Server, title: 'Backend & APIs', desc: 'REST APIs with Python (Flask, FastAPI), JWT auth, async patterns, and PostgreSQL.' },
          { icon: Code2, title: 'Full-Stack Dev', desc: 'Frontend with React & TypeScript paired with solid server-side foundations.' },
          { icon: Shield, title: 'Web & Hosting', desc: 'WordPress development, cPanel administration, SSL setup, performance tuning, and security hardening.' },
        ].map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="hover:border-[var(--color-primary)]/40 hover:-translate-y-1 cursor-default">
            <CardHeader>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Icon size={20} />
              </div>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent><CardDescription>{desc}</CardDescription></CardContent>
          </Card>
        ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="mb-6 text-center space-y-2">
          <SectionLabel>Work</SectionLabel>
          <div className="flex items-center justify-between mt-2">
            <h2 className="text-xl font-bold text-[var(--color-foreground)]">Featured Projects</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/projects">All Projects <ArrowRight size={14} /></Link>
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {featured.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="flex flex-col animate-pulse">
                  <CardHeader>
                    <div className="h-4 w-3/4 rounded bg-[var(--color-secondary)]" />
                    <div className="mt-3 h-3 w-full rounded bg-[var(--color-secondary)]" />
                    <div className="mt-1 h-3 w-2/3 rounded bg-[var(--color-secondary)]" />
                  </CardHeader>
                  <CardContent className="flex-1" />
                  <CardFooter />
                </Card>
              ))
            : featured.map((proj) => (
                <Card
                  key={proj.name}
                  className="flex flex-col overflow-hidden hover:border-[var(--color-primary)]/40 hover:-translate-y-1 cursor-pointer p-0"
                  onClick={() => window.open(proj.url, '_blank', 'noopener,noreferrer')}
                >
                  <img
                    src={`https://opengraph.githubassets.com/portfolio/iantolentino/${proj.name}`}
                    alt={proj.name}
                    className="w-full h-32 object-cover border-b border-[var(--color-border)]"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
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
                  </CardFooter>
                </Card>
              ))
          }
        </div>
      </section>

    </div>
  )
}

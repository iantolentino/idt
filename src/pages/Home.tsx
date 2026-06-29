import { Link } from 'react-router-dom'
import {
  Mail, ArrowRight, Code2, Server, Shield,
  Star, GitFork, ExternalLink, MapPin, Calendar, FolderOpen,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

const stats = [
  { value: '70+', label: 'Projects' },
  { value: '1+', label: 'Years Exp.' },
  { value: '25+', label: 'Technologies' },
  { value: '4', label: 'Certifications' },
]

const primarySkills = ['Python', 'Flask', 'FastAPI', 'JavaScript', 'PostgreSQL', 'Docker']
const secondarySkills = ['React', 'TypeScript', 'PowerShell', 'Linux', 'Git']

const featuredProjects = [
  {
    name: 'Adaptive Brightness System',
    description: 'Computer vision system that adjusts display brightness based on ambient light and user proximity using OpenCV.',
    tags: ['Python', 'OpenCV', 'Computer Vision'],
    stars: 12,
    forks: 3,
  },
  {
    name: 'FastAPI REST Backend',
    description: 'Production-ready REST API with JWT auth, PostgreSQL, async endpoints, and full OpenAPI documentation.',
    tags: ['Python', 'FastAPI', 'PostgreSQL'],
    stars: 8,
    forks: 2,
  },
  {
    name: 'IT Automation Toolkit',
    description: 'PowerShell and Python scripts for bulk user provisioning, server monitoring, and IT ops reporting.',
    tags: ['PowerShell', 'Python', 'Automation'],
    stars: 15,
    forks: 5,
  },
]

export function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">

      {/* Hero */}
      <section className="flex flex-col sm:flex-row gap-8 items-start">
        {/* Avatar */}
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

        {/* Bio */}
        <div className="space-y-4 flex-1">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] tracking-tight">
              Ian Tolentino
            </h1>
            <p className="mt-1 text-lg text-[var(--color-primary)] font-medium">
              Backend Developer & IT Security Engineer
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[var(--color-muted-foreground)]">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> Mabalacat, Pampanga</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Available</span>
          </div>

          <p className="text-[var(--color-muted-foreground)] leading-relaxed max-w-xl">
            I build robust APIs, server-side systems, and automation tools with a focus on
            clean, maintainable code. Currently working as an IT Security Engineer at{' '}
            <span className="text-[var(--color-foreground)] font-medium">Nanox Philippines</span>.
          </p>

          {/* Primary skill pills */}
          <div className="flex flex-wrap gap-2">
            {primarySkills.map((s) => (
              <Badge key={s} variant="default">{s}</Badge>
            ))}
            {secondarySkills.map((s) => (
              <Badge key={s} variant="secondary">{s}</Badge>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Button asChild>
              <Link to="/projects">
                <FolderOpen size={16} />
                View Projects
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://github.com/iantolentino" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} />
                GitHub
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://www.linkedin.com/in/iantolentino" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon size={16} />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:iantolentino0110@gmail.com">
                <Mail size={16} />
                Email Me
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-center"
          >
            <div className="text-2xl font-bold text-[var(--color-primary)]">{value}</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* What I do */}
      <section className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Server, title: 'Backend & APIs', desc: 'REST APIs with Python (Flask, FastAPI), JWT auth, async patterns, and PostgreSQL.' },
          { icon: Code2, title: 'Full-Stack Dev', desc: 'Frontend with React & TypeScript paired with solid server-side foundations.' },
          { icon: Shield, title: 'IT Security', desc: 'Monitoring, automation scripts, user provisioning, and vulnerability assessment.' },
        ].map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="hover:border-[var(--color-primary)]/40 hover:-translate-y-1 cursor-default">
            <CardHeader>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Icon size={20} />
              </div>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Featured Projects */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--color-foreground)]">Featured Projects</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/projects">
              All Projects <ArrowRight size={14} />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {featuredProjects.map((proj) => (
            <Card
              key={proj.name}
              className="flex flex-col hover:border-[var(--color-primary)]/40 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{proj.name}</CardTitle>
                  <ExternalLink size={14} className="shrink-0 mt-0.5 text-[var(--color-muted-foreground)]" />
                </div>
                <CardDescription className="mt-2">{proj.description}</CardDescription>
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
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

    </div>
  )
}


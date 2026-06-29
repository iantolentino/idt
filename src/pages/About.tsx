import { Heart, GraduationCap, Users, Target, Trophy, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const philosophy = [
  { icon: Heart, title: 'Passion for Code', desc: 'Writing clean, maintainable code that solves real problems and stands the test of time.' },
  { icon: GraduationCap, title: 'Continuous Learning', desc: 'Always staying current with evolving technologies and industry best practices.' },
  { icon: Users, title: 'Collaboration', desc: 'Working with teams to find the best solutions through open communication and shared goals.' },
  { icon: Target, title: 'User Focus', desc: 'Creating intuitive experiences that make technology accessible and valuable to real people.' },
]

const achievements = [
  'Philippine Start-up Challenge — Regional Pitch (Oct 2023)',
  'PSAU Creativity & Innovation Day — Pitch Competition (Apr 2024)',
  'TOPCIT — Level 4 IT Competency (Apr 2024)',
  'DICT Programming Course — Accredited (Sept 2024)',
]

export function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight">About Me</h1>
        <p className="mt-1 text-[var(--color-muted-foreground)]">The person behind the code</p>
      </div>

      {/* Bio */}
      <div className="grid sm:grid-cols-3 gap-8">
        <div className="sm:col-span-2 space-y-4">
          <p className="text-[var(--color-muted-foreground)] leading-relaxed border-l-2 border-[var(--color-primary)] pl-4">
            I'm a <span className="text-[var(--color-foreground)] font-semibold">backend developer</span> specializing in building robust APIs,
            server-side systems, and automation tools, with full-stack experience in web and desktop applications.
          </p>
          <p className="text-[var(--color-muted-foreground)] leading-relaxed border-l-2 border-[var(--color-border)] pl-4">
            I prioritize <span className="text-[var(--color-foreground)] font-semibold">clean, maintainable code</span>, continuous learning,
            and collaboration to deliver solutions that are both functional and easy to understand.
          </p>
          <p className="text-[var(--color-muted-foreground)] leading-relaxed border-l-2 border-[var(--color-border)] pl-4">
            Beyond development, I work as an IT Security Engineer, bridging the gap between software engineering
            and system security — monitoring infrastructure, automating operations, and keeping critical systems available.
          </p>
        </div>

        {/* Quick facts */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><GraduationCap size={16} className="text-[var(--color-primary)]" /> Education</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              <p className="font-semibold text-sm text-[var(--color-foreground)]">B.S. Information Technology</p>
              <p className="text-xs text-[var(--color-muted-foreground)]">Pampanga State Agricultural University</p>
              <p className="text-xs text-[var(--color-muted-foreground)]">2021 — 2025</p>
              <Badge variant="success" className="mt-2 text-[10px]">GPA 1.59 / 5.00 (1 is highest)</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Trophy size={16} className="text-[var(--color-primary)]" /> Achievements</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-xs text-[var(--color-muted-foreground)]">
                    <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[var(--color-success)]" />
                    {a}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Philosophy */}
      <section>
        <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6">My Philosophy</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {philosophy.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="text-center p-6 hover:border-[var(--color-primary)]/40 hover:-translate-y-1 cursor-default"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-sm text-[var(--color-foreground)] mb-2">{title}</h3>
              <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">{desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

import { Briefcase, GraduationCap, Trophy, MapPin, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const timeline = [
  {
    icon: Briefcase,
    type: 'work',
    title: 'IT Security Engineer',
    company: 'Nanox Philippines, Inc.',
    location: 'Mabalacat, Pampanga',
    period: 'June 2025 — Present',
    current: true,
    tags: ['PowerShell', 'Radmin', 'IT Security', 'Automation'],
    achievements: [
      'Reduced ticket resolution time by introducing standardized troubleshooting steps and knowledge base articles',
      'Monitored and maintained 100+ PCs ensuring >99% availability for critical workstations',
      'Implemented automation scripts for bulk user provisioning and reporting',
      'Created Radmin automation for server monitoring and maintenance',
      'Led in-house training sessions improving Office productivity and reducing repetitive support tickets',
      'Identified and reported recurring web application errors, improving internal system reliability',
    ],
  },
  {
    icon: Briefcase,
    type: 'work',
    title: 'IT Support / Developer — Internship',
    company: 'Various Projects & Freelance',
    location: 'Lubao, Pampanga',
    period: 'Jan 2025 — Apr 2025',
    current: false,
    tags: ['Python', 'CCTV', 'Data Management', 'Automation'],
    achievements: [
      'Resolved hardware/software issues across multiple environments',
      'Installed and configured CCTV systems for security monitoring',
      'Organized large digital archives and implemented efficient data management systems',
      'Assisted in inventory management and maintained e-commerce backends',
      'Developed automation tools to streamline IT operations',
    ],
  },
  {
    icon: GraduationCap,
    type: 'education',
    title: 'B.S. Information Technology',
    company: 'Pampanga State Agricultural University',
    location: 'Pampanga',
    period: '2021 — 2025',
    current: false,
    tags: ['Software Dev', 'Networking', 'System Admin'],
    achievements: [
      'Graduated with GPA 1.59/5.00 (where 1 is highest)',
      'Completed capstone projects in adaptive brightness systems and productivity applications',
      'Participated in multiple programming competitions and innovation challenges',
    ],
  },
  {
    icon: Trophy,
    type: 'achievement',
    title: 'Competitions & Certifications',
    company: 'Academic Excellence',
    location: '',
    period: '2021 — 2025',
    current: false,
    tags: ['Competition', 'Certification'],
    achievements: [
      'Philippine Start-up Challenge — Regional Pitch (Oct 2023)',
      'PSAU Creativity & Innovation Day — Pitch Competition (Apr 2024)',
      'TOPCIT — Level 4 IT Competency (Apr 2024)',
      'DICT Programming Course — Accredited (Sept 2024)',
    ],
  },
]

const iconColors: Record<string, string> = {
  work: 'text-[var(--color-primary)] bg-[var(--color-primary)]/10',
  education: 'text-purple-400 bg-purple-400/10',
  achievement: 'text-amber-400 bg-amber-400/10',
}

export function Experience() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight">Expertise & Journey</h1>
        <p className="mt-1 text-[var(--color-muted-foreground)]">Professional experience and education</p>
      </div>

      <div className="relative space-y-6">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--color-border)] hidden sm:block" />

        {timeline.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="flex gap-5">
              {/* Icon node */}
              <div className="relative z-10 hidden sm:flex shrink-0">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--color-border)] ${iconColors[item.type]}`}>
                  <Icon size={18} />
                </div>
              </div>

              {/* Content */}
              <Card className={`flex-1 hover:border-[var(--color-primary)]/30 ${item.current ? 'border-[var(--color-primary)]/40' : ''}`}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-base">
                        {item.title}
                        {item.current && <Badge variant="success" className="text-[10px]">Current</Badge>}
                      </CardTitle>
                      <div className="mt-1 flex flex-wrap gap-3 text-sm text-[var(--color-muted-foreground)]">
                        <span className="flex items-center gap-1"><Briefcase size={13} /> {item.company}</span>
                        {item.location && <span className="flex items-center gap-1"><MapPin size={13} /> {item.location}</span>}
                        <span className="flex items-center gap-1"><Calendar size={13} /> {item.period}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.achievements.map((a) => (
                      <li key={a} className="flex gap-2 text-sm text-[var(--color-muted-foreground)]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

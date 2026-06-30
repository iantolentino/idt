import { Server, Paintbrush, Wrench, Monitor, Globe } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const categories = [
  {
    icon: Server,
    title: 'Backend & Server',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    dot: 'bg-blue-400',
    skills: [
      'Python', 'Flask', 'FastAPI', 'Django',
      'PostgreSQL', 'MySQL', 'MongoDB', 'REST APIs',
      'JWT Auth', 'Selenium', 'OpenCV', 'WebRTC',
    ],
  },
  {
    icon: Paintbrush,
    title: 'Frontend & UI',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
    dot: 'bg-purple-400',
    skills: [
      'JavaScript', 'TypeScript', 'React',
      'HTML5', 'CSS3', 'Tailwind CSS',
      'Bootstrap', 'HTMX', 'WordPress',
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & DevOps',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    dot: 'bg-emerald-400',
    skills: [
      'Git / GitHub', 'Docker', 'Linux',
      'PowerShell', 'Shell Scripting', 'Postman',
      'VS Code', 'cPanel', 'AWS (basics)',
    ],
  },
  {
    icon: Monitor,
    title: 'Desktop & Automation',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    dot: 'bg-amber-400',
    skills: [
      'PyQt / PySide', 'Tkinter', 'Kivy',
      'PDF Processing', 'Data Visualization',
      'Speech Recognition', 'QR Tools',
    ],
  },
  {
    icon: Globe,
    title: 'Web & Hosting',
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/20',
    dot: 'bg-rose-400',
    skills: [
      'WordPress Themes', 'Plugin Development',
      'SEO Optimization', 'cPanel Admin',
      'SSL Setup', 'Domain Configuration',
      'Performance Tuning', 'Security Hardening',
      'MySQL Optimization', 'Deployment Workflows',
    ],
  },
]

export function Skills() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight">Skills & Expertise</h1>
        <p className="mt-1 text-[var(--color-muted-foreground)]">Technologies and tools I work with</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map(({ icon: Icon, title, color, bg, border, dot, skills }) => (
          <Card key={title} className={`hover:border-[var(--color-primary)]/30`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-base">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bg} ${color}`}>
                  <Icon size={18} />
                </div>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className={`inline-flex items-center gap-1.5 rounded-full border ${border} px-2.5 py-1 text-xs font-medium text-[var(--color-foreground)]`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

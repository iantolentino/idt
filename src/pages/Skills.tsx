import { Server, Paintbrush, Wrench, Monitor } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const categories = [
  {
    icon: Server,
    title: 'Backend & Server',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Flask', level: 85 },
      { name: 'FastAPI', level: 85 },
      { name: 'Django', level: 65 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 70 },
      { name: 'Selenium', level: 75 },
      { name: 'OpenCV', level: 70 },
    ],
  },
  {
    icon: Paintbrush,
    title: 'Frontend & UI',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    skills: [
      { name: 'JavaScript', level: 80 },
      { name: 'TypeScript', level: 70 },
      { name: 'React', level: 72 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'Bootstrap', level: 80 },
      { name: 'HTMX', level: 65 },
      { name: 'Tailwind CSS', level: 75 },
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & DevOps',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    skills: [
      { name: 'Docker', level: 75 },
      { name: 'Git / GitHub', level: 90 },
      { name: 'Linux', level: 80 },
      { name: 'PowerShell', level: 85 },
      { name: 'Postman', level: 85 },
      { name: 'VS Code', level: 90 },
      { name: 'AWS (basics)', level: 55 },
      { name: 'Shell Scripting', level: 78 },
    ],
  },
  {
    icon: Monitor,
    title: 'Desktop & Automation',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    skills: [
      { name: 'PyQt / PySide', level: 75 },
      { name: 'Tkinter', level: 80 },
      { name: 'Kivy', level: 60 },
      { name: 'PDF Processing', level: 70 },
      { name: 'Data Visualization', level: 72 },
      { name: 'Speech Recognition', level: 65 },
      { name: 'QR Tools', level: 75 },
      { name: 'WebRTC', level: 60 },
    ],
  },
]

function SkillBar({ name, level, barColor }: { name: string; level: number; barColor: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-foreground)]">{name}</span>
        <span className="text-xs text-[var(--color-muted-foreground)]">{level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[var(--color-border)]">
        <div
          className={`h-1.5 rounded-full ${barColor} transition-all duration-700`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

const barColors = ['bg-blue-400', 'bg-purple-400', 'bg-emerald-400', 'bg-amber-400']

export function Skills() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight">Skills & Expertise</h1>
        <p className="mt-1 text-[var(--color-muted-foreground)]">Technologies I work with regularly</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {categories.map(({ icon: Icon, title, color, bg, skills }, i) => (
          <Card key={title} className="hover:border-[var(--color-primary)]/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${bg} ${color}`}>
                  <Icon size={18} />
                </div>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {skills.map((s) => (
                <SkillBar key={s.name} name={s.name} level={s.level} barColor={barColors[i]} />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

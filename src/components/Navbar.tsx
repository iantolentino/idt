import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, User, FolderOpen, Wrench, Briefcase, Mail, Menu, X } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: User },
  { to: '/projects', label: 'Projects', icon: FolderOpen },
  { to: '/skills', label: 'Skills', icon: Wrench },
  { to: '/experience', label: 'Experience', icon: Briefcase },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 font-bold text-[var(--color-primary)] text-lg tracking-tight">
            IT
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20'
                      : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)]'
                  )
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side: social icons + hamburger */}
          <div className="flex items-center gap-1">
            <a href="https://github.com/iantolentino" target="_blank" rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
              aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href="https://www.linkedin.com/in/iantolentino" target="_blank" rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
              aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href="mailto:iantolentino0110@gmail.com"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
              aria-label="Email">
              <Mail size={18} />
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="flex sm:hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden fixed inset-0 z-40 flex flex-col">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[var(--color-background)]/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <nav className="absolute top-16 left-0 right-0 border-b border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 space-y-1 shadow-xl">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20'
                      : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)]'
                  )
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-[var(--color-border)] flex items-center gap-2">
              <a href="mailto:iantolentino0110@gmail.com"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors">
                <Mail size={15} /> iantolentino0110@gmail.com
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

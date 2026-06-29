# PROGRESS

> Read at start of every EXECUTION_MODE session. Update after every completed/blocked task.

---

## Stack
Vite 8 + React 19 + TypeScript + Tailwind v4 + shadcn-style components + React Router v7

## Active Task
> Audit fixes — see A01–A05 below

---

## Completed
| ID | Task | Date |
|----|------|------|
| P01 | Migrate portfolio Dev/ (vanilla) → app/ (React/Vite/Tailwind v4) | 2026-06-29 |
| P02 | Build 5 pages: Home, About, Projects, Skills, Experience | 2026-06-29 |
| P03 | shadcn-style components: Button, Badge, Card, Separator | 2026-06-29 |
| P04 | Custom GithubIcon/LinkedinIcon SVGs (lucide-react v1.21 removed brand icons) | 2026-06-29 |
| P05 | Push to https://github.com/iantolentino/claude-portfolio.git main | 2026-06-29 |
| P06 | Live GitHub API fetch in Projects (src/lib/github.ts) — categorize, paginate, fallback | 2026-06-30 |
| P07 | Category filter buttons with live counts (All/Web Apps/Python/Desktop/Extensions/Automation/Utilities) | 2026-06-30 |
| P08 | Home stats cards pull live repos count + languages count via fetchGitHubStats() | 2026-06-30 |
| B01 | Mobile navbar hamburger — drawer with backdrop, closes on nav/backdrop click | 2026-06-30 |
| B05 | Home featured projects — real GitHub data, top 3 by stars+forks, cards clickable | 2026-06-30 |
| B06 | Skills: replaced % bars with icon+name pill chips, 3-col grid, added Web & Hosting category | 2026-06-30 |
| B07 | Experience: added Strata Staff Global (Jun 2026–Present), fixed Nanox dates Jun 2025–Jun 2026 | 2026-06-30 |
| A01 | Home title + bio: "Full-Stack Web Developer" at Strata Staff Global (was Nanox IT Security) | 2026-06-30 |
| A02 | About third paragraph: updated to reflect Strata Staff role (removed IT Security Engineer ref) | 2026-06-30 |

---

## Audit Backlog (found 2026-06-30)
| ID | Issue | Location | Priority |
|----|-------|----------|----------|
| A03 | Home "What I do" — IT Security card (Shield) no longer current role, replace with Web/WordPress card | Home.tsx | HIGH |
| A04 | Home primary skills — missing WordPress, which is now a core daily skill | Home.tsx | HIGH |
| A05 | index.html meta description still says generic Vite app, update to real portfolio description | index.html | MEDIUM |
| A06 | Home Navbar logo "IT" initials — consider making it full name or styled monogram | Navbar.tsx | LOW |
| B02 | Dark/light theme toggle | — | LOW |
| B03 | Deploy to Vercel/GitHub Pages for live URL | — | DEFERRED |
| B04 | Contact form | — | DEFERRED |

---

## Blocked
| ID | Task | Reason |
|----|------|--------|
| | | |

---

Last updated: 2026-06-30
Current phase: MVP

const GITHUB_USERNAME = 'iantolentino'
const GITHUB_API_BASE = `https://api.github.com/users/${GITHUB_USERNAME}`

export type Category = 'Web Apps' | 'Python' | 'Desktop' | 'Extensions' | 'Automation' | 'Utilities'
export type CategoryClass = 'web-apps' | 'python' | 'desktop' | 'extensions' | 'automation' | 'utilities'

export interface Project {
  name: string
  description: string
  url: string
  stars: number
  forks: number
  language: string
  updated: string
  category: Category
  categoryClass: CategoryClass
}

export interface GitHubStats {
  repos: number
  stars: number
  forks: number
  languages: number
  contributions: number
  followers: number
  following: number
}

interface RawRepo {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

let cachedProjects: Project[] | null = null
let cachedStats: GitHubStats | null = null

function categorizeProject(repo: RawRepo): { category: Category; categoryClass: CategoryClass } {
  const name = repo.name.toLowerCase()
  const description = (repo.description || '').toLowerCase()
  const language = repo.language || ''

  if (
    language === 'HTML' || language === 'CSS' ||
    (language === 'JavaScript' && !name.includes('desktop') && !description.includes('desktop')) ||
    name.includes('web') || description.includes('web app') ||
    name.includes('dashboard') || name.includes('portfolio') ||
    name.includes('kanban') || name.includes('pomodoro') ||
    name.includes('budget') || name.includes('calculator') ||
    name.includes('flashcard') || name.includes('blog') ||
    name.includes('ephemeral') || name.includes('scoutify') ||
    name.includes('echothread') || name.includes('linkvault') ||
    name.includes('dev') || name.includes('email-template') ||
    name.includes('loan-calculator') || name.includes('sleep-cycle') ||
    name.includes('spaceremover') || name.includes('colordocx')
  ) {
    return { category: 'Web Apps', categoryClass: 'web-apps' }
  }

  if (
    language === 'Python' &&
    !name.includes('gui') && !description.includes('gui') &&
    !name.includes('desktop') && !description.includes('desktop') &&
    !name.includes('tkinter') && !name.includes('pyqt') &&
    !name.includes('pyside') && !description.includes('automation') &&
    !name.includes('scraper') && !description.includes('scraper')
  ) {
    return { category: 'Python', categoryClass: 'python' }
  }

  if (
    (language === 'Python' && (
      name.includes('gui') || description.includes('gui') ||
      name.includes('desktop') || description.includes('desktop') ||
      name.includes('tkinter') || name.includes('pyqt') || name.includes('pyside') ||
      name.includes('customtkinter')
    )) ||
    name.includes('tomodoro') || name.includes('pdf-toolkit') ||
    name.includes('expense-tracker') || (name.includes('qr') && (name.includes('scanner') || name.includes('generator'))) ||
    name.includes('inventory') || name.includes('salary') ||
    name.includes('password-vault') || name.includes('luminar') ||
    name.includes('task-alarm') || name.includes('home-maintenance') ||
    name.includes('disposal-form') || name.includes('qr-scanner') ||
    name.includes('qr-generator')
  ) {
    return { category: 'Desktop', categoryClass: 'desktop' }
  }

  if (
    name.includes('extension') || description.includes('extension') ||
    name.includes('chrome') || description.includes('chrome extension') ||
    name.includes('darkmode') || name.includes('tab-manager') ||
    name.includes('motivational') || name.includes('pause-reminder') ||
    name.includes('email-rewriting') || name.includes('force-darkmode')
  ) {
    return { category: 'Extensions', categoryClass: 'extensions' }
  }

  if (
    name.includes('automation') || description.includes('automation') ||
    name.includes('monitor') || description.includes('monitoring') ||
    name.includes('radmin') || name.includes('bingauto') ||
    name.includes('ftp') || name.includes('scraper') ||
    name.includes('room-temp') || name.includes('website-uptime') ||
    name.includes('crypto-data') || description.includes('scraper')
  ) {
    return { category: 'Automation', categoryClass: 'automation' }
  }

  if (
    name.includes('file') || description.includes('file') ||
    name.includes('organizer') || description.includes('organizer') ||
    name.includes('generator') || description.includes('generator') ||
    name.includes('converter') || description.includes('converter') ||
    name.includes('toolkit') || name.includes('cli') ||
    name.includes('print') || name.includes('manager') ||
    name.includes('portfolio-crafter') || name.includes('code-snippet') ||
    name.includes('github-repo-fetcher') || name.includes('resume-manager')
  ) {
    return { category: 'Utilities', categoryClass: 'utilities' }
  }

  if (language === 'Python') return { category: 'Python', categoryClass: 'python' }
  if (language === 'JavaScript' || language === 'TypeScript') return { category: 'Web Apps', categoryClass: 'web-apps' }
  if (language === 'HTML' || language === 'CSS') return { category: 'Web Apps', categoryClass: 'web-apps' }
  if (language === 'PHP') return { category: 'Web Apps', categoryClass: 'web-apps' }

  return { category: 'Utilities', categoryClass: 'utilities' }
}

function getFallbackProjects(): Project[] {
  return [
    { name: 'Room Temperature Monitoring Tool', description: 'Enterprise-grade application for server room monitoring', url: 'https://github.com/iantolentino/Room-Temp-Monitoring-Tool', stars: 2, forks: 1, language: 'Python', updated: 'Mar 2024', category: 'Automation', categoryClass: 'automation' },
    { name: 'Axon', description: 'Comprehensive personal productivity application', url: 'https://github.com/iantolentino/Axon', stars: 3, forks: 2, language: 'JavaScript', updated: 'Feb 2024', category: 'Web Apps', categoryClass: 'web-apps' },
    { name: 'Password Vault', description: 'Secure password manager with encryption', url: 'https://github.com/iantolentino/Password-Vault', stars: 4, forks: 1, language: 'Python', updated: 'Jan 2024', category: 'Desktop', categoryClass: 'desktop' },
    { name: 'QR Code Attendance Scanner', description: 'Desktop app for QR code attendance tracking', url: 'https://github.com/iantolentino/QRCode-Attendance-Scanner', stars: 4, forks: 2, language: 'Python', updated: 'Dec 2023', category: 'Desktop', categoryClass: 'desktop' },
    { name: 'Daily Motivational Quotes', description: 'Chrome extension for motivational quotes', url: 'https://github.com/iantolentino/daily-motivational-quotes', stars: 3, forks: 0, language: 'JavaScript', updated: 'Sep 2023', category: 'Extensions', categoryClass: 'extensions' },
    { name: 'File Organizer', description: 'Command-line tool to organize files', url: 'https://github.com/iantolentino/File-Organizer', stars: 5, forks: 3, language: 'Python', updated: 'Aug 2023', category: 'Utilities', categoryClass: 'utilities' },
    { name: 'Ephemeral Chat', description: 'Peer-to-peer chat using WebRTC', url: 'https://github.com/iantolentino/Ephemeral', stars: 3, forks: 1, language: 'JavaScript', updated: 'Jul 2023', category: 'Web Apps', categoryClass: 'web-apps' },
    { name: 'Generative UI Builder', description: 'Natural language to UI converter', url: 'https://github.com/iantolentino/generative-ui-builder', stars: 4, forks: 2, language: 'JavaScript', updated: 'Jun 2023', category: 'Web Apps', categoryClass: 'web-apps' },
  ]
}

function getFallbackStats(): GitHubStats {
  return { repos: 63, stars: 142, forks: 45, languages: 25, contributions: 189, followers: 12, following: 8 }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  if (cachedStats) return cachedStats

  try {
    const userResponse = await fetch(GITHUB_API_BASE)
    if (!userResponse.ok) throw new Error('Failed to fetch user data')
    const userData = await userResponse.json()

    const reposResponse = await fetch(`${GITHUB_API_BASE}/repos?per_page=100&sort=updated`)
    if (!reposResponse.ok) throw new Error('Failed to fetch repos')
    const reposData: RawRepo[] = await reposResponse.json()

    let totalStars = 0
    let totalForks = 0
    const languages = new Set<string>()

    reposData.forEach((repo) => {
      totalStars += repo.stargazers_count || 0
      totalForks += repo.forks_count || 0
      if (repo.language) languages.add(repo.language)
    })

    cachedStats = {
      repos: userData.public_repos || reposData.length,
      stars: totalStars,
      forks: totalForks,
      languages: languages.size,
      contributions: Math.max(reposData.length * 3, 50),
      followers: userData.followers || 0,
      following: userData.following || 0,
    }

    return cachedStats
  } catch (error) {
    console.error('GitHub stats fetch failed:', error)
    return getFallbackStats()
  }
}

export async function fetchGitHubProjects(): Promise<Project[]> {
  if (cachedProjects) return cachedProjects

  try {
    let allRepos: RawRepo[] = []
    let page = 1
    let hasMore = true
    let retryCount = 0
    const maxRetries = 3

    while (hasMore && page <= 10) {
      try {
        const response = await fetch(`${GITHUB_API_BASE}/repos?sort=updated&per_page=100&page=${page}`)

        if (response.status === 403) {
          return getFallbackProjects()
        }
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`)

        const repos: RawRepo[] = await response.json()
        if (repos.length === 0) {
          hasMore = false
        } else {
          allRepos = allRepos.concat(repos)
          page++
          retryCount = 0
        }
      } catch (pageError) {
        retryCount++
        if (retryCount >= maxRetries) {
          hasMore = false
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount))
        }
      }
    }

    if (allRepos.length === 0) return getFallbackProjects()

    cachedProjects = allRepos.map((repo) => {
      const { category, categoryClass } = categorizeProject(repo)
      return {
        name: repo.name,
        description: repo.description || 'No description available',
        url: repo.html_url,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language || 'Other',
        updated: new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        category,
        categoryClass,
      }
    })

    return cachedProjects
  } catch (error) {
    console.error('GitHub projects fetch failed:', error)
    return getFallbackProjects()
  }
}

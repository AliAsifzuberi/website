import "server-only"

type GithubRepoApi = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  homepage: string | null
  language: string | null
  topics?: string[]
  stargazers_count: number
  fork: boolean
  archived: boolean
  disabled: boolean
  updated_at: string
}

export type PortfolioRepo = {
  id: number
  name: string
  fullName: string
  htmlUrl: string
  description: string | null
  homepage: string | null
  language: string | null
  topics: string[]
  stars: number
  fork: boolean
  archived: boolean
  disabled: boolean
  updatedAt: string
  imageUrl: string
  featured: boolean
}

const GITHUB_USERNAME = "AliAsifzuberi"
const GITHUB_API_BASE = "https://api.github.com"

function normalizeHomepage(homepage: string | null) {
  if (!homepage) return null
  const trimmed = homepage.trim()
  if (!trimmed) return null
  return trimmed
}

export async function fetchPortfolioRepos(): Promise<PortfolioRepo[]> {
  const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }

  const token = process.env.GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url, {
    headers,
    next: { revalidate: 60 * 60 }, // 1 hour
  })

  if (!res.ok) {
    const message = await res.text().catch(() => "")
    throw new Error(`GitHub API error (${res.status}): ${message || res.statusText}`)
  }

  const raw = (await res.json()) as GithubRepoApi[]

  const repos = raw
    .filter((r) => !r.disabled)
    .map<PortfolioRepo>((r) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      htmlUrl: r.html_url,
      description: r.description,
      homepage: normalizeHomepage(r.homepage),
      language: r.language,
      topics: r.topics ?? [],
      stars: r.stargazers_count,
      fork: r.fork,
      archived: r.archived,
      disabled: r.disabled,
      updatedAt: r.updated_at,
      imageUrl: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${encodeURIComponent(r.name)}`,
      featured: false,
    }))

  // Mark the top starred original (non-fork, non-archived) repos as featured.
  const featuredIds = new Set(
    repos
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => (b.stars - a.stars) || b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 6)
      .map((r) => r.id),
  )

  return repos.map((r) => ({ ...r, featured: featuredIds.has(r.id) }))
}


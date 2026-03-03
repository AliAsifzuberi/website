"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star } from "lucide-react"

type RepoCard = {
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
  updatedAt: string
  imageUrl: string
  featured: boolean
}

function prettyName(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function repoBadges(repo: RepoCard) {
  const badges: string[] = []
  if (repo.language) badges.push(repo.language)
  if (repo.topics?.length) badges.push(...repo.topics.slice(0, 4))
  if (!badges.length) badges.push("GitHub")
  return badges
}

export function ProjectsSection({ repos }: { repos: RepoCard[] }) {
  const [filter, setFilter] = useState<"all" | "featured">("all")

  const filtered = filter === "featured" ? repos.filter((r) => r.featured) : repos

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Automatically pulled from my GitHub repositories.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
              All
            </Button>
            <Button variant={filter === "featured" ? "default" : "outline"} onClick={() => setFilter("featured")}>
              Featured
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((repo) => (
            <Card key={repo.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={repo.imageUrl || "/placeholder.svg"}
                  alt={prettyName(repo.name)}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <Button size="sm" variant="secondary" asChild>
                      <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button size="sm" variant="secondary" asChild>
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{prettyName(repo.name)}</span>
                  <div className="flex items-center gap-2">
                    {repo.stars > 0 && (
                      <Badge variant="outline" className="font-mono">
                        <Star className="w-3 h-3 mr-1" />
                        {repo.stars}
                      </Badge>
                    )}
                    {repo.featured && <Badge variant="secondary">Featured</Badge>}
                  </div>
                </CardTitle>
                <CardDescription className="text-pretty">
                  {repo.description || "No description provided."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {repoBadges(repo).map((tag) => (
                    <Badge key={`${repo.id}-${tag}`} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

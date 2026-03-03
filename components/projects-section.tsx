"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

type FeaturedProject = {
  id: string
  title: string
  tagline?: string
  description: string
  tech: string[]
  githubUrl: string
  liveUrl?: string
}

const featuredProjects: FeaturedProject[] = [
  {
    id: "cloudlab",
    title: "CloudLab – Multi-Cloud Sandbox",
    tagline: "Spin up AWS & GCP resources side by side.",
    description:
      "CloudLab is a cloud sandbox where I spin up EC2 instances, S3 buckets, GCP storage buckets, and BigQuery datasets to experiment with different architectures. I use Terraform to define the same infrastructure across providers so I can compare pricing, performance, and developer experience in a consistent way.",
    tech: ["Terraform", "AWS (EC2, S3)", "GCP (Storage, BigQuery)", "Cloud Architecture"],
    githubUrl: "https://github.com/AliAsifzuberi/cloudlab",
  },
  {
    id: "crm",
    title: "MotorMM – CRM & Shop Management",
    tagline: "Full‑stack CRM for auto mechanics.",
    description:
      "A full‑stack CRM and shop management tool designed for car mechanics. It handles customers, vehicles, work orders, and job status in one place. The app uses a modern Next.js frontend with a database-backed API, giving auto shops a single system to manage bookings, jobs in progress, and historical work for each customer.",
    tech: ["Next.js", "TypeScript", "React", "Supabase / SQL"],
    githubUrl: "https://github.com/AliAsifzuberi/CRM",
    liveUrl: "https://motormm.vercel.app",
  },
  {
    id: "notely-ai",
    title: "Notely.Ai – RAG Diagnostics Assistant",
    tagline: "LLM assistant for mechanic diagnostics.",
    description:
      "Notely.Ai is a RAG‑powered chatbot that helps mechanics diagnose issues by querying past repair notes and documentation. It uses Google Gemini as the LLM and Pinecone as the vector database, so queries like “rough idle on cold start” return relevant repair history and troubleshooting steps from past jobs.",
    tech: ["Python", "FastAPI", "Google Gemini", "Pinecone", "RAG"],
    githubUrl: "https://github.com/AliAsifzuberi/Notely.Ai",
  },
  {
    id: "nba-scraper",
    title: "NBA Stat Webscraper",
    tagline: "Customizable NBA statistics pipeline.",
    description:
      "NBA Stats Webscraper pulls statistics directly from the NBA website with flexible filters. You can choose seasons, regular season vs. playoffs, and specific stats like points, rebounds, or assists. The data is processed with Python and pandas, using Selenium to navigate dynamic pages, making it easy to build custom analytics or dashboards.",
    tech: ["Python", "Selenium", "pandas", "Web Scraping"],
    githubUrl: "https://github.com/AliAsifzuberi/NBA_Stat_Webscraper",
  },
  {
    id: "slack-clone",
    title: "Slack Clone – iOS",
    tagline: "Team chat with social sign‑in.",
    description:
      "A Slack‑style iOS app where users sign up with Facebook, Google, or email and then join or create groups for focused team discussions. Group owners can manage membership, and everyone in the group can chat in real time. Next steps include invite links and voice channels to get even closer to the real Slack experience.",
    tech: ["Swift", "Xcode", "Firebase Auth", "Realtime Database"],
    githubUrl: "https://github.com/AliAsifzuberi/Slack_Clone",
  },
  {
    id: "sell-out",
    title: "Sell‑Out – Marketplace App",
    tagline: "Instagram‑style marketplace for local sales.",
    description:
      "Sell‑Out is an Instagram‑style iOS app where users post items they want to sell. Each listing includes photos, a description, and the item’s location so buyers can quickly see what’s nearby. The app uses Firebase to store user accounts and posts, with email verification flows to keep accounts secure. A planned next step is adding in‑app chat between buyers and sellers.",
    tech: ["Swift", "Xcode", "Firebase", "iOS Development"],
    githubUrl: "https://github.com/AliAsifzuberi/Sell-out",
  },
]

export function ProjectsSection() {
  const projects = featuredProjects

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            A curated set of my favorite projects across cloud, full‑stack, and iOS development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="/modern-ecommerce-dashboard.png"
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.liveUrl && (
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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
                  <span className="truncate">{project.title}</span>
                </CardTitle>
                {project.tagline && <p className="text-sm text-primary font-mono mt-1">{project.tagline}</p>}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty mb-4">{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <Badge key={`${project.id}-${tag}`} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/AliAsifzuberi?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              View all projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

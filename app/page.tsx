import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { CertificationSection } from "@/components/certification-section"
import { AboutSection } from "@/components/about-section"
import { Navigation } from "@/components/navigation"
import { fetchPortfolioRepos } from "@/lib/github"

export default async function Home() {
  const repos = await fetchPortfolioRepos()

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection repos={repos} />
      <SkillsSection />
      <CertificationSection />
      <AboutSection />
    </main>
  )
}

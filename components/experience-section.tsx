"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Cloud Infrastructure Engineer Intern",
    company: "Scotiabank",
    location: "Toronto, ON",
    period: "Sept 2025 - Dec 2025",
    description:
      "Built cloud observability and multi-tenant logging infrastructure to improve cost attribution, monitoring, and reliability.",
    technologies: ["GCP", "GKE", "Terraform", "GitHub Actions", "Docker", "Pub/Sub", "Dataflow", "Cloud Storage", "KMS"],
    achievements: [
      "Built a proof of concept for multi-tenant log ingestion, routing Docker container logs from GKE clusters to tenant-isolated GCP projects for per-tenant cost tracking.",
      "Developed reusable Terraform modules and managed environment-specific workspaces, automating plan/apply validation and deployments via GitHub Actions CI/CD.",
      "Provisioned enterprise observability infrastructure with Terraform, configuring Pub/Sub topics, Dataflow pipelines, and Cloud Storage buckets with customer-managed KMS encryption.",
      "Collaborated with platform, security, and application teams to support cloud infrastructure, monitoring, and observability initiatives.",
    ],
  },
  {
    id: 2,
    title: "Cloud Engineer Intern",
    company: "Scotiabank",
    location: "Toronto, ON",
    period: "Jan 2025 - Sept 2025",
    description:
      "Engineered and supported Azure data pipelines and monitoring to improve reliability, visibility, and delivery across environments.",
    technologies: ["Azure", "Azure Data Factory", "SQL", "Bash", "SFTP", "SSH", "Power BI", "Azure Log Analytics", "CI/CD"],
    achievements: [
      "Engineered and supported 50+ batch ETL pipelines in Azure Data Factory, scheduling ingestion for 10+ Latin American countries from enterprise SQL source systems.",
      "Automated daily data transformations and secure SFTP transfers using Bash scripts and SQL stored procedures, implementing SSH key-based authentication.",
      "Implemented and supported CI/CD workflows to validate, test, and deploy Azure Data Factory pipelines across environments, reducing deployment errors and manual configuration.",
      "Developed a Power BI monitoring dashboard integrated with Azure Log Analytics and ADF metrics, visualizing Gantt views and configuring automated alerts for SLA breaches.",
    ],
  },
  {
    id: 3,
    title: "Data Engineering Intern",
    company: "Inbenefits",
    location: "Markham, ON",
    period: "Jan 2024 - Apr 2024",
    description:
      "Supported reliable SQL Server ingestion pipelines with automated validation and reconciliation across environments.",
    technologies: ["SQL Server", "Python", "CSV", "JSON", "Data Ingestion", "Data Reconciliation"],
    achievements: [
      "Executed batch data ingestion into SQL Server tables across development and production environments.",
      "Developed Python scripts to validate weekly discrepancy reports, detecting formatting errors in CSV/JSON files prior to SQL Server ingestion.",
      "Performed post-ingestion reconciliation between source files and SQL Server tables to verify row counts and data integrity across multi-environment deployments.",
      "Coordinated data uploads with engineers and analysts, clarified integration requirements, and troubleshot ingestion issues to support high-performance application operations.",
    ],
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = Number.parseInt(entry.target.getAttribute("data-index") || "0")

          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => new Set([...prev, cardIndex]))
              entry.target.classList.add("animate-in")
            }, cardIndex * 150)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "-50px 0px -50px 0px",
      },
    )

    const cards = document.querySelectorAll(".experience-card")
    cards.forEach((card) => observer.observe(card))

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" style={{ transform: `translateY(${scrollY * 0.02}px)` }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-accent">&lt;</span>
            Career
            <span className="text-accent">/&gt;</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-mono">
            // Recent roles and impact
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <Card
              key={exp.id}
              data-index={index}
              className={`experience-card opacity-0 translate-y-12 scale-95 transition-all duration-1000 ease-out hover:shadow-2xl border-l-4 border-l-primary group relative ${
                visibleCards.has(index) ? "animate-in" : ""
              }`}
              style={{
                transform: visibleCards.has(index)
                  ? `translateY(${scrollY * (0.01 * (index + 1))}px)`
                  : `translateY(48px) scale(0.95)`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <CardTitle
                      className={`text-xl font-bold font-mono transition-all duration-700 ${
                        visibleCards.has(index) ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 150 + 200}ms` }}
                    >
                      {exp.title}
                    </CardTitle>
                    <CardDescription
                      className={`flex items-center gap-2 text-lg font-medium text-primary transition-all duration-700 ${
                        visibleCards.has(index) ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 150 + 300}ms` }}
                    >
                      <Building className="w-4 h-4" />
                      {exp.company}
                    </CardDescription>
                  </div>
                  <div
                    className={`flex flex-col md:items-end gap-2 transition-all duration-700 ${
                      visibleCards.has(index) ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 150 + 400}ms` }}
                  >
                    <Badge variant="secondary" className="w-fit font-mono">
                      <Calendar className="w-3 h-3 mr-1" />
                      {exp.period}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 relative z-10">
                <p
                  className={`text-muted-foreground leading-relaxed transition-all duration-700 ${
                    visibleCards.has(index) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 500}ms` }}
                >
                  {exp.description}
                </p>

                <div
                  className={`transition-all duration-700 ${
                    visibleCards.has(index) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 600}ms` }}
                >
                  <h4 className="font-semibold mb-3 font-mono text-accent">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2 text-sm transition-all duration-500 ${
                          visibleCards.has(index) ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
                        }`}
                        style={{ transitionDelay: `${index * 150 + 700 + i * 100}ms` }}
                      >
                        <span className="text-primary font-mono">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`transition-all duration-700 ${
                    visibleCards.has(index) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 800}ms` }}
                >
                  <h4 className="font-semibold mb-3 font-mono text-accent">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className={`font-mono transition-all duration-500 hover:scale-105 ${
                          visibleCards.has(index) ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                        }`}
                        style={{ transitionDelay: `${index * 150 + 900 + i * 50}ms` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

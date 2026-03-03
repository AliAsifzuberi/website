"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Award, Calendar, CheckCircle } from "lucide-react"

interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialId?: string
  verifyUrl?: string
  skills: string[]
  status: "active" | "expired"
}

const certifications: Certification[] = [
  {
    id: "1",
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "November 2024",
    credentialId: "5FEA7A2ADBF98128Credential ",
    verifyUrl: "#",
    skills: ["Cloud Concepts","DevOps", "Azure Architecture", "Security, Compliance & Cost Management"],
    status: "active",
  },
  {
    id: "2",
    name: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "June 2025",
    credentialId: "52DB7A7BBB44031E",
    verifyUrl: "#",
    skills: ["Basics of AI & Machine Learning", "Computer Vision & Natural Language Orocessing", "Azure Cognitive Services & Responsible AI"],
    status: "active",
  },
]

export function CertificationSection() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.getAttribute("data-card-id")
          if (cardId) {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...prev, cardId]))
            }
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "-50px 0px",
      },
    )

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const setCardRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el)
    } else {
      cardRefs.current.delete(id)
    }
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Professional Certifications</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            Certified <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Continuously expanding my expertise through industry-recognized certifications and professional development
            programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <Card
              key={cert.id}
              ref={setCardRef(cert.id)}
              data-card-id={cert.id}
              className={`group relative overflow-hidden border-2 transition-all duration-700 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 ${
                visibleCards.has(cert.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="p-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-balance group-hover:text-primary transition-colors duration-300">
                        {cert.name}
                      </h3>
                      <p className="text-muted-foreground font-medium">{cert.issuer}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <Badge variant={cert.status === "active" ? "default" : "secondary"}>
                      {cert.status === "active" ? "Active" : "Expired"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Issued {cert.date}</span>
                  </div>

                  {cert.credentialId && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Credential ID: </span>
                      <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{cert.credentialId}</code>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                      Skills Validated
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="outline"
                          className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {cert.verifyUrl && (
                    <div className="pt-4 border-t">
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Verify Certification
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted/50 text-muted-foreground">
            <Award className="w-4 h-4" />
            <span className="text-sm">More certifications in progress...</span>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Code, Server, Wrench } from "lucide-react"

const skillCategories = {
  frontend: {
    title: "Frontend",
    icon: Code,
    color: "text-blue-500",
    skills: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  backend: {
    title: "Backend",
    icon: Server,
    color: "text-green-500",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Python", level: 88 },
      { name: "SQL", level: 96 },
      { name: "MongoDB", level: 80 },
    ],
  },
  tools: {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "text-orange-500",
    skills: [
      { name: "Docker", level: 75 },
      { name: "Azure", level: 85 },
      { name: "Git", level: 95 },
      { name: "CI/CD", level: 82 },
    ],
  },
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("frontend")
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate skill bars when section comes into view
            const currentSkills = skillCategories[activeCategory as keyof typeof skillCategories].skills
            currentSkills.forEach((skill, index) => {
              setTimeout(() => {
                setAnimatedSkills((prev) => [...prev, `${activeCategory}-${skill.name}`])
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [activeCategory])

  // Reset animations when category changes
  useEffect(() => {
    setAnimatedSkills([])
    const currentSkills = skillCategories[activeCategory as keyof typeof skillCategories].skills
    currentSkills.forEach((skill, index) => {
      setTimeout(() => {
        setAnimatedSkills((prev) => [...prev, `${activeCategory}-${skill.name}`])
      }, index * 100)
    })
  }, [activeCategory])

  return (
    <section ref={sectionRef} id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-accent">&lt;</span>
            Skills
            <span className="text-accent">/&gt;</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-mono">
            // Technical expertise across the full development stack
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([key, category]) => {
            const IconComponent = category.icon
            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-105 ${
                  activeCategory === key ? "ring-2 ring-primary shadow-lg scale-105" : ""
                }`}
                onClick={() => setActiveCategory(key)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 p-3 rounded-full bg-muted ${category.color}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-mono">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill) => {
                    const isAnimated = animatedSkills.includes(`${key}-${skill.name}`)
                    return (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium font-mono text-sm">{skill.name}</span>
                          <Badge variant="secondary" className="font-mono text-xs">
                            {skill.level}%
                          </Badge>
                        </div>
                        <div className="relative">
                          <Progress
                            value={isAnimated ? skill.level : 0}
                            className="h-2 transition-all duration-1000 ease-out"
                          />
                          <div
                            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: isAnimated ? `${skill.level}%` : "0%",
                              boxShadow: isAnimated ? "0 0 10px rgba(8, 145, 178, 0.5)" : "none",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8 font-mono">
            <span className="text-accent">// </span>
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "GraphQL",
              "Java",
              "Kubernetes",
              "Terraform",
              "Swift",
              "Pandas",
              "Figma",
              "Adobe XD",
              "Flask",
              "Firebase",
              "LangChain",
              "Supabase",
              "Databricks",
              "Three.js",
            ].map((tech, index) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-sm py-2 px-4 font-mono hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

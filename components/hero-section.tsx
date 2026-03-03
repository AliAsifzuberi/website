"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "4th Year Computer Science Student | Aspiring Software Engineer"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const codeSnippets = [
    "const developer = { name: 'Ali', passion: 'coding' };",
    "function createAwesome() { return innovation + creativity; }",
    "class Developer extends Human { constructor() { super('creative'); } }",
    "const skills = ['Swift', 'Node.js', 'Java', 'Python'];",
    "if (challenge.isHard()) { developer.levelUp(); }",
    "const future = await buildSomethingAmazing();",
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Code */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <div className="animate-code-scroll">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="py-8">
              {codeSnippets.map((snippet, index) => (
                <div key={index} className="font-mono text-sm py-2 px-4">
                  {snippet}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-float">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-balance font-[family-name:var(--font-space-grotesk)]">
            Ali Zuberi
          </h1>
          <div className="text-2xl md:text-3xl text-primary mb-8 font-mono min-h-[2.5rem]">
            {displayText}
            <span className="animate-pulse">|</span>
          </div>
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty font-[family-name:var(--font-inter)] leading-relaxed">
          Creating innovative software solutions with modern technologies and a drive to make ideas happen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="animate-pulse-glow">
            <a href="#experience" className="flex items-center gap-2">
              View My Work
              <ArrowDown className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg">
            <a href="#contact">Get In Touch</a>
          </Button>
        </div>

        <div className="flex justify-center space-x-6">
        <a href="https://github.com/AliAsifzuberi" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Github className="w-6 h-6" />
          </Button>
      </a>
              <a href="https://www.linkedin.com/in/aliasifzuberi/" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Linkedin className="w-6 h-6" />
          </Button>
      </a>
          <a href="mailto:zube4400@mylaurier.ca">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Mail className="w-6 h-6" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

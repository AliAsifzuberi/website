import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail } from "lucide-react"

export function ContactSection() {
  const email = "zube4400@mylaurier.ca"

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-accent">&lt;</span>
            Contact
            <span className="text-accent">/&gt;</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-mono">
            {"// Let’s build something together"}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-border/60">
            <CardContent className="p-8 flex flex-col gap-6 items-center text-center">
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">
                  Email me at{" "}
                  <a className="text-primary underline underline-offset-4" href={`mailto:${email}`}>
                    {email}
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">I’m open to internships and new grad roles.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a href={`mailto:${email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.linkedin.com/in/aliasifzuberi/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com/AliAsifzuberi" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}


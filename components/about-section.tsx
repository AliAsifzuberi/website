import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AboutSection() {
  const interests = [
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-playfair)]">About Me</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p className="text-pretty">
                I’m a developer who loves turning ideas into scalable web applications. My journey began with a Computer Science degree, but the real learning came through hands-on coding, late-night debugging, and collaborating with the developer community.
              </p>
              <p className="text-pretty">
                Beyond coding, I’m always curious about the latest tech trends, open source contributions, and finding balance outdoors. I strive to write maintainable code and build solutions that create meaningful impact.
              </p>
              <p className="text-pretty">
               Right now, I’m diving deep into modern web technologies, cloud architecture, and exploring how AI can shape the future of web development. I’m always eager to take on new challenges and collaborate with others who share the same passion for technology.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Location</span>
                    <span className="text-muted-foreground">Toronto, Ontario</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience</span>
                    <span className="text-muted-foreground">12+ Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Focus</span>
                    <span className="text-muted-foreground">Full-Stack Development</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Availability</span>
                    <span className="text-primary">Open to opportunities</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>
        </div>
      </div>
    </section>
  )
}

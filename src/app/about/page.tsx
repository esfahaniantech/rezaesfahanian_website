import { Metadata } from "next"
import { PageHeader } from "@/components/shared/PageHeader"
import { Timeline } from "@/components/about/Timeline"
import { ValuesGrid } from "@/components/about/ValuesGrid"

export const metadata: Metadata = {
  title: "About",
  description: "AI Engineer who builds companies. From internship to 7x founder with 2 successful exits.",
}

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About Me"
        title="Engineer First, Entrepreneur Second"
        subtitle="Building AI that transforms industries through disciplined execution and sustainable growth"
      />
      
      {/* Bio Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm an AI Engineer who builds companies. My journey started in 2012 with an internship in AI-assisted security systems, where I first glimpsed AI's transformative potential. What followed was a decade of building, learning, and shipping products that solve real problems.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From AI Engineer to Product Manager to Tech Lead, I progressed through roles that gave me a deep understanding of both the technical and business sides of building products. In 2018, I founded Welf Lab, an enterprise software development studio that became the foundation for all future ventures.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Today, I lead a portfolio of AI-powered ventures across HealthTech, FinTech, Industrial AI, and Enterprise Software. Together, these companies manage €4B in industrial assets, have served 500K+ patients, and process €40M in monthly transactions.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <strong className="text-foreground">What sets me apart?</strong> All seven companies were bootstrapped. No VC funding, no burning cash on growth at all costs. Just real customers, real revenue, and real impact from day one.
          </p>
        </div>
      </section>
      
      {/* Timeline */}
      <section className="bg-background py-8">
        <div className="container mx-auto px-4">
          <Timeline />
        </div>
      </section>
      
      {/* Values */}
      <ValuesGrid />
      
      {/* Location */}
      <section className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Based in Hamburg, Building Globally
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          While I'm based in Hamburg, Germany, my ventures serve customers across Europe, the Middle East, and beyond. The beauty of building AI-powered solutions is that impact knows no borders.
        </p>
      </section>
    </main>
  )
}

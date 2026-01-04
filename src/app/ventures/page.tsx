"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/PageHeader"
import { BentoVentureCard } from "@/components/ventures/BentoVentureCard"
import { ExitedVentureCard } from "@/components/ventures/ExitedVentureCard"
import { VentureModal } from "@/components/ventures/VentureModal"
import { activeVentures, exitedVentures } from "@/lib/data/ventures"
import { Venture } from "@/types"

export default function VenturesPage() {
  const [selectedVenture, setSelectedVenture] = useState<Venture | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleVentureClick = (venture: Venture) => {
    setSelectedVenture(venture)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVenture(null)
  }

  // Sort active ventures: ones with keyMetric get priority
  const sortedActiveVentures = [...activeVentures].sort((a, b) => {
    if (a.keyMetric && !b.keyMetric) return -1
    if (!a.keyMetric && b.keyMetric) return 1
    return 0
  })

  // Bento box sizes for 2-row layout:
  // Row 1: 3 items (col-span-2 each in a 6-col grid)
  // Row 2: 2 items (col-span-3 each in a 6-col grid)
  const getBentoSize = (index: number): "large" | "medium" | "small" => {
    if (index < 3) return "medium" // First row: 3 medium items
    return "large" // Second row: 2 large items
  }

  const getBentoSpan = (index: number) => {
    if (index < 3) return "lg:col-span-2" // First row: each takes 2 of 6 cols
    return "lg:col-span-3" // Second row: each takes 3 of 6 cols
  }

  return (
    <main>
      <PageHeader
        eyebrow="Portfolio"
        title="Building Companies That Last"
        subtitle="A portfolio of AI-powered ventures driving real customers, real revenue, and real impact."
      />
      
      {/* Active Ventures - Bento Box Layout (2 rows) */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
          <span className="w-3 h-3 bg-primary animate-pulse" />
          Active Ventures
        </h2>
        {/* 6-column grid on large screens for 2-row bento layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
          {sortedActiveVentures.map((venture, index) => (
            <BentoVentureCard
              key={venture.id}
              id={venture.id}
              name={venture.name}
              tagline={venture.tagline}
              description={venture.description}
              years={venture.years}
              keyMetric={venture.keyMetric}
              industry={venture.industry}
              logo={venture.logo}
              url={venture.url}
              image={venture.image}
              size={getBentoSize(index)}
              className={getBentoSpan(index)}
              onClick={() => handleVentureClick(venture)}
            />
          ))}
        </div>
      </section>

      {/* Bootstrapped Philosophy - Now BEFORE Successful Exits */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Built to Last, Not to Burn
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            "Unlike many AI ventures racing to raise capital before proving value, I've co-founded and scaled seven companies through disciplined, self-funded growth. This approach forced us to focus on what matters: real customers, real revenue, and real impact from day one."
          </p>
        </div>
      </section>

      {/* Past Ventures */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
          <span className="text-primary">✓</span> Successful Exits
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {exitedVentures.map((venture) => (
            <ExitedVentureCard
              key={venture.id}
              id={venture.id}
              name={venture.name}
              tagline={venture.tagline}
              description={venture.description}
              years={venture.years}
              exitYear={venture.exitYear!}
              keyMetric={venture.keyMetric!}
              industry={venture.industry}
              logo={venture.logo}
              image={venture.image}
              onClick={() => handleVentureClick(venture)}
            />
          ))}
        </div>
      </section>

      {/* Venture Modal */}
      <VentureModal
        venture={selectedVenture}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  )
}

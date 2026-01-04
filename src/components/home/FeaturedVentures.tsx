"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { exitedVentures, activeVentures } from "@/lib/data/ventures"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { BentoVentureCard } from "@/components/ventures/BentoVentureCard"
import { ExitedVentureCard } from "@/components/ventures/ExitedVentureCard"
import { VentureModal } from "@/components/ventures/VentureModal"
import { Venture } from "@/types"

export function FeaturedVentures() {
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

  // Sort active ventures: ones with keyMetric first
  const sortedActiveVentures = [...activeVentures].sort((a, b) => {
    if (a.keyMetric && !b.keyMetric) return -1
    if (!a.keyMetric && b.keyMetric) return 1
    return 0
  })

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Portfolio"
          title="Building Companies That Last"
          subtitle="A portfolio of AI-powered ventures driving real customers, real revenue, and real impact."
        />

        {/* Active Ventures First - Show ALL */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-primary animate-pulse" />
            Active Ventures
          </h3>
          {/* 3-column grid for first 3, then 2 wider columns for remaining 2 */}
          <div className="grid md:grid-cols-6 gap-4">
            {sortedActiveVentures.map((venture, index) => {
              // First 3 ventures take 2 columns each (fills row 1)
              // Next 2 ventures take 3 columns each (fills row 2)
              const colSpan = index < 3 ? "md:col-span-2" : "md:col-span-3"
              const size = index < 3 ? "medium" : "large"
              
              return (
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
                  size={size}
                  className={colSpan}
                  onClick={() => handleVentureClick(venture)}
                />
              )
            })}
          </div>
        </div>

        {/* Exited Ventures */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-primary mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Successful Exits
          </h3>
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
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/ventures">
              View All Ventures
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Venture Modal */}
      <VentureModal
        venture={selectedVenture}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}

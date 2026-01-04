"use client"

import { PageHeader } from "@/components/shared/PageHeader"
import { ExpertiseCard } from "@/components/expertise/ExpertiseCard"
import { TechStack } from "@/components/expertise/TechStack"
import { expertiseCategories } from "@/lib/data/expertise"
import { motion } from "framer-motion"
import { ExternalLink, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const publications = [
  {
    title: "Incentive-Compatible Tokenomics for Resilient DeFi Ecosystems: A System Dynamics and Mechanism Design Approach",
    conference: "2026 IEEE International Conference on Blockchain and Cryptocurrency (ICBC)",
    year: "2026",
    type: "Conference Paper",
    status: "Accepted",
    abstract: "This paper presents a novel framework for designing incentive-compatible tokenomics systems using system dynamics modeling and mechanism design principles to create more resilient decentralized finance ecosystems.",
    tags: ["DeFi", "Tokenomics", "Mechanism Design", "System Dynamics"],
  },
]

export default function ExpertisePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Technical Expertise"
        title="AI & Data Engineering Excellence"
        subtitle="End-to-end capabilities from data engineering to production ML systems that drive real business value"
      />
      
      {/* Expertise Categories */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {expertiseCategories.map((category, index) => (
            <ExpertiseCard
              key={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              technologies={category.technologies}
              index={index}
            />
          ))}
        </div>
      </section>
      
      {/* Tech Stack */}
      <TechStack />
      
      {/* Academic Publications */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Research
            </span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">
              Academic Publications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contributing to the academic discourse on AI, blockchain, and decentralized systems
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="secondary">{pub.type}</Badge>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        {pub.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{pub.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-3">
                      {pub.conference}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {pub.abstract}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pub.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

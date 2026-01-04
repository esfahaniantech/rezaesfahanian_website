"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Users, Target, Lightbulb, Shield, TrendingUp } from "lucide-react"

const values = [
  {
    icon: Zap,
    title: "Execution Over Ideas",
    description: "Ideas are abundant, execution is rare. I focus on building and shipping.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Real customers, real revenue. Every decision starts with user value.",
  },
  {
    icon: Target,
    title: "Focus on Impact",
    description: "Building AI that solves real problems, not chasing trends.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description: "From AI Engineer to Tech Lead to Founder - always evolving.",
  },
  {
    icon: Shield,
    title: "Sustainable Growth",
    description: "100% bootstrapped. Built to last, not to burn through capital.",
  },
  {
    icon: TrendingUp,
    title: "Long-term Thinking",
    description: "Building companies that create lasting value for all stakeholders.",
  },
]

export function ValuesGrid() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
          Core Values
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

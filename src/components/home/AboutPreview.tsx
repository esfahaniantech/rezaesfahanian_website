"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Building2, Factory } from "lucide-react"
import Link from "next/link"

const highlights = [
  {
    icon: Brain,
    title: "AI Engineer",
    description: "End-to-end ML development from research to production systems across diverse industries",
  },
  {
    icon: Building2,
    title: "Serial Entrepreneur",
    description: "Founded multiple ventures across HealthTech, FinTech, Industrial AI, and Enterprise Software",
  },
  {
    icon: Factory,
    title: "Industry Impact",
    description: "Managing €4B in industrial assets, serving 500K+ patients, processing €40M monthly",
  },
]

export function AboutPreview() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Engineer First, Entrepreneur Second
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm an AI Engineer who builds companies. My journey started in 2012 with AI-assisted security systems, 
              progressed through roles as AI Engineer, Product Manager, and Tech Lead, before founding my first company in 2018.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, I lead a portfolio of AI-powered ventures managing €4B in industrial assets, 
              serving 500K+ patients, and processing €40M in monthly transactions.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Link href="/about">
                Read My Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right - Highlights */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="flex gap-4 p-6 bg-card shadow-sm border border-border"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-card-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeader({ eyebrow, title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <motion.div
      className={`mb-12 ${centered ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-muted-foreground ${centered ? "max-w-2xl mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

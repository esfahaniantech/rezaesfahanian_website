"use client"

import { motion } from "framer-motion"
import { AnimatedCounter } from "@/components/shared/AnimatedCounter"

const metrics = [
  { value: 7, label: "Companies Founded", suffix: "" },
  { value: 2, label: "Successful Exits", suffix: "" },
  { value: 4, label: "Industrial Assets Under AI", suffix: "B €" },
  { value: 500, label: "Patients Served", suffix: "K+" },
  { value: 35, label: "Enterprise Projects", suffix: "+" },
]

export function MetricsBar() {
  return (
    <section className="bg-foreground dark:bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter 
                value={metric.value} 
                suffix={metric.suffix}
                className="text-3xl md:text-4xl font-bold text-background dark:text-primary"
              />
              <p className="text-sm text-background/70 dark:text-muted-foreground mt-2">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

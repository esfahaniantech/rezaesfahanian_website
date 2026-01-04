"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TimelineItemProps {
  year: string
  title: string
  description: string
  index: number
  isLeft: boolean
}

export function TimelineItem({ year, title, description, index, isLeft }: TimelineItemProps) {
  return (
    <motion.div
      className={cn(
        "flex items-center gap-8",
        isLeft ? "flex-row" : "flex-row-reverse"
      )}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={cn("flex-1", isLeft ? "text-right" : "text-left")}>
        <Card className="inline-block">
          <CardContent className="p-6">
            <Badge className="mb-2 bg-primary text-primary-foreground">{year}</Badge>
            <h3 className="text-lg font-bold text-card-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Center dot */}
      <div className="relative z-10">
        <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow" />
      </div>
      
      <div className="flex-1" />
    </motion.div>
  )
}

"use client"

import { TimelineItem } from "./TimelineItem"
import { timelineData } from "@/lib/data/timeline"

export function Timeline() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
        The Journey
      </h2>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
        
        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.year + item.title}
              year={item.year}
              title={item.title}
              description={item.description}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

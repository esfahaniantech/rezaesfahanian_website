"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

interface ArticleCardProps {
  title: string
  excerpt: string
  category: "research" | "article" | "blog"
  date: string
  source: string
  imageUrl: string
  href: string
  index: number
}

const categoryColors = {
  research: "bg-foreground text-background",
  article: "bg-primary text-primary-foreground",
  blog: "bg-muted text-muted-foreground",
}

export function ArticleCard({
  title,
  excerpt,
  category,
  date,
  source,
  href,
  index,
}: ArticleCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full group cursor-pointer overflow-hidden hover:shadow-lg transition-all">
        {/* Image placeholder */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/20">
              {title.charAt(0)}
            </span>
          </div>
          <Badge className={`absolute top-3 left-3 uppercase text-xs ${categoryColors[category]}`}>
            {category}
          </Badge>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{source}</span>
              <span>•</span>
              <span>{date}</span>
            </div>
            
            <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardContent>
      </Card>
    </motion.a>
  )
}

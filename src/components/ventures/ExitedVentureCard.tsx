"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoWrapper } from "@/components/shared/LogoWrapper"
import { OptimizedImage, imageSizes } from "@/components/shared/OptimizedImage"

interface ExitedVentureCardProps {
  id: string
  name: string
  tagline: string
  description: string
  years: string
  exitYear: string
  keyMetric: string
  industry: string
  logo?: string
  image?: string
  onClick?: () => void
}

export function ExitedVentureCard({
  id,
  name,
  tagline,
  description,
  years,
  exitYear,
  keyMetric,
  industry,
  logo,
  image,
  onClick,
}: ExitedVentureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="h-full group cursor-pointer"
    >
      <Card className={cn(
        "h-full border-primary/30 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col overflow-hidden",
        image && "pt-0" // Remove top padding when image is present
      )}>
        {/* Banner Image - fixed aspect ratio to prevent empty space */}
        {image && (
          <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: "16/9" }}>
            <OptimizedImage
              src={image}
              alt={`${name} - ${tagline} banner image`}
              fill
              fillParent
              sizes={imageSizes.card}
              grayscaleHover
              className={id === "kipoly" ? "object-top" : undefined}
            />
            {/* Gradient overlay with orange accent in light mode */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-primary/5 dark:to-transparent transition-opacity duration-300 group-hover:opacity-80 pointer-events-none" />
          </div>
        )}
        
        <CardContent className={cn(
          "flex flex-col flex-grow",
          image ? "p-5 pt-0" : "p-5"
        )}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* Logo with proper background - positioned to overlap banner */}
              {logo ? (
                <LogoWrapper
                  src={logo}
                  alt={`${name} logo`}
                  size="lg"
                  className={cn(
                    image && "-mt-8 shadow-lg ring-2 ring-card"
                  )}
                />
              ) : (
                <div className={cn(
                  "w-16 h-16 bg-card border border-border flex items-center justify-center",
                  image && "-mt-8 shadow-lg ring-2 ring-card"
                )}>
                  <span className="text-2xl font-bold text-primary">
                    {name.charAt(0)}
                  </span>
                </div>
              )}
              <div className={image ? "pt-1" : ""}>
                <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">{name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{tagline}</p>
              </div>
            </div>
            
            <Badge className={cn(
              "bg-primary text-primary-foreground gap-1 shrink-0 text-xs",
              image && "mt-1"
            )}>
              <CheckCircle className="w-3 h-3" />
              Exited {exitYear}
            </Badge>
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-grow">
            {description}
          </p>
          
          {/* Key Metric */}
          <div className="bg-primary/10 p-2.5 mb-3">
            <p className="text-sm font-bold text-primary line-clamp-1">{keyMetric}</p>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">{years}</span>
            <Badge variant="outline" className="text-xs">{industry}</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

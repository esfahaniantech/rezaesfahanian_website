"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { LogoWrapper } from "@/components/shared/LogoWrapper"

interface BentoVentureCardProps {
  id: string
  name: string
  tagline: string
  description: string
  years: string
  keyMetric?: string
  industry: string
  logo?: string
  url?: string
  image?: string
  size?: "large" | "medium" | "small"
  className?: string
  onClick?: () => void
}

export function BentoVentureCard({
  id,
  name,
  tagline,
  description,
  years,
  keyMetric,
  industry,
  logo,
  url,
  image,
  size = "medium",
  className,
  onClick,
}: BentoVentureCardProps) {
  // Image height based on size
  const imageHeight = size === "large" ? "h-40" : "h-36"
  
  // Content padding based on size
  const contentPadding = size === "large" ? "p-5" : "p-4"
  
  // Logo offset to overlap banner
  const logoOffset = size === "large" ? "-mt-10" : "-mt-8"

  const cardContent = (
    <div className="block h-full relative flex flex-col">
      {/* Banner image area - taller height */}
      <div className={cn("relative w-full overflow-hidden", imageHeight)}>
        {image ? (
          <>
            <Image
              src={image}
              alt={`${name} banner`}
              fill
              className={cn(
                "object-cover transition-all duration-500",
                "grayscale group-hover:grayscale-0",
                // Special positioning for certain images
                id === "intelliger" && "object-top",
                id === "welflab" && "object-center",
                id === "supi" && "object-center",
              )}
            />
            {/* Gradient overlay - subtle with orange accent in light mode */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-primary/5 dark:to-transparent transition-opacity duration-300 group-hover:opacity-80" />
          </>
        ) : (
          <>
            {/* Fallback gradient header */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/30 to-background">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 right-4 w-12 h-12 border border-primary/30" />
                <div className="absolute top-6 right-6 w-12 h-12 border border-primary/20" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          </>
        )}
      </div>

      {/* Content */}
      <div className={cn("relative flex flex-col flex-grow", contentPadding)}>
        {/* Header with logo and status */}
        <div className="flex items-start justify-between mb-3">
          {/* Logo */}
          {logo ? (
            <LogoWrapper
              src={logo}
              alt={`${name} logo`}
              size={size === "large" ? "lg" : "md"}
              className={cn(logoOffset, "shadow-lg ring-2 ring-card")}
            />
          ) : (
            <div className={cn(
              "flex items-center justify-center bg-card border border-border shadow-lg",
              logoOffset,
              size === "large" ? "w-16 h-16" : "w-12 h-12"
            )}>
              <span className={cn(
                "font-bold text-primary",
                size === "large" ? "text-2xl" : "text-xl"
              )}>
                {name.charAt(0)}
              </span>
            </div>
          )}

          {/* Active indicator */}
          {url && (
            <div className="flex items-center gap-1.5">
              <Badge className="bg-primary/10 text-primary border-0 text-xs">
                Active
              </Badge>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </div>
          )}
        </div>

        {/* Title & Tagline */}
        <div className="mb-2">
          <h3 className={cn(
            "font-bold text-card-foreground mb-0.5 group-hover:text-primary transition-colors",
            size === "large" ? "text-lg" : "text-base"
          )}>
            {name}
          </h3>
          <p className={cn(
            "text-muted-foreground line-clamp-1",
            size === "large" ? "text-sm" : "text-xs"
          )}>
            {tagline}
          </p>
        </div>

        {/* Description - only for large cards */}
        {size === "large" && description && (
          <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
            {description}
          </p>
        )}

        {/* Key Metric */}
        {keyMetric && (
          <div className="bg-primary/10 p-2 mb-2">
            <p className={cn(
              "font-semibold text-primary line-clamp-2",
              size === "large" ? "text-xs" : "text-xs"
            )}>
              {keyMetric}
            </p>
          </div>
        )}

        {/* Footer - pushed to bottom */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">{years}</span>
          <Badge variant="outline" className="text-xs">
            {industry}
          </Badge>
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden border border-border bg-card cursor-pointer",
        "hover:shadow-xl hover:border-primary/30 transition-all duration-300",
        className
      )}
    >
      {cardContent}
    </motion.div>
  )
}

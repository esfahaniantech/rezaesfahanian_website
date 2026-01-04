"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { LogoWrapper } from "@/components/shared/LogoWrapper"

interface VentureCardProps {
  name: string
  tagline: string
  description: string
  years: string
  status: "active" | "exited"
  exitYear?: string
  keyMetric?: string
  industry: string
  logo?: string
  url?: string
}

export function VentureCard({
  name,
  tagline,
  description,
  years,
  status,
  exitYear,
  keyMetric,
  industry,
  logo,
  url,
}: VentureCardProps) {
  const cardContent = (
    <Card className="h-full group cursor-pointer border-border hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          {/* Logo with proper dark/light mode handling */}
          {logo ? (
            <LogoWrapper
              src={logo}
              alt={`${name} logo`}
              size="md"
            />
          ) : (
            <div className="w-12 h-12 bg-card border border-border flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {name.charAt(0)}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                "uppercase text-xs",
                status === "exited"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary border-0"
              )}
            >
              {status === "exited" ? `Exited ${exitYear}` : "Active"}
            </Badge>
            {url && (
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </div>
        </div>
        
        <div className="pt-4">
          <h3 className="text-xl font-bold text-card-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{tagline}</p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-3">{description}</p>
        
        {keyMetric && (
          <div className="bg-primary/10 p-3">
            <p className="text-sm font-semibold text-primary">{keyMetric}</p>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">{years}</span>
          <Badge variant="outline" className="text-xs">
            {industry}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {url ? (
        <Link href={url} target="_blank" rel="dofollow">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </motion.div>
  )
}

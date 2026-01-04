"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, CheckCircle, Calendar, Building2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { LogoWrapper } from "@/components/shared/LogoWrapper"
import { Venture } from "@/types"

interface VentureModalProps {
  venture: Venture | null
  isOpen: boolean
  onClose: () => void
}

export function VentureModal({ venture, isOpen, onClose }: VentureModalProps) {
  if (!venture) return null

  const isExited = venture.status === "exited"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        {/* Banner Image */}
        {venture.image && (
          <div className="relative h-48 w-full">
            <Image
              src={venture.image}
              alt={`${venture.name} banner`}
              fill
              className={cn(
                "object-cover",
                venture.id === "intelliger" && "object-top",
                venture.id === "kipoly" && "object-top"
              )}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            
            {/* Logo positioned over banner */}
            <div className="absolute bottom-4 left-6">
              {venture.logo ? (
                <LogoWrapper
                  src={venture.logo}
                  alt={`${venture.name} logo`}
                  size="lg"
                  className="shadow-xl ring-4 ring-background"
                />
              ) : (
                <div className="w-16 h-16 bg-card border border-border flex items-center justify-center shadow-xl ring-4 ring-background">
                  <span className="text-2xl font-bold text-primary">
                    {venture.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              {isExited ? (
                <Badge className="bg-primary text-primary-foreground gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Exited {venture.exitYear}
                </Badge>
              ) : (
                <Badge className="bg-green-500 text-white gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Active
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="p-6 pt-4">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {venture.name}
            </DialogTitle>
            <p className="text-muted-foreground text-base">
              {venture.tagline}
            </p>
          </DialogHeader>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {venture.years}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4" />
              {venture.industry}
            </div>
          </div>

          {/* Description */}
          <p className="text-foreground mb-4 leading-relaxed">
            {venture.description}
          </p>

          {/* Key Metric */}
          {venture.keyMetric && (
            <div className="bg-primary/10 p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Key Achievement</p>
              <p className="text-lg font-bold text-primary">
                {venture.keyMetric}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {/* Visit Website button - only for active ventures */}
            {!isExited && venture.url && (
              <Button asChild className="gap-2">
                <a href={venture.url} target="_blank" rel="dofollow">
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </a>
              </Button>
            )}
            
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  /**
   * Aspect ratio for the container (e.g., "16/9", "4/3", "1/1")
   * Only used when fill={true}
   */
  aspectRatio?: string
  /**
   * Show a blur placeholder while loading
   */
  showPlaceholder?: boolean
  /**
   * Custom placeholder color
   */
  placeholderColor?: string
  /**
   * Wrapper className
   */
  wrapperClassName?: string
  /**
   * Enable grayscale effect that removes on hover
   */
  grayscaleHover?: boolean
}

/**
 * OptimizedImage - A wrapper around Next.js Image with SEO best practices
 * 
 * Features:
 * - Automatic lazy loading (unless priority is set)
 * - Proper sizes attribute for responsive images
 * - Loading placeholder with smooth transition
 * - Aspect ratio container for fill mode
 * - Grayscale hover effect option
 * - Proper alt text handling for accessibility/SEO
 */
export function OptimizedImage({
  src,
  alt,
  fill = false,
  priority = false,
  sizes,
  aspectRatio,
  showPlaceholder = true,
  placeholderColor = "bg-muted",
  wrapperClassName,
  className,
  grayscaleHover = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Default responsive sizes if not provided
  const defaultSizes = sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

  // Generate aspect ratio style
  const aspectStyle = aspectRatio ? { aspectRatio } : undefined

  if (fill) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden",
          aspectRatio && "h-auto",
          !aspectRatio && "h-full",
          wrapperClassName
        )}
        style={aspectStyle}
      >
        {/* Placeholder background */}
        {showPlaceholder && !isLoaded && !hasError && (
          <div
            className={cn(
              "absolute inset-0 animate-pulse",
              placeholderColor
            )}
          />
        )}

        {/* Error state */}
        {hasError && (
          <div className={cn(
            "absolute inset-0 flex items-center justify-center",
            placeholderColor
          )}>
            <span className="text-muted-foreground text-sm">Image unavailable</span>
          </div>
        )}

        <Image
          src={src}
          alt={alt}
          fill
          sizes={defaultSizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "object-cover transition-all duration-500",
            !isLoaded && "opacity-0",
            isLoaded && "opacity-100",
            grayscaleHover && "grayscale group-hover:grayscale-0",
            className
          )}
          {...props}
        />
      </div>
    )
  }

  // Non-fill mode (requires width and height)
  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {showPlaceholder && !isLoaded && !hasError && (
        <div
          className={cn(
            "absolute inset-0 animate-pulse",
            placeholderColor
          )}
        />
      )}

      {hasError && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          placeholderColor
        )}>
          <span className="text-muted-foreground text-sm">Image unavailable</span>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        sizes={defaultSizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          "transition-all duration-500",
          !isLoaded && "opacity-0",
          isLoaded && "opacity-100",
          grayscaleHover && "grayscale group-hover:grayscale-0",
          className
        )}
        {...props}
      />
    </div>
  )
}

/**
 * Generate optimal sizes string based on common layouts
 */
export const imageSizes = {
  // Full width hero images
  hero: "100vw",
  // Featured post (takes full width on mobile, half on desktop)
  featured: "(max-width: 1024px) 100vw, 50vw",
  // Card in a grid (full on mobile, half on tablet, third on desktop)
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  // Thumbnail (small fixed size)
  thumbnail: "(max-width: 640px) 128px, 160px",
  // Article cover (main article image)
  articleCover: "(max-width: 1024px) 100vw, 66vw",
} as const

/**
 * Common aspect ratios
 */
export const aspectRatios = {
  video: "16/9",
  featured: "16/10",
  card: "16/9",
  square: "1/1",
  portrait: "3/4",
  banner: "21/9",
} as const


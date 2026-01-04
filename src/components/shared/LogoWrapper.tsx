"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoWrapperProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg"
  className?: string
}

// Logo background configurations based on actual logo files:
// - "needs-orange": Logo needs orange brand background (Supi)
// - "needs-light": Logo is dark/black - needs light background to be visible
// - "needs-dark": Logo is white/light - needs dark background to be visible
// - "neutral": Logo has colors that work on neutral gray background
const logoConfigs: Record<string, "needs-orange" | "needs-light" | "needs-dark" | "neutral"> = {
  "supi_logo.png": "needs-orange",    // White/light logo - use orange brand background
  "welf_lab.png": "needs-light",      // Dark logo on dark bg
  "kipoly_logo.png": "needs-light",   // Dark blue logo
  "finanzer_logo.png": "neutral",     // Purple - works on gray
  "qommerce_logo.png": "neutral",     // Has colors
  "intelliger_logo.png": "neutral",   // Has colors  
  "credify.png": "neutral",           // Has colors
}

function getLogoConfig(src: string): "needs-orange" | "needs-light" | "needs-dark" | "neutral" {
  for (const [filename, config] of Object.entries(logoConfigs)) {
    if (src.includes(filename)) {
      return config
    }
  }
  return "neutral"
}

export function LogoWrapper({
  src,
  alt,
  size = "md",
  className,
}: LogoWrapperProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const imageSizes = {
    sm: 40,
    md: 48,
    lg: 64,
  }

  const config = getLogoConfig(src)

  let bgClass = "bg-gray-50 dark:bg-gray-100 border-gray-200"
  
  switch (config) {
    case "needs-orange":
      // Supi logo - use orange brand background
      bgClass = "bg-primary dark:bg-primary border-primary"
      break
    case "needs-light":
      // Dark logos need light bg - use warm cream color
      bgClass = "bg-[#FDFBF7] dark:bg-[#FDFBF7] border-gray-200"
      break
    case "needs-dark":
      // Light logos need dark bg
      bgClass = "bg-gray-800 dark:bg-gray-800 border-gray-700"
      break
    case "neutral":
    default:
      // Neutral logos work on a light neutral background
      bgClass = "bg-gray-50 dark:bg-gray-100 border-gray-200"
      break
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden border",
        sizeClasses[size],
        bgClass,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={imageSizes[size]}
        height={imageSizes[size]}
        className="object-contain w-full h-full p-1.5"
      />
    </div>
  )
}

import { LucideIcon } from "lucide-react"

export interface Venture {
  id: string
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
  image?: string
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface ExpertiseCategory {
  id: string
  title: string
  description: string
  icon: LucideIcon
  technologies: string[]
}

export interface Article {
  id: string
  title: string
  excerpt: string
  category: "research" | "article" | "blog"
  date: string
  source: string
  sourceIcon?: string
  imageUrl: string
  href: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string // MDX or HTML content
  coverImage: string
  coverImageAlt?: string
  date: string
  readTime: string
  tags: string[]
  featured?: boolean
  sections?: {
    id: string
    title: string
  }[]
}

export interface Author {
  name: string
  role: string
  image: string
  bio: string
  social: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

export interface ContactInfo {
  title: string
  content: string
  href: string
  icon: LucideIcon
}

export interface Value {
  title: string
  description: string
  icon: LucideIcon
}


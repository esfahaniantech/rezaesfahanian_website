# AI Developer Prompt: Reza Esfahanian Personal Brand Website

## Project Overview

Build a personal brand website for **Reza Esfahanian**, an AI Engineer & Serial Entrepreneur. The site showcases 7 companies (2 exits), technical expertise, and thought leadership. Use the provided specification document for all content and design details.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Font:** Inter (Google Fonts)
- **Deployment:** Vercel

---

## Project Setup

```bash
npx create-next-app@latest reza-esfahanian-website --typescript --tailwind --eslint --app --src-dir
cd reza-esfahanian-website
npx shadcn-ui@latest init
```

### Install shadcn/ui Components

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add navigation-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add tooltip
```

### Additional Dependencies

```bash
npm install framer-motion lucide-react
```

---

## Tailwind Configuration

Update `tailwind.config.ts` with the brand colors:

```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1A365D",      // Deep navy - headlines, primary buttons
          secondary: "#2B6CB0",    // Medium blue - links, hover states
          accent: "#38A169",       // Green - success, exits, CTAs
          dark: "#1A202C",         // Almost black - body text
          gray: "#4A5568",         // Dark gray - secondary text
          "light-gray": "#E2E8F0", // Borders, dividers
          light: "#F7FAFC",        // Section backgrounds
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Home
│   ├── about/
│   │   └── page.tsx
│   ├── ventures/
│   │   └── page.tsx
│   ├── expertise/
│   │   └── page.tsx
│   ├── articles/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── MetricsBar.tsx
│   │   ├── FeaturedVentures.tsx
│   │   ├── AboutPreview.tsx
│   │   └── ExpertisePreview.tsx
│   ├── ventures/
│   │   ├── VentureCard.tsx
│   │   ├── ExitedVentureCard.tsx
│   │   └── VentureFilters.tsx
│   ├── about/
│   │   ├── Timeline.tsx
│   │   ├── TimelineItem.tsx
│   │   └── ValuesGrid.tsx
│   ├── expertise/
│   │   ├── ExpertiseCard.tsx
│   │   ├── TechStack.tsx
│   │   └── CaseStudyCard.tsx
│   ├── articles/
│   │   ├── ArticleCard.tsx
│   │   └── FeaturedPublication.tsx
│   ├── contact/
│   │   ├── ContactCard.tsx
│   │   └── ContactForm.tsx
│   └── shared/
│       ├── SectionHeader.tsx
│       ├── StatusBadge.tsx
│       ├── AnimatedCounter.tsx
│       └── PageHeader.tsx
├── lib/
│   ├── utils.ts
│   └── data/
│       ├── ventures.ts
│       ├── timeline.ts
│       ├── expertise.ts
│       └── articles.ts
└── types/
    └── index.ts
```

---

## Component Specifications

### 1. Navbar Component

**File:** `src/components/layout/Navbar.tsx`

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Linkedin, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ventures", label: "Ventures" },
  { href: "/expertise", label: "Expertise" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-brand-primary">
          Reza Esfahanian
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-secondary",
                pathname === link.href ? "text-brand-primary" : "text-brand-gray"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://linkedin.com/in/reza-esfahanian" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5 text-brand-gray hover:text-brand-secondary transition-colors" />
          </a>
          <a href="https://x.com/rezaesfahanian" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5 text-brand-gray hover:text-brand-secondary transition-colors" />
          </a>
          <Button asChild className="bg-brand-primary hover:bg-brand-secondary">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium py-2",
                    pathname === link.href ? "text-brand-primary" : "text-brand-gray"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 mt-4">
                <a href="https://linkedin.com/in/reza-esfahanian" target="_blank">
                  <Linkedin className="w-6 h-6 text-brand-gray" />
                </a>
                <a href="https://x.com/rezaesfahanian" target="_blank">
                  <Twitter className="w-6 h-6 text-brand-gray" />
                </a>
              </div>
              <Button asChild className="mt-4 bg-brand-primary">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
```

---

### 2. Hero Component

**File:** `src/components/home/Hero.tsx`

```tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-[72px] bg-gradient-to-br from-white to-brand-light">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Text Content - 60% */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-secondary">
              AI Engineer & Serial Entrepreneur
            </span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-primary">
              Reza Esfahanian
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-gray max-w-2xl">
              Building AI that transforms industries. 7x Founder. 2 Exits. 100% Bootstrapped.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-secondary">
                <Link href="/ventures">View My Ventures</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-light">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>

          {/* Image - 40% */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-light">
              {/* Replace with actual headshot */}
              <Image
                src="/images/headshot.jpg"
                alt="Reza Esfahanian"
                fill
                className="object-cover"
                priority
              />
              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 -right-8 w-full h-full rounded-2xl bg-brand-primary/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

### 3. MetricsBar Component

**File:** `src/components/home/MetricsBar.tsx`

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const metrics = [
  { value: 7, label: "Companies Founded", suffix: "" },
  { value: 2, label: "Successful Exits", suffix: "" },
  { value: 4, label: "Industrial Assets Under AI", suffix: "B €" },
  { value: 500, label: "Patients Served", suffix: "K+" },
  { value: 35, label: "Enterprise Projects", suffix: "+" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-white">
      {count}{suffix}
    </span>
  )
}

export function MetricsBar() {
  return (
    <section className="bg-brand-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              <p className="text-sm text-white/70 mt-2">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### 4. VentureCard Component

**File:** `src/components/ventures/VentureCard.tsx`

```tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

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
}: VentureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full group cursor-pointer border-brand-light-gray hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            {/* Logo placeholder */}
            <div className="w-12 h-12 rounded-lg bg-brand-light flex items-center justify-center">
              <span className="text-lg font-bold text-brand-primary">
                {name.charAt(0)}
              </span>
            </div>
            
            <Badge
              className={cn(
                "uppercase text-xs",
                status === "exited"
                  ? "bg-brand-accent text-white"
                  : "bg-brand-secondary text-white"
              )}
            >
              {status === "exited" ? `Exited ${exitYear}` : "Active"}
            </Badge>
          </div>
          
          <div className="pt-4">
            <h3 className="text-xl font-bold text-brand-dark">{name}</h3>
            <p className="text-sm text-brand-gray">{tagline}</p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-brand-gray text-sm line-clamp-3">{description}</p>
          
          {keyMetric && (
            <div className="bg-brand-light rounded-lg p-3">
              <p className="text-sm font-semibold text-brand-primary">{keyMetric}</p>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-brand-gray">{years}</span>
            <Badge variant="outline" className="text-xs">
              {industry}
            </Badge>
          </div>
          
          <div className="flex items-center text-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm font-medium">Learn more</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

---

### 5. ExitedVentureCard Component (Featured/Large)

**File:** `src/components/ventures/ExitedVentureCard.tsx`

```tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface ExitedVentureCardProps {
  name: string
  tagline: string
  description: string
  years: string
  exitYear: string
  keyMetric: string
  industry: string
}

export function ExitedVentureCard({
  name,
  tagline,
  description,
  years,
  exitYear,
  keyMetric,
  industry,
}: ExitedVentureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="border-brand-accent/30 bg-gradient-to-br from-white to-brand-accent/5">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-brand-accent">
                  {name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-dark">{name}</h3>
                <p className="text-brand-gray">{tagline}</p>
              </div>
            </div>
            
            <Badge className="bg-brand-accent text-white gap-1">
              <CheckCircle className="w-3 h-3" />
              Exited {exitYear}
            </Badge>
          </div>
          
          <p className="text-brand-gray mb-6">{description}</p>
          
          <div className="bg-brand-accent/10 rounded-xl p-4 mb-4">
            <p className="text-lg font-bold text-brand-accent">{keyMetric}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-brand-gray">{years}</span>
            <Badge variant="outline">{industry}</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

---

### 6. Timeline Component

**File:** `src/components/about/Timeline.tsx`

```tsx
"use client"

import { motion } from "framer-motion"
import { TimelineItem } from "./TimelineItem"

const timelineData = [
  { year: "2012", title: "First AI Exposure", description: "Internship in AI-assisted security systems. First glimpse of AI's transformative potential." },
  { year: "2012-2017", title: "Career Progression", description: "AI Engineer → Product Manager → Tech Lead across multiple industries." },
  { year: "2018", title: "Founded Welf Lab", description: "Enterprise software development studio. The foundation for all future ventures." },
  { year: "2020", title: "Founded Kipoly", description: "Digital health AI platform for medical decision support." },
  { year: "2021", title: "Founded Intelliger.ai & Supi.ai", description: "AI workflow automation and Industrial AI for predictive maintenance." },
  { year: "2023", title: "Exited Kipoly", description: "Successfully exited after serving 500K+ patients in developing countries." },
  { year: "2023", title: "Founded Qommerce.ai, Finanzer.ai, Credify", description: "Retail media, tokenized finance, and BNPL platforms." },
  { year: "2025", title: "Exited Credify", description: "Successfully exited at €40M monthly transaction volume." },
]

export function Timeline() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-brand-primary mb-12 text-center">
        The Journey
      </h2>
      
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-brand-light-gray" />
        
        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.year + item.title}
              {...item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### 7. TimelineItem Component

**File:** `src/components/about/TimelineItem.tsx`

```tsx
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
            <Badge className="mb-2 bg-brand-secondary">{year}</Badge>
            <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
            <p className="text-sm text-brand-gray mt-2">{description}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Center dot */}
      <div className="relative z-10">
        <div className="w-4 h-4 rounded-full bg-brand-primary border-4 border-white shadow" />
      </div>
      
      <div className="flex-1" />
    </motion.div>
  )
}
```

---

### 8. ExpertiseCard Component

**File:** `src/components/expertise/ExpertiseCard.tsx`

```tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface ExpertiseCardProps {
  title: string
  description: string
  icon: LucideIcon
  technologies: string[]
  index: number
}

export function ExpertiseCard({
  title,
  description,
  icon: Icon,
  technologies,
  index,
}: ExpertiseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-brand-primary" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark">{title}</h3>
          <p className="text-sm text-brand-gray">{description}</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

---

### 9. ArticleCard Component

**File:** `src/components/articles/ArticleCard.tsx`

```tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface ArticleCardProps {
  title: string
  excerpt: string
  category: "research" | "article" | "blog"
  date: string
  source: string
  sourceIcon?: string
  imageUrl: string
  href: string
  index: number
}

export function ArticleCard({
  title,
  excerpt,
  category,
  date,
  source,
  imageUrl,
  href,
  index,
}: ArticleCardProps) {
  const categoryColors = {
    research: "bg-brand-primary",
    article: "bg-brand-secondary",
    blog: "bg-brand-accent",
  }

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
        {/* Image */}
        <div className="relative aspect-video bg-brand-light overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className={`absolute top-3 left-3 uppercase text-xs ${categoryColors[category]}`}>
            {category}
          </Badge>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-brand-dark line-clamp-2 group-hover:text-brand-secondary transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-brand-gray mt-2 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-light-gray">
            <div className="flex items-center gap-2 text-xs text-brand-gray">
              <span>{source}</span>
              <span>•</span>
              <span>{date}</span>
            </div>
            
            <ArrowUpRight className="w-4 h-4 text-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardContent>
      </Card>
    </motion.a>
  )
}
```

---

### 10. ContactCard Component

**File:** `src/components/contact/ContactCard.tsx`

```tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface ContactCardProps {
  title: string
  content: string
  href: string
  icon: LucideIcon
  index: number
}

export function ContactCard({ title, content, href, icon: Icon, index }: ContactCardProps) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full group cursor-pointer hover:shadow-lg hover:border-brand-secondary transition-all">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-brand-light flex items-center justify-center mb-4 group-hover:bg-brand-primary/10 transition-colors">
            <Icon className="w-8 h-8 text-brand-primary" />
          </div>
          
          <h3 className="text-lg font-bold text-brand-dark mb-2">{title}</h3>
          <p className="text-brand-secondary font-medium">{content}</p>
        </CardContent>
      </Card>
    </motion.a>
  )
}
```

---

### 11. ContactForm Component

**File:** `src/components/contact/ContactForm.tsx`

```tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add form submission logic (Formspree, API, etc.)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="max-w-xl mx-auto">
        <CardContent className="p-12 text-center">
          <CheckCircle className="w-16 h-16 text-brand-accent mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-brand-dark mb-2">Thank You!</h3>
          <p className="text-brand-gray">I'll get back to you within 48 hours.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-brand-primary">Send a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-dark">Name *</label>
              <Input required placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-dark">Email *</label>
              <Input required type="email" placeholder="you@example.com" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-dark">Inquiry Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="speaking">Speaking</SelectItem>
                <SelectItem value="collaboration">Collaboration</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-dark">Message *</label>
            <Textarea
              required
              placeholder="Tell me about your project or inquiry..."
              className="min-h-[150px]"
            />
          </div>
          
          <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-secondary">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

---

### 12. PageHeader Component (Reusable)

**File:** `src/components/shared/PageHeader.tsx`

```tsx
"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-brand-light to-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-secondary">
            {eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mt-4 mb-4">
            {title}
          </h1>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
```

---

### 13. Footer Component

**File:** `src/components/layout/Footer.tsx`

```tsx
import Link from "next/link"
import { Linkedin, Twitter, Mail } from "lucide-react"

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/ventures", label: "Ventures" },
  { href: "/expertise", label: "Expertise" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Reza Esfahanian</h3>
            <p className="text-sm text-white/60 mb-4">
              AI Engineer & Serial Entrepreneur
            </p>
            <p className="text-sm text-white/60">
              Building AI that transforms industries.
            </p>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3 - Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://linkedin.com/in/reza-esfahanian"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/rezaesfahanian"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@rezaesfahanian.com"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-white/60">
              hello@rezaesfahanian.com
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Reza Esfahanian. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            Hamburg, Germany
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

## Data Files

### Ventures Data

**File:** `src/lib/data/ventures.ts`

```typescript
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
}

export const ventures: Venture[] = [
  {
    id: "credify",
    name: "Credify",
    tagline: "Buy Now, Pay Later Platform",
    description: "BNPL solution for online and offline purchases. Built seamless consumer financing infrastructure that scaled rapidly to product-market fit.",
    years: "2023-2025",
    status: "exited",
    exitYear: "2025",
    keyMetric: "€40M monthly transaction volume at exit",
    industry: "FinTech",
  },
  {
    id: "kipoly",
    name: "Kipoly",
    tagline: "AI-Powered Digital Health Platform",
    description: "AI-driven medical decision support systems and telehealth platform. Deployed cancer screening and diagnostic tools that significantly improved early detection rates and patient outcomes in developing countries.",
    years: "2020-2023",
    status: "exited",
    exitYear: "2023",
    keyMetric: "500,000+ patients served",
    industry: "HealthTech",
  },
  {
    id: "qommerce",
    name: "Qommerce.ai",
    tagline: "Cross-Channel Retail Media Platform",
    description: "The first cross-channel retail media platform enabling hyperlocal media activation for FMCG brands. Bridges digital advertising and physical retail presence.",
    years: "2023-present",
    status: "active",
    industry: "Retail Media / AdTech",
  },
  {
    id: "finanzer",
    name: "Finanzer.ai",
    tagline: "AI Infrastructure for Tokenized Finance",
    description: "AI-native agentic infrastructure for the tokenized economy, focused on private debt markets. Offerings include equity-backed financing, project finance, supply chain finance, and trade financing.",
    years: "2023-present",
    status: "active",
    industry: "FinTech / DeFi",
  },
  {
    id: "intelliger",
    name: "Intelliger.ai",
    tagline: "AI Workflow & Business Automation",
    description: "Enterprise platform enabling organizations to streamline operations through intelligent process automation and AI-powered decision support systems.",
    years: "2021-present",
    status: "active",
    industry: "Enterprise Software",
  },
  {
    id: "supi",
    name: "Supi.ai",
    tagline: "Industrial AI & Predictive Maintenance",
    description: "Industrial AI platform specializing in AIoT applications, digital product twins, and process twins. Deployed in oil and gas refineries and petrochemical facilities, enabling predictive maintenance, risk-based inspection, and real-time monitoring.",
    years: "2021-present",
    status: "active",
    keyMetric: "€4B assets under AI management, €30M daily production monitored",
    industry: "Industrial AI / Oil & Gas",
  },
  {
    id: "welflab",
    name: "Welf Lab",
    tagline: "Enterprise Custom Software Development",
    description: "Enterprise software development studio delivering AI-powered solutions across industries. The foundational venture that built capabilities enabling all subsequent companies.",
    years: "2018-present",
    status: "active",
    keyMetric: "35+ major enterprise projects delivered",
    industry: "Enterprise Software",
  },
]

export const exitedVentures = ventures.filter((v) => v.status === "exited")
export const activeVentures = ventures.filter((v) => v.status === "active")
```

---

### Expertise Data

**File:** `src/lib/data/expertise.ts`

```typescript
import { Database, Brain, Cog, Target } from "lucide-react"

export const expertiseCategories = [
  {
    id: "data-engineering",
    title: "Data Engineering & Architecture",
    description: "Scalable data-driven application architecture with robust pipelines",
    icon: Database,
    technologies: [
      "Apache Kafka", "Apache Spark", "Flink", "Hadoop",
      "PostgreSQL", "MongoDB", "Cassandra", "BigQuery", "Redshift",
      "Airflow", "Apache Nifi", "Talend",
      "Tableau", "Power BI", "Looker"
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "End-to-end ML development from research to production",
    icon: Brain,
    technologies: [
      "TensorFlow", "PyTorch", "Scikit-learn", "FastAI",
      "Keras", "Hugging Face",
      "GPT-4", "LLaMA 3", "Gemini 1.5 Pro",
      "Transformers", "BERT",
      "OpenCV", "YOLO"
    ],
  },
  {
    id: "mlops",
    title: "MLOps & Deployment",
    description: "Scalable, automated ML pipelines in production",
    icon: Cog,
    technologies: [
      "Kubernetes", "Docker",
      "MLflow", "AWS SageMaker",
      "CI/CD for ML"
    ],
  },
  {
    id: "applied-ai",
    title: "Applied AI Focus Areas",
    description: "Business-focused AI applications",
    icon: Target,
    technologies: [
      "Predictive Analytics",
      "Prescriptive Analytics",
      "Real-time Data Applications",
      "Personalization Engines",
      "Enterprise Knowledge Management"
    ],
  },
]
```

---

## Page Implementations

### Home Page

**File:** `src/app/page.tsx`

```tsx
import { Hero } from "@/components/home/Hero"
import { MetricsBar } from "@/components/home/MetricsBar"
import { FeaturedVentures } from "@/components/home/FeaturedVentures"
import { AboutPreview } from "@/components/home/AboutPreview"
import { ExpertisePreview } from "@/components/home/ExpertisePreview"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MetricsBar />
      <FeaturedVentures />
      <AboutPreview />
      <ExpertisePreview />
    </main>
  )
}
```

### Ventures Page

**File:** `src/app/ventures/page.tsx`

```tsx
import { PageHeader } from "@/components/shared/PageHeader"
import { ExitedVentureCard } from "@/components/ventures/ExitedVentureCard"
import { VentureCard } from "@/components/ventures/VentureCard"
import { exitedVentures, activeVentures } from "@/lib/data/ventures"

export default function VenturesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Portfolio"
        title="Building Companies That Last"
        subtitle="7 ventures. 2 exits. 100% bootstrapped. Real customers, real revenue, real impact."
      />
      
      {/* Exited Ventures */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-brand-primary mb-8 flex items-center gap-2">
          ✓ Successful Exits
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {exitedVentures.map((venture) => (
            <ExitedVentureCard key={venture.id} {...venture} />
          ))}
        </div>
      </section>
      
      {/* Active Ventures */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-brand-primary mb-8">
            Active Ventures
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeVentures.map((venture) => (
              <VentureCard key={venture.id} {...venture} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Bootstrapped Philosophy */}
      <section className="py-16 container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-2xl font-bold text-brand-primary mb-4">
          Built to Last, Not to Burn
        </h2>
        <p className="text-lg text-brand-gray">
          "Unlike many AI ventures racing to raise capital before proving value, I've co-founded and scaled seven companies through disciplined, self-funded growth. This approach forced us to focus on what matters: real customers, real revenue, and real impact from day one."
        </p>
      </section>
    </main>
  )
}
```

---

## Additional Instructions

1. **Images:** Create `/public/images/` folder and add:
   - `headshot.jpg` - Professional headshot for hero
   - `portrait.jpg` - Casual photo for about page
   - Company logos as needed
   - Article thumbnails

2. **SEO:** Add metadata to each page using Next.js 14 metadata API

3. **Animations:** Use Framer Motion `whileInView` for scroll animations

4. **Responsive:** Test all breakpoints (mobile, tablet, desktop)

5. **Performance:** 
   - Use Next.js Image component with priority for above-fold images
   - Lazy load below-fold content
   - Add loading states

6. **Form:** Connect contact form to Formspree or custom API endpoint

---

## Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel
```

---

## Summary

This prompt provides complete specifications to build the website with:
- ✅ All shadcn/ui component implementations
- ✅ Tailwind configuration with brand colors
- ✅ Complete file structure
- ✅ Data files for all content
- ✅ Framer Motion animations
- ✅ Responsive design patterns
- ✅ Page implementations

Reference the original specification document for all text content, metrics, and design details.

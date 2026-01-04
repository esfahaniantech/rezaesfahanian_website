"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Menu, Linkedin, ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ThemeToggle"
import { XIcon } from "@/components/icons/XIcon"
import { Separator } from "@/components/ui/separator"

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="RE Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-foreground hidden sm:inline">
            Reza Esfahanian
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-2">
          <a href="https://linkedin.com/in/reza-esfahanian" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="w-9 h-9">
              <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
            </Button>
          </a>
          <a href="https://x.com/rezaesfahanian" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="w-9 h-9">
              <XIcon className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
            </Button>
          </a>
          <ThemeToggle />
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full sm:w-[350px] p-0 bg-background border-l border-border/50"
            >
              {/* Header with Logo */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <Link 
                  href="/" 
                  className="flex items-center gap-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Image
                    src="/logo.png"
                    alt="RE Logo"
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                  <span className="text-lg font-semibold text-foreground">
                    Reza Esfahanian
                  </span>
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-6">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "group flex items-center justify-between py-4 text-lg font-medium transition-all duration-200",
                      "border-b border-border/30 last:border-b-0",
                      pathname === link.href 
                        ? "text-primary" 
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {pathname === link.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                      {link.label}
                    </span>
                    <ArrowRight className={cn(
                      "w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200",
                      "group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground"
                    )} />
                  </Link>
                ))}
              </nav>

              {/* Footer Section */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-muted/30 border-t border-border/50">
                {/* Social Links */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-muted-foreground">Connect:</span>
                  <a 
                    href="https://linkedin.com/in/reza-esfahanian" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                  <a 
                    href="https://x.com/rezaesfahanian" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
                  >
                    <XIcon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                </div>

                {/* CTA Button */}
                <Button 
                  asChild 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    Get in Touch
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

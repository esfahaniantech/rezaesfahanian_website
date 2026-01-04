import Link from "next/link"
import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"
import { XIcon } from "@/components/icons/XIcon"

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/ventures", label: "Ventures" },
  { href: "/expertise", label: "Expertise" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="bg-foreground dark:bg-card text-background dark:text-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="RE Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h3 className="text-xl font-bold">Reza Esfahanian</h3>
            </div>
            <p className="text-sm text-background/60 dark:text-muted-foreground mb-4">
              AI Engineer & Serial Entrepreneur
            </p>
            <p className="text-sm text-background/60 dark:text-muted-foreground">
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
                    className="text-sm text-background/60 dark:text-muted-foreground hover:text-background dark:hover:text-foreground transition-colors"
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
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/reza-esfahanian"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 dark:text-muted-foreground hover:text-background dark:hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/rezaesfahanian"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 dark:text-muted-foreground hover:text-background dark:hover:text-foreground transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@rezaesfahanian.com"
                className="text-background/60 dark:text-muted-foreground hover:text-background dark:hover:text-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-background/10 dark:border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-background/40 dark:text-muted-foreground">
            © {new Date().getFullYear()} Reza Esfahanian. All rights reserved.
          </p>
          <p className="text-sm text-background/40 dark:text-muted-foreground">
            Hamburg, Germany
          </p>
        </div>
      </div>
    </footer>
  )
}

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
      <Card className="h-full group cursor-pointer hover:shadow-lg hover:border-primary transition-all">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
            <Icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
          </div>
          
          <h3 className="text-lg font-bold text-card-foreground mb-2">{title}</h3>
          <p className="text-primary font-medium">{content}</p>
        </CardContent>
      </Card>
    </motion.a>
  )
}

"use client"

import { PageHeader } from "@/components/shared/PageHeader"
import { ContactCard } from "@/components/contact/ContactCard"
import { ContactForm } from "@/components/contact/ContactForm"
import { Mail, Linkedin, Twitter, MapPin } from "lucide-react"

const contactMethods = [
  {
    title: "Email",
    content: "hello@rezaesfahanian.com",
    href: "mailto:hello@rezaesfahanian.com",
    icon: Mail,
  },
  {
    title: "LinkedIn",
    content: "@reza-esfahanian",
    href: "https://linkedin.com/in/reza-esfahanian",
    icon: Linkedin,
  },
  {
    title: "X (Twitter)",
    content: "@rezaesfahanian",
    href: "https://x.com/rezaesfahanian",
    icon: Twitter,
  },
  {
    title: "Location",
    content: "Hamburg, Germany",
    href: "#",
    icon: MapPin,
  },
]

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Get in Touch"
        title="Let's Build Something Together"
        subtitle="Whether you're interested in partnerships, investment opportunities, or just want to connect - I'd love to hear from you"
      />
      
      {/* Contact Methods */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <ContactCard
              key={method.title}
              title={method.title}
              content={method.content}
              href={method.href}
              icon={method.icon}
              index={index}
            />
          ))}
        </div>
        
        {/* Contact Form */}
        <ContactForm />
      </section>
      
      {/* Response Time */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            I Read Every Message
          </h2>
          <p className="text-lg text-muted-foreground">
            I personally review all inquiries and typically respond within 48 hours. 
            For urgent matters, LinkedIn messages tend to get the fastest response.
          </p>
        </div>
      </section>
    </main>
  )
}

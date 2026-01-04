"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Linkedin, MapPin, Send, CheckCircle, ArrowUpRight } from "lucide-react"
import { XIcon } from "@/components/icons/XIcon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen pt-[72px]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
              Let's Connect
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Interested in partnerships, collaborations, or just want to say hello? 
              I'd love to hear from you.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="bg-card border border-border p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. I'll get back to you within 48 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-card border border-border p-8">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Name <span className="text-primary">*</span>
                        </label>
                        <Input
                          required
                          placeholder="Your name"
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Email <span className="text-primary">*</span>
                        </label>
                        <Input
                          required
                          type="email"
                          placeholder="you@example.com"
                          className="bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Company
                        </label>
                        <Input
                          placeholder="Your company"
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Inquiry Type
                        </label>
                        <Select>
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="investment">Investment</SelectItem>
                            <SelectItem value="speaking">Speaking</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Message <span className="text-primary">*</span>
                      </label>
                      <Textarea
                        required
                        placeholder="How can I help you?"
                        className="min-h-[120px] bg-background border-border resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>

            {/* Contact Info - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Email */}
              <a
                href="mailto:hello@rezaesfahanian.com"
                className="group block bg-card border border-border p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      hello@rezaesfahanian.com
                    </p>
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/reza-esfahanian"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-card border border-border p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">LinkedIn</h3>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Connect with me
                    </p>
                  </div>
                </div>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/rezaesfahanian"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-card border border-border p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                    <XIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">X (Twitter)</h3>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      @rezaesfahanian
                    </p>
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="bg-card border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-sm text-muted-foreground">
                      Hamburg, Germany
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time Note */}
              <div className="bg-secondary/30 border border-border p-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Response time:</strong> I personally 
                  review all messages and typically respond within 48 hours. For faster 
                  responses, LinkedIn is recommended.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}

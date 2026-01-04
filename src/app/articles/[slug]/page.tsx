"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Linkedin, Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getPostBySlug, getRecentPosts, author } from "@/lib/data/blog"
import { XIcon } from "@/components/icons/XIcon"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = getPostBySlug(slug)
  const relatedPosts = getRecentPosts(3).filter((p) => p.slug !== slug)

  const [activeSection, setActiveSection] = useState<string | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement>>({})

  useEffect(() => {
    if (!post?.sections) return

    const sections = post.sections.map((s) => s.id)

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-100px 0px -50% 0px",
      threshold: 0.1,
    })

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [post?.sections])

  if (!post) {
    return (
      <main className="py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
        </div>
      </main>
    )
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/articles">Articles</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[200px]">
                  {post.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 mb-6 max-w-4xl text-3xl font-bold md:text-5xl lg:text-6xl"
        >
          {post.title}
        </motion.h1>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={author.image} alt={author.name} />
            </Avatar>
            <div>
              <Link
                href="/about"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                {author.name}
              </Link>
              <p className="text-sm text-muted-foreground">{author.role}</p>
            </div>
          </div>
          <Separator orientation="vertical" className="h-8 hidden sm:block" />
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="relative grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="order-2 lg:order-none lg:col-span-8"
          >
            {/* Cover Image */}
            <div className="relative aspect-video w-full overflow-hidden mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Excerpt */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Render content as formatted sections */}
              {post.content
                .trim()
                .split("\n\n")
                .filter((p) => p.trim())
                .map((paragraph, idx) => {
                  const trimmedParagraph = paragraph.trim()

                  // Handle headers
                  if (trimmedParagraph.startsWith("## ")) {
                    const title = trimmedParagraph.replace("## ", "")
                    const sectionId = post.sections?.find(
                      (s) => s.title === title
                    )?.id
                    return (
                      <h2
                        key={idx}
                        id={sectionId || `section-${idx}`}
                        className="text-2xl font-bold mt-10 mb-4 scroll-mt-24"
                      >
                        {title}
                      </h2>
                    )
                  }

                  // Handle blockquotes
                  if (trimmedParagraph.startsWith(">")) {
                    return (
                      <blockquote
                        key={idx}
                        className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6"
                      >
                        {trimmedParagraph.replace(/^>\s*"?/, "").replace(/"$/, "")}
                      </blockquote>
                    )
                  }

                  // Handle subheaders
                  if (trimmedParagraph.startsWith("### ")) {
                    return (
                      <h3
                        key={idx}
                        className="text-xl font-semibold mt-8 mb-3"
                      >
                        {trimmedParagraph.replace("### ", "")}
                      </h3>
                    )
                  }

                  // Handle lists
                  if (trimmedParagraph.startsWith("- ")) {
                    const items = trimmedParagraph.split("\n").filter((l) => l.trim())
                    return (
                      <ul key={idx} className="list-disc pl-6 my-4 space-y-2">
                        {items.map((item, i) => {
                          // Parse bold text **text** properly
                          const cleanItem = item
                            .replace(/^-\s*/, "")
                            .replace(/\*\*(.*?)\*\*/g, "$1")
                          return <li key={i}>{cleanItem}</li>
                        })}
                      </ul>
                    )
                  }

                  // Handle tables
                  if (trimmedParagraph.includes("|")) {
                    const rows = trimmedParagraph
                      .split("\n")
                      .filter((r) => r.trim() && !r.includes("---"))
                    if (rows.length > 1) {
                      const headers = rows[0]
                        .split("|")
                        .filter((c) => c.trim())
                      const dataRows = rows.slice(1)
                      return (
                        <div key={idx} className="overflow-x-auto my-6">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-border">
                                {headers.map((h, i) => (
                                  <th
                                    key={i}
                                    className="text-left p-3 font-semibold"
                                  >
                                    {h.trim()}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {dataRows.map((row, ri) => (
                                <tr
                                  key={ri}
                                  className="border-b border-border last:border-0"
                                >
                                  {row
                                    .split("|")
                                    .filter((c) => c.trim())
                                    .map((cell, ci) => (
                                      <td key={ci} className="p-3">
                                        {cell.trim()}
                                      </td>
                                    ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )
                    }
                  }

                  // Regular paragraphs
                  return (
                    <p key={idx} className="my-4 leading-relaxed">
                      {trimmedParagraph}
                    </p>
                  )
                })}
            </div>

            {/* Author Box */}
            <div className="mt-12 p-6 bg-secondary/30 border border-border">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={author.image} alt={author.name} />
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    Written by
                  </p>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {author.name}
                  </h3>
                  <p className="text-muted-foreground mb-3">{author.bio}</p>
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <a
                        href={author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <a
                        href={author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <XIcon className="w-4 h-4" />
                        Follow
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="order-1 flex h-fit flex-col gap-8 text-sm lg:sticky lg:top-24 lg:order-none lg:col-span-3 lg:col-start-10">
            {/* Table of Contents */}
            {post.sections && post.sections.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  On This Page
                </h4>
                <nav>
                  <ul className="space-y-1">
                    {post.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className={cn(
                            "block py-1.5 text-sm transition-colors duration-200",
                            activeSection === section.id
                              ? "text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            <Separator />

            {/* Share */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Share this article
              </h4>
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="secondary"
                  size="icon"
                  className="group"
                >
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="icon"
                  className="group"
                >
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <XIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="group"
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl)
                  }}
                >
                  <Share2 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Button>
              </div>
            </div>

            <Separator className="lg:hidden" />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="hidden lg:block">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Related Articles
                </h4>
                <div className="space-y-3">
                  {relatedPosts.slice(0, 2).map((relPost) => (
                    <Link
                      key={relPost.slug}
                      href={`/articles/${relPost.slug}`}
                      className="block group"
                    >
                      <h5 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relPost.title}
                      </h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        {relPost.readTime}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related Articles Section (Mobile) */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 lg:hidden">
            <h3 className="text-xl font-bold mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedPosts.slice(0, 2).map((relPost) => (
                <Link
                  key={relPost.slug}
                  href={`/articles/${relPost.slug}`}
                  className="group block bg-card border border-border p-4 hover:border-primary/50 transition-all"
                >
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {relPost.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {relPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Articles */}
        <div className="mt-12">
          <Button asChild variant="outline">
            <Link href="/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Articles
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}


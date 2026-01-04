"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Search } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { blogPosts, getAllTags, author, getFeaturedPost } from "@/lib/data/blog"

export default function ArticlesPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const allTags = getAllTags()
  const featuredPost = getFeaturedPost()

  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  return (
    <main>
      <PageHeader
        eyebrow="Insights"
        title="Articles & Thoughts"
        subtitle="Sharing lessons learned from building 7 companies, 2 exits, and deploying AI at scale"
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href={`/articles/${featuredPost.slug}`}
              className="group block relative overflow-hidden bg-card border border-border hover:border-primary/50 transition-all"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80 md:block hidden" />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={author.image} alt={author.name} />
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {author.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {featuredPost.date} · {featuredPost.readTime}
                      </p>
                    </div>
                  </div>
                  <Button variant="link" className="p-0 gap-2 self-start text-primary">
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* Filters & Search */}
      <section className="py-8 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Button>
            {allTags.slice(0, 6).map(({ tag, count }) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
                <span className="ml-1 text-xs opacity-60">({count})</span>
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-8 pb-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts
            .filter((post) => post.slug !== featuredPost?.slug)
            .map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/articles/${post.slug}`}
                  className="group block h-full bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt || post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent pointer-events-none" />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 border border-border">
                          <AvatarImage src={author.image} alt={author.name} />
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {author.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No articles found matching your criteria.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSelectedTag(null)
                setSearchQuery("")
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Get insights on AI, entrepreneurship, and building bootstrapped
            companies directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="https://linkedin.com/in/reza-esfahanian"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground font-semibold hover:bg-secondary transition-colors"
            >
              Follow on LinkedIn
            </a>
            <a
              href="https://x.com/rezaesfahanian"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              Follow on X
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

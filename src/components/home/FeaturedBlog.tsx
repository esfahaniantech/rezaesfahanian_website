"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getFeaturedPost, getRecentPosts, author } from "@/lib/data/blog"
import { OptimizedImage, imageSizes } from "@/components/shared/OptimizedImage"

export function FeaturedBlog() {
  const featuredPost = getFeaturedPost()
  const recentPosts = getRecentPosts(4).filter(
    (post) => post.slug !== featuredPost?.slug
  )

  if (!featuredPost) return null

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Insights
              </span>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mt-2">
                Tech Insights
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Exploring AI, entrepreneurship, and the technologies shaping
                tomorrow&apos;s industries
              </p>
            </div>
            <Button asChild variant="outline" className="gap-2 self-start md:self-auto">
              <Link href="/articles">
                View All Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Main Featured Post */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href={`/articles/${featuredPost.slug}`} className="group block">
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <OptimizedImage
                  src={featuredPost.coverImage}
                  alt={featuredPost.coverImageAlt || featuredPost.title}
                  fill
                  fillParent
                  priority
                  sizes={imageSizes.featured}
                  grayscaleHover
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                {/* Featured badge */}
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground z-10">
                  Featured
                </Badge>
              </div>
              <div className="mt-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {featuredPost.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-foreground md:text-3xl group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="mt-2 text-muted-foreground line-clamp-2">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={author.image} alt={author.name} />
                </Avatar>
                <span className="text-sm">
                  <span className="block font-medium text-foreground">
                    {author.name}
                  </span>
                  <span className="text-muted-foreground">
                    {featuredPost.date} · {featuredPost.readTime}
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Secondary Posts List */}
          <div className="space-y-6">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Link
                  href={`/articles/${post.slug}`}
                  className={cn(
                    "group flex items-start gap-4 pb-6",
                    index !== recentPosts.length - 1 && "border-b border-border"
                  )}
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-24 shrink-0 overflow-hidden bg-muted">
                    <OptimizedImage
                      src={post.coverImage}
                      alt={post.coverImageAlt || post.title}
                      fill
                      fillParent
                      sizes={imageSizes.thumbnail}
                      grayscaleHover
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs px-2 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {post.date} · {post.readTime}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


/**
 * CMS Client for Payload CMS Integration
 * Handles fetching posts from CMS with caching and fallback
 */

import {
  CMSPost,
  CMSPostsResponse,
  CMSPostsCache,
  LexicalContent,
  LexicalNode,
  LexicalTextNode,
  TransformedBlogPost,
} from "./types"
import { blogPosts as staticPosts, author } from "@/lib/data/blog"
import { BlogPost } from "@/types"

// Configuration
const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "https://admin.rezaesfahanian.com/api"
const CMS_BASE_URL = CMS_API_URL.replace("/api", "")
const WEBSITE_ID = process.env.NEXT_PUBLIC_WEBSITE_ID || "reza-website"
const USE_CMS = process.env.NEXT_PUBLIC_USE_CMS === "true"

// Known author avatars (since CMS doesn't return avatars)
const KNOWN_AUTHOR_AVATARS: Record<string, string> = {
  "Reza Esfahanian": "/images/author-headshot.jpg",
  Default: "/images/author-headshot.jpg",
}

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

interface CacheEntry<T> {
  data: T
  timestamp: number
}

class CMSClient {
  private cache = new Map<string, CacheEntry<unknown>>()

  /**
   * Resolve relative media URLs to absolute CMS URLs
   */
  resolveMediaUrl(url?: string | null): string {
    if (!url) return "/images/default-cover.jpg"
    if (url.startsWith("http")) return url
    return `${CMS_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`
  }

  /**
   * Get cached value or null if expired
   */
  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined
    if (!entry) return null

    if (Date.now() - entry.timestamp > CACHE_TTL) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  /**
   * Set value in cache
   */
  private setCache<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  /**
   * Convert Lexical text formatting to HTML
   */
  private formatText(node: LexicalTextNode): string {
    let text = this.escapeHtml(node.text)

    if (node.format) {
      // Format bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code
      if (node.format & 1) text = `<strong>${text}</strong>`
      if (node.format & 2) text = `<em>${text}</em>`
      if (node.format & 4) text = `<del>${text}</del>`
      if (node.format & 8) text = `<u>${text}</u>`
      if (node.format & 16) text = `<code>${text}</code>`
    }

    return text
  }

  /**
   * Escape HTML entities
   */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  /**
   * Convert Lexical node to HTML
   */
  private nodeToHtml(node: LexicalNode): string {
    switch (node.type) {
      case "text":
        return this.formatText(node)

      case "linebreak":
        return "<br />"

      case "paragraph":
        const pContent = node.children.map((c) => this.nodeToHtml(c)).join("")
        return pContent ? `<p>${pContent}</p>` : ""

      case "heading":
        const hContent = node.children.map((c) => this.nodeToHtml(c)).join("")
        return `<${node.tag}>${hContent}</${node.tag}>`

      case "list":
        const listTag = node.listType === "number" ? "ol" : "ul"
        const listItems = node.children
          .map((c) => this.nodeToHtml(c))
          .join("")
        return `<${listTag}>${listItems}</${listTag}>`

      case "listitem":
        const liContent = node.children.map((c) => this.nodeToHtml(c)).join("")
        return `<li>${liContent}</li>`

      case "link":
        const linkContent = node.children.map((c) => this.nodeToHtml(c)).join("")
        const target = node.fields.newTab ? ' target="_blank" rel="noopener noreferrer"' : ""
        return `<a href="${node.fields.url}"${target}>${linkContent}</a>`

      case "quote":
        const quoteContent = node.children
          .map((c) => this.nodeToHtml(c))
          .join("")
        return `<blockquote>${quoteContent}</blockquote>`

      case "upload":
        const imgUrl = this.resolveMediaUrl(node.value?.url)
        const imgAlt = node.value?.alt || ""
        return `<figure><img src="${imgUrl}" alt="${imgAlt}" loading="lazy" /><figcaption>${imgAlt}</figcaption></figure>`

      case "image":
        return `<img src="${node.src}" alt="${node.altText || ""}" loading="lazy" />`

      default:
        return ""
    }
  }

  /**
   * Convert Lexical content to HTML string
   */
  lexicalToHtml(content?: LexicalContent): string {
    if (!content?.root?.children) return ""
    return content.root.children.map((node) => this.nodeToHtml(node)).join("\n")
  }

  /**
   * Convert Lexical node to plain text
   */
  private nodeToText(node: LexicalNode): string {
    switch (node.type) {
      case "text":
        return node.text

      case "linebreak":
        return "\n"

      case "paragraph":
      case "heading":
      case "quote":
        return node.children.map((c) => this.nodeToText(c)).join("") + "\n\n"

      case "list":
        return node.children.map((c) => this.nodeToText(c)).join("")

      case "listitem":
        return "- " + node.children.map((c) => this.nodeToText(c)).join("") + "\n"

      case "link":
        return node.children.map((c) => this.nodeToText(c)).join("")

      default:
        return ""
    }
  }

  /**
   * Convert Lexical content to plain text (for excerpts)
   */
  lexicalToText(content?: LexicalContent): string {
    if (!content?.root?.children) return ""
    return content.root.children
      .map((node) => this.nodeToText(node))
      .join("")
      .trim()
  }

  /**
   * Extract headings from Lexical content for sections
   */
  extractSections(content?: LexicalContent): { id: string; title: string }[] {
    if (!content?.root?.children) return []

    const sections: { id: string; title: string }[] = []

    for (const node of content.root.children) {
      if (node.type === "heading" && (node.tag === "h2" || node.tag === "h3")) {
        const title = node.children
          .map((c) => (c.type === "text" ? c.text : ""))
          .join("")
        const id = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
        sections.push({ id, title })
      }
    }

    return sections
  }

  /**
   * Estimate reading time based on word count
   */
  estimateReadTime(content?: LexicalContent): string {
    const text = this.lexicalToText(content)
    const wordCount = text.split(/\s+/).length
    const minutes = Math.ceil(wordCount / 200)
    return `${minutes} min read`
  }

  /**
   * Transform CMS post to BlogPost format
   */
  cmsPostToBlogPost(post: CMSPost): TransformedBlogPost {
    const htmlContent = this.lexicalToHtml(post.content)
    const textContent = this.lexicalToText(post.content)
    const excerpt =
      post.meta?.description ||
      textContent.slice(0, 200).replace(/\n/g, " ").trim() + "..."

    return {
      slug: post.slug,
      title: post.title,
      excerpt,
      content: textContent,
      htmlContent,
      coverImage: this.resolveMediaUrl(post.heroImage?.url),
      coverImageAlt: post.heroImage?.alt || post.title,
      date: post.publishedAt || post.createdAt,
      readTime: this.estimateReadTime(post.content),
      tags: post.categories?.map((c) => c.title) || [],
      featured: false,
      sections: this.extractSections(post.content),
      cmsId: post.id,
      source: "cms",
    }
  }

  /**
   * Fetch posts from CMS API
   */
  async fetchPosts(options?: {
    page?: number
    limit?: number
    category?: string
  }): Promise<{ posts: TransformedBlogPost[]; total: number; hasMore: boolean }> {
    if (!USE_CMS) {
      return {
        posts: staticPosts.map((p) => ({ ...p, source: "static" as const })),
        total: staticPosts.length,
        hasMore: false,
      }
    }

    const cacheKey = `posts-${options?.page || 1}-${options?.limit || 10}-${options?.category || "all"}`
    const cached = this.getFromCache<{
      posts: TransformedBlogPost[]
      total: number
      hasMore: boolean
    }>(cacheKey)
    if (cached) return cached

    try {
      const params = new URLSearchParams({
        page: String(options?.page || 1),
        limit: String(options?.limit || 10),
        "where[externalSource][equals]": WEBSITE_ID,
        "where[_status][equals]": "published",
        sort: "-publishedAt",
      })

      if (options?.category) {
        params.append("where[categories.title][equals]", options.category)
      }

      const response = await fetch(`${CMS_API_URL}/posts?${params}`, {
        next: { revalidate: 300 }, // 5 minute cache for Next.js
      })

      if (!response.ok) {
        throw new Error(`CMS API error: ${response.status}`)
      }

      const data: CMSPostsResponse = await response.json()
      const posts = data.docs.map((post) => this.cmsPostToBlogPost(post))

      const result = {
        posts,
        total: data.totalDocs,
        hasMore: data.hasNextPage,
      }

      this.setCache(cacheKey, result)
      return result
    } catch (error) {
      console.error("Error fetching from CMS:", error)
      // Fall back to local cache
      return this.fetchLocalCache()
    }
  }

  /**
   * Fetch a single post by slug
   */
  async fetchPostBySlug(slug: string): Promise<TransformedBlogPost | null> {
    if (!USE_CMS) {
      const staticPost = staticPosts.find((p) => p.slug === slug)
      return staticPost
        ? { ...staticPost, source: "static" as const }
        : null
    }

    const cacheKey = `post-${slug}`
    const cached = this.getFromCache<TransformedBlogPost>(cacheKey)
    if (cached) return cached

    try {
      const params = new URLSearchParams({
        "where[slug][equals]": slug,
        "where[externalSource][equals]": WEBSITE_ID,
        "where[_status][equals]": "published",
      })

      const response = await fetch(`${CMS_API_URL}/posts?${params}`, {
        next: { revalidate: 300 },
      })

      if (!response.ok) {
        throw new Error(`CMS API error: ${response.status}`)
      }

      const data: CMSPostsResponse = await response.json()

      if (data.docs.length === 0) {
        // Try static posts
        const staticPost = staticPosts.find((p) => p.slug === slug)
        return staticPost
          ? { ...staticPost, source: "static" as const }
          : null
      }

      const post = this.cmsPostToBlogPost(data.docs[0])
      this.setCache(cacheKey, post)
      return post
    } catch (error) {
      console.error("Error fetching post from CMS:", error)
      // Fall back to static posts
      const staticPost = staticPosts.find((p) => p.slug === slug)
      return staticPost
        ? { ...staticPost, source: "static" as const }
        : null
    }
  }

  /**
   * Fetch categories from CMS
   */
  async fetchCategories(): Promise<string[]> {
    if (!USE_CMS) {
      return this.extractCategoriesFromStatic()
    }

    const cacheKey = "categories"
    const cached = this.getFromCache<string[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(`${CMS_API_URL}/categories?limit=100`, {
        next: { revalidate: 3600 }, // 1 hour cache
      })

      if (!response.ok) {
        throw new Error(`CMS API error: ${response.status}`)
      }

      const data = await response.json()
      const categories = data.docs.map(
        (c: { title: string }) => c.title
      ) as string[]

      this.setCache(cacheKey, categories)
      return categories
    } catch (error) {
      console.error("Error fetching categories:", error)
      return this.extractCategoriesFromStatic()
    }
  }

  /**
   * Extract unique categories from static posts
   */
  private extractCategoriesFromStatic(): string[] {
    const categories = new Set<string>()
    staticPosts.forEach((post) => {
      post.tags.forEach((tag) => categories.add(tag))
    })
    return Array.from(categories)
  }

  /**
   * Fetch posts from local cache file
   */
  async fetchLocalCache(): Promise<{
    posts: TransformedBlogPost[]
    total: number
    hasMore: boolean
  }> {
    try {
      // In browser, fetch the JSON file
      if (typeof window !== "undefined") {
        const response = await fetch("/data/cmsPosts.json")
        if (!response.ok) {
          throw new Error("Local cache not found")
        }
        const cache: CMSPostsCache = await response.json()

        if (cache.posts.length === 0) {
          throw new Error("Cache is empty")
        }

        const posts = cache.posts.map((post) => ({
          ...this.cmsPostToBlogPost(post),
          source: "cache" as const,
        }))

        return { posts, total: posts.length, hasMore: false }
      }

      // Fallback to static posts
      return {
        posts: staticPosts.map((p) => ({ ...p, source: "static" as const })),
        total: staticPosts.length,
        hasMore: false,
      }
    } catch (error) {
      console.error("Error reading local cache:", error)
      // Ultimate fallback: static posts
      return {
        posts: staticPosts.map((p) => ({ ...p, source: "static" as const })),
        total: staticPosts.length,
        hasMore: false,
      }
    }
  }

  /**
   * Merge CMS posts with static posts, CMS takes priority
   */
  mergeWithStatic(cmsPosts: TransformedBlogPost[]): TransformedBlogPost[] {
    const postsBySlug = new Map<string, TransformedBlogPost>()

    // Add static posts first
    for (const post of staticPosts) {
      postsBySlug.set(post.slug, { ...post, source: "static" as const })
    }

    // CMS posts override static posts
    for (const post of cmsPosts) {
      postsBySlug.set(post.slug, post)
    }

    // Sort by date descending
    return Array.from(postsBySlug.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  /**
   * Get author information
   */
  getAuthor(authorName?: string) {
    const avatar =
      KNOWN_AUTHOR_AVATARS[authorName || ""] ||
      KNOWN_AUTHOR_AVATARS["Default"]
    return {
      name: authorName || author.name,
      role: author.role,
      image: avatar,
      bio: author.bio,
      social: author.social,
    }
  }
}

// Export singleton instance
export const cmsClient = new CMSClient()

// Export utility functions for convenience
export const resolveMediaUrl = (url?: string | null) =>
  cmsClient.resolveMediaUrl(url)
export const fetchPosts = (options?: {
  page?: number
  limit?: number
  category?: string
}) => cmsClient.fetchPosts(options)
export const fetchPostBySlug = (slug: string) =>
  cmsClient.fetchPostBySlug(slug)
export const fetchCategories = () => cmsClient.fetchCategories()
export const getAuthor = (name?: string) => cmsClient.getAuthor(name)


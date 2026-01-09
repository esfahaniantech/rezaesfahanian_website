"use client"

/**
 * React Hooks for Blog Posts with CMS Integration
 * Provides seamless fallback: CMS → Local Cache → Static Posts
 */

import { useState, useEffect, useCallback } from "react"
import { cmsClient, fetchCategories } from "@/lib/cms/client"
import { TransformedBlogPost } from "@/lib/cms/types"
import { blogPosts as staticPosts } from "@/lib/data/blog"

// Options for useBlogPosts hook
interface UseBlogPostsOptions {
  initialLimit?: number
  category?: string
  searchTerm?: string
  sort?: "date" | "title"
  mergeWithStatic?: boolean
}

// Return type for useBlogPosts hook
interface UseBlogPostsResult {
  posts: TransformedBlogPost[]
  loading: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
  categories: string[]
  total: number
  refetch: () => void
}

/**
 * Hook to fetch and manage multiple blog posts
 * Handles pagination, filtering, and merging with static posts
 */
export function useBlogPosts(
  options: UseBlogPostsOptions = {}
): UseBlogPostsResult {
  const {
    initialLimit = 10,
    category,
    searchTerm,
    sort = "date",
    mergeWithStatic = true,
  } = options

  const [posts, setPosts] = useState<TransformedBlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const [categories, setCategories] = useState<string[]>([])
  const [total, setTotal] = useState(0)

  // Fetch posts
  const fetchPosts = useCallback(
    async (pageNum: number, append = false) => {
      try {
        setLoading(true)
        setError(null)

        const result = await cmsClient.fetchPosts({
          page: pageNum,
          limit: initialLimit,
          category,
        })

        let allPosts = result.posts

        // Merge with static posts if enabled
        if (mergeWithStatic && pageNum === 1) {
          allPosts = cmsClient.mergeWithStatic(result.posts)
        }

        // Apply search filter
        if (searchTerm) {
          const term = searchTerm.toLowerCase()
          allPosts = allPosts.filter(
            (post) =>
              post.title.toLowerCase().includes(term) ||
              post.excerpt.toLowerCase().includes(term) ||
              post.tags.some((tag) => tag.toLowerCase().includes(term))
          )
        }

        // Apply category filter
        if (category) {
          allPosts = allPosts.filter((post) =>
            post.tags.some((tag) => tag.toLowerCase() === category.toLowerCase())
          )
        }

        // Apply sorting
        if (sort === "title") {
          allPosts.sort((a, b) => a.title.localeCompare(b.title))
        } else {
          allPosts.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        }

        if (append) {
          setPosts((prev) => [...prev, ...allPosts])
        } else {
          setPosts(allPosts)
        }

        setTotal(
          mergeWithStatic
            ? Math.max(result.total, staticPosts.length)
            : result.total
        )
        setHasMore(result.hasMore)
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Failed to load posts. Using cached content.")

        // Fallback to static posts
        const fallbackPosts = staticPosts.map((p) => ({
          ...p,
          source: "static" as const,
        }))
        setPosts(fallbackPosts)
        setTotal(fallbackPosts.length)
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    },
    [initialLimit, category, searchTerm, sort, mergeWithStatic]
  )

  // Load more posts
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchPosts(nextPage, true)
    }
  }, [hasMore, loading, page, fetchPosts])

  // Refetch from start
  const refetch = useCallback(() => {
    setPage(1)
    fetchPosts(1)
  }, [fetchPosts])

  // Initial fetch
  useEffect(() => {
    fetchPosts(1)
  }, [fetchPosts])

  // Fetch categories
  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error)
  }, [])

  return {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    categories,
    total,
    refetch,
  }
}

// Return type for useBlogPost hook
interface UseBlogPostResult {
  post: TransformedBlogPost | null
  loading: boolean
  error: string | null
  relatedPosts: TransformedBlogPost[]
}

/**
 * Hook to fetch a single blog post by slug
 * Handles fallback to static posts
 */
export function useBlogPost(slug: string | undefined): UseBlogPostResult {
  const [post, setPost] = useState<TransformedBlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<TransformedBlogPost[]>([])

  useEffect(() => {
    if (!slug) {
      setPost(null)
      setLoading(false)
      return
    }

    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)

        const result = await cmsClient.fetchPostBySlug(slug)

        if (!result) {
          setError("Post not found")
          setPost(null)
        } else {
          setPost(result)

          // Fetch related posts (same category/tags)
          const { posts: allPosts } = await cmsClient.fetchPosts({ limit: 10 })
          const merged = cmsClient.mergeWithStatic(allPosts)

          // Find related posts by matching tags
          const related = merged
            .filter((p) => p.slug !== slug)
            .filter((p) =>
              p.tags.some((tag) => result.tags.includes(tag))
            )
            .slice(0, 3)

          setRelatedPosts(related)
        }
      } catch (err) {
        console.error("Error fetching post:", err)
        setError("Failed to load post")

        // Try static posts fallback
        const staticPost = staticPosts.find((p) => p.slug === slug)
        if (staticPost) {
          setPost({ ...staticPost, source: "static" as const })
          setError(null)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  return { post, loading, error, relatedPosts }
}

/**
 * Hook to get featured post
 */
export function useFeaturedPost(): {
  post: TransformedBlogPost | null
  loading: boolean
} {
  const [post, setPost] = useState<TransformedBlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // First try to get featured from CMS
        const { posts } = await cmsClient.fetchPosts({ limit: 1 })
        const merged = cmsClient.mergeWithStatic(posts)

        // Find featured post
        const featured = merged.find((p) => p.featured)
        setPost(featured || merged[0] || null)
      } catch (err) {
        console.error("Error fetching featured post:", err)
        const featured = staticPosts.find((p) => p.featured)
        setPost(
          featured
            ? { ...featured, source: "static" as const }
            : null
        )
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  return { post, loading }
}

/**
 * Hook to get all unique tags from posts
 */
export function useAllTags(): { tags: { tag: string; count: number }[]; loading: boolean } {
  const [tags, setTags] = useState<{ tag: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { posts } = await cmsClient.fetchPosts({ limit: 100 })
        const merged = cmsClient.mergeWithStatic(posts)

        const tagCount: Record<string, number> = {}
        merged.forEach((post) => {
          post.tags.forEach((tag) => {
            tagCount[tag] = (tagCount[tag] || 0) + 1
          })
        })

        const sortedTags = Object.entries(tagCount)
          .sort((a, b) => b[1] - a[1])
          .map(([tag, count]) => ({ tag, count }))

        setTags(sortedTags)
      } catch (err) {
        console.error("Error fetching tags:", err)
        // Fallback to static posts
        const tagCount: Record<string, number> = {}
        staticPosts.forEach((post) => {
          post.tags.forEach((tag) => {
            tagCount[tag] = (tagCount[tag] || 0) + 1
          })
        })
        const sortedTags = Object.entries(tagCount)
          .sort((a, b) => b[1] - a[1])
          .map(([tag, count]) => ({ tag, count }))
        setTags(sortedTags)
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  return { tags, loading }
}


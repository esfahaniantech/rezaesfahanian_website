import { notFound } from "next/navigation"
import { getPostBySlug, getRecentPosts, getAllSlugs } from "@/lib/data/blog"
import { BlogPostContent } from "@/components/blog/BlogPostContent"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRecentPosts(3).filter((p) => p.slug !== slug)

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />
}

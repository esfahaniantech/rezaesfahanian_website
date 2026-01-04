import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPostBySlug, getRecentPosts, getAllSlugs, author } from "@/lib/data/blog"
import { BlogPostContent } from "@/components/blog/BlogPostContent"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://rezaesfahanian.com/articles/${post.slug}`,
      publishedTime: post.date,
      authors: [author.name],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      creator: "@rezaesfahanian",
    },
  }
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

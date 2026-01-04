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

  const siteUrl = "https://rezaesfahanian.com"
  const articleUrl = `${siteUrl}/articles/${post.slug}`
  const fullImageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${siteUrl}${post.coverImage}`

  return {
    title: `${post.title} | Reza Esfahanian`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: author.name, url: `${siteUrl}/about` }],
    creator: author.name,
    publisher: author.name,
    category: "Technology",
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: articleUrl,
      siteName: "Reza Esfahanian",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [author.name],
      tags: post.tags,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt || post.title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [fullImageUrl],
      creator: "@rezaesfahanian",
      site: "@rezaesfahanian",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "article:author": author.name,
      "article:published_time": post.date,
      "article:section": post.tags[0] || "Technology",
      "article:tag": post.tags.join(", "),
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

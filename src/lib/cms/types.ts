/**
 * CMS Types for Payload CMS Integration
 * These types match the Payload CMS Posts collection structure
 */

// Lexical Editor Types
export interface LexicalTextNode {
  type: "text"
  text: string
  format?: number // Bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code, 32=subscript, 64=superscript
  style?: string
}

export interface LexicalLinkNode {
  type: "link"
  children: LexicalNode[]
  fields: {
    url: string
    newTab?: boolean
    linkType?: "custom" | "internal"
  }
}

export interface LexicalParagraphNode {
  type: "paragraph"
  children: LexicalNode[]
  indent?: number
  direction?: "ltr" | "rtl"
}

export interface LexicalHeadingNode {
  type: "heading"
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children: LexicalNode[]
}

export interface LexicalListNode {
  type: "list"
  listType: "bullet" | "number" | "check"
  children: LexicalListItemNode[]
  start?: number
}

export interface LexicalListItemNode {
  type: "listitem"
  children: LexicalNode[]
  value?: number
  checked?: boolean
}

export interface LexicalQuoteNode {
  type: "quote"
  children: LexicalNode[]
}

export interface LexicalUploadNode {
  type: "upload"
  value: {
    id: string
    url: string
    alt?: string
    filename?: string
  }
  relationTo: string
}

export interface LexicalImageNode {
  type: "image"
  src: string
  altText?: string
  width?: number
  height?: number
}

export interface LexicalLineBreakNode {
  type: "linebreak"
}

export type LexicalNode =
  | LexicalTextNode
  | LexicalLinkNode
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalListNode
  | LexicalListItemNode
  | LexicalQuoteNode
  | LexicalUploadNode
  | LexicalImageNode
  | LexicalLineBreakNode

export interface LexicalContent {
  root: {
    type: "root"
    children: LexicalNode[]
    direction?: "ltr" | "rtl"
    format?: string
    indent?: number
  }
}

// CMS Media Types
export interface CMSMedia {
  id: string
  url: string
  alt?: string
  filename?: string
  mimeType?: string
  width?: number
  height?: number
}

// CMS Category Types
export interface CMSCategory {
  id: string
  title: string
  slug?: string
}

// CMS Author Types
export interface CMSAuthor {
  id: string
  name: string
  email?: string
}

// CMS Post Structure (from Payload CMS)
export interface CMSPost {
  id: number
  title: string
  slug: string
  content?: LexicalContent
  heroImage?: CMSMedia
  categories?: CMSCategory[]
  populatedAuthors?: CMSAuthor[]
  meta?: {
    title?: string
    description?: string
    image?: CMSMedia
  }
  publishedAt?: string
  createdAt: string
  updatedAt: string
  _status?: "draft" | "published"
  externalSource?: string
}

// CMS API Response
export interface CMSPostsResponse {
  docs: CMSPost[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}

// Local Cache Structure
export interface CMSPostsCache {
  posts: CMSPost[]
  lastUpdated: string | null
  source: "cms"
  version: number
}

// Transformed Blog Post (matches existing BlogPost interface)
export interface TransformedBlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  coverImageAlt?: string
  date: string
  readTime: string
  tags: string[]
  featured?: boolean
  sections?: {
    id: string
    title: string
  }[]
  // CMS-specific fields
  cmsId?: number
  source?: "cms" | "static" | "cache"
  htmlContent?: string
}


import { BlogPost, Author } from "@/types"

// Author information - Reza is the author of all posts
export const author: Author = {
  name: "Reza Esfahanian",
  role: "AI Engineer & Serial Entrepreneur",
  image: "/images/author-headshot.jpg",
  bio: "Building AI that transforms industries.",
  social: {
    linkedin: "https://linkedin.com/in/reza-esfahanian",
    twitter: "https://x.com/rezaesfahanian",
    email: "hello@rezaesfahanian.com",
  },
}

// Blog tags for filtering
export const blogTags = [
  "AI",
  "Machine Learning",
  "Industrial AI",
  "FinTech",
  "HealthTech",
  "Entrepreneurship",
  "MLOps",
  "Data Engineering",
  "Startups",
  "Product Development",
] as const

export type BlogTag = (typeof blogTags)[number]

// Blog posts data
export const blogPosts: BlogPost[] = [
  {
    slug: "industrial-ai-predictive-maintenance",
    title: "How Industrial AI is Revolutionizing Predictive Maintenance",
    excerpt:
      "Exploring how AI-powered predictive maintenance systems are transforming oil & gas operations, reducing downtime by up to 40% and saving millions in operational costs.",
    content: `
## The Challenge of Industrial Maintenance

Traditional maintenance approaches in industrial settings have long been reactive—fixing equipment after it breaks—or preventive, following rigid schedules regardless of actual equipment condition. Both approaches have significant drawbacks.

> "The cost of unplanned downtime in oil & gas operations can exceed €50,000 per hour. Predictive maintenance powered by AI changes this equation entirely."

## How AI Transforms Maintenance

At Supi.ai, we've developed AI systems that analyze real-time sensor data from industrial equipment to predict failures before they occur. Our platform processes:

- **Vibration patterns** from rotating machinery
- **Temperature fluctuations** across heat exchangers
- **Pressure variations** in pipeline systems
- **Acoustic signatures** from compressors and pumps

## Real-World Impact

Our deployments in petrochemical facilities have demonstrated remarkable results:

| Metric | Before AI | After AI |
|--------|-----------|----------|
| Unplanned Downtime | 12% | 3% |
| Maintenance Costs | €2.4M/year | €1.6M/year |
| Equipment Lifespan | Baseline | +25% |

## Key Takeaways

The future of industrial operations lies in intelligent systems that can learn from data and adapt to changing conditions. Organizations that embrace these technologies today will have a significant competitive advantage tomorrow.
    `,
    coverImage: "/images/ventures/banners/supi.png",
    date: "2025-01-02",
    readTime: "8 min read",
    tags: ["AI", "Industrial AI", "Machine Learning", "MLOps"],
    featured: true,
    sections: [
      { id: "challenge", title: "The Challenge of Industrial Maintenance" },
      { id: "transformation", title: "How AI Transforms Maintenance" },
      { id: "impact", title: "Real-World Impact" },
      { id: "takeaways", title: "Key Takeaways" },
    ],
  },
  {
    slug: "bootstrapping-ai-ventures",
    title: "Why I Bootstrap AI Ventures: Lessons from 7 Companies",
    excerpt:
      "The unconventional path of building AI companies without venture capital—and why it leads to more sustainable, customer-focused businesses.",
    content: `
## The VC Trap in AI

The AI startup ecosystem is awash with venture capital. Companies raise millions before proving product-market fit, creating a dynamic where the priority becomes growth at all costs rather than sustainable value creation.

> "Unlike many AI ventures racing to raise capital before proving value, I've co-founded and scaled seven companies through disciplined, self-funded growth."

## Benefits of Bootstrapping

### Customer-First Mentality

When you don't have runway from investors, every customer matters. This forces you to:

- Build features customers actually need
- Price products sustainably
- Focus on retention over acquisition

### Long-Term Thinking

Without pressure for quick exits, you can:

- Invest in deep technology development
- Build genuine competitive moats
- Create real enterprise value

## The Results Speak

Across my seven ventures:

- **2 successful exits** (Kipoly, Credify)
- **€4B+ in assets** under AI management at Supi.ai
- **35+ enterprise projects** delivered through Welf Lab
- **500K+ patients** served by our HealthTech platform

## When VC Makes Sense

I'm not anti-VC—there are valid reasons to raise capital. But for most AI ventures, proving value with real customers first creates better outcomes for everyone.
    `,
    coverImage: "/images/ventures/banners/welflab.png",
    date: "2024-12-15",
    readTime: "6 min read",
    tags: ["Entrepreneurship", "Startups", "AI"],
    featured: false,
    sections: [
      { id: "vc-trap", title: "The VC Trap in AI" },
      { id: "benefits", title: "Benefits of Bootstrapping" },
      { id: "results", title: "The Results Speak" },
      { id: "vc-sense", title: "When VC Makes Sense" },
    ],
  },
  {
    slug: "tokenized-finance-ai-infrastructure",
    title: "Building AI Infrastructure for the Tokenized Economy",
    excerpt:
      "How agentic AI systems are transforming private debt markets and enabling new forms of decentralized finance.",
    content: `
## The Convergence of AI and DeFi

The tokenization of real-world assets is creating unprecedented opportunities for AI systems to manage and optimize financial operations. At Finanzer.ai, we're building the infrastructure for this future.

> "AI-native agentic infrastructure for the tokenized economy isn't just about automation—it's about creating entirely new financial primitives."

## Key Use Cases

### Equity-Backed Financing

AI agents can evaluate collateral in real-time, adjusting loan terms dynamically based on market conditions and asset valuations.

### Supply Chain Finance

By analyzing transaction patterns and supplier relationships, AI can optimize working capital across entire supply chains.

### Project Finance

Complex project evaluations that once took months can be streamlined with AI-powered due diligence and risk assessment.

## The Technology Stack

Building AI for DeFi requires a unique combination of:

- **Real-time data processing** for market analysis
- **Secure computation** for sensitive financial data
- **Blockchain integration** for transparent transactions
- **Regulatory compliance** automation

## Looking Ahead

The intersection of AI and tokenized finance will create trillions in new market opportunities. Organizations that build the right infrastructure today will define the future of finance.
    `,
    coverImage: "/images/ventures/banners/finanzer.png",
    date: "2024-11-28",
    readTime: "7 min read",
    tags: ["FinTech", "AI", "Machine Learning"],
    featured: false,
    sections: [
      { id: "convergence", title: "The Convergence of AI and DeFi" },
      { id: "use-cases", title: "Key Use Cases" },
      { id: "tech-stack", title: "The Technology Stack" },
      { id: "looking-ahead", title: "Looking Ahead" },
    ],
  },
  {
    slug: "retail-media-ai-hyperlocal",
    title: "The Rise of AI-Powered Hyperlocal Retail Media",
    excerpt:
      "How cross-channel retail media platforms are bridging the gap between digital advertising and physical retail presence.",
    content: `
## The Retail Media Revolution

Retail media networks have become the third wave of digital advertising, but most platforms focus solely on e-commerce. The real opportunity lies in connecting digital campaigns to physical store performance.

> "FMCG brands spend billions on digital advertising without understanding how it drives foot traffic and in-store purchases."

## The Hyperlocal Advantage

At Qommerce.ai, we've built the first cross-channel retail media platform that enables:

### Real-Time Campaign Optimization

Adjusting digital spend based on actual in-store inventory levels and foot traffic patterns.

### Attribution at Scale

Connecting online ad impressions to offline purchases across thousands of retail locations.

### Localized Messaging

Tailoring creative content based on local preferences, weather, events, and competitive dynamics.

## Measurable Impact

Our platform has demonstrated:

- **30% improvement** in ROAS for FMCG campaigns
- **40% reduction** in wasted ad spend on out-of-stock products
- **2x increase** in foot traffic attribution accuracy

## The Future of Retail Advertising

As the lines between online and offline commerce continue to blur, AI systems that can optimize across both channels will become essential for brand success.
    `,
    coverImage: "/images/ventures/banners/qommerce.png",
    date: "2024-10-20",
    readTime: "5 min read",
    tags: ["AI", "Data Engineering", "Product Development"],
    featured: false,
    sections: [
      { id: "revolution", title: "The Retail Media Revolution" },
      { id: "hyperlocal", title: "The Hyperlocal Advantage" },
      { id: "impact", title: "Measurable Impact" },
      { id: "future", title: "The Future of Retail Advertising" },
    ],
  },
]

// Helper functions
export const getFeaturedPost = () => blogPosts.find((post) => post.featured)

export const getRecentPosts = (count: number = 4) =>
  blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)

export const getPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug)

export const getPostsByTag = (tag: string) =>
  blogPosts.filter((post) => post.tags.includes(tag))

export const getAllTags = () => {
  const tagCount: Record<string, number> = {}
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })
  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }))
}

export const getAllSlugs = () => blogPosts.map((post) => post.slug)


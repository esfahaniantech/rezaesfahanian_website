import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Insights on AI, entrepreneurship, and building bootstrapped companies. Lessons learned from founding 7 companies with 2 successful exits.",
  keywords: [
    "AI Blog",
    "Machine Learning",
    "Entrepreneurship",
    "Startup Insights",
    "Industrial AI",
    "FinTech",
    "HealthTech",
  ],
  openGraph: {
    title: "Articles & Insights | Reza Esfahanian",
    description:
      "Insights on AI, entrepreneurship, and building bootstrapped companies.",
    url: "https://rezaesfahanian.com/articles",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Reza Esfahanian - Articles",
      },
    ],
  },
}

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


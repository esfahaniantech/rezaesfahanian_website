import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Technical expertise in AI/ML Engineering, Data Engineering, MLOps, and Product Development. End-to-end capabilities from research to production ML systems.",
  keywords: [
    "AI Engineering",
    "Machine Learning",
    "Data Engineering",
    "MLOps",
    "Python",
    "TensorFlow",
    "PyTorch",
    "Cloud Architecture",
    "AWS",
    "GCP",
  ],
  openGraph: {
    title: "Technical Expertise | Reza Esfahanian",
    description:
      "Technical expertise in AI/ML Engineering, Data Engineering, MLOps, and Product Development.",
    url: "https://rezaesfahanian.com/expertise",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Reza Esfahanian - Technical Expertise",
      },
    ],
  },
}

export default function ExpertiseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "Portfolio of AI-powered ventures including Industrial AI, FinTech, HealthTech, and Enterprise Software companies. 5 active ventures and 2 successful exits.",
  openGraph: {
    title: "Ventures | Reza Esfahanian",
    description:
      "Portfolio of AI-powered ventures including Industrial AI, FinTech, HealthTech, and Enterprise Software companies.",
    url: "https://rezaesfahanian.com/ventures",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Reza Esfahanian - Ventures",
      },
    ],
  },
}

export default function VenturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


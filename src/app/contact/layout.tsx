import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Reza Esfahanian for partnerships, collaborations, speaking engagements, or consulting inquiries. Based in Hamburg, Germany.",
  openGraph: {
    title: "Contact | Reza Esfahanian",
    description:
      "Get in touch with Reza Esfahanian for partnerships, collaborations, speaking engagements, or consulting inquiries.",
    url: "https://rezaesfahanian.com/contact",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Reza Esfahanian",
      },
    ],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


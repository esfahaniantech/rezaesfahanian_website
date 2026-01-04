import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for rezaesfahanian.com explaining how we collect, use, and protect your personal data in compliance with GDPR.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


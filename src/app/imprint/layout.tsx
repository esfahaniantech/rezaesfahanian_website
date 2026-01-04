import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Legal disclosure (Impressum) for rezaesfahanian.com in accordance with § 5 TMG (German Telemedia Act). Operated by Welf GmbH, Hamburg, Germany.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function ImprintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


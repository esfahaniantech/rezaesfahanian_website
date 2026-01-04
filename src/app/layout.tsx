import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { CookieConsent } from "@/components/CookieConsent"
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager"
import { PersonJsonLd, WebsiteJsonLd } from "@/components/JsonLd"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://rezaesfahanian.com"),
  title: {
    default: "Reza Esfahanian | AI Engineer & Serial Entrepreneur",
    template: "%s | Reza Esfahanian",
  },
  description:
    "Building AI that transforms industries. AI Engineer specializing in Industrial AI, HealthTech, and FinTech.",
  keywords: [
    "AI Engineer",
    "Serial Entrepreneur",
    "Machine Learning",
    "Industrial AI",
    "HealthTech",
    "FinTech",
    "Startup Founder",
    "Hamburg",
  ],
  authors: [{ name: "Reza Esfahanian" }],
  creator: "Reza Esfahanian",
  icons: {
    icon: [
      { url: "/favicon.svg?v=3", type: "image/svg+xml" },
      { url: "/favicon.ico?v=3", sizes: "32x32" },
      { url: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png?v=3", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png?v=3", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico?v=3"],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Reza Esfahanian",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "msapplication-TileColor": "#F97316",
    "theme-color": "#F97316",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rezaesfahanian.com",
    siteName: "Reza Esfahanian",
    title: "Reza Esfahanian | AI Engineer & Serial Entrepreneur",
    description:
      "Building AI that transforms industries. AI Engineer specializing in Industrial AI, HealthTech, and FinTech.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Reza Esfahanian",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reza Esfahanian | AI Engineer & Serial Entrepreneur",
    description:
      "Building AI that transforms industries. AI Engineer specializing in Industrial AI, HealthTech, and FinTech.",
    images: ["/images/og-image.jpg"],
    creator: "@rezaesfahanian",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <GoogleTagManager />
        <GoogleTagManagerNoScript />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}

export function PersonJsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Reza Esfahanian",
    url: "https://rezaesfahanian.com",
    image: "https://rezaesfahanian.com/images/portrait.jpg",
    jobTitle: "AI Engineer & Serial Entrepreneur",
    description:
      "AI Engineer specializing in Industrial AI, HealthTech, and FinTech. Founded 7 companies with 2 successful exits.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hamburg",
      addressCountry: "Germany",
    },
    sameAs: [
      "https://linkedin.com/in/reza-esfahanian",
      "https://x.com/rezaesfahanian",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Industrial AI",
      "FinTech",
      "HealthTech",
      "Entrepreneurship",
      "Startup Building",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}

export function OrganizationJsonLd() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Welf GmbH",
    url: "https://rezaesfahanian.com",
    logo: "https://rezaesfahanian.com/logo.png",
    description:
      "Enterprise software development studio delivering AI-powered solutions across industries.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hamburg",
      addressCountry: "Germany",
    },
    founder: {
      "@type": "Person",
      name: "Reza Esfahanian",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
    />
  )
}

export function WebsiteJsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Reza Esfahanian",
    url: "https://rezaesfahanian.com",
    description:
      "Personal website of Reza Esfahanian - AI Engineer & Serial Entrepreneur",
    publisher: {
      "@type": "Person",
      name: "Reza Esfahanian",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  )
}

interface ArticleJsonLdProps {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  author: string
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  author,
}: ArticleJsonLdProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    image: image.startsWith("http")
      ? image
      : `https://rezaesfahanian.com${image}`,
    datePublished: datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: author,
      url: "https://rezaesfahanian.com/about",
    },
    publisher: {
      "@type": "Person",
      name: "Reza Esfahanian",
      url: "https://rezaesfahanian.com",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  )
}


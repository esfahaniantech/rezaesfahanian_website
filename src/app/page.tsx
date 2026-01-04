import { Hero } from "@/components/home/Hero"
import { FeaturedBlog } from "@/components/home/FeaturedBlog"
import { FeaturedVentures } from "@/components/home/FeaturedVentures"
import { AboutPreview } from "@/components/home/AboutPreview"
import { ExpertisePreview } from "@/components/home/ExpertisePreview"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedBlog />
      <FeaturedVentures />
      <AboutPreview />
      <ExpertisePreview />
    </main>
  )
}

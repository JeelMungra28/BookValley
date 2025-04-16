"use client"

import { useEffect } from "react"
import { HeroSection } from "../components/home/HeroSection"
// import { FeaturedBooks } from "../components/home/featured-books"
// import { CategorySection } from "../components/home/CategorySection"
// import { NewArrivals } from "../components/home/NewArrivals"
import { CommunitySection } from "../components/home/CommunitySection"
import { ScrollToTop } from "../components/layout/ScrollToTop"
import { featuredBooks, newArrivals, categories } from "../components/data/mockBooks"

export default function HomePage() {
  // Set isVisible when component mounts (used for initial animations)
  useEffect(() => {
    // Any global page setup can go here
  }, [])

  const handleSearch = (searchQuery: string) => {
    // In a real app, this would redirect to search results
    window.location.href = `/books?search=${encodeURIComponent(searchQuery)}`
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <HeroSection onSearch={handleSearch} />
      {/* <FeaturedBooks books={featuredBooks} /> */}
      {/* <CategorySection categories={categories} /> */}
      {/* <NewArrivals books={newArrivals} /> */}
      <CommunitySection />
      <ScrollToTop />
    </div>
  )
}
"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination"
import { Slider } from "@components/ui/slider"
import { Checkbox } from "@components/ui/checkbox"
import { Label } from "@components/ui/label"
import { Search, SlidersHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Sample books data
const booksData = Array(20)
  .fill(null)
  .map((_, index) => ({
    id: `book-${index + 1}`,
    title: `Book Title ${index + 1}`,
    author: `Author ${index + 1}`,
    coverImage: `/placeholder.svg?height=400&width=300`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    price: (Math.random() * 10 + 2).toFixed(2),
    available: Math.random() > 0.2,
    genre: ["Fiction", "Non-Fiction", "Science", "History", "Biography", "Fantasy"][Math.floor(Math.random() * 6)],
  }))

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 15])
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [availableOnly, setAvailableOnly] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)

  // Filter books based on search query, price range, genre, and availability
  const filteredBooks = booksData.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice =
      Number.parseFloat(book.price) >= priceRange[0] && Number.parseFloat(book.price) <= priceRange[1]
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true
    const matchesAvailability = availableOnly ? book.available : true

    return matchesSearch && matchesPrice && matchesGenre && matchesAvailability
  })

  // Sort books based on selected sort option
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number.parseFloat(a.price) - Number.parseFloat(b.price)
      case "price-high":
        return Number.parseFloat(b.price) - Number.parseFloat(a.price)
      case "rating":
        return Number.parseFloat(b.rating) - Number.parseFloat(a.rating)
      default:
        return 0
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Mobile filter toggle */}
        <div className="w-full md:hidden mb-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={18} />
              Filters
            </span>
            <span>{showFilters ? "Hide" : "Show"}</span>
          </Button>
        </div>

        {/* Filters sidebar */}
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 768) && (
            <motion.aside
              className="w-full md:w-1/4 md:sticky md:top-24 space-y-6 bg-white dark:bg-slate-950 p-4 rounded-lg border"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider defaultValue={[0, 15]} max={15} step={0.5} value={priceRange} onValueChange={setPriceRange} />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Genre</h3>
                <Select onValueChange={(value) => setSelectedGenre(value === "all" ? null : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Biography">Biography</SelectItem>
                    <SelectItem value="Fantasy">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Availability</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="available"
                    checked={availableOnly}
                    onCheckedChange={(checked) => setAvailableOnly(checked as boolean)}
                  />
                  <Label htmlFor="available">Show available books only</Label>
                </div>
              </div>

              <div className="pt-4 md:hidden">
                <Button className="w-full" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="w-full md:w-3/4 space-y-6">
          {/* Search and sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search by title or author..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div>
            <p className="text-muted-foreground">
              Showing {sortedBooks.length} of {booksData.length} books
            </p>
          </div>

          {/* Books grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Empty state */}
          {sortedBooks.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setPriceRange([0, 15])
                  setSelectedGenre(null)
                  setAvailableOnly(false)
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" size={undefined} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="icon"> </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="icon">0</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="icon"></PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" size={undefined} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

// Book Card Component
function BookCard({ book }: { book: any }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <div className="overflow-hidden h-full flex flex-col border rounded-lg shadow-sm">
        <div className="relative pt-[140%] overflow-hidden">
          <img
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
          {book.available === false && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-background/80 text-foreground px-2 py-1 rounded-md text-sm">
                Currently Unavailable
              </span>
            </div>
          )}
        </div>
        <div className="p-4 flex-grow">
          <h3 className="font-semibold truncate">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(book.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs">{book.rating}</span>
          </div>
          <div className="mt-2 flex items-center">
            <svg
              className="w-3 h-3 mr-1 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-sm font-medium">${book.price}/week</span>
          </div>
        </div>
        <div className="p-4 pt-0 mt-auto">
          <div className="flex gap-2 w-full">
            <Button asChild className="flex-1">
              <Link to={`/books/${book.id}`}>View</Link>
            </Button>
            <Button variant="outline" size="icon" disabled={book.available === false}>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

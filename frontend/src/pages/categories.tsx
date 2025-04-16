"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Search } from "lucide-react"
import { motion } from "framer-motion"

// Sample categories data
const categoriesData = [
  {
    id: "fiction",
    name: "Fiction",
    description: "Imaginative stories not based in the real world",
    count: 245,
    image: "/placeholder.svg?height=400&width=600",
    subcategories: ["Fantasy", "Science Fiction", "Mystery", "Romance", "Thriller"],
  },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    description: "Literature based on facts and real events",
    count: 156,
    image: "/placeholder.svg?height=400&width=600",
    subcategories: ["Biography", "History", "Science", "Self-Help", "Travel"],
  },
  {
    id: "science",
    name: "Science",
    description: "Books about scientific discoveries and theories",
    count: 87,
    image: "/placeholder.svg?height=400&width=600",
    subcategories: ["Physics", "Biology", "Chemistry", "Astronomy", "Mathematics"],
  },
  {
    id: "history",
    name: "History",
    description: "Books about past events and civilizations",
    count: 112,
    image: "/placeholder.svg?height=400&width=600",
    subcategories: ["Ancient History", "Modern History", "Military History", "Cultural History", "Political History"],
  },
  {
    id: "biography",
    name: "Biography",
    description: "Books about the lives of notable individuals",
    count: 65,
    image: "/placeholder.svg?height=400&width=600",
    subcategories: ["Autobiography", "Memoir", "Historical Biography", "Literary Biography", "Political Biography"],
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Books featuring magical and supernatural elements",
    count: 93,
    image: "/placeholder.svg?height=400&width=600",
    subcategories: ["Epic Fantasy", "Urban Fantasy", "Dark Fantasy", "Fairy Tales", "Magical Realism"],
  },
  {
    id: "business",
    name: "Business",
    description: "Books about entrepreneurship and management",
    count: 78,
    image: "/placeholder.svg?height=400&width=600",
    subcategories: ["Entrepreneurship", "Management", "Marketing", "Finance", "Leadership"],
  },
  {
    id: "philosophy",
    name: "Philosophy",
    description: "Books exploring fundamental questions about existence",
    count: 54,
    image: "/placeholder.svg?height=400&width=600",
    subcategories: ["Ethics", "Metaphysics", "Logic", "Political Philosophy", "Existentialism"],
  },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter categories based on search query
  const filteredCategories = categoriesData.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.subcategories.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our extensive collection of books organized by categories to find your next great read.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredCategories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <Link to={`/books?category=${category.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-background/80 backdrop-blur-sm">{category.count} books</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">{category.name}</h2>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 3).map((sub) => (
                      <Badge key={sub} variant="outline">
                        {sub}
                      </Badge>
                    ))}
                    {category.subcategories.length > 3 && (
                      <Badge variant="outline">+{category.subcategories.length - 3} more</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No categories found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
          <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Heart, Share, Star, ShoppingCart, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "../../hooks/use-toast"
import { BookCard } from "./book-card"

// Sample book data
import { book } from "@data/book"

export default function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)
  const [liked, setLiked] = useState(false)

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    })
  }

  const handleRentNow = () => {
    if (!date || !returnDate) {
      toast({
        title: "Please select dates",
        description: "You need to select both pickup and return dates.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Rental initiated",
      description: `Your rental for ${book.title} has been initiated. Proceed to checkout.`,
    })

    // Navigate to checkout page
    navigate("/checkout")
  }

  const handleAddToWishlist = () => {
    setLiked(!liked)
    toast({
      title: liked ? "Removed from wishlist" : "Added to wishlist",
      description: `${book.title} has been ${liked ? "removed from" : "added to"} your wishlist.`,
    })
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share link copied",
      description: "The link to this book has been copied to your clipboard.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book cover */}
        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
            <img src={book.coverImage || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <Button variant="outline" size="icon" onClick={handleAddToWishlist} className={liked ? "text-red-500" : ""}>
              <Heart className={liked ? "fill-red-500" : ""} />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </motion.div>

        {/* Book details */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge>{book.genre}</Badge>
            {book.available ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                Available
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300">
                Unavailable
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">by {book.author}</p>

          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="ml-2 font-medium">{book.rating}</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-muted-foreground">{book.reviewCount} reviews</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="font-medium">{book.publishedDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pages</p>
              <p className="font-medium">{book.pages}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Language</p>
              <p className="font-medium">{book.language}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ISBN</p>
              <p className="font-medium">{book.isbn}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <h2 className="text-2xl font-bold">${book.price}</h2>
              <span className="ml-2 text-muted-foreground">per week</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="mb-2 font-medium">Pickup Date</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <p className="mb-2 font-medium">Return Date</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      disabled={(date) => !date || date < new Date() || (date && date <= (date || new Date()))}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" onClick={handleRentNow} disabled={!book.available}>
                <Clock className="mr-2 h-4 w-4" />
                Rent Now
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleAddToCart} disabled={!book.available}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="related">Related Books</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            {book.description.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {book.reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-start">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.user}
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{review.user}</h4>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3">{review.comment}</p>
              </div>
            ))}

            <div className="text-center">
              <Button variant="outline">Load More Reviews</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="related" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {book.relatedBooks.map((relatedBook) => (
              <BookCard key={relatedBook.id} book={relatedBook} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

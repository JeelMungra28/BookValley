"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { BookOpen, Clock, BookMarked, History, Star, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@contexts/AuthContext"


// Sample user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder-user.jpg",
  memberSince: "Jan 2023",
  currentlyReading: [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage: "/placeholder.svg?height=400&width=300",
      progress: 65,
      dueDate: "May 15, 2023",
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImage: "/placeholder.svg?height=400&width=300",
      progress: 32,
      dueDate: "May 22, 2023",
    },
  ],
  rentalHistory: [
    {
      id: "3",
      title: "1984",
      author: "George Orwell",
      coverImage: "/placeholder.svg?height=400&width=300",
      rentedDate: "Mar 10, 2023",
      returnedDate: "Apr 5, 2023",
    },
    {
      id: "4",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      coverImage: "/placeholder.svg?height=400&width=300",
      rentedDate: "Feb 15, 2023",
      returnedDate: "Mar 8, 2023",
    },
    {
      id: "5",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      coverImage: "/placeholder.svg?height=400&width=300",
      rentedDate: "Jan 20, 2023",
      returnedDate: "Feb 10, 2023",
    },
  ],
  wishlist: [
    {
      id: "6",
      title: "Dune",
      author: "Frank Herbert",
      coverImage: "/placeholder.svg?height=400&width=300",
      available: true,
    },
    {
      id: "7",
      title: "The Alchemist",
      author: "Paulo Coelho",
      coverImage: "/placeholder.svg?height=400&width=300",
      available: false,
    },
  ],
  recommendations: [
    {
      id: "8",
      title: "Brave New World",
      author: "Aldous Huxley",
      coverImage: "/placeholder.svg?height=400&width=300",
      matchPercentage: 95,
    },
    {
      id: "9",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      coverImage: "/placeholder.svg?height=400&width=300",
      matchPercentage: 87,
    },
    {
      id: "10",
      title: "Lord of the Flies",
      author: "William Golding",
      coverImage: "/placeholder.svg?height=400&width=300",
      matchPercentage: 82,
    },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user, logout } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* User profile sidebar */}
        <motion.aside
          className="w-full md:w-1/4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 relative w-24 h-24">
                <img
                  src={userData.avatar || "/placeholder.svg"}
                  alt={user?.name || 'User'}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <CardTitle>{user?.name || 'User'}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
              <div className="text-sm text-muted-foreground mt-1">Member since {userData.memberSince}</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Currently Reading</span>
                  </div>
                  <Badge variant="outline">{userData.currentlyReading.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <History className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Rental History</span>
                  </div>
                  <Badge variant="outline">{userData.rentalHistory.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookMarked className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Wishlist</span>
                  </div>
                  <Badge variant="outline">{userData.wishlist.length}</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        </motion.aside>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="recommendations">For You</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-2xl font-bold mb-4">Currently Reading</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userData.currentlyReading.map((book) => (
                    <Card key={book.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="relative h-32 w-24 flex-shrink-0">
                            <img
                              src={book.coverImage || "/placeholder.svg"}
                              alt={book.title}
                              className="object-cover rounded-md w-full h-full"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <h3 className="font-semibold">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{book.progress}%</span>
                              </div>
                              <Progress value={book.progress} className="h-2" />
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              Due: {book.dueDate}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {userData.recommendations.slice(0, 3).map((book) => (
                    <Card key={book.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="relative h-40 w-32 mb-4">
                            <img
                              src={book.coverImage || "/placeholder.svg"}
                              alt={book.title}
                              className="object-cover rounded-md w-full h-full"
                            />
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                              {book.matchPercentage}%
                            </div>
                          </div>
                          <h3 className="font-semibold">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm ml-1">Match based on your reading history</span>
                          </div>
                          <Button variant="outline" className="mt-4 w-full">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <Button variant="outline" onClick={() => setActiveTab("recommendations")}>
                    View All Recommendations
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="reading" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Currently Reading</h2>
              {userData.currentlyReading.length > 0 ? (
                <div className="space-y-6">
                  {userData.currentlyReading.map((book) => (
                    <Card key={book.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="relative h-48 md:h-64 w-36 md:w-48 mx-auto md:mx-0">
                            <img
                              src={book.coverImage || "/placeholder.svg"}
                              alt={book.title}
                              className="object-cover rounded-md w-full h-full"
                            />
                          </div>
                          <div className="flex-1 space-y-4">
                            <div>
                              <h3 className="text-xl font-bold">{book.title}</h3>
                              <p className="text-muted-foreground">{book.author}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Reading Progress</span>
                                <span>{book.progress}%</span>
                              </div>
                              <Progress value={book.progress} className="h-3" />
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-2 h-4 w-4" />
                              Due: {book.dueDate}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                              <Button className="sm:flex-1">Update Progress</Button>
                              <Button variant="outline" className="sm:flex-1">
                                Extend Rental
                              </Button>
                              <Button variant="secondary" className="sm:flex-1">
                                Return Book
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="py-12">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No books currently being read</h3>
                      <p className="text-muted-foreground mb-6">You don't have any books checked out at the moment.</p>
                      <Button asChild>
                        <Link to="/books">Browse Books</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Rental History</h2>
              {userData.rentalHistory.length > 0 ? (
                <div className="space-y-4">
                  {userData.rentalHistory.map((book) => (
                    <Card key={book.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="relative h-24 w-16 flex-shrink-0">
                            <img
                              src={book.coverImage || "/placeholder.svg"}
                              alt={book.title}
                              className="object-cover rounded-md w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2 text-sm">
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                <span>Rented: {book.rentedDate}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                <span>Returned: {book.returnedDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm">
                              Rent Again
                            </Button>
                            <Button variant="ghost" size="sm">
                              Leave Review
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="py-12">
                      <History className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No rental history</h3>
                      <p className="text-muted-foreground mb-6">You haven't rented any books yet.</p>
                      <Button asChild>
                        <Link to="/books">Browse Books</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
              <p className="text-muted-foreground mb-6">
                Based on your reading history and preferences, we think you'll enjoy these books.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.recommendations.map((book) => (
                  <Card key={book.id} className="overflow-hidden">
                    <div className="relative pt-[60%]">
                      <img
                        src={book.coverImage || "/placeholder.svg"}
                        alt={book.title}
                        className="absolute inset-0 object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center">
                        {book.matchPercentage}%
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold truncate">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span>Recommended match</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

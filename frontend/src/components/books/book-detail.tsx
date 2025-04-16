import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Book, SYSTEM_INFO } from "../../types/Book";
import {
  BookOpen,
  Heart,
  ShoppingCart,
  Share2,
  ChevronRight,
  Star,
  StarHalf,
  User,
  Calendar,
  Clock,
  ArrowLeft,
  Info,
  Check,
  Bookmark,
  Copy,
  X
} from "lucide-react";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Separator } from "@components/ui/separator";
import { toast } from "@hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";


// Sample book data based on the provided sample
import sampleBooks from "@data/sampleBooks";
// const sampleBooks: Book[] = [{
//   _id: "67c707cbccbeb09f00195815",
//   title: "The Alchemist",
//   author: "Paulo Coelho",
//   category: "Fiction",
//   description: "Paulo Coelho's enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and inspiring wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried near the Pyramids. Along the way he meets a Gypsy woman, a man who calls himself king, and an alchemist, all of whom point Santiago in the direction of his quest. No one knows what the treasure is, or if Santiago will be able to surmount the obstacles in his path. But what starts out as a journey to find worldly goods turns into a discovery of the treasure found within. Lush, evocative, and deeply humane, the story of Santiago is an eternal testament to the transforming power of our dreams and the importance of listening to our hearts.",
//   price: 300,
//   coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
//   createdAt: "2025-03-04T14:01:47.762Z"
// },
// {
//   _id: "67c707cbccbeb09f00195817",
//   title: "The Great Gatsby",
//   author: "F. Scott Fitzgerald",
//   category: "Fiction",
//   description: "The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
//   price: 275,
//   coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
//   createdAt: "2025-03-04T14:01:47.762Z"
// },
// {
//   _id: "67c707cbccbeb09f00195818",
//   title: "Sapiens",
//   author: "Yuval Noah Harari",
//   category: "Non-Fiction",
//   description: "A brief history of humankind, exploring the ways in which biology and history have defined us.",
//   price: 450,
//   coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646",
//   createdAt: "2025-04-14T14:01:47.762Z"  // More recent date
// },
// {
//   _id: "67c707cbccbeb09f00195819",
//   title: "Atomic Habits",
//   author: "James Clear",
//   category: "Self-Help",
//   description: "An easy and proven way to build good habits and break bad ones.",
//   price: 400,
//   coverImage: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18",
//   createdAt: "2025-04-15T10:30:00.000Z"  // Even more recent
// },
// {
//   _id: "67c707cbccbeb09f00195820",
//   title: "The Silent Patient",
//   author: "Alex Michaelides",
//   category: "Thriller",
//   description: "A shocking psychological thriller of a woman's act of violence against her husband.",
//   price: 325,
//   coverImage: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd",
//   createdAt: "2025-04-16T08:15:23.000Z"  // Very recent (today)
// },
// ];

// Extended book data with additional fields for the detail view
interface ExtendedBookDetails {
  publisher: string;
  publishedDate: string;
  language: string;
  paperback: number;
  isbn10: string;
  isbn13: string;
  dimensions: string;
  rating: number;
  ratingCount: number;
  reviews: {
    user: string;
    avatar?: string;
    rating: number;
    comment: string;
    date: string;
    likes: number;
  }[];
  relatedBooks: Book[];
}

// Sample extended data
const extendedDetails: ExtendedBookDetails = {
  publisher: "HarperOne",
  publishedDate: "2014-04-15",
  language: "English",
  paperback: 208,
  isbn10: "0062315005",
  isbn13: "978-0062315007",
  dimensions: "5.31 x 0.53 x 8 inches",
  rating: 4.5,
  ratingCount: 72843,
  reviews: [
    {
      user: "Sarah Johnson",
      rating: 5,
      comment: "This book changed my perspective on following my dreams and listening to my heart. The simple yet profound wisdom woven throughout the narrative is incredibly inspiring.",
      date: "2025-03-15",
      likes: 24
    },
    {
      user: "Michael Lee",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 4,
      comment: "A beautiful metaphorical journey that encourages self-discovery. While sometimes overly simplified, the core message resonates deeply and stays with you long after finishing.",
      date: "2025-02-28",
      likes: 16
    },
    {
      user: "JeelMungra28",
      rating: 5,
      comment: "One of the most impactful books I've ever read. The journey of Santiago is a perfect metaphor for our own personal legends. Highly recommended!",
      date: "2025-04-10",
      likes: 31
    }
  ],
  relatedBooks: [
    {
      _id: "67c707cbccbeb09f00195816",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Fiction",
      description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
      price: 350,
      coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
      createdAt: "2025-03-04T14:01:47.762Z",
      available: true
    },
    {
      _id: "67c707cbccbeb09f00195817",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      description: "The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
      price: 275,
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
      createdAt: "2025-03-04T14:01:47.762Z",
      available: true
    }
  ]
};

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [details, setDetails] = useState<ExtendedBookDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  // Simulate loading book data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from API using the ID
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

        // For the demo, just use the first book from sample data
        setBook(sampleBooks.find(book => book._id === id) || null);
        setDetails(extendedDetails);
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast({
          title: "Error",
          description: "Could not load book details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Time since publication
  const getTimeSincePublication = () => {
    if (!details) return "";

    const published = new Date(details.publishedDate);
    const now = new Date(SYSTEM_INFO.currentDate);
    const diffYears = now.getFullYear() - published.getFullYear();

    if (diffYears === 0) return "Published this year";
    if (diffYears === 1) return "Published 1 year ago";
    return `Published ${diffYears} years ago`;
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!book) return;

    toast({
      title: "Added to cart",
      description: `${book.title} (Qty: ${quantity}) has been added to your cart.`,
    });
  };

  // Handle toggling wishlist
  const handleToggleWishlist = () => {
    if (!book) return;

    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${book.title} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };

  // Handle sharing
  const handleShare = () => {
    if (!book) return;

    // In a real app, you would use the Web Share API or copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Book link has been copied to clipboard.",
    });
  };

  // Generate star rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}

        {hasHalfStar && (
          <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading book details...</p>
        </div>
      </div>
    );
  }

  // If book not found
  if (!book || !details) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Info className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Book Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, we couldn't find the book you're looking for.</p>
        <Button onClick={() => navigate('/books')}>Browse Books</Button>
      </div>
    );
  }

  return (
    <>
      {/* Zoomed image modal */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-3xl max-h-[90vh]"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="max-h-[90vh] object-contain rounded-lg shadow-xl"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 rounded-full h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageZoomed(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center text-sm mb-6"
        >
          <Button variant="ghost" size="sm" className="p-0" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link to="/books" className="hover:underline text-muted-foreground">Books</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link
            to={`/books?category=${encodeURIComponent(book.category)}`}
            className="hover:underline text-muted-foreground"
          >
            {book.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{book.title}</span>
        </motion.div>

        {/* Current user and time info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center p-3 bg-muted/30 rounded-lg mb-6 text-sm"
        >
          <User className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">
            Browsing as <span className="font-medium text-foreground">{SYSTEM_INFO.currentUser}</span> •
          </span>
          <Clock className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="text-muted-foreground">{formatDate(SYSTEM_INFO.currentDate)}</span>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Book cover */}
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-24">
              <div
                className="relative aspect-[2/3] bg-muted rounded-xl overflow-hidden shadow-lg cursor-zoom-in"
                onClick={() => setIsImageZoomed(true)}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary text-white">
                  {book.category}
                </Badge>
              </div>

              <div className="hidden lg:flex flex-col gap-4 mt-6">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>

                <div className="flex flex-col gap-2 bg-muted/40 p-4 rounded-lg">
                  <h3 className="font-medium text-sm">Book Details</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <span className="text-muted-foreground">Publisher:</span>
                    <span>{details.publisher}</span>

                    <span className="text-muted-foreground">Language:</span>
                    <span>{details.language}</span>

                    <span className="text-muted-foreground">Pages:</span>
                    <span>{details.paperback}</span>

                    <span className="text-muted-foreground">ISBN-13:</span>
                    <div className="flex items-center">
                      <span className="truncate">{details.isbn13}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 ml-1"
                              onClick={() => {
                                navigator.clipboard.writeText(details.isbn13);
                                toast({
                                  title: "ISBN copied",
                                  description: "ISBN has been copied to clipboard.",
                                });
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy ISBN</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Book details */}
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-muted-foreground mb-4">by <span className="text-foreground">{book.author}</span></p>
              </div>

              <div className="hidden md:block flex-shrink-0">
                <Button
                  variant={isWishlisted ? "default" : "outline"}
                  size="icon"
                  className={`h-10 w-10 rounded-full ${isWishlisted ? 'bg-red-500 hover:bg-red-600 border-red-500' : ''}`}
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'text-white fill-white' : ''}`} />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {renderRating(details.rating)}
                <span className="text-yellow-600 font-medium ml-1">{details.rating}</span>
              </div>
              <span className="text-muted-foreground">({details.ratingCount.toLocaleString()} ratings)</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{getTimeSincePublication()}</span>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <div className="text-2xl font-bold">₹{book.price}</div>
              {/* // Add this to your book card component's JSX: */}
              {book.available ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Out of Stock
                </Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center font-medium">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 rounded-l-none"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3 w-full">
                <Button
                  className="flex-1 h-12 gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </Button>

                <div className="block md:hidden">
                  <Button
                    variant={isWishlisted ? "default" : "outline"}
                    size="icon"
                    className={`h-12 w-12 ${isWishlisted ? 'bg-red-500 hover:bg-red-600 border-red-500' : ''}`}
                    onClick={handleToggleWishlist}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'text-white fill-white' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="pt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-4">About this book</h2>
                  <p className="text-base leading-relaxed whitespace-pre-line">
                    {book.description}
                  </p>

                  <div className="mt-8 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>International bestseller with over 2 million copies sold worldwide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Translated into more than 80 languages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>A modern classic that continues to inspire readers of all ages</span>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="details" className="pt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Book Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Publication Details</h3>
                      <dl className="grid grid-cols-3 gap-2 text-sm">
                        <dt className="col-span-1 text-muted-foreground">Publisher</dt>
                        <dd className="col-span-2">{details.publisher}</dd>

                        <dt className="col-span-1 text-muted-foreground">Publication Date</dt>
                        <dd className="col-span-2">{formatDate(details.publishedDate)}</dd>

                        <dt className="col-span-1 text-muted-foreground">Language</dt>
                        <dd className="col-span-2">{details.language}</dd>
                      </dl>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Physical Details</h3>
                      <dl className="grid grid-cols-3 gap-2 text-sm">
                        <dt className="col-span-1 text-muted-foreground">Pages</dt>
                        <dd className="col-span-2">{details.paperback}</dd>

                        <dt className="col-span-1 text-muted-foreground">Dimensions</dt>
                        <dd className="col-span-2">{details.dimensions}</dd>
                      </dl>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">ISBN Numbers</h3>
                      <dl className="grid grid-cols-3 gap-2 text-sm">
                        <dt className="col-span-1 text-muted-foreground">ISBN-10</dt>
                        <dd className="col-span-2 flex items-center">
                          <span>{details.isbn10}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-1"
                            onClick={() => {
                              navigator.clipboard.writeText(details.isbn10);
                              toast({
                                title: "Copied",
                                description: "ISBN-10 copied to clipboard",
                              });
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </dd>

                        <dt className="col-span-1 text-muted-foreground">ISBN-13</dt>
                        <dd className="col-span-2 flex items-center">
                          <span>{details.isbn13}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-1"
                            onClick={() => {
                              navigator.clipboard.writeText(details.isbn13);
                              toast({
                                title: "Copied",
                                description: "ISBN-13 copied to clipboard",
                              });
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </dd>
                      </dl>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Current Status</h3>
                      <dl className="grid grid-cols-3 gap-2 text-sm">
                        <dt className="col-span-1 text-muted-foreground">Availability</dt>
                        <dd className="col-span-2 flex items-center">
                          <span className="inline-flex items-center text-green-600 mr-1">
                            <Check className="h-4 w-4 mr-1" />
                            In Stock
                          </span>
                          <span className="text-muted-foreground">(15+ copies)</span>
                        </dd>

                        <dt className="col-span-1 text-muted-foreground">Delivery</dt>
                        <dd className="col-span-2">Ships within 1-2 business days</dd>
                      </dl>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="reviews" className="pt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Overall rating */}
                    <div className="md:w-1/3">
                      <div className="bg-muted/30 p-6 rounded-lg">
                        <div className="flex flex-col items-center justify-center">
                          <h3 className="text-xl font-semibold mb-2">Overall Rating</h3>
                          <div className="text-5xl font-bold text-yellow-600 mb-2">{details.rating}</div>
                          <div className="flex items-center mb-2">
                            {renderRating(details.rating)}
                          </div>
                          <div className="text-sm text-muted-foreground mb-4">
                            Based on {details.ratingCount.toLocaleString()} ratings
                          </div>
                          <div className="w-full">
                            <Button className="w-full">
                              Write a Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reviews list */}
                    <div className="md:w-2/3">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold">{details.reviews.length} Reviews</h3>
                        <Select>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Most Helpful" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="helpful">Most Helpful</SelectItem>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="highest">Highest Rated</SelectItem>
                            <SelectItem value="lowest">Lowest Rated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-6">
                        {details.reviews.map((review, index) => (
                          <div key={index} className="border-b pb-6 last:border-b-0">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-10 w-10 flex-shrink-0">
                                {review.avatar ? (
                                  <AvatarImage src={review.avatar} alt={review.user} />
                                ) : null}
                                <AvatarFallback>
                                  {getUserInitials(review.user)}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-medium">
                                      {review.user}
                                      {review.user === SYSTEM_INFO.currentUser && (
                                        <Badge variant="outline" className="ml-2">You</Badge>
                                      )}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                      {renderRating(review.rating)}
                                      <span className="text-xs text-muted-foreground">
                                        {formatDate(review.date)}
                                      </span>
                                    </div>
                                  </div>

                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground text-xs flex items-center h-7"
                                  >
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    Helpful ({review.likes})
                                  </Button>
                                </div>

                                <p className="mt-2 text-sm">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 text-center">
                        <Button variant="outline">
                          Load More Reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>

            {/* Reading lists */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Add to Reading List</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Button variant="outline" className="flex items-center gap-2 justify-start">
                  <Bookmark className="h-4 w-4" />
                  <span>Want to Read</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 justify-start">
                  <BookOpen className="h-4 w-4" />
                  <span>Currently Reading</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 justify-start">
                  <Check className="h-4 w-4" />
                  <span>Read</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile book details section */}
        <motion.div
          className="lg:hidden mt-8 bg-muted/30 p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-medium text-sm mb-3">Book Details</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <span className="text-muted-foreground">Publisher:</span>
            <span>{details.publisher}</span>

            <span className="text-muted-foreground">Language:</span>
            <span>{details.language}</span>

            <span className="text-muted-foreground">Pages:</span>
            <span>{details.paperback}</span>

            <span className="text-muted-foreground">ISBN-13:</span>
            <div className="flex items-center">
              <span className="truncate">{details.isbn13}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-1"
                onClick={() => {
                  navigator.clipboard.writeText(details.isbn13);
                  toast({
                    title: "ISBN copied",
                    description: "ISBN has been copied to clipboard.",
                  });
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-3 flex items-center justify-center gap-2"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </motion.div>

        {/* Related books */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {details.relatedBooks.map((relatedBook) => (
              <motion.div
                key={relatedBook._id}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.15)" }}
                className="bg-card rounded-lg border overflow-hidden"
              >
                <Link to={`/books/${relatedBook._id}`} className="block">
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <img
                      src={relatedBook.coverImage}
                      alt={relatedBook.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <Badge variant="outline" className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm">
                      {relatedBook.category}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium line-clamp-1">{relatedBook.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{relatedBook.author}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">₹{relatedBook.price}</span>
                      <Button size="sm" variant="ghost">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            <div className="bg-muted/30 rounded-lg border border-dashed flex flex-col items-center justify-center p-6 text-center">
              <Sparkles className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="font-medium">Discover More</h3>
              <p className="text-sm text-muted-foreground mb-4">Find more books like this in our collection</p>
              <Button variant="outline" asChild>
                <Link to="/books">Browse All Books</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* User activity */}
        <motion.div
          className="mt-16 p-4 border rounded-lg bg-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{getUserInitials(SYSTEM_INFO.currentUser)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{SYSTEM_INFO.currentUser}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Viewing on {formatDate(SYSTEM_INFO.currentDate)}</span>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-2 text-sm">
            <Badge variant="secondary" className="px-3 py-1 rounded-full">
              Recently viewed
            </Badge>
            <Badge variant="outline" className="px-3 py-1 rounded-full">
              Fiction
            </Badge>
            <Badge variant="outline" className="px-3 py-1 rounded-full">
              Best sellers
            </Badge>
            <Badge variant="outline" className="px-3 py-1 rounded-full text-muted-foreground">
              #BookValleyReads
            </Badge>
          </div>
        </motion.div>
      </div>
    </>
  );
}

// Icon components
function Minus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ThumbsUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

function Select({
  children,
  ...props
}: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className="appearance-none bg-transparent border rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        {...props}
      >
        {children}
      </select>
      <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 opacity-50 pointer-events-none" />
    </div>
  );
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SelectItem({ value, children }: { value: string, children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}

function SelectTrigger({ className, children }: { className?: string, children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

function SelectValue({ placeholder }: { placeholder: string }) {
  return <>{placeholder}</>;
}
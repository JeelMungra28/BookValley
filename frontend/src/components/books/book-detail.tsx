import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book, SYSTEM_INFO } from "../../types/Book";
import { motion } from "framer-motion";
import { BookOpen, Heart, ShoppingCart, Clock, Share2, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "../../hooks/use-toast";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch book details based on id
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from an API
        // For now, we'll use a mock book
        const mockBook: Book = {
          _id: id || "1",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          category: "Classic",
          description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
          price: 9.99,
          coverImage: "/placeholder.svg?height=400&width=300",
          createdAt: "2023-01-15T00:00:00.000Z",
          available: true
        };
        
        setBook(mockBook);
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast({
          title: "Error",
          description: "Failed to load book details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  // Time since publication
  const getTimeSincePublication = () => {
    if (!book) return "";

    const published = new Date(book.createdAt);
    const now = new Date(SYSTEM_INFO.currentDate);
    const diffYears = now.getFullYear() - published.getFullYear();

    if (diffYears === 0) return "Published this year";
    if (diffYears === 1) return "Published 1 year ago";
    return `Published ${diffYears} years ago`;
  };

  // Handle adding to cart
  const handleAddToCart = async () => {
    if (!book) return;

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your cart.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    try {
      await addToCart({
        id: book._id,
        title: book.title,
        price: book.price,
        quantity: quantity,
        image: book.coverImage,
      });
    toast({
      title: "Added to cart",
      description: `${book.title} (Qty: ${quantity}) has been added to your cart.`,
    });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Book not found</h1>
          <p className="text-muted-foreground mb-4">The book you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/books')}>Browse Books</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book cover */}
        <div className="md:col-span-1">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <img
                src={book.coverImage}
                alt={book.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e";
              }}
            />
            {book.available ? (
              <Badge className="absolute top-2 left-2 bg-green-500">In Stock</Badge>
            ) : (
              <Badge className="absolute top-2 left-2 bg-red-500">Out of Stock</Badge>
            )}
              </div>
            </div>

        {/* Book details */}
        <div className="md:col-span-2">
          <div className="mb-4">
            <Badge variant="outline" className="mb-2">{book.category}</Badge>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
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

                <Button
                  className="flex-1 h-12 gap-2"
                  onClick={handleAddToCart}
                disabled={!book.available}
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
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground mb-6">{book.description}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{getTimeSincePublication()}</span>
              </div>
            <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>Paperback</span>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}
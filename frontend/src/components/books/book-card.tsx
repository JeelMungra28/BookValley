import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Book, SYSTEM_INFO } from "../../types/Book";
import { motion } from "framer-motion";
import { BookOpen, Heart, ShoppingCart, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "../../hooks/use-toast";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

interface BookCardProps {
  book: Book;
  variant?: "default" | "compact" | "grid";
}

export function BookCard({ book, variant = "default" }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  // Format the book's creation date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString: string) => {
    const now = new Date(SYSTEM_INFO.currentDate);
    const past = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - past.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return formatDate(dateString);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
        quantity: 1,
        image: book.coverImage,
      });
      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlist(!isWishlist);
    toast({
      title: isWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: `${book.title} has been ${isWishlist ? "removed from" : "added to"} your wishlist.`,
    });
  };

  const isNewBook = () => {
    // Consider a book "new" if it's less than 30 days old
    const now = new Date(SYSTEM_INFO.currentDate);
    const published = new Date(book.createdAt);
    const diffTime = Math.abs(now.getTime() - published.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays < 30;
  };

  if (variant === "compact") {
    return (
      <Link to={`/books/${book._id}`}>
        <motion.div
          className="flex items-center gap-4 p-4 bg-card rounded-lg border hover:border-primary transition-all duration-300"
          whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="relative h-16 w-12 flex-shrink-0">
            <img
              src={book.coverImage}
              alt={book.title}
              className="h-full w-full object-cover rounded-md shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e";
              }}
            />
            {isNewBook() && (
              <div className="absolute top-0 left-0 bg-green-500 text-white text-[10px] font-semibold px-1 py-0.5 rounded-tl-md rounded-br-md">
                NEW
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium line-clamp-1">{book.title}</h3>
            <p className="text-xs text-muted-foreground">by {book.author}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-semibold">₹{book.price}</span>
              <Badge variant="outline" className="text-xs">{book.category}</Badge>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "grid") {
    return (
      <Link to={`/books/${book._id}`}>
        <motion.div
          className="group flex flex-col bg-card rounded-lg border overflow-hidden h-full"
          whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.15)" }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="relative pt-[120%] bg-muted">
            <img
              src={book.coverImage}
              alt={book.title}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e";
              }}
            />

            {isNewBook() && (
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                NEW
              </div>
            )}

            <motion.div
              className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-full shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered || isWishlist ? 1 : 0 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleWishlist}
            >
              <Heart
                className={`h-4 w-4 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
              />
            </motion.div>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <Badge variant="outline" className="w-fit mb-2 text-xs">{book.category}</Badge>
            <h3 className="font-medium line-clamp-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">by {book.author}</p>
            <div className="mt-2 text-sm line-clamp-2 text-muted-foreground">{book.description}</div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{getRelativeTime(book.createdAt)}</span>
            </div>
            <div className="mt-auto pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold">₹{book.price}</span>
              <Button size="sm" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span>Add</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link to={`/books/${book._id}`}>
      <motion.div
        className="group flex bg-card rounded-xl border overflow-hidden h-full"
        whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.15)" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative w-[120px] md:w-[160px] bg-muted">
          <img
            src={book.coverImage}
            alt={book.title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e";
            }}
          />

          {isNewBook() && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
              NEW
            </div>
          )}

          <motion.div
            className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-full shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isWishlist ? 1 : 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`h-4 w-4 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
            />
          </motion.div>

          <Badge variant="outline" className="absolute bottom-2 left-2 text-xs bg-background/80 backdrop-blur-sm">
            {book.category}
          </Badge>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div>
            <h3 className="font-medium line-clamp-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
          </div>

          <div className="mt-2 text-sm line-clamp-3 text-muted-foreground">{book.description}</div>

          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{getRelativeTime(book.createdAt)}</span>
          </div>

          <div className="mt-auto pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold">₹{book.price}</span>
            <Button size="sm" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              <span>Add</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
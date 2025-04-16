import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, SYSTEM_INFO } from "../types/Book";
import { BookCard } from "../components/books/book-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Search, ArrowRight, ChevronRight, UserCircle, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

import sampleBooks  from "@data/sampleBooks"; // Sample book data

// Sample subcategories for Fiction
const fictionSubcategories = [
  "All Fiction", "Literary Fiction", "Science Fiction", "Fantasy", "Mystery", "Thriller",
  "Horror", "Historical Fiction", "Romance", "Young Adult", "Children's"
];

// Sample category metadata
const categoryMetadata: Record<string, {
  title: string,
  description: string,
  heroImage: string,
  subcategories: string[],
  curator: string
}> = {
  "fiction": {
    title: "Fiction",
    description: "Explore imaginative worlds, compelling characters, and captivating stories that transport you beyond reality.",
    heroImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe",
    subcategories: fictionSubcategories,
    curator: "JeelMungra28"
  },
  "non-fiction": {
    title: "Non-Fiction",
    description: "Discover real-world knowledge, insights, and perspectives from experts across various fields.",
    heroImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    subcategories: ["All Non-Fiction", "Biography", "History", "Science", "Philosophy", "Self-Help", "Travel", "Business"],
    curator: "JeelMungra28"
  },
  "self-help": {
    title: "Self-Help",
    description: "Find guidance, inspiration, and practical advice to improve your life and achieve your goals.",
    heroImage: "https://images.unsplash.com/photo-1571425046056-77d8123c9b8e",
    subcategories: ["All Self-Help", "Personal Development", "Productivity", "Mindfulness", "Finance", "Relationships"],
    curator: "JeelMungra28"
  },
  "thriller": {
    title: "Thriller",
    description: "Experience heart-pounding suspense, unexpected twists, and edge-of-your-seat excitement.",
    heroImage: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd",
    subcategories: ["All Thrillers", "Psychological", "Crime", "Legal", "Spy", "Political", "Medical"],
    curator: "JeelMungra28"
  }
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All Fiction");
  const [sortBy, setSortBy] = useState("popular");

  const metadata = categoryMetadata[category?.toLowerCase() || ''] || {
    title: category || "Category",
    description: "Explore our collection of books in this category",
    heroImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    subcategories: ["All"],
    curator: SYSTEM_INFO.currentUser
  };

  // Load books for this category
  useEffect(() => {
    if (category) {
      // For demo purposes, we're filtering the sample books
      const categoryBooks = sampleBooks.filter(book =>
        book.category.toLowerCase() === category.toLowerCase()
      );

      // If we don't have any books in this category, show all books
      setBooks(categoryBooks.length ? categoryBooks : sampleBooks);
    } else {
      setBooks(sampleBooks);
    }
  }, [category]);

  // Filter books by search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1 }
    }
  };

  // Format the date in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Featured books for this category (top 3)
  const featuredBooks = books.slice(0, 3);

  // Get initials from username (for avatar)
  const getUserInitials = (username: string) => {
    const parts = username.replace(/[0-9]/g, '').split(/(?=[A-Z])/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 pb-12">
      {/* Category Hero */}
      <motion.div
        className="relative rounded-2xl overflow-hidden mb-12 mt-4"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="absolute inset-0">
          <img
            src={metadata.heroImage}
            alt={metadata.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 dark:from-black/90 dark:to-black/50" />
        </div>

        <div className="relative z-10 text-white py-24 px-6 md:px-12 max-w-3xl">
          <div className="flex items-center text-sm mb-4">
            <Link to="/books" className="hover:underline">Books</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>{metadata.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{metadata.title}</h1>
          <p className="text-lg text-white/80 mb-8">{metadata.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Explore All {metadata.title}
            </Button>
            <Button variant="secondary">
              Top Authors
            </Button>
          </div>

          {/* Category curator and last updated info */}
          <div className="flex items-center gap-3 mt-8">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {getUserInitials(metadata.curator)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-white/90">Curated by {metadata.curator}</p>
              <p className="text-xs text-white/70">Last updated: {formatDate(SYSTEM_INFO.currentDate)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Books */}
      <motion.section
        className="mb-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex justify-between items-center mb-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold">Featured in {metadata.title}</h2>
          <Link to="/books" className="flex items-center text-primary hover:underline">
            <span>View all</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {featuredBooks.map((book) => (
            <motion.div key={book._id} variants={itemVariants}>
              <BookCard book={book} variant="grid" />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Subcategories */}
      <motion.section
        className="mb-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          className="text-2xl font-bold mb-6"
          variants={itemVariants}
        >
          Browse {metadata.title} Subcategories
        </motion.h2>

        <motion.div variants={itemVariants}>
          <Tabs
            defaultValue={metadata.subcategories[0]}
            value={selectedSubcategory}
            onValueChange={setSelectedSubcategory}
            className="w-full"
          >
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-background to-transparent w-8 z-10" />
              <ScrollTabsList>
                {metadata.subcategories.map((subcategory) => (
                  <TabsTrigger
                    key={subcategory}
                    value={subcategory}
                    className="px-4 py-2 text-base"
                  >
                    {subcategory}
                  </TabsTrigger>
                ))}
              </ScrollTabsList>
              <div className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-background to-transparent w-8 z-10" />
            </div>
          </Tabs>
        </motion.div>
      </motion.section>

      {/* Current user activity info */}
      <motion.div
        className="mb-8 p-4 bg-muted/30 rounded-lg border border-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <UserCircle className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm">
              Welcome <span className="font-medium">{SYSTEM_INFO.currentUser}</span> -
              <span className="text-muted-foreground ml-1">
                Browsing {metadata.title} as of {formatDate(SYSTEM_INFO.currentDate)}
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Book listing */}
      <motion.section
        className="mb-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold">{selectedSubcategory}</h2>

          <div className="flex items-center w-full sm:w-auto max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder={`Search in ${metadata.title}...`}
                className="pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {filteredBooks.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {filteredBooks.map((book) => (
              <motion.div key={book._id} variants={itemVariants}>
                <BookCard book={book} variant="grid" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            variants={itemVariants}
          >
            <h3 className="text-lg font-medium mb-2">No books found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any books matching your search in this category.
            </p>
            <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
          </motion.div>
        )}
      </motion.section>

      {/* Related Categories */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          className="text-2xl font-bold mb-6"
          variants={itemVariants}
        >
          Related Categories
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {Object.keys(categoryMetadata).slice(0, 3).map((cat) => (
            cat.toLowerCase() !== category?.toLowerCase() && (
              <motion.div key={cat} variants={itemVariants}>
                <Link
                  to={`/categories/${cat}`}
                  className="block group relative h-48 rounded-xl overflow-hidden"
                >
                  <img
                    src={categoryMetadata[cat].heroImage}
                    alt={categoryMetadata[cat].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-between items-end w-full">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{categoryMetadata[cat].title}</h3>
                          <p className="text-sm text-white/80">{categoryMetadata[cat].subcategories.length} subcategories</p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-sm p-1 px-2 rounded-md text-white text-xs">
                          Curated by {SYSTEM_INFO.currentUser}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}

// Horizontally scrollable tabs component
function ScrollTabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-auto scrollbar-hide py-2">
      <TabsList className="h-auto p-1 w-max min-w-full flex gap-1">
        {children}
      </TabsList>
    </div>
  );
}
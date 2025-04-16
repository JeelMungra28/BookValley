import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BookCard } from "@components/books/book-card";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { Slider } from "@components/ui/slider";
import { Switch } from "@components/ui/switch";
import { Label } from "@components/ui/label";
import { Separator } from "@components/ui/separator";
import { Book, SYSTEM_INFO } from "../../types/Book";
import { Search, SlidersHorizontal, X, Grid2X2, List, UserCircle, CalendarDays } from "lucide-react";
import { ScrollArea } from "@components/ui/scroll-area";
import { Badge } from "@components/ui/badge";

import sampleBooks from "@data/sampleBooks"

const categories = [
  "All Categories", "Fiction", "Non-Fiction", "Self-Help", "Thriller",
  "Mystery", "Biography", "History", "Science", "Fantasy"
];

export default function BrowseBooksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(sampleBooks);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All Categories");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Apply filters
  useEffect(() => {
    let result = [...books];

    // Search filter
    if (searchTerm) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "All Categories") {
      result = result.filter(book => book.category === selectedCategory);
    }

    // Price filter
    result = result.filter(book =>
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    // In Stock filter - add this condition
    if (inStock) {
      result = result.filter(book => book.available);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredBooks(result);

    // Update search params
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory !== "All Categories") params.set("category", selectedCategory);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, priceRange, inStock, sortBy, books, setSearchParams]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setPriceRange([0, 1000]);
    setSortBy("relevance");
    setInStock(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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

  // Format the date in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Browse Books</h1>
            <p className="text-muted-foreground">Discover your next favorite read from our collection</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 px-4 rounded-lg">
            <UserCircle className="h-4 w-4" />
            <span>Welcome, {SYSTEM_INFO.currentUser}</span>
          </div>
        </div>

        {/* Date and time information */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <CalendarDays className="h-4 w-4" />
          <span>Last updated: {formatDate(SYSTEM_INFO.currentDate)}</span>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter sidebar - desktop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:block w-64 flex-shrink-0"
        >
          <div className="sticky top-24 bg-card border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                Clear All
              </Button>
            </div>

            {/* Category filter */}
            <div className="mb-6">
              <h3 className="font-medium text-sm mb-3">Category</h3>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        className="mr-2"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className={`text-sm cursor-pointer ${selectedCategory === category ? "font-medium" : ""}`}
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Separator className="my-6" />

            {/* Price filter */}
            <div className="mb-6">
              <h3 className="font-medium text-sm mb-4">Price Range</h3>
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                min={0}
                max={1000}
                step={10}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(values) => setPriceRange([values[0], values[1]])}
                className="my-6"
              />
              <div className="flex items-center justify-between">
                <div className="bg-muted px-2 py-1 rounded-md text-xs">₹{priceRange[0]}</div>
                <div className="bg-muted px-2 py-1 rounded-md text-xs">₹{priceRange[1]}</div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Additional filters */}
            <div className="mb-6">
              <h3 className="font-medium text-sm mb-3">Availability</h3>
              <div className="flex items-center space-x-2">
                <Switch
                  id="in-stock"
                  checked={inStock}
                  onCheckedChange={setInStock}
                />
                <Label htmlFor="in-stock" className="text-sm">In Stock Only</Label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1">
          {/* Search and controls */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between"
          >
            <div className="w-full sm:max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search books, authors..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="lg:hidden h-10 w-10"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Active filters */}
          {(searchTerm || selectedCategory !== "All Categories" || priceRange[0] > 0 || priceRange[1] < 1000) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 flex flex-wrap items-center gap-2"
            >
              <span className="text-sm text-muted-foreground">Active filters:</span>

              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1 pl-3">
                  Search: {searchTerm}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {selectedCategory !== "All Categories" && (
                <Badge variant="secondary" className="flex items-center gap-1 pl-3">
                  Category: {selectedCategory}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => setSelectedCategory("All Categories")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Badge variant="secondary" className="flex items-center gap-1 pl-3">
                  Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => setPriceRange([0, 1000])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={clearFilters}
              >
                Clear All
              </Button>
            </motion.div>
          )}

          {/* Results count */}
          <div className="mb-5 text-sm text-muted-foreground">
            Showing {filteredBooks.length} results
          </div>

          {/* Books grid */}
          {filteredBooks.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredBooks.map((book) => (
                <motion.div key={book._id} variants={itemVariants}>
                  <BookCard book={book} variant={viewMode === "grid" ? "grid" : "default"} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No books found</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                We couldn't find any books that match your search criteria. Try adjusting your filters or search term.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed left-0 top-0 h-full w-[85%] max-w-[350px] bg-background border-r shadow-lg p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User info in mobile drawer */}
            <div className="mb-6 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <UserCircle className="h-5 w-5" />
                <span className="font-medium">{SYSTEM_INFO.currentUser}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatDate(SYSTEM_INFO.currentDate)}
              </div>
            </div>

            {/* Mobile filters - same as desktop but in drawer */}
            <div className="mb-6">
              <h3 className="font-medium text-sm mb-3">Category</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={`mobile-category-${category}`}
                      name="mobile-category"
                      className="mr-2"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                    />
                    <Label
                      htmlFor={`mobile-category-${category}`}
                      className={`text-sm cursor-pointer ${selectedCategory === category ? "font-medium" : ""}`}
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-6">
              <h3 className="font-medium text-sm mb-4">Price Range</h3>
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                min={0}
                max={1000}
                step={10}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(values) => setPriceRange([values[0], values[1]])}
                className="my-6"
              />
              <div className="flex items-center justify-between">
                <div className="bg-muted px-2 py-1 rounded-md text-xs">₹{priceRange[0]}</div>
                <div className="bg-muted px-2 py-1 rounded-md text-xs">₹{priceRange[1]}</div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-6">
              <h3 className="font-medium text-sm mb-3">Availability</h3>
              <div className="flex items-center space-x-2">
                <Switch
                  id="mobile-in-stock"
                  checked={inStock}
                  onCheckedChange={setInStock}
                />
                <Label htmlFor="mobile-in-stock" className="text-sm">In Stock Only</Label>
              </div>
            </div>

            <div className="sticky bottom-0 pt-6 pb-2 bg-background">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button onClick={() => setIsFilterOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
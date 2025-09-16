import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BookCard } from "../components/books/book-card";
import { Book } from "../types/Book";
import api from "../lib/axios";
import { Loader2 } from "lucide-react";

interface SearchResults {
  books: Book[];
  categories: any[];
  total: number;
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          Found {results.total} results for "{query}"
        </p>
      </div>

      {results.books.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.books.map((book) => (
              <BookCard key={book._id} book={book} variant="grid" />
            ))}
          </div>
        </div>
      )}

      {results.categories.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.categories.map((category) => (
              <div
                key={category._id}
                className="p-6 bg-card rounded-lg border hover:border-primary transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="text-sm text-muted-foreground">
                  {category.bookCount} books in this category
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.total === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No results found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse our categories
          </p>
        </div>
      )}
    </div>
  );
} 
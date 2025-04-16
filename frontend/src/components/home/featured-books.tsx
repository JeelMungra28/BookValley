import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookCard } from "../books/book-card";
import { BookType } from "../../data/mockBooks";

interface FeaturedBooksProps {
  books: BookType[];
}

export function FeaturedBooks({ books }: FeaturedBooksProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Carousel navigation
  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % Math.ceil(books.length / 2));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? Math.ceil(books.length / 2) - 1 : prev - 1
    );
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 md:px-10 py-20">
      <div className="flex justify-between items-center mb-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Books
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors duration-300 text-base"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Featured Books Carousel */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden"
        >
          <div className="relative">
            {/* Carousel navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-80 hover:opacity-100"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-80 hover:opacity-100"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Carousel */}
            <div className="overflow-hidden py-6 px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                  {books.map((book) => (
                    <div key={book.id}>
                      <BookCard book={book} />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, ShoppingCart, Clock } from "lucide-react";
import { motion } from "framer-motion";

export interface BookProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  price: number;
  available: boolean;
}

interface BookCardProps {
  book: BookProps;
  isNew?: boolean;
}

export function BookCard({ book, isNew = false }: BookCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col group shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative pt-[140%] overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {isNew && (
            <motion.div
              className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rotate-3 font-medium text-sm"
              animate={{
                rotate: [3, -3, 3],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              New!
            </motion.div>
          )}

          {book.available === false && (
            <motion.div
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Badge variant="outline" className="bg-background/80 text-foreground px-3 py-1.5">
                Currently Unavailable
              </Badge>
            </motion.div>
          )}

          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="text-sm font-medium">{book.title}</div>
            <div className="text-xs opacity-80">{book.author}</div>
          </motion.div>
        </div>
        <CardContent className="p-4 md:p-6 flex-grow">
          <h3 className="font-semibold text-lg truncate hover:text-primary transition-colors">{book.title}</h3>
          <p className="text-sm md:text-base text-muted-foreground">{book.author}</p>
          <div className="flex items-center mt-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <Star
                    size={16}
                    className={i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                </motion.div>
              ))}
            </div>
            <span className="ml-2 text-sm">{book.rating}</span>
          </div>
          <div className="mt-3 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-base font-medium">${book.price}/week</span>
          </div>
        </CardContent>
        <div className="p-4 md:p-6 pt-0 mt-auto">
          <div className="flex gap-3 w-full">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1"
            >
              <Button asChild className="w-full bg-primary hover:bg-primary/90 transition-colors text-base py-5">
                <Link to={`/books/${book.id}`}>View</Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                size="icon"
                disabled={book.available === false}
                className="border-primary/20 hover:border-primary hover:bg-primary/5 transition-all h-[42px] w-[42px]"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Add to cart</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
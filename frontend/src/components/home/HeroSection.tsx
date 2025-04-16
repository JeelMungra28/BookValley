import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          src="/placeholder.svg?height=800&width=1600"
          alt="Library background"
          className="object-cover w-full h-full opacity-10 dark:opacity-5"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Discover Your Next
              <motion.span
                className="text-primary block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Favorite Book
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              BookValley offers a vast collection of books with personalized recommendations and seamless rental
              experience.
            </motion.p>

            {/* Search form */}
            <motion.form
              onSubmit={handleSearch}
              className="flex w-full max-w-md mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by title, author, or genre..."
                  className="pl-10 pr-4 py-6 border-primary/20 focus:border-primary transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="ml-2 hover:scale-105 transition-transform"
              >
                Search
              </Button>
            </motion.form>

            {/* Quick links */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              {["Fiction", "Non-Fiction", "Science", "History"].map((category, index) => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    asChild
                    className="border-primary/20 hover:border-primary transition-colors duration-300 text-base"
                  >
                    <Link to={`/books?category=${category.toLowerCase()}`}>{category}</Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative h-[500px] md:h-[550px] lg:h-[600px] w-full">
              <motion.div
                className="absolute top-0 right-0 w-3/4 h-4/5 z-10"
                whileHover={{ y: -5, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/placeholder.svg?height=600&width=400"
                  alt="Featured book"
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                />
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-0 w-2/3 h-3/5 z-0"
                whileHover={{ y: -5, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/placeholder.svg?height=600&width=400"
                  alt="Featured book"
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <StatsDisplay />
      </div>
    </section>
  );
}

// Stats Component (nested within HeroSection file for simplicity)
function StatsDisplay() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stats = [
    { value: "10,000+", label: "Books Available" },
    { value: "5,000+", label: "Happy Readers" },
    { value: "500+", label: "New Titles Monthly" },
    { value: "4.8/5", label: "Customer Rating" },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={item}
          className="p-6 rounded-xl hover:bg-primary/5 transition-colors duration-300"
        >
          <motion.div
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-primary"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
          >
            {stat.value}
          </motion.div>
          <div className="text-base md:text-lg text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
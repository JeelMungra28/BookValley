import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  const [activeCategory, setActiveCategory] = useState("fiction");

  return (
    <motion.section
      className="w-full bg-slate-50 dark:bg-slate-900"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Browse by Category
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              <Link to={`/books?category=${category.id}`}>
                <Card
                  className={`hover:bg-primary/10 transition-all duration-300 border-2 h-full ${activeCategory === category.id ? 'border-primary' : 'border-transparent'
                    }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center text-center h-full">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold text-lg md:text-xl mb-2">{category.name}</h3>
                    <Badge variant="secondary" className="bg-primary/10 text-sm">{category.count} books</Badge>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
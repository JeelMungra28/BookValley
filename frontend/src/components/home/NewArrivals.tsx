import { motion } from "framer-motion";
import { BookCard } from "../books/book-card";
import { BookType } from "@/src/components/data/mockBooks";

interface NewArrivalsProps {
    books: BookType[];
}

export function NewArrivals({ books }: NewArrivalsProps) {
    // Animation variants for staggered animations
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.section
            className="w-full max-w-[1400px] mx-auto px-6 md:px-10 py-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
        >
            <motion.h2
                className="text-3xl md:text-4xl font-bold mb-10"
                variants={item}
            >
                New Arrivals
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {books.map((book, index) => (
                    <motion.div
                        key={book.id}
                        variants={item}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                    >
                        <BookCard book={book} isNew={true} />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
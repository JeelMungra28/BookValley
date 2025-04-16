import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react"; // Changed from ChevronLeft to ChevronUp for better UX

export function ScrollToTop() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {scrollPosition > 300 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-8 right-8 z-50"
                >
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full shadow-lg bg-primary text-white hover:bg-primary/90 h-12 w-12"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <ChevronUp className="h-5 w-5" />
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
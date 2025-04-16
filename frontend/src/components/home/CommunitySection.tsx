import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export function CommunitySection() {
    return (
        <motion.section
            className="w-full bg-primary/5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Join Our Community
                    </motion.h2>
                    <motion.p
                        className="text-lg md:text-xl mb-10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Sign up today and get personalized book recommendations, track your reading history, and connect with fellow
                        book lovers.
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                size="lg"
                                asChild
                                className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity"
                            >
                                <Link to="/register">Sign Up Now</Link>
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="px-8 py-6 text-lg border-primary/20 hover:border-primary transition-all"
                            >
                                <Link to="/about">Learn More</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Checkbox } from "@components/ui/checkbox"
import { toast } from "@hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Mail, Lock, ArrowRight, Facebook, Github, LucideProps } from "lucide-react"

// Google icon component since it's not available in lucide-react
const Google = (props: LucideProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would validate credentials with your backend
      if (email && password) {
        toast({
          title: "Login successful",
          description: "Welcome back to BookValley!",
        })
        navigate("/dashboard")
      } else {
        throw new Error("Please enter both email and password")
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 py-10">
      <AnimatePresence>
        {mounted && (
          <motion.div
            className="container max-w-screen-xl mx-auto px-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden bg-card shadow-lg">
              {/* Left Column - Illustration and branding */}
              <motion.div
                className="lg:w-1/2 relative overflow-hidden bg-primary text-primary-foreground p-10 lg:p-16"
                variants={itemVariants}
              >
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0, duration: 0.5 }}
                  className="absolute inset-0 z-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 opacity-90" />
                  <div className="absolute inset-0 bg-[url('/assets/bookpattern.svg')] opacity-10" />
                </motion.div>

                <div className="relative z-10 h-full flex flex-col">
                  <motion.div
                    className="flex items-center mb-10"
                    variants={itemVariants}
                  >
                    <BookOpen className="h-10 w-10 mr-3" />
                    <span className="text-3xl font-bold">BookValley</span>
                  </motion.div>

                  <motion.div
                    className="flex-1 flex flex-col justify-center"
                    variants={itemVariants}
                  >
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Welcome Back!</h1>
                    <p className="text-xl opacity-90 mb-8 max-w-md">
                      Sign in to continue your reading journey and discover new stories.
                    </p>
                    <div className="space-y-6 max-w-md">
                      {/* <motion.div className="flex items-start space-x-3" variants={itemVariants}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Personalized Recommendations</h3>
                          <p className="opacity-80">Get book suggestions based on your reading history</p>
                        </div>
                      </motion.div> */}

                      {/* <motion.div className="flex items-start space-x-3" variants={itemVariants}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M18 15L12 21L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Track Your Reading</h3>
                          <p className="opacity-80">Save your progress and pick up where you left off</p>
                        </div>
                      </motion.div> */}

                      <motion.div className="flex items-start space-x-3" variants={itemVariants}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M19 6c0-1.105-.895-2-2-2H7c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h10c1.105 0 2-.895 2-2V6z" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Renting and Buying Books</h3>
                          <p className="opacity-80">Choose between flexible rentals or permanent additions to your collection</p>
                        </div>
                      </motion.div>

                      <motion.div className="flex items-start space-x-3" variants={itemVariants}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Seamlessly Browse Books</h3>
                          <p className="opacity-80">Explore our vast library with intuitive search and filtering options</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="mt-auto pt-8"
                    variants={itemVariants}
                  >
                    <blockquote>
                      <p className="text-lg font-medium italic opacity-90">
                        "BookValley has transformed how I discover books. The personalized recommendations are spot on!"
                      </p>
                    </blockquote>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Column - Login Form */}
              <motion.div
                className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center"
                variants={itemVariants}
              >
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold mb-2">Sign In</h2>
                  <p className="text-muted-foreground mb-8">Please enter your credentials to access your account</p>
                </motion.div>

                <motion.form
                  onSubmit={handleLogin}
                  className="space-y-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="email" className="text-base">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 py-6 text-base"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div className="space-y-2" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-base">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 py-6 text-base"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-2"
                    variants={itemVariants}
                  >
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me for 30 days
                    </Label>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 rounded-lg text-base font-medium flex items-center justify-center relative overflow-hidden group" disabled={isLoading}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span>{isLoading ? "Signing in..." : "Sign In"}</span>
                      <motion.div
                        className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </motion.form>

                <motion.div
                  className="relative my-8"
                  variants={itemVariants}
                >
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-3 text-muted-foreground">Or continue with</span>
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 gap-4"
                  variants={itemVariants}
                >
                  <motion.button
                    type="button"
                    className="flex items-center justify-center px-4 py-3 border border-input rounded-lg text-sm font-medium hover:bg-accent"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Google className="h-5 w-5 mr-2 text-blue-600" />
                    <span>Google</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    className="flex items-center justify-center px-4 py-3 border border-input rounded-lg text-sm font-medium hover:bg-accent"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Github className="h-5 w-5 mr-2 text-gray-800 dark:text-gray-200" />
                    <span>GitHub</span>
                  </motion.button>
                </motion.div>

                <motion.p
                  className="mt-8 text-center text-sm text-muted-foreground"
                  variants={itemVariants}
                >
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    Create account
                  </Link>
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
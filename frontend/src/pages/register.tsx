"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { toast } from "../hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, User, Mail, Lock, ArrowRight, Facebook, Github, Check } from "lucide-react"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error("Please fill in all required fields")
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      if (!formData.agreeTerms) {
        throw new Error("You must agree to the terms and conditions")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Registration successful",
        description: "Welcome to BookValley! Please check your email to verify your account.",
      })

      navigate("/login")
    } catch (error) {
      toast({
        title: "Registration failed",
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

  // Password strength check
  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return 0;

    let score = 0;
    if (password.length > 6) score += 1;
    if (password.length > 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    return score;
  }

  const strength = passwordStrength();
  const strengthColors = [
    "bg-red-500", // Very weak
    "bg-orange-500", // Weak
    "bg-yellow-500", // Fair
    "bg-lime-500", // Good
    "bg-green-500", // Strong
  ];

  const strengthText = [
    "Very weak",
    "Weak",
    "Fair",
    "Good",
    "Strong"
  ];

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
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Join the community</h1>
                    <p className="text-xl opacity-90 mb-8 max-w-md">
                      Create your account and start your journey into a world of books and stories.
                    </p>
                    <div className="space-y-6 max-w-md">
                      <motion.div className="flex items-start space-x-3" variants={itemVariants}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Free Reading Lists</h3>
                          <p className="opacity-80">Create and organize your personal book collections</p>
                        </div>
                      </motion.div>

                      {/* <motion.div className="flex items-start space-x-3" variants={itemVariants}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Join Book Discussions</h3>
                          <p className="opacity-80">Share your thoughts with a community of book lovers</p>
                        </div>
                      </motion.div> */}

                      {/* <motion.div className="flex items-start space-x-3" variants={itemVariants}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Reading Goals</h3>
                          <p className="opacity-80">Set and track your reading goals throughout the year</p>
                        </div>
                      </motion.div> */}
                      <motion.div className="flex items-start space-x-3" variants={itemVariants}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M19 6c0-1.105-.895-2-2-2H7c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h10c1.105 0 2-.895 2-2V6z" stroke="currentColor" strokeWidth="2" />
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
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
                        "Join our community of book lovers and discover your next favorite read with personalized
                        recommendations."
                      </p>
                      <footer className="mt-2 font-medium opacity-80">— The BookValley Team</footer>
                    </blockquote>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Column - Register Form */}
              <motion.div
                className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center"
                variants={itemVariants}
              >
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold mb-2">Create an account</h2>
                  <p className="text-muted-foreground mb-8">Enter your information to get started</p>
                </motion.div>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="name" className="text-base">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 py-6 text-base"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="email" className="text-base">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 py-6 text-base"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="password" className="text-base">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 py-6 text-base"
                        required
                      />
                    </div>
                    {formData.password && (
                      <div className="mt-2 space-y-2">
                        <div className="flex gap-1">
                          {[0, 1, 2, 3, 4].map((index) => (
                            <div
                              key={index}
                              className={`h-1 flex-1 rounded-full ${index < strength ? strengthColors[strength] : 'bg-muted'}`}
                            ></div>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {strength > 0 ? strengthText[strength - 1] : 'Enter a password'}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="confirmPassword" className="text-base">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`pl-10 py-6 text-base ${formData.confirmPassword &&
                          formData.password !== formData.confirmPassword ?
                          "border-red-500 focus-visible:ring-red-500" : ""
                          }`}
                        required
                      />
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                    )}
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-3 bg-muted/50 p-4 rounded-lg"
                    variants={itemVariants}
                  >
                    <Checkbox
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))}
                      className="mt-1"
                    />
                    <Label htmlFor="agreeTerms" className="text-sm font-medium leading-none">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary underline underline-offset-4 hover:text-primary/90">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary underline underline-offset-4 hover:text-primary/90">
                        privacy policy
                      </Link>
                    </Label>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 rounded-lg text-base font-medium flex items-center justify-center relative overflow-hidden group"
                      disabled={isLoading}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span>{isLoading ? "Creating account..." : "Create Account"}</span>
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
                    <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                    <span>Facebook</span>
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
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Sign in
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
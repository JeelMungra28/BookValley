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
import { BookOpen, Mail, Lock, ArrowRight, Facebook, Github } from "lucide-react"
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setIsLoading(true)
      
      // Basic validation
      if (!email || !password) {
        setError('Email and password are required')
        setIsLoading(false)
        return
      }
      
      await login(email, password)
      navigate("/dashboard")
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Failed to login. Please check your credentials.')
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
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}
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
                        disabled={isLoading}
                      />
                    </div>
                  </motion.div>

                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="password" className="text-base">Password</Label>
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
                        disabled={isLoading}
                      />
                    </div>
                  </motion.div>

                  <motion.div className="flex items-center justify-between" variants={itemVariants}>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      className="w-full py-6 text-base"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Signing in...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          Sign In
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </div>
                      )}
                    </Button>
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
                  className="grid grid-cols-2 gap-4 mb-4"
                  variants={itemVariants}
                >
                  <motion.button
                    type="button"
                    className="flex items-center justify-center px-4 py-3 border border-input rounded-lg text-sm font-medium hover:bg-accent"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {/* Google Icon */}
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span>Google</span>
                  </motion.button>

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
                    {/* Microsoft Icon */}
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                      <path fill="#f35325" d="M1 1h10v10H1z" />
                      <path fill="#81bc06" d="M12 1h10v10H12z" />
                      <path fill="#05a6f0" d="M1 12h10v10H1z" />
                      <path fill="#ffba08" d="M12 12h10v10H12z" />
                    </svg>
                    <span>Microsoft</span>
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
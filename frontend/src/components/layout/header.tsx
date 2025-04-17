"use client"

import { useState, useEffect, useRef } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { ThemeToggle } from "../theme-toggle"
import { Search, ShoppingCart, User, Menu, X, BookOpen } from "lucide-react"
import { Badge } from "../ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "../ui/separator"
import { useAuth } from "../../contexts/AuthContext"

export default function Header() {
  const location = useLocation()
  const pathname = location.pathname
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [cartCount, setCartCount] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { user, logout } = useAuth()

  const navigate = useNavigate();

  // Navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Browse Books" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Animation variants for header elements
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  }

  const actionsVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const iconVariants = {
    hover: {
      scale: 1.15,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  const handleSearchFocus = () => {
    setSearchFocused(true);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-lg shadow-md"
        : "bg-background"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-[4.5rem] md:h-20 items-center justify-between">
          {/* Text only for BookValley - Logo removed */}
          <motion.div
            variants={logoVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <span className="font-bold text-2xl md:text-3xl font-serif tracking-wide relative">
                BookValley
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-[3px] bg-primary group-hover:w-full transition-all duration-300"
                ></motion.span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation with staggered animation */}
          <motion.nav
            variants={actionsVariants}
            className="hidden md:flex items-center space-x-8"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                custom={index}
                variants={navItemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to={link.href}
                  className={`text-lg font-medium transition-colors relative group ${pathname === link.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
                    }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ${pathname === link.href ? "w-full" : "group-hover:w-full"
                    }`}></span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Actions with animations */}
          <motion.div
            variants={actionsVariants}
            className="flex items-center space-x-4"
          >
            {/* Static Search with expanding input */}
            <div
              className="hidden sm:flex h-10 items-center relative min-w-[40px] rounded-full border border-input bg-transparent transition-all duration-300 focus-within:border-primary/40"
              style={{
                width: searchFocused || searchValue ? '280px' : '180px'
              }}
            >
              <Input
                ref={searchInputRef}
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search books..."
                className="h-10 w-full border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base pl-10"
              />
              <div className="absolute left-0 top-0 h-full flex items-center pl-3 text-muted-foreground">
                <Search className="h-5 w-5" />
              </div>
            </div>

            {/* Theme Toggle with animation */}
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
            >
              <ThemeToggle />
            </motion.div>

            {/* Cart with animation and improved badge */}
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
              className="relative"
            >
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-11 w-11 hover:bg-primary/10 rounded-full"
              >
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold rounded-full shadow-sm"
                    >
                      {cartCount}
                    </Badge>
                  )}
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>
            </motion.div>

            {/* Conditional rendering based on login state */}
            {user ? (
              /* User Menu when logged in */
              <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={iconVariants}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden sm:flex h-11 w-11 hover:bg-primary/10 rounded-full"
                    >
                      <User className="h-5 w-5" />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 overflow-hidden" sideOffset={8}>
                  <div className="py-1.5">
                    <DropdownMenuLabel className="text-lg font-medium px-3 py-2">
                      <div className="flex flex-col">
                        <span className="font-bold">{user?.name || 'User'}</span>
                        <span className="text-sm text-muted-foreground">{user?.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="space-y-0.5 py-1">
                      <DropdownMenuItem asChild className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 text-base px-3 py-2.5 rounded-md mx-1">
                        <Link to="/dashboard" className="w-full">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 text-base px-3 py-2.5 rounded-md mx-1">
                        <Link to="/cart" className="flex items-center w-full">
                          <ShoppingCart className="mr-2.5 h-[18px] w-[18px]" />
                          Cart
                        </Link>
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="space-y-0.5 py-1">
                      <DropdownMenuItem asChild className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 text-base px-3 py-2.5 rounded-md mx-1">
                        <Link to="/settings" className="w-full">
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 text-base px-3 py-2.5 text-destructive rounded-md mx-1"
                        onSelect={() => {
                          logout()
                          navigate('/')
                          localStorage.removeItem("auth_token")
                          setIsUserMenuOpen(false)
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Login/Register buttons when not logged in */
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" asChild className="h-10 px-4 text-base">
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="default" asChild className="h-10 px-4 text-base">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}


            {/* Mobile Menu with animation */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={iconVariants}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden h-11 w-11 hover:bg-primary/10 rounded-full"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px] p-0">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="text-2xl font-serif">BookValley</SheetTitle>
                  {user && (
                    <div className="mt-2">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  )}
                </SheetHeader>
                <div className="py-6 px-6">
                  <div className="space-y-3 mb-8">
                    <div className="relative">
                      <Input
                        type="search"
                        placeholder="Search books..."
                        className="rounded-full border-primary/40 focus-visible:ring-primary/60 h-11 pl-11"
                      />
                      <div className="absolute left-0 top-0 h-full flex items-center pl-4 text-muted-foreground">
                        <Search className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                  <nav className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`text-lg font-medium transition-all duration-200 py-3.5 px-4 rounded-lg flex items-center ${pathname === link.href
                          ? "text-primary bg-primary/10 font-semibold"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                          }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Separator className="my-3" />

                    <Link
                      to="/cart"
                      className="text-lg font-medium transition-all duration-200 py-3.5 px-4 rounded-lg flex items-center hover:text-primary hover:bg-primary/5"
                    >
                      <ShoppingCart className="h-5 w-5 mr-3" />
                      Cart
                      {cartCount > 0 && (
                        <Badge variant="destructive" className="ml-2 rounded-full shadow-sm">
                          {cartCount}
                        </Badge>
                      )}
                    </Link>

                    {/* Conditional mobile navigation items */}
                    {user && (
                      <>
                        <Link
                          to="/dashboard"
                          className="text-lg font-medium transition-all duration-200 py-3.5 px-4 rounded-lg flex items-center hover:text-primary hover:bg-primary/5"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/settings"
                          className="text-lg font-medium transition-all duration-200 py-3.5 px-4 rounded-lg flex items-center hover:text-primary hover:bg-primary/5"
                        >
                          Settings
                        </Link>
                        <Button
                          variant="destructive"
                          className="text-lg font-medium transition-all duration-200 mt-2 py-3.5 px-4 rounded-lg flex items-center justify-center w-full"
                          onClick={() => {
                            logout();
                            navigate('/')

                            localStorage.removeItem("auth_token");
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </nav>
                </div>
                <div className="mt-auto p-6 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">© 2025 BookValley</span>
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
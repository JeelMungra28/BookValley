"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from"@components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from"@components/ui/card"
import { Input } from"@components/ui/input"
import { Separator } from"@components/ui/separator"
import { toast } from "@components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, ShoppingCart, Clock, AlertCircle } from "lucide-react"

// Sample cart items
const initialCartItems = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "/placeholder.svg?height=400&width=300",
    rentalPeriod: "2 weeks",
    price: 5.99,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "/placeholder.svg?height=400&width=300",
    rentalPeriod: "2 weeks",
    price: 6.99,
  },
]

export default function CartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [discount, setDiscount] = useState(0)

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax - discount

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const handleApplyPromoCode = () => {
    setIsApplyingPromo(true)

    // Simulate API call to validate promo code
    setTimeout(() => {
      if (promoCode.toLowerCase() === "welcome10") {
        const discountAmount = subtotal * 0.1 // 10% discount
        setDiscount(discountAmount)
        toast({
          title: "Promo code applied",
          description: "10% discount has been applied to your order.",
        })
      } else {
        toast({
          title: "Invalid promo code",
          description: "The promo code you entered is invalid or expired.",
          variant: "destructive",
        })
      }
      setIsApplyingPromo(false)
    }, 1000)
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      })
      return
    }

    navigate("/checkout")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex gap-4 py-4">
                        <div className="relative h-24 w-16 flex-shrink-0">
                          <img
                            src={item.coverImage || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.author}</p>
                          <div className="flex items-center mt-1 text-sm">
                            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span>Rental period: {item.rentalPeriod}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 mt-2"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      <Separator />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/books">Continue Shopping</Link>
                </Button>
                <Button variant="ghost" onClick={() => setCartItems([])}>
                  Clear Cart
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm mb-2">Have a promo code?</p>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <Button variant="outline" onClick={handleApplyPromoCode} disabled={isApplyingPromo || !promoCode}>
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && <p className="text-xs text-green-600 mt-2">Promo code applied successfully!</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <div className="mx-auto w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-muted">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any books to your cart yet.</p>
          <Button asChild size="lg">
            <Link to="/books">Browse Books</Link>
          </Button>
        </motion.div>
      )}

      {/* Recommendations */}
      {cartItems.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative pt-[140%]">
                  <img
                    src={`/placeholder.svg?height=400&width=300&text=Book ${i}`}
                    alt={`Recommended book ${i}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate">Recommended Book {i}</h3>
                  <p className="text-sm text-muted-foreground">Author Name</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium">${(3.99 + i).toFixed(2)}/week</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Shipping policy */}
      <section className="mt-16 bg-muted/30 p-6 rounded-lg">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Shipping & Returns Policy</h3>
            <p className="text-muted-foreground mb-2">
              Books are delivered within 2-3 business days. Return shipping is free with our prepaid return labels.
            </p>
            <Link to="/shipping-policy" className="text-primary hover:underline text-sm">
              Learn more about our shipping and returns policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

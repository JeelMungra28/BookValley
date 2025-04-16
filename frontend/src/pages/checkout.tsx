"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Separator } from "../components/ui/separator"
import { Tabs, TabsContent } from "../components/ui/tabs"
import { toast } from "../hooks/use-toast"
import { motion } from "framer-motion"
import { CreditCard, Wallet, Clock } from "lucide-react"

// Sample cart items
const cartItems = [
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

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  const handleCheckout = async () => {
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Payment successful",
        description: "Your order has been placed successfully.",
      })

      navigate("/dashboard")
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order summary */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-24 w-16 flex-shrink-0">
                      <img
                        src={item.coverImage || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover rounded-md w-full h-full"
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
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment details */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    PayPal
                  </Label>
                </div>
              </RadioGroup>

              <Tabs value={paymentMethod} className="mt-6">
                <TabsContent value="credit-card" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input id="expiry-date" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-on-card">Name on Card</Label>
                    <Input id="name-on-card" placeholder="John Doe" />
                  </div>
                </TabsContent>
                <TabsContent value="paypal" className="space-y-4">
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                    <img
                      src="/placeholder.svg?height=60&width=200"
                      alt="PayPal"
                      width={200}
                      height={60}
                      className="mx-auto"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay ${total.toFixed(2)}`}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

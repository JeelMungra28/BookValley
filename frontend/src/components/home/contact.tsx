"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "../ui/use-toast"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Fill out the form below or use our contact
          information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>You can also reach us using the following contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">support@librarysphere.com</p>
                  <p className="text-muted-foreground">info@librarysphere.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">123 Book Street</p>
                  <p className="text-muted-foreground">New York, NY 10001</p>
                  <p className="text-muted-foreground">United States</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-muted-foreground">Monday-Friday: 9am-5pm</p>
                  <p className="text-muted-foreground">Saturday: 10am-3pm</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">How does the rental process work?</h3>
              <p className="text-muted-foreground">
                Browse our collection, select the books you want to rent, choose your rental period, and complete the
                checkout process. We'll deliver the books to your doorstep, and you can return them using our prepaid
                return labels.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">What if I return a book late?</h3>
              <p className="text-muted-foreground">
                Late returns are charged at a daily rate based on the book's rental price. You can also extend your
                rental period through your account dashboard if you need more time.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Can I cancel my subscription?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time through your account settings. Your subscription will
                remain active until the end of the current billing period.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Do you ship internationally?</h3>
              <p className="text-muted-foreground">
                Currently, we only ship within the United States. We're working on expanding our services to
                international locations in the near future.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map placeholder */}
      <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
          <p className="text-muted-foreground">Interactive map would be displayed here</p>
        </div>
      </div>
    </div>
  )
}

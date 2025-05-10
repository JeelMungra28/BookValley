"use client"

import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { motion } from "framer-motion"
// Import the university logo from the correct path
const ganpatUniversity = "/images/ganpat university.png"

export default function About() {
// Team members data
const teamMembers = [
  {
    name: "Jeel P. Mungra",
    role: "Founder & Frontend Developer",
    bio: "Jeel founded BookValley with a vision to make books accessible to everyone. He has over 2 years of experience in the publishing industry.",
    image: ganpatUniversity,
  },
  {
    name: "Rakshit R. Ramani",
    role: "CTO & Backend Developer",
    bio: "Rakshit leads our technology team, ensuring that our platform is fast, secure, and user-friendly.",
    image: ganpatUniversity,
  },
  {
    name: "Samarth U. Delvadiya",
    role: "Head of Content",
    bio: "Samarth curates our book collection and works with publishers to bring the best titles to our platform. Designing the UI/UX of the platform and documentation.",
    image: ganpatUniversity,
  },
  {
    name: "Mehulsinh M. Chauhan",
    role: "Customer Experience Director",
    bio: "Mehulsinh ensures that every customer has a seamless experience with BookValley. He previously worked in customer success at major tech companies.",
    image: ganpatUniversity,
  },
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

return (
  <div className="container mx-auto px-4 py-8">
    {/* Hero section */}
    <section className="mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">About BookValley</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Founded in 2025, BookValley is on a mission to make books accessible to everyone through an innovative
            rental platform that combines technology with a passion for literature.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            Our platform offers thousands of titles across various genres, personalized recommendations, and a
            seamless rental experience that brings books to your doorstep with just a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link to="/books">Browse Our Collection</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden"
        >
          <img
            src="/placeholder.svg?height=800&width=1200"
            alt="LibrarySphere office"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>

    {/* Our mission */}
    <section className="mb-16">
      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-6">
            "To foster a love for reading by making books accessible to everyone, regardless of location or economic
            status, while building a community of passionate readers who share ideas and discover new worlds through
            literature."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Books Available</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <p className="text-muted-foreground">Happy Readers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Team Members</p>
            </div>
          </div>
        </div>
      </div>
    </section>    {/* Our team */}
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {teamMembers.map((member, index) => (
          <motion.div key={index} variants={item} className="h-full">
            <Card className="h-full flex flex-col">
              <CardContent className="p-6 text-center flex flex-col h-full">
                <div className="relative w-32 h-32 mx-auto mb-4 flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm flex-grow">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>

    {/* Our values */}
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-3">Accessibility</h3>
            <p className="text-muted-foreground">
              We believe that everyone should have access to books, regardless of their location or economic status.
              Our rental model makes reading affordable and convenient.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-3">Community</h3>
            <p className="text-muted-foreground">
              We foster a community of readers who share ideas, recommendations, and a passion for literature. Reading
              is better when shared.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-3">Innovation</h3>
            <p className="text-muted-foreground">
              We continuously innovate to improve our platform, from personalized recommendations to seamless delivery
              and return processes.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    {/* CTA */}
    <section className="text-center py-12 bg-primary/5 rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Community Today</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Start your reading journey with LibrarySphere and discover your next favorite book.
      </p>
      <Button asChild size="lg">
        <Link to="/register">Sign Up Now</Link>
      </Button>
    </section>
  </div>
)
}

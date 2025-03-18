import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"

export default function Home() {
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Urban Commuter",
      price: 899,
      image: "/placeholder.svg?height=300&width=300",
      category: "Road Bike",
    },
    {
      id: 2,
      name: "Mountain Explorer",
      price: 1299,
      image: "/placeholder.svg?height=300&width=300",
      category: "Mountain Bike",
    },
    {
      id: 3,
      name: "Speed Demon",
      price: 1599,
      image: "/placeholder.svg?height=300&width=300",
      category: "Racing Bike",
    },
    {
      id: 4,
      name: "City Cruiser",
      price: 749,
      image: "/placeholder.svg?height=300&width=300",
      category: "Hybrid Bike",
    },
  ]

  // Categories data
  const categories = [
    {
      name: "Road Bikes",
      image: "/placeholder.svg?height=400&width=400",
      href: "/categories/road-bikes",
    },
    {
      name: "Mountain Bikes",
      image: "/placeholder.svg?height=400&width=400",
      href: "/categories/mountain-bikes",
    },
    {
      name: "Accessories",
      image: "/placeholder.svg?height=400&width=400",
      href: "/categories/accessories",
    },
    {
      name: "Apparel",
      image: "/placeholder.svg?height=400&width=400",
      href: "/categories/apparel",
    },
  ]

  // Bicycle brands
  const brands = [
    { name: "Trek", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Specialized", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Giant", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Cannondale", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Scott", logo: "/placeholder.svg?height=60&width=120" },
  ]

  // Team members
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Team Captain",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sarah Miller",
      role: "Road Specialist",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Chen",
      role: "Mountain Bike Expert",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  // Rides
  const rides = [
    {
      title: "Homies Night Ride",
      image: "/placeholder.svg?height=300&width=400",
      day: "Thursday",
      time: "6:00 PM",
      description: "A casual evening ride through the city lights.",
    },
    {
      title: "Morning Ride",
      image: "/placeholder.svg?height=300&width=400",
      day: "Saturday",
      time: "7:00 AM",
      description: "Start your weekend with an energizing morning ride.",
    },
    {
      title: "Girlsonbikes",
      image: "/placeholder.svg?height=300&width=400",
      day: "Sunday",
      time: "9:00 AM",
      description: "A supportive community ride for women cyclists of all levels.",
    },
  ]

  // Blog posts
  const blogPosts = [
    {
      title: "Essential Gear for Winter Cycling",
      excerpt: "Stay warm and safe during the cold months with these must-have items.",
      image: "/placeholder.svg?height=200&width=300",
      date: "February 15, 2025",
      slug: "essential-gear-winter-cycling",
    },
    {
      title: "Beginner's Guide to Mountain Biking",
      excerpt: "Everything you need to know before hitting the trails for the first time.",
      image: "/placeholder.svg?height=200&width=300",
      date: "February 8, 2025",
      slug: "beginners-guide-mountain-biking",
    },
    {
      title: "Maintenance Tips for Your Road Bike",
      excerpt: "Keep your bike in top condition with these simple maintenance routines.",
      image: "/placeholder.svg?height=200&width=300",
      date: "January 30, 2025",
      slug: "maintenance-tips-road-bike",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] w-full">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src="/app/images/shot1.jpeg"
            alt="Banditz Bicycle Club"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Ride with the Banditz</h1>
            <p className="text-xl text-white mb-8 max-w-lg">
              Premium bicycles and accessories for the modern cyclist. Join the club today.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Discover the Joy of Cycling */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Discover the Joy of Cycling</h2>
                <p className="text-lg mb-6">
                  Imagine the wind on your face, the thrill of the open road, and the endless possibilities of
                  adventure. At Banditz Bicycle Club, we're here to spark that joy and help you find your perfect
                  ride—whether it's for city commutes or weekend explorations.
                </p>
                <Button asChild>
                  <Link href="/products">Find Your Perfect Bike</Link>
                </Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=600" alt="Cycling Joy" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Bikes</h2>
            <Button asChild variant="outline">
              <Link href="/products">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="rounded-lg overflow-hidden border bg-card transition-all hover:shadow-md">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <h3 className="font-semibold text-lg mt-1">{product.name}</h3>
                    <p className="font-bold mt-2">${product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Banditz Bicycle Club</h2>
              <p className="text-lg mb-8">
                At our core, we're passionate about connecting you with the joy and freedom that cycling brings. We're
                here to help you discover the ideal bicycle and accessories that fit your lifestyle, ensuring that every
                ride is as enjoyable as it should be.
              </p>
              <Button asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/about">About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Cycling Team</h2>
              <p className="text-lg max-w-2xl mx-auto">
                Meet the passionate riders who make Banditz Bicycle Club more than just a store! Our cycling team is
                made up of dedicated, adventurous cyclists of all levels who live for the thrill of the ride...
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild>
                <Link href="/team">Meet the Full Team</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Strava Integration */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Strava Integration"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Track Your Ride with Us on Strava</h2>
              <p className="text-lg mb-6">
                Stay connected with fellow cycling enthusiasts! Track your rides, join challenges, and see how Banditz
                riders conquer the trails. Follow us on Strava to be part of the action!
              </p>
              <Button asChild className="bg-[#FC4C02] hover:bg-[#FC4C02]/90 text-white">
                <a href="https://www.strava.com" target="_blank" rel="noopener noreferrer">
                  Follow Us on Strava
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Rides & Events */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Banditz Bicycle Club Rides & Events Group</h2>
              <p className="text-lg max-w-2xl mx-auto">
                Join the adventure, connect with fellow riders, and explore our curated cycling events and routes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rides.map((ride) => (
                <div key={ride.title} className="bg-background rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-48 w-full">
                    <Image src={ride.image || "/placeholder.svg"} alt={ride.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{ride.title}</h3>
                    <p className="text-muted-foreground mb-4">{ride.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        <span>Every {ride.day}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>{ride.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        <span>Starting at our Braamfontein store</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <div className="bg-background p-6 rounded-lg max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-4">DETAILS:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div>
                    <p className="font-semibold">When</p>
                    <p>Every day of the week</p>
                  </div>
                  <div>
                    <p className="font-semibold">Time</p>
                    <p>Meet at starting time at Banditz Bicycle Club</p>
                  </div>
                  <div>
                    <p className="font-semibold">Where</p>
                    <p>Starting at our Braamfontein store, then hitting the best local routes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted Brands */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Trusted Bicycle Brands</h2>
            <p className="text-lg max-w-2xl mx-auto">
              We partner with top brands known for innovation, reliability, and exceptional performance, so you can
              enjoy every ride with confidence. Here's a look at some of the trusted brands you'll find in-store.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brands.map((brand) => (
              <div key={brand.name} className="grayscale hover:grayscale-0 transition-all">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Latest News & Tips</h2>
              <Button asChild variant="outline">
                <Link href="/blog">View All Posts</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <div className="bg-background rounded-lg overflow-hidden shadow-md h-full flex flex-col">
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex items-center text-primary font-medium">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Banditz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-foreground">
                We source only the highest quality bicycles and components from trusted manufacturers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-foreground">Free shipping on orders over $100. Quick delivery to your doorstep.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-foreground">
                Our team of cycling experts is always ready to help with your questions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us!</h2>
                <p className="mb-8">
                  Have questions about our products or services? Fill out the form and we'll get back to you as soon as
                  possible.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">About Company</h3>
                    <p className="mb-4">
                      Banditz Bicycle Club is your go-to spot for all things cycling in Braamfontein. Whether you're
                      here for expert advice, community rides, or to find the perfect bike, we're all about bringing
                      people together on two wheels.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                    <div className="space-y-2">
                      <p className="flex items-start">
                        <span className="font-semibold mr-2">Address:</span>
                        <span>44 Stanley Ave, Milpark, Johannesburg, 2092</span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold mr-2">Email:</span>
                        <a href="mailto:info@banditz.co.za" className="text-primary hover:underline">
                          info@banditz.co.za
                        </a>
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold mr-2">Phone:</span>
                        <span>+27 555 1234 567</span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold mr-2">Opening Hours:</span>
                        <span>
                          Mon–Fri: 9 AM – 6 PM
                          <br />
                          Sat: 10 AM – 4 PM
                          <br />
                          Sun: Closed
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form className="bg-background p-6 rounded-lg shadow-md">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Enter your Name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Your Email</Label>
                      <Input id="email" type="email" placeholder="Enter a valid email address" />
                    </div>
                    <div>
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea id="message" placeholder="Enter your message" rows={5} />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Join Our Community</h2>
            <p className="mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter for the latest product updates, exclusive offers, and cycling tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md flex-1 text-foreground"
                required
              />
              <Button className="bg-white text-primary hover:bg-white/90">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}


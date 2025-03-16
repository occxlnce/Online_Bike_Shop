import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"

export default function AboutPage() {
  // Team members
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Team Captain & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Alex has been cycling professionally for over 15 years and founded Banditz Bicycle Club to share his passion with the community.",
    },
    {
      name: "Sarah Miller",
      role: "Road Specialist & Co-Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With multiple race wins under her belt, Sarah leads our road cycling division and coordinates community events.",
    },
    {
      name: "Michael Chen",
      role: "Mountain Bike Expert",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael has conquered some of the toughest trails worldwide and brings his technical expertise to our mountain biking section.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Repairs & Maintenance",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With certification in bicycle mechanics, Emily ensures that all bikes at Banditz are maintained to the highest standards.",
    },
  ]

  // Upcoming rides
  const upcomingRides = [
    {
      title: "Homies Night Ride",
      day: "Thursday",
      time: "6:00 PM",
      description: "A casual 15km evening ride through the city lights with friends.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Weekend Warrior Ride",
      day: "Saturday",
      time: "7:00 AM",
      description: "An intense 50km ride that challenges even experienced cyclists.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Girlsonbikes",
      day: "Sunday",
      time: "9:00 AM",
      description: "A supportive 20km ride for women cyclists of all levels.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Partner brands
  const brands = [
    { name: "Trek", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Specialized", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Giant", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Cannondale", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Scott", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] w-full">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="About Banditz Bicycle Club"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
            <p className="text-xl text-white max-w-2xl">
              More than just a bike shop - we're a community united by our passion for cycling and adventure.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Banditz Bicycle Club</h2>
              <div className="space-y-4">
                <p>
                  At our core, we're passionate about connecting you with the joy and freedom that cycling brings. We're
                  here to help you discover the ideal bicycle and accessories that fit your lifestyle, ensuring that
                  every ride is as enjoyable as it should be.
                </p>
                <p>
                  Founded in 2015 by a group of cycling enthusiasts, Banditz Bicycle Club has grown from a small repair
                  shop to a full-service cycling center in the heart of Braamfontein. Our mission is to promote cycling
                  as a sustainable, healthy, and enjoyable way of life.
                </p>
                <p>
                  We believe that cycling is more than just a mode of transportation—it's a lifestyle that brings people
                  together. That's why we organize regular community rides, workshops, and events to foster a sense of
                  belonging among cyclists of all levels.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/shop">Browse Our Collection</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Banditz Bicycle Club Shop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg max-w-2xl mx-auto">
                The passionate riders and experts who make Banditz Bicycle Club more than just a store. Our team
                combines years of cycling experience, technical knowledge, and a shared love for bikes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="bg-background rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-64 w-full">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rides & Events */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cycling Rides & Events</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Join our community for weekly rides and special cycling events. All levels are welcome - from beginners to
              experienced cyclists.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingRides.map((ride) => (
              <div key={ride.title} className="border rounded-lg overflow-hidden bg-card">
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
            <Button asChild>
              <Link href="/rides">View All Events</Link>
            </Button>
          </div>
        </section>

        {/* Brand Partnerships */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Brand Partnerships</h2>
              <p className="text-lg max-w-2xl mx-auto">
                We partner with top bicycle brands known for innovation, reliability, and exceptional performance, so
                you can enjoy every ride with confidence.
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="bg-white p-4 rounded-lg shadow-sm grayscale hover:grayscale-0 transition-all"
                >
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
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}


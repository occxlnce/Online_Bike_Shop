import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, ChevronRight } from "lucide-react"

export default function RidesPage() {
  // Featured ride
  const featuredRide = {
    title: "Sunday Group Ride",
    image: "/placeholder.svg?height=400&width=800",
    date: "Every Sunday",
    time: "7:00 AM",
    distance: "40km",
    difficulty: "Intermediate",
    participants: 25,
    description:
      "Join our flagship weekly ride through the scenic routes of Johannesburg. This 40km route is suitable for intermediate cyclists and features a coffee stop halfway through the ride.",
  }

  // Upcoming rides
  const upcomingRides = [
    {
      title: "Homies Night Ride",
      image: "/placeholder.svg?height=300&width=400",
      date: "Every Thursday",
      time: "6:00 PM",
      distance: "15km",
      difficulty: "Easy",
      description: "A casual evening ride through the city lights with friends.",
    },
    {
      title: "Weekend Warrior Ride",
      image: "/placeholder.svg?height=300&width=400",
      date: "Every Saturday",
      time: "7:00 AM",
      distance: "50km",
      difficulty: "Advanced",
      description: "An intense ride that challenges even experienced cyclists.",
    },
    {
      title: "Girlsonbikes",
      image: "/placeholder.svg?height=300&width=400",
      date: "Every Sunday",
      time: "9:00 AM",
      distance: "20km",
      difficulty: "Beginner-Friendly",
      description: "A supportive community ride for women cyclists of all levels.",
    },
  ]

  // Special events
  const specialEvents = [
    {
      title: "Banditz Anniversary Ride",
      image: "/placeholder.svg?height=300&width=400",
      date: "March 15, 2025",
      time: "8:00 AM",
      location: "Banditz Bicycle Club, Braamfontein",
      description: "Celebrate our store anniversary with a special community ride followed by refreshments and prizes.",
    },
    {
      title: "Johannesburg Charity Ride",
      image: "/placeholder.svg?height=300&width=400",
      date: "April 5, 2025",
      time: "7:30 AM",
      location: "Nelson Mandela Square",
      description: "Join us for this charity ride to raise funds for local cycling education programs.",
    },
  ]

  // Recent ride highlights
  const recentHighlights = [
    {
      title: "Mountain Trail Expedition",
      image: "/placeholder.svg?height=200&width=300",
      date: "February 10, 2025",
      participants: 18,
      distance: "35km",
    },
    {
      title: "City Lights Evening Ride",
      image: "/placeholder.svg?height=200&width=300",
      date: "February 5, 2025",
      participants: 22,
      distance: "18km",
    },
    {
      title: "Sunrise Coastal Route",
      image: "/placeholder.svg?height=200&width=300",
      date: "January 28, 2025",
      participants: 15,
      distance: "45km",
    },
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
            alt="Banditz Group Rides"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Rides & Events</h1>
            <p className="text-xl text-white max-w-2xl">
              Join our cycling community for weekly rides, special events, and unforgettable adventures on two wheels.
            </p>
          </div>
        </section>

        {/* Featured Ride */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Weekly Ride</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src={featuredRide.image || "/placeholder.svg"}
                alt={featuredRide.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex gap-2">
                  <span className="bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {featuredRide.difficulty}
                  </span>
                  <span className="bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {featuredRide.distance}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{featuredRide.title}</h3>
              <p className="text-muted-foreground mb-6">{featuredRide.description}</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  <span>{featuredRide.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <span>{featuredRide.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <span>Starting at Banditz Bicycle Club, Braamfontein</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <span>Average {featuredRide.participants} participants</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button>RSVP for This Ride</Button>
                <Button variant="outline">View Route Map</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Rides */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Weekly Community Rides</h2>
              <p className="text-lg max-w-2xl mx-auto">
                Join our regular group rides throughout the week, suitable for cyclists of all levels. No registration
                required - just show up with your bike and helmet!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingRides.map((ride) => (
                <div key={ride.title} className="bg-background rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-48 w-full">
                    <Image src={ride.image || "/placeholder.svg"} alt={ride.title} fill className="object-cover" />
                    <div className="absolute top-2 left-2 space-x-2">
                      <span className="bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {ride.difficulty}
                      </span>
                      <span className="bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {ride.distance}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{ride.title}</h3>
                    <p className="text-muted-foreground mb-4">{ride.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        <span>{ride.date}</span>
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
                  <div className="px-6 pb-6">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Events */}
        <section className="py-16 container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Special Events</h2>
            <Button variant="outline">View All Events</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {specialEvents.map((event) => (
              <div key={event.title} className="border rounded-lg overflow-hidden bg-card flex flex-col md:flex-row">
                <div className="relative w-full md:w-2/5 h-48 md:h-auto">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button>Register Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ride Highlights */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Recent Ride Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentHighlights.map((highlight) => (
                <div key={highlight.title} className="bg-background rounded-lg overflow-hidden shadow-md group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div>{highlight.date}</div>
                      <div className="flex gap-3">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {highlight.participants}
                        </span>
                        <span>{highlight.distance}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href="#" className="text-primary font-medium text-sm flex items-center hover:underline">
                        View Photos
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline">View All Ride Recaps</Button>
            </div>
          </div>
        </section>

        {/* Strava Integration */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Track Your Rides with Strava</h2>
              <p className="text-lg mb-6">
                Join our Strava club to track your rides, connect with fellow cyclists, and participate in challenges.
                Follow the Banditz Bicycle Club on Strava to see our group rides and route recommendations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="m18 16 4-4-4-4"></path>
                      <path d="m6 8-4 4 4 4"></path>
                      <path d="m14.5 4-5 16"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Track Your Progress</h3>
                    <p className="text-muted-foreground">
                      See your improvements over time with detailed ride statistics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Join Our Community</h3>
                    <p className="text-muted-foreground">
                      Connect with other Banditz riders and see each other's activities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M12 2v20"></path>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Participate in Challenges</h3>
                    <p className="text-muted-foreground">
                      Join our monthly distance and elevation challenges with prizes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button className="bg-[#FC4C02] hover:bg-[#FC4C02]/90 text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" className="mr-2">
                    <path
                      fill="currentColor"
                      d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7.03 13.828h4.169"
                    ></path>
                  </svg>
                  Follow Us on Strava
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Strava Integration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Join Our Cycling Community?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to stay updated on upcoming rides, events, and cycling news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md flex-1 text-foreground"
                required
              />
              <Button className="bg-white text-primary hover:bg-white/90">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}


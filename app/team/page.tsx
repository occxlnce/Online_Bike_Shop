import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function TeamPage() {
  // Team members
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Team Captain & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Alex has been cycling professionally for over 15 years and founded Banditz Bicycle Club to share his passion with the community.",
      specialties: ["Road Cycling", "Group Coaching", "Business Strategy"],
      social: {
        instagram: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Sarah Miller",
      role: "Road Specialist & Co-Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With multiple race wins under her belt, Sarah leads our road cycling division and coordinates community events.",
      specialties: ["Race Training", "Nutrition", "Event Planning"],
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      name: "Michael Chen",
      role: "Mountain Bike Expert",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael has conquered some of the toughest trails worldwide and brings his technical expertise to our mountain biking section.",
      specialties: ["Trail Riding", "Bike Maintenance", "Suspension Setup"],
      social: {
        instagram: "#",
        facebook: "#",
      },
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Repairs & Maintenance",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With certification in bicycle mechanics, Emily ensures that all bikes at Banditz are maintained to the highest standards.",
      specialties: ["Mechanical Repairs", "Wheel Building", "Custom Builds"],
      social: {
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "David Patel",
      role: "Lead Bike Fitter",
      image: "/placeholder.svg?height=300&width=300",
      bio: "David specializes in biomechanics and helps cyclists achieve the perfect fit for maximum comfort and performance.",
      specialties: ["Biomechanics", "Injury Prevention", "Performance Optimization"],
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Lisa Wright",
      role: "Cycling Coach",
      image: "/placeholder.svg?height=300&width=300",
      bio: "A former Olympic cyclist, Lisa brings her professional experience to help riders of all levels improve their skills.",
      specialties: ["Endurance Training", "Sprint Techniques", "Race Strategy"],
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      name: "Trevor Harris",
      role: "Tour Guide & Events Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Trevor organizes all our group rides and cycling tours, creating memorable experiences for our community.",
      specialties: ["Route Planning", "Group Leadership", "Safety Protocols"],
      social: {
        instagram: "#",
        facebook: "#",
      },
    },
    {
      name: "Olivia Bennett",
      role: "Marketing & Community Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Olivia handles our social media presence and builds relationships within the local cycling community.",
      specialties: ["Social Media", "Content Creation", "Community Building"],
      social: {
        instagram: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[300px] w-full">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src="/placeholder.svg?height=300&width=1200"
            alt="Banditz Cycling Team"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Team</h1>
            <p className="text-xl text-white max-w-2xl">
              Meet the passionate cyclists, mechanics, and coaches behind Banditz Bicycle Club.
            </p>
          </div>
        </section>

        {/* Team Introduction */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Meet the Banditz Team</h2>
            <p className="text-lg">
              Our team combines years of cycling experience, technical knowledge, and a shared passion for bikes. From
              professional racers to certified mechanics, we're here to support your cycling journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty) => (
                        <span key={specialty} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {member.social.instagram && (
                      <a
                        href={member.social.instagram}
                        className="text-muted-foreground hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="text-muted-foreground hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </a>
                    )}
                    {member.social.facebook && (
                      <a
                        href={member.social.facebook}
                        className="text-muted-foreground hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="text-muted-foreground hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Join Our Team */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Passionate about cycling and looking for an opportunity to join our team? We're always on the lookout for
              enthusiastic individuals to join the Banditz family.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}


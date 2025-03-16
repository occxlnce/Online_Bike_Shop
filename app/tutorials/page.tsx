import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Play, Clock } from "lucide-react"

export default function TutorialsPage() {
  // Featured tutorial
  const featuredTutorial = {
    title: "How to Change a Flat Tire in 5 Minutes",
    description:
      "Learn the quickest and easiest way to change a flat tire on the go, saving you time and frustration during your rides.",
    image: "/placeholder.svg?height=400&width=800",
    videoUrl: "https://www.youtube.com/watch?v=eqR6nlZNeU8",
    author: "Alex Johnson",
    authorImage: "/placeholder.svg?height=100&width=100",
    duration: "5:32",
    views: "24K",
    date: "February 15, 2025",
  }

  // Tutorials
  const tutorials = [
    {
      title: "Basic Bike Maintenance for Beginners",
      description: "Learn essential maintenance tasks to keep your bike running smoothly.",
      image: "/placeholder.svg?height=300&width=400",
      videoUrl: "https://youtube.com/watch?v=example1",
      category: "Maintenance",
      duration: "8:45",
      views: "18K",
      date: "January 28, 2025",
    },
    {
      title: "How to Choose the Right Bike Size",
      description: "Find your perfect fit with this comprehensive sizing guide.",
      image: "/placeholder.svg?height=300&width=400",
      videoUrl: "https://youtube.com/watch?v=example2",
      category: "Buying Guide",
      duration: "6:20",
      views: "12K",
      date: "January 20, 2025",
    },
    {
      title: "Mastering Cycling Cadence",
      description: "Improve your efficiency and power with proper pedaling technique.",
      image: "/placeholder.svg?height=300&width=400",
      videoUrl: "https://youtube.com/watch?v=example3",
      category: "Training",
      duration: "10:15",
      views: "9.5K",
      date: "January 15, 2025",
    },
    {
      title: "Setting Up Disc Brakes",
      description: "Step-by-step guide to properly adjust your disc brakes for optimal performance.",
      image: "/placeholder.svg?height=300&width=400",
      videoUrl: "https://youtube.com/watch?v=example4",
      category: "Maintenance",
      duration: "12:30",
      views: "15K",
      date: "January 8, 2025",
    },
    {
      title: "Essential Cycling Safety Tips",
      description: "Stay safe on the road with these crucial cycling safety practices.",
      image: "/placeholder.svg?height=300&width=400",
      videoUrl: "https://youtube.com/watch?v=example5",
      category: "Safety",
      duration: "7:50",
      views: "22K",
      date: "December 30, 2024",
    },
    {
      title: "Winter Riding Preparation",
      description: "How to prepare your bike and yourself for cold weather cycling.",
      image: "/placeholder.svg?height=300&width=400",
      videoUrl: "https://youtube.com/watch?v=example6",
      category: "Seasonal",
      duration: "9:10",
      views: "11K",
      date: "December 22, 2024",
    },
  ]

  // Categories
  const categories = ["All", "Maintenance", "Buying Guide", "Training", "Safety", "Nutrition", "Seasonal"]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">Tutorial Videos</h1>
              <p className="text-lg mb-8">
                Learn cycling skills, maintenance tips, and expert advice from our experienced team.
              </p>
              <div className="relative max-w-md mx-auto">
                <Input placeholder="Search tutorials..." className="pr-10" />
                <Button size="icon" className="absolute right-1 top-1 h-8 w-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tutorial */}
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Tutorial</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-lg overflow-hidden aspect-video group">
              <Image
                src={featuredTutorial.image || "/placeholder.svg"}
                alt={featuredTutorial.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full h-16 w-16 transition-transform group-hover:scale-110"
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm font-medium px-2 py-1 rounded">
                {featuredTutorial.duration}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{featuredTutorial.title}</h3>
              <p className="text-muted-foreground mb-4">{featuredTutorial.description}</p>
              <div className="flex items-center mb-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={featuredTutorial.authorImage || "/placeholder.svg"}
                    alt={featuredTutorial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{featuredTutorial.author}</p>
                  <p className="text-xs text-muted-foreground">{featuredTutorial.date}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{featuredTutorial.duration}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye mr-1"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>{featuredTutorial.views} views</span>
                </div>
              </div>
              <div className="mt-6">
                <Button asChild>
                  <a href={featuredTutorial.videoUrl} target="_blank" rel="noopener noreferrer">
                    Watch Tutorial
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tutorial Categories */}
        <section className="container mx-auto px-4">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-2">
            {categories.map((category, index) => (
              <div
                key={category}
                className={`shrink-0 ${index === 0 ? "bg-primary text-white" : "bg-muted"} rounded-full px-4 py-2`}
              >
                <span className="text-sm font-medium">{category}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tutorial Grid */}
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">All Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <div key={tutorial.title} className="border rounded-lg overflow-hidden bg-card">
                <div className="relative aspect-video group">
                  <Image
                    src={tutorial.image || "/placeholder.svg"}
                    alt={tutorial.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                    {tutorial.category}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
                    {tutorial.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{tutorial.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{tutorial.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>{tutorial.date}</div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-eye mr-1"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span>{tutorial.views} views</span>
                    </div>
                  </div>
                </div>
                <div className="border-t px-4 py-3">
                  <a
                    href={tutorial.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium text-sm flex items-center hover:underline"
                  >
                    Watch on YouTube
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-external-link ml-1"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" x2="21" y1="14" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline">Load More Tutorials</Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg max-w-2xl mx-auto">Common questions about our tutorials and cycling techniques.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "How do I access the full tutorial library?",
                  answer:
                    "All tutorials are freely available on our website and YouTube channel. For exclusive content and early access to new tutorials, consider joining our membership program.",
                },
                {
                  question: "Can I request a specific tutorial topic?",
                  answer:
                    "We welcome tutorial requests from our community. Please send your suggestions through our contact form or comment on our YouTube videos.",
                },
                {
                  question: "Do you offer in-person maintenance workshops?",
                  answer:
                    "Yes, we host regular maintenance workshops at our store in Braamfontein. Check our events calendar for upcoming dates and registration information.",
                },
                {
                  question: "Are your tutorials suitable for complete beginners?",
                  answer:
                    "We create tutorials for all skill levels, from absolute beginners to advanced cyclists. Each video clearly indicates the skill level required at the beginning.",
                },
                {
                  question: "Can I download the tutorials for offline viewing?",
                  answer:
                    "While our website doesn't support downloads, you can use YouTube Premium to download our tutorials from our official YouTube channel for offline viewing.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-background rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comment/Feedback Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Leave Your Feedback</h2>
            <div className="p-6 border rounded-lg">
              <p className="mb-4">
                Have feedback on our tutorials or suggestions for new topics? We'd love to hear from you!
              </p>
              <Button>Sign In to Comment</Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}


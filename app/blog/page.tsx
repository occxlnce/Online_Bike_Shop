import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function BlogPage() {
  // Featured post
  const featuredPost = {
    title: "The Ultimate Guide to Choosing Your First Road Bike",
    excerpt:
      "Navigating the world of road cycling can be overwhelming for beginners. This comprehensive guide breaks down everything you need to know when selecting your first road bike, from frame materials to component groups.",
    image: "/placeholder.svg?height=400&width=800",
    date: "March 10, 2025",
    author: "Alex Johnson",
    authorImage: "/placeholder.svg?height=100&width=100",
    slug: "ultimate-guide-choosing-first-road-bike",
    category: "Buying Guide",
  }

  // Blog posts
  const blogPosts = [
    {
      title: "Essential Gear for Winter Cycling",
      excerpt: "Stay warm and safe during the cold months with these must-have items for winter riding.",
      image: "/placeholder.svg?height=300&width=400",
      date: "February 15, 2025",
      author: "Sarah Miller",
      slug: "essential-gear-winter-cycling",
      category: "Gear",
      readTime: "6 min read",
    },
    {
      title: "Beginner's Guide to Mountain Biking",
      excerpt: "Everything you need to know before hitting the trails for the first time.",
      image: "/placeholder.svg?height=300&width=400",
      date: "February 8, 2025",
      author: "Michael Chen",
      slug: "beginners-guide-mountain-biking",
      category: "Guides",
      readTime: "8 min read",
    },
    {
      title: "Maintenance Tips for Your Road Bike",
      excerpt: "Keep your bike in top condition with these simple maintenance routines.",
      image: "/placeholder.svg?height=300&width=400",
      date: "January 30, 2025",
      author: "Emily Rodriguez",
      slug: "maintenance-tips-road-bike",
      category: "Maintenance",
      readTime: "5 min read",
    },
    {
      title: "5 Epic Cycling Routes Around Johannesburg",
      excerpt: "Discover the most scenic and challenging rides in and around the city.",
      image: "/placeholder.svg?height=300&width=400",
      date: "January 25, 2025",
      author: "Alex Johnson",
      slug: "epic-cycling-routes-johannesburg",
      category: "Routes",
      readTime: "7 min read",
    },
    {
      title: "Nutrition for Cyclists: What to Eat Before, During, and After Rides",
      excerpt: "Optimize your performance and recovery with proper nutrition strategies.",
      image: "/placeholder.svg?height=300&width=400",
      date: "January 18, 2025",
      author: "Sarah Miller",
      slug: "nutrition-cyclists-eat-before-during-after",
      category: "Nutrition",
      readTime: "9 min read",
    },
    {
      title: "The Rise of Gravel Biking: Why It's Taking Over",
      excerpt: "Explore the growing trend of gravel biking and why so many cyclists are making the switch.",
      image: "/placeholder.svg?height=300&width=400",
      date: "January 10, 2025",
      author: "Michael Chen",
      slug: "rise-gravel-biking-taking-over",
      category: "Trends",
      readTime: "6 min read",
    },
  ]

  // Categories
  const categories = [
    { name: "All", count: 28 },
    { name: "Guides", count: 8 },
    { name: "Gear", count: 7 },
    { name: "Maintenance", count: 5 },
    { name: "Routes", count: 4 },
    { name: "Nutrition", count: 3 },
    { name: "Events", count: 4 },
    { name: "Trends", count: 3 },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">Banditz Blog</h1>
              <p className="text-lg mb-8">
                News, tips, and stories from the cycling community. Learn about maintenance, gear, routes, and more.
              </p>
              <div className="relative max-w-md mx-auto">
                <Input placeholder="Search articles..." className="pr-10" />
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

        {/* Featured Post */}
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 lg:col-span-8">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-5 lg:col-span-4">
              <div className="h-full flex flex-col">
                <div className="space-y-2 mb-4">
                  <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block">
                    {featuredPost.category}
                  </div>
                  <h3 className="text-2xl font-bold">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={featuredPost.authorImage || "/placeholder.svg"}
                        alt={featuredPost.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{featuredPost.author}</p>
                      <p className="text-xs text-muted-foreground">{featuredPost.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      Read <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Categories */}
        <section className="container mx-auto px-4">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-2">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`shrink-0 ${index === 0 ? "bg-primary text-white" : "bg-muted"} rounded-full px-4 py-2`}
              >
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs ml-1 opacity-70">({category.count})</span>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="rounded-lg overflow-hidden border bg-card transition-all hover:shadow-md h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <p className="text-sm font-medium">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">{post.readTime}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline">Load More Articles</Button>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Subscribe to Our Newsletter</h2>
            <p className="mb-8 max-w-lg mx-auto">
              Get the latest cycling tips, gear reviews, and Banditz updates delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md flex-1 text-foreground border-0"
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


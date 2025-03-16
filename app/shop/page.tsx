"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid3X3, List } from "lucide-react"

export default function ShopPage() {
  // Mock products data
  const products = [
    {
      id: 1,
      name: "Urban Commuter",
      price: 899,
      image: "/placeholder.svg?height=300&width=300",
      category: "Road Bike",
      rating: 4.5,
      reviewCount: 32,
    },
    {
      id: 2,
      name: "Mountain Explorer",
      price: 1299,
      image: "/placeholder.svg?height=300&width=300",
      category: "Mountain Bike",
      rating: 4.8,
      reviewCount: 48,
    },
    {
      id: 3,
      name: "Speed Demon",
      price: 1599,
      image: "/placeholder.svg?height=300&width=300",
      category: "Racing Bike",
      rating: 4.7,
      reviewCount: 56,
    },
    {
      id: 4,
      name: "City Cruiser",
      price: 749,
      image: "/placeholder.svg?height=300&width=300",
      category: "Hybrid Bike",
      rating: 4.3,
      reviewCount: 24,
    },
    {
      id: 5,
      name: "Trail Blazer",
      price: 1099,
      image: "/placeholder.svg?height=300&width=300",
      category: "Mountain Bike",
      rating: 4.6,
      reviewCount: 38,
    },
    {
      id: 6,
      name: "Road Master",
      price: 1899,
      image: "/placeholder.svg?height=300&width=300",
      category: "Road Bike",
      rating: 4.9,
      reviewCount: 67,
    },
    {
      id: 7,
      name: "Eco Rider",
      price: 649,
      image: "/placeholder.svg?height=300&width=300",
      category: "Hybrid Bike",
      rating: 4.2,
      reviewCount: 19,
    },
    {
      id: 8,
      name: "Pro Racer",
      price: 2499,
      image: "/placeholder.svg?height=300&width=300",
      category: "Racing Bike",
      rating: 4.8,
      reviewCount: 72,
    },
    {
      id: 9,
      name: "Adventure X",
      price: 1199,
      image: "/placeholder.svg?height=300&width=300",
      category: "Mountain Bike",
      rating: 4.5,
      reviewCount: 41,
    },
    {
      id: 10,
      name: "Urban Lite",
      price: 799,
      image: "/placeholder.svg?height=300&width=300",
      category: "City Bike",
      rating: 4.4,
      reviewCount: 35,
    },
    {
      id: 11,
      name: "Gravel King",
      price: 1799,
      image: "/placeholder.svg?height=300&width=300",
      category: "Gravel Bike",
      rating: 4.7,
      reviewCount: 29,
    },
    {
      id: 12,
      name: "Electric Commuter",
      price: 2299,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electric Bike",
      rating: 4.6,
      reviewCount: 53,
    },
  ]

  // Categories
  const categories = [
    { id: "bikes", label: "Bikes", count: 42 },
    { id: "accessories", label: "Accessories", count: 86 },
    { id: "apparel", label: "Apparel", count: 64 },
    { id: "parts", label: "Parts", count: 128 },
  ]

  // Brands
  const brands = [
    { id: "banditz", label: "Banditz", count: 37 },
    { id: "speedx", label: "SpeedX", count: 24 },
    { id: "mountainpro", label: "MountainPro", count: 18 },
    { id: "urbanride", label: "UrbanRide", count: 32 },
    { id: "ecobike", label: "EcoBike", count: 15 },
  ]

  // Price ranges
  const priceRanges = [
    { id: "under-500", label: "Under $500", count: 24 },
    { id: "500-1000", label: "$500 - $1000", count: 36 },
    { id: "1000-1500", label: "$1000 - $1500", count: 28 },
    { id: "1500-plus", label: "$1500+", count: 42 },
  ]

  // Bike types
  const bikeTypes = [
    { id: "road", label: "Road Bikes", count: 18 },
    { id: "mountain", label: "Mountain Bikes", count: 24 },
    { id: "hybrid", label: "Hybrid Bikes", count: 15 },
    { id: "electric", label: "Electric Bikes", count: 12 },
    { id: "gravel", label: "Gravel Bikes", count: 8 },
    { id: "city", label: "City Bikes", count: 14 },
    { id: "racing", label: "Racing Bikes", count: 9 },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="relative h-[200px] w-full bg-gradient-to-r from-primary/90 to-primary">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Shop the Banditz Collection</h1>
            <p className="text-white/90 max-w-2xl">
              Find premium bicycles, accessories, and cycling gear for every type of rider and terrain.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="sticky top-20 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`category-${category.id}`} />
                          <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                        </div>
                        <span className="text-xs text-muted-foreground">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`price-${range.id}`} />
                          <Label htmlFor={`price-${range.id}`}>{range.label}</Label>
                        </div>
                        <span className="text-xs text-muted-foreground">({range.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Brand</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`brand-${brand.id}`} />
                          <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
                        </div>
                        <span className="text-xs text-muted-foreground">({brand.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Bike Type</h3>
                  <div className="space-y-2">
                    {bikeTypes.map((type) => (
                      <div key={type.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`type-${type.id}`} />
                          <Label htmlFor={`type-${type.id}`}>{type.label}</Label>
                        </div>
                        <span className="text-xs text-muted-foreground">({type.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">All Products (130)</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <div className="w-full sm:w-auto">
                    <Select defaultValue="featured">
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="best-rating">Best Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Tabs defaultValue="grid" className="w-full sm:w-auto">
                    <TabsList>
                      <TabsTrigger value="grid">
                        <Grid3X3 className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="list">
                        <List className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <Tabs defaultValue="grid" className="w-full">
                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <Link key={product.id} href={`/shop/product/${product.id}`} className="group">
                        <div className="rounded-lg overflow-hidden border bg-card transition-all hover:shadow-md">
                          <div className="relative h-64 w-full overflow-hidden">
                            <div className="absolute top-2 right-2 z-10 space-y-1">
                              <Button
                                variant="secondary"
                                size="icon"
                                className="h-8 w-8 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.preventDefault()
                                  // Add to wishlist functionality
                                }}
                              >
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
                                  className="lucide lucide-heart"
                                >
                                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                                <span className="sr-only">Add to Wishlist</span>
                              </Button>
                              <Button
                                variant="secondary"
                                size="icon"
                                className="h-8 w-8 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.preventDefault()
                                  // Quick view functionality
                                }}
                              >
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
                                  className="lucide lucide-eye"
                                >
                                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                                <span className="sr-only">Quick View</span>
                              </Button>
                            </div>
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                              <div className="flex items-center text-sm">
                                <svg className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" viewBox="0 0 24 24">
                                  <path
                                    fill="currentColor"
                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                  />
                                </svg>
                                <span>{product.rating}</span>
                                <span className="text-muted-foreground ml-1">({product.reviewCount})</span>
                              </div>
                            </div>
                            <h3 className="font-semibold text-lg mt-1 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                            <div className="flex items-center justify-between mt-2">
                              <p className="font-bold">${product.price}</p>
                              <Button
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.preventDefault()
                                  // Add to cart functionality
                                }}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="list" className="mt-0">
                  <div className="space-y-4">
                    {products.slice(0, 6).map((product) => (
                      <div
                        key={product.id}
                        className="flex flex-col sm:flex-row border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-64 sm:h-auto sm:w-48 md:w-64">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <div className="flex items-center text-sm">
                              <svg className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                />
                              </svg>
                              <span>{product.rating}</span>
                              <span className="text-muted-foreground ml-1">({product.reviewCount})</span>
                            </div>
                          </div>
                          <h3 className="font-semibold text-xl mt-1">
                            <Link href={`/shop/product/${product.id}`} className="hover:text-primary transition-colors">
                              {product.name}
                            </Link>
                          </h3>
                          <p className="text-muted-foreground mt-2 flex-1">
                            Premium quality {product.category.toLowerCase()} designed for maximum performance and
                            comfort. Perfect for both beginners and experienced cyclists.
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <p className="font-bold text-xl">${product.price}</p>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
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
                                  className="lucide lucide-heart mr-1"
                                >
                                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                                Wishlist
                              </Button>
                              <Button>Add to Cart</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary text-white hover:bg-primary/90">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


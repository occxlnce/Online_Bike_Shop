"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Truck, ShieldCheck, ArrowLeft, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const cart = useCart()

  // Mock product data - in a real app, this would come from Supabase
  const product = {
    id: Number.parseInt(params.id),
    name: "Urban Commuter Pro",
    price: 899,
    description:
      "The Urban Commuter Pro is designed for city riders who demand performance and style. With a lightweight aluminum frame, responsive handling, and comfortable riding position, it's perfect for navigating busy streets and daily commutes.",
    features: [
      "Lightweight aluminum frame",
      "Shimano 8-speed drivetrain",
      "Hydraulic disc brakes",
      "Puncture-resistant tires",
      "Integrated LED lighting",
      "Comfortable ergonomic grips",
    ],
    specifications: {
      frame: "6061 Aluminum",
      fork: "Carbon fiber",
      drivetrain: "Shimano Altus",
      brakes: "Hydraulic disc",
      wheels: "700c double-wall",
      tires: "700x32c puncture-resistant",
      weight: "10.5 kg (23.1 lbs)",
    },
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600&text=Image+2",
      "/placeholder.svg?height=600&width=600&text=Image+3",
      "/placeholder.svg?height=600&width=600&text=Image+4",
    ],
    category: "Road Bike",
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    colors: ["Black", "Red", "Blue"],
    sizes: ["S", "M", "L", "XL"],
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addToCart = () => {
    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to shop
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg border">
              <Image
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-24 overflow-hidden rounded-md border cursor-pointer ${
                    activeImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to Wishlist</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold">${product.price}</p>
              <p className="text-sm text-muted-foreground mt-1">Free shipping on orders over $100</p>
            </div>

            <div className="space-y-4">
              <p>{product.description}</p>
              <ul className="space-y-2">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="font-medium">Color</p>
                <p className="text-sm text-muted-foreground">Select a color</p>
              </div>
              <div className="flex space-x-2">
                {product.colors.map((color, index) => (
                  <div
                    key={color}
                    className={`h-10 w-10 rounded-full border cursor-pointer flex items-center justify-center ${
                      index === 0 ? "ring-2 ring-primary" : ""
                    }`}
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "black"
                          ? "black"
                          : color.toLowerCase() === "red"
                            ? "#e11d48"
                            : "#3b82f6",
                    }}
                  >
                    {index === 0 && <div className="h-2 w-2 rounded-full bg-white"></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="font-medium">Size</p>
                <p className="text-sm text-primary hover:underline cursor-pointer">Size Guide</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <div
                    key={size}
                    className={`h-10 min-w-[2.5rem] px-3 rounded-md border cursor-pointer flex items-center justify-center font-medium ${
                      index === 1 ? "bg-primary text-white" : "hover:border-primary"
                    }`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <button onClick={decrementQuantity} className="px-3 py-1 text-lg" disabled={quantity <= 1}>
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{quantity}</span>
                  <button onClick={incrementQuantity} className="px-3 py-1 text-lg">
                    +
                  </button>
                </div>
                <Button className="flex-1" onClick={addToCart}>
                  Add to Cart
                </Button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-sm">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-sm">2-year warranty on all bikes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6">
              <div className="space-y-4">
                <p>
                  The Urban Commuter Pro is designed for city riders who demand performance and style. With a
                  lightweight aluminum frame, responsive handling, and comfortable riding position, it's perfect for
                  navigating busy streets and daily commutes.
                </p>
                <p>
                  Whether you're commuting to work, running errands, or enjoying a weekend ride, the Urban Commuter Pro
                  offers the perfect blend of speed, comfort, and durability. The integrated LED lighting system ensures
                  visibility in low-light conditions, while the puncture-resistant tires minimize the risk of flats.
                </p>
                <h3 className="text-lg font-semibold mt-6 mb-2">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-primary mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 py-2 border-b">
                        <span className="font-medium capitalize">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Sizing Guide</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium">Height</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Frame Size</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-2">5'0" - 5'3"</td>
                          <td className="px-4 py-2">XS (48cm)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">5'3" - 5'6"</td>
                          <td className="px-4 py-2">S (52cm)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">5'6" - 5'9"</td>
                          <td className="px-4 py-2">M (56cm)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">5'9" - 6'0"</td>
                          <td className="px-4 py-2">L (58cm)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">6'0" - 6'3"</td>
                          <td className="px-4 py-2">XL (61cm)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">Based on {product.reviewCount} reviews</span>
                    </div>
                  </div>
                  <Button>Write a Review</Button>
                </div>

                {/* Sample reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Alex Johnson",
                      date: "2 months ago",
                      rating: 5,
                      comment:
                        "This bike exceeded my expectations! The build quality is excellent, and it handles beautifully in city traffic. The disc brakes provide confident stopping power, and the gearing is perfect for urban riding. Highly recommended!",
                    },
                    {
                      name: "Sarah Miller",
                      date: "3 months ago",
                      rating: 4,
                      comment:
                        "Great commuter bike that's comfortable for daily use. The only reason I'm giving 4 stars instead of 5 is that the seat was a bit uncomfortable for me, but that's an easy fix. Otherwise, it's a fantastic bike for the price.",
                    },
                    {
                      name: "Michael Chen",
                      date: "1 month ago",
                      rating: 5,
                      comment:
                        "Perfect for my daily commute! The integrated lights are super convenient, and the bike feels very stable even when carrying a loaded backpack. Assembly was straightforward, and the bike arrived well-packaged.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
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
              {
                id: 5,
                name: "Trail Blazer",
                price: 1099,
                image: "/placeholder.svg?height=300&width=300",
                category: "Mountain Bike",
              },
            ].map((product) => (
              <Link key={product.id} href={`/shop/product/${product.id}`} className="group">
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
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


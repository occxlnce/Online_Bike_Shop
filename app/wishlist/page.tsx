"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export default function WishlistPage() {
  const cart = useCart()

  // Mock wishlist data - in a real app, this would come from Supabase
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Urban Commuter Pro",
      price: 899,
      image: "/placeholder.svg?height=200&width=200",
      category: "Road Bike",
      inStock: true,
    },
    {
      id: 3,
      name: "Speed Demon",
      price: 1599,
      image: "/placeholder.svg?height=200&width=200",
      category: "Racing Bike",
      inStock: true,
    },
    {
      id: 5,
      name: "Trail Blazer",
      price: 1099,
      image: "/placeholder.svg?height=200&width=200",
      category: "Mountain Bike",
      inStock: false,
    },
    {
      id: 8,
      name: "Pro Racer",
      price: 2499,
      image: "/placeholder.svg?height=200&width=200",
      category: "Racing Bike",
      inStock: true,
    },
  ])

  const removeItem = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  const addToCart = (item: any) => {
    cart.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
    // Optionally remove from wishlist after adding to cart
    // removeItem(item.id)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-muted inline-flex rounded-full p-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your wishlist yet.
            </p>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <Link href={`/shop/product/${item.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="font-bold mt-2">${item.price}</p>
                      {!item.inStock && <p className="text-destructive text-sm mt-2">Currently Out of Stock</p>}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                      <Button
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t">
              <Button variant="outline" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button onClick={() => wishlistItems.forEach((item) => item.inStock && addToCart(item))}>
                Add All to Cart
              </Button>
            </div>
          </div>
        )}

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
                id: 4,
                name: "City Cruiser",
                price: 749,
                image: "/placeholder.svg?height=300&width=300",
                category: "Hybrid Bike",
              },
              {
                id: 6,
                name: "Road Master",
                price: 1899,
                image: "/placeholder.svg?height=300&width=300",
                category: "Road Bike",
              },
              {
                id: 7,
                name: "Eco Rider",
                price: 649,
                image: "/placeholder.svg?height=300&width=300",
                category: "Hybrid Bike",
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


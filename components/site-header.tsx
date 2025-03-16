"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const cart = useCart()

  // Update the routes array to include all main navigation items
  const routes = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/rides", label: "Rides" },
    { href: "/blog", label: "Blog" },
    { href: "/tutorials", label: "Tutorials" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">BANDITZ</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href ? "text-primary" : "text-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Input type="search" placeholder="Search products..." className="pr-8" />
          </div>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </Link>
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <span className="text-xl font-bold text-primary">BANDITZ</span>
            </Link>
            <nav className="flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === route.href ? "text-primary" : "text-foreground",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              <Link
                href="/cart"
                className="flex items-center gap-2 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="h-4 w-4" />
                Cart {cart.itemCount > 0 && `(${cart.itemCount})`}
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-2 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-4 w-4" />
                Account
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}


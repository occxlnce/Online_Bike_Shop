"use client"

import { usePathname } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Package, CreditCard, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export function AccountSidebar() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const menuItems = [
    {
      name: "Profile",
      href: "/account",
      icon: <User className="h-4 w-4 mr-2" />,
      exact: true,
    },
    {
      name: "Orders",
      href: "/account/orders",
      icon: <Package className="h-4 w-4 mr-2" />,
    },
    {
      name: "Payment Methods",
      href: "/account/payment",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
    },
    {
      name: "Account Settings",
      href: "/account/settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
  ]

  const isActive = (item: { href: string; exact?: boolean }) => {
    if (item.exact) {
      return pathname === item.href
    }
    return pathname.startsWith(item.href)
  }

  return (
    <div className="w-full md:w-64">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <nav className="flex flex-col">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm ${
                  isActive(item) ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button variant="outline" className="w-full" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Box,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  Truck,
  Users,
  Palette,
} from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
    submenu?: {
      href: string
      title: string
    }[]
  }[]
}

export function AdminSidebar({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: <Package className="h-5 w-5" />,
      submenu: [
        {
          title: "All Products",
          href: "/admin/products",
        },
        {
          title: "Add New",
          href: "/admin/products/new",
        },
        {
          title: "Categories",
          href: "/admin/products/categories",
        },
        {
          title: "Brands",
          href: "/admin/products/brands",
        },
        {
          title: "Attributes",
          href: "/admin/products/attributes",
        },
      ],
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      submenu: [
        {
          title: "All Orders",
          href: "/admin/orders",
        },
        {
          title: "Abandoned Carts",
          href: "/admin/orders/abandoned",
        },
      ],
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Content",
      href: "/admin/content",
      icon: <FileText className="h-5 w-5" />,
      submenu: [
        {
          title: "Blog Posts",
          href: "/admin/content/blog",
        },
        {
          title: "Tutorials",
          href: "/admin/content/tutorials",
        },
        {
          title: "Pages",
          href: "/admin/content/pages",
        },
        {
          title: "Media Library",
          href: "/admin/content/media",
        },
      ],
    },
    {
      title: "Marketing",
      href: "/admin/marketing",
      icon: <Tag className="h-5 w-5" />,
      submenu: [
        {
          title: "Coupons",
          href: "/admin/marketing/coupons",
        },
        {
          title: "Promotions",
          href: "/admin/marketing/promotions",
        },
        {
          title: "Email Campaigns",
          href: "/admin/marketing/email",
        },
      ],
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      submenu: [
        {
          title: "Sales",
          href: "/admin/analytics/sales",
        },
        {
          title: "Traffic",
          href: "/admin/analytics/traffic",
        },
        {
          title: "Customer Behavior",
          href: "/admin/analytics/behavior",
        },
      ],
    },
    {
      title: "Appearance",
      href: "/admin/appearance",
      icon: <Palette className="h-5 w-5" />,
      submenu: [
        {
          title: "Themes",
          href: "/admin/appearance/themes",
        },
        {
          title: "Customize",
          href: "/admin/appearance/customize",
        },
        {
          title: "Navigation",
          href: "/admin/appearance/navigation",
        },
      ],
    },
    {
      title: "Shipping",
      href: "/admin/shipping",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: "Inventory",
      href: "/admin/inventory",
      icon: <Box className="h-5 w-5" />,
    },
    {
      title: "Support",
      href: "/admin/support",
      icon: <MessageSquare className="h-5 w-5" />,
      submenu: [
        {
          title: "Tickets",
          href: "/admin/support/tickets",
        },
        {
          title: "Knowledge Base",
          href: "/admin/support/knowledge-base",
        },
      ],
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
      submenu: [
        {
          title: "General",
          href: "/admin/settings/general",
        },
        {
          title: "Users",
          href: "/admin/settings/users",
        },
        {
          title: "Payments",
          href: "/admin/settings/payments",
        },
        {
          title: "Taxes",
          href: "/admin/settings/taxes",
        },
        {
          title: "Integrations",
          href: "/admin/settings/integrations",
        },
      ],
    },
  ]

  return (
    <nav className={cn("space-y-1 py-4", className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <div key={item.href} className="px-3 py-1">
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                isActive ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              {item.icon}
              {item.title}
            </Link>

            {item.submenu && isActive && (
              <div className="mt-1 ml-4 space-y-1 border-l pl-6">
                {item.submenu.map((subitem) => {
                  const isSubActive = pathname === subitem.href

                  return (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className={cn(
                        "block py-1 text-sm transition-colors hover:text-primary",
                        isSubActive ? "font-medium text-primary" : "text-muted-foreground",
                      )}
                    >
                      {subitem.title}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}


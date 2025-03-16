"use client"

import type React from "react"

import { AdminSidebar } from "./admin-sidebar"
import { useAdminAuth } from "@/contexts/admin-auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, adminUser, loading, signOut } = useAdminAuth()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Redirect if not admin
  useEffect(() => {
    if (isMounted && !loading && !adminUser) {
      router.push("/admin/login")
    }
  }, [isMounted, loading, adminUser, router])

  if (loading || !isMounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!adminUser) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <AdminSidebar className="hidden lg:flex" />

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden absolute left-4 top-4 z-50">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <AdminSidebar className="w-full border-none" />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center justify-end gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={user?.email || "Admin"} />
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "A"}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-flex">{user?.email}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/admin/settings">Settings</a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}


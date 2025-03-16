"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Bell, Menu, Search, User, Settings, LogOut, Moon, Sun } from "lucide-react"
import { useAdminAuth } from "@/contexts/admin-auth-context"
import { useTheme } from "next-themes"

export function AdminHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { user, signOut } = useAdminAuth()
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2 lg:gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <span className="text-primary text-xl hidden md:inline-block">BANDITZ</span>
          <span className="text-primary text-xl md:hidden">B</span>
          <span className="text-sm text-muted-foreground hidden lg:inline-block">Admin Dashboard</span>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="hidden md:flex relative max-w-sm flex-1 mx-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/notifications">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.email}</span>
                <span className="text-xs text-muted-foreground">Administrator</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}


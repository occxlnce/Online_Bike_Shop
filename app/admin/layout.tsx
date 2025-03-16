import type React from "react"
import { AdminAuthProvider } from "@/contexts/admin-auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"

export const metadata = {
  title: "Admin Dashboard | Banditz Bicycle Club",
  description: "Admin dashboard for Banditz Bicycle Club",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AdminAuthProvider>{children}</AdminAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


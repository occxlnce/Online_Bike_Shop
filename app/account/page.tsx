"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { AccountSidebar } from "@/components/account-sidebar"
import { DatabaseSetup } from "@/components/database-setup"

export default function AccountPage() {
  const { user, profile, loading, refreshProfile } = useAuth()
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [dbError, setDbError] = useState<boolean>(false)
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [loading, user, router])

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUpdating(true)
    setError(null)
    setSuccess(null)

    try {
      if (!user) throw new Error("Not authenticated")

      const formData = new FormData(e.currentTarget)
      const firstName = formData.get("firstName") as string
      const lastName = formData.get("lastName") as string
      const phoneNumber = formData.get("phoneNumber") as string

      try {
        const { error } = await supabase
          .from("profiles")
          .update({
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id)

        if (error) {
          if (error.code === "PGRST116") {
            setDbError(true)
            throw new Error("Database not set up properly")
          }
          throw error
        }

        await refreshProfile()
        setSuccess("Profile updated successfully")
      } catch (error: any) {
        if (error.message.includes("relation") && error.message.includes("does not exist")) {
          setDbError(true)
          throw new Error("Database not set up properly")
        }
        throw error
      }
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setError(error.message || "Failed to update profile")
    } finally {
      setUpdating(false)
    }
  }

  const handleDatabaseSetupComplete = () => {
    setDbError(false)
    window.location.reload() // Reload the page to reinitialize everything
  }

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // Redirect if not logged in
  if (!user) {
    return null // Will redirect in useEffect
  }

  // Show database setup if needed
  if (dbError) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <DatabaseSetup onSetupComplete={handleDatabaseSetupComplete} />
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <AccountSidebar />
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert className="mb-4 border-green-500 text-green-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email} disabled />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" name="firstName" defaultValue={profile?.first_name || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" name="lastName" defaultValue={profile?.last_name || ""} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone number</Label>
                    <Input id="phoneNumber" name="phoneNumber" defaultValue={profile?.phone_number || ""} />
                  </div>
                  <Button type="submit" disabled={updating}>
                    {updating ? "Saving..." : "Save changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


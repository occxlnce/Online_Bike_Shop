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
import { validatePassword, isPasswordValid } from "@/lib/password-validation"
import type { PasswordRequirements } from "@/types/user"
import { useAuth } from "@/contexts/auth-context"
import { AccountSidebar } from "@/components/account-sidebar"

export default function AccountSettingsPage() {
  const { user, loading, updatePassword } = useAuth()
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirements>({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false,
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [loading, user, router])

  useEffect(() => {
    setPasswordRequirements(validatePassword(newPassword))
  }, [newPassword])

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUpdating(true)
    setError(null)
    setSuccess(null)

    try {
      if (newPassword !== confirmPassword) {
        throw new Error("New passwords do not match")
      }

      if (!isPasswordValid(passwordRequirements)) {
        throw new Error("Password does not meet requirements")
      }

      const { error } = await updatePassword(newPassword)
      if (error) throw error

      setSuccess("Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      console.error("Error updating password:", error)
      setError(error.message || "Failed to update password")
    } finally {
      setUpdating(false)
    }
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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <AccountSidebar />
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert className="border-green-500 text-green-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div>
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm new password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Password Requirements:</p>
                      <ul className="text-sm space-y-1">
                        <li
                          className={`flex items-center gap-2 ${passwordRequirements.minLength ? "text-green-500" : "text-muted-foreground"}`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          At least 8 characters
                        </li>
                        <li
                          className={`flex items-center gap-2 ${passwordRequirements.hasUppercase ? "text-green-500" : "text-muted-foreground"}`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          One uppercase letter
                        </li>
                        <li
                          className={`flex items-center gap-2 ${passwordRequirements.hasLowercase ? "text-green-500" : "text-muted-foreground"}`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          One lowercase letter
                        </li>
                        <li
                          className={`flex items-center gap-2 ${passwordRequirements.hasNumber ? "text-green-500" : "text-muted-foreground"}`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          One number
                        </li>
                        <li
                          className={`flex items-center gap-2 ${passwordRequirements.hasSymbol ? "text-green-500" : "text-muted-foreground"}`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          One special character
                        </li>
                      </ul>
                    </div>

                    <Button type="submit" disabled={updating || !isPasswordValid(passwordRequirements)}>
                      {updating ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">Delete Account</h3>
                  <p className="text-muted-foreground mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


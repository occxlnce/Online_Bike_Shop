"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function AdminSetup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [adminExists, setAdminExists] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if admin already exists
    const checkAdmin = async () => {
      try {
        const { count, error } = await supabase.from("admin_users").select("*", { count: "exact", head: true })

        if (error) throw error
        setAdminExists(count ? count > 0 : false)
      } catch (error) {
        console.error("Error checking admin existence:", error)
        setMessage({
          type: "error",
          text: "Error checking if admin exists. The admin_users table might not exist yet.",
        })
      }
    }

    checkAdmin()
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // 1. Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      // 2. Check if user was created or if it's an existing user
      if (authData.user) {
        // 3. Try to make this user a super admin
        await makeUserSuperAdmin(email)
      } else {
        setMessage({
          type: "error",
          text: "User creation failed or email confirmation is required. Please check your email.",
        })
      }
    } catch (error: any) {
      console.error("Error in signup process:", error)
      setMessage({
        type: "error",
        text: error.message || "An error occurred during signup",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDirectSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      await makeUserSuperAdmin(email)
    } catch (error: any) {
      console.error("Error in direct setup:", error)
      setMessage({
        type: "error",
        text: error.message || "An error occurred during setup",
      })
    } finally {
      setLoading(false)
    }
  }

  const makeUserSuperAdmin = async (adminEmail: string) => {
    try {
      // Try using the RPC function first
      const { data: rpcData, error: rpcError } = await supabase.rpc("create_first_super_admin", {
        admin_email: adminEmail,
      })

      if (rpcError) {
        console.warn("RPC function failed, trying direct SQL approach:", rpcError)

        // If RPC fails, try direct SQL approach
        const { data: userData, error: userError } = await supabase
          .from("auth.users")
          .select("id")
          .eq("email", adminEmail)
          .single()

        if (userError) throw new Error(`User not found: ${userError.message}`)

        // Check if admin_users table exists
        const { error: tableCheckError } = await supabase
          .from("admin_users")
          .select("id", { count: "exact", head: true })

        if (tableCheckError && tableCheckError.code === "42P01") {
          // Table doesn't exist, create it
          const createTableSQL = `
            CREATE TABLE IF NOT EXISTS admin_users (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
              role TEXT NOT NULL DEFAULT 'editor',
              is_super_admin BOOLEAN DEFAULT false,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
          `

          const { error: createError } = await supabase.rpc("exec", { sql: createTableSQL })
          if (createError) throw new Error(`Failed to create admin_users table: ${createError.message}`)
        }

        // Insert admin user directly
        const { error: insertError } = await supabase.from("admin_users").insert({
          user_id: userData.id,
          role: "super_admin",
          is_super_admin: true,
        })

        if (insertError) throw new Error(`Failed to insert admin user: ${insertError.message}`)
      }

      setMessage({
        type: "success",
        text: "Super admin created successfully! You can now log in to the admin dashboard.",
      })

      // Redirect to admin login after 3 seconds
      setTimeout(() => {
        router.push("/admin/login")
      }, 3000)
    } catch (error: any) {
      console.error("Error making user super admin:", error)
      throw error
    }
  }

  if (adminExists) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Already Exists</CardTitle>
            <CardDescription>An admin user has already been set up for this system.</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Admin Setup Complete</AlertTitle>
              <AlertDescription>Please use the admin login page to access the dashboard.</AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/admin/login")}>
              Go to Admin Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Setup</CardTitle>
          <CardDescription>Create the first super admin account for your e-commerce platform.</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className={`mb-4 ${message.type === "error" ? "bg-red-50" : "bg-green-50"}`}>
              {message.type === "error" ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              )}
              <AlertTitle>{message.type === "error" ? "Error" : "Success"}</AlertTitle>
              <AlertDescription className={message.type === "error" ? "text-red-700" : "text-green-700"}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-gray-500">Password must be at least 8 characters long.</p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Admin Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Already have an account?</p>
            <Button variant="outline" className="mt-2 w-full" onClick={handleDirectSetup} disabled={loading}>
              {loading ? "Processing..." : "Make Existing User Admin"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


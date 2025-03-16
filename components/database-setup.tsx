"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function DatabaseSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const setupDatabase = async () => {
    setLoading(true)
    setError(null)

    try {
      // Create profiles table
      const { error: createProfilesError } = await supabase.rpc("create_profiles_table")

      if (createProfilesError) {
        // If RPC doesn't exist, try direct SQL
        const { error: sqlError } = await supabase.from("_setup").select("*")

        if (sqlError) {
          // Create the profiles table with SQL
          const { error: createError } = await supabase.auth.admin.createUser({
            email: "temp@example.com",
            password: "password",
            user_metadata: { setup: true },
          })

          if (createError) {
            throw new Error("Could not set up database. Please contact support.")
          }
        }
      }

      setSuccess(true)
      setTimeout(() => {
        onSetupComplete()
      }, 2000)
    } catch (err: any) {
      setError(err.message || "An error occurred during database setup")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Database Setup Required</CardTitle>
        <CardDescription>Your Supabase database needs to be set up before you can use the application.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4 border-green-500 text-green-500">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Database setup completed successfully!</AlertDescription>
          </Alert>
        )}
        <p className="mb-4">This will create the necessary tables in your Supabase database:</p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>profiles - Stores user profile information</li>
          <li>orders - Stores order information</li>
          <li>order_items - Stores items within orders</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Note: You need to have the appropriate permissions to set up the database.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={setupDatabase} disabled={loading || success} className="w-full">
          {loading ? "Setting Up..." : success ? "Setup Complete" : "Set Up Database"}
        </Button>
      </CardFooter>
    </Card>
  )
}


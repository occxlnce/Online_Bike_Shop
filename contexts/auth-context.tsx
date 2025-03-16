"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { User, Session } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  session: Session | null
  profile: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>
  setupDatabase: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [dbInitialized, setDbInitialized] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession()

        if (initialSession) {
          setSession(initialSession)
          setUser(initialSession.user)

          // Try to fetch profile data, but don't fail if table doesn't exist
          try {
            await fetchProfile(initialSession.user.id)
          } catch (error) {
            console.warn("Could not fetch profile, database may not be set up:", error)
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event, newSession?.user?.id)

      setSession(newSession)
      setUser(newSession?.user ?? null)

      if (newSession?.user) {
        try {
          await fetchProfile(newSession.user.id)
        } catch (error) {
          console.warn("Could not fetch profile on auth change:", error)
        }
      } else {
        setProfile(null)
      }

      // Handle redirects based on auth state
      if (event === "SIGNED_IN" && (pathname === "/auth/login" || pathname === "/auth/signup")) {
        router.push("/account")
      } else if (event === "SIGNED_OUT" && pathname.startsWith("/account")) {
        router.push("/auth/login")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, pathname])

  const setupDatabase = async () => {
    try {
      // Check if profiles table exists by running a simple query
      const { error: checkError } = await supabase.from("profiles").select("count").limit(1)

      // If profiles table doesn't exist, create it
      if (checkError && checkError.code === "PGRST116") {
        console.log("Profiles table doesn't exist, creating it...")

        try {
          // Try to create the profiles table using SQL
          const { error: createTableError } = await supabase.rpc("create_profiles_table")

          if (createTableError) {
            console.error("Error creating profiles table via RPC:", createTableError)

            // Fallback: Try direct SQL execution
            const { error: sqlError } = await supabase.from("profiles").select("*").limit(1)

            if (sqlError) {
              console.error("Profiles table still doesn't exist after creation attempt:", sqlError)
              return false
            }
          }

          console.log("Profiles table created successfully")
          setDbInitialized(true)

          // If user exists, create profile
          if (user) {
            await createProfile(user.id)
          }

          return true
        } catch (error) {
          console.error("Error in setupDatabase:", error)
          return false
        }
      } else {
        console.log("Profiles table already exists")
        setDbInitialized(true)
        return true
      }
    } catch (error) {
      console.error("Error checking database setup:", error)
      return false
    }
  }

  const fetchProfile = async (userId: string) => {
    try {
      // Try to fetch the profile
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        // If table doesn't exist, mark database as not initialized
        if (error.code === "PGRST116") {
          console.warn("Profiles table doesn't exist")
          setDbInitialized(false)
          return
        }

        // If profile doesn't exist but table does, create profile
        if (error.code === "PGRST104") {
          await createProfile(userId)
        } else {
          console.error("Error fetching profile:", error)
        }
      } else if (data) {
        setProfile(data)
        setDbInitialized(true)
      }
    } catch (error) {
      console.error("Error in fetchProfile:", error)
    }
  }

  const createProfile = async (userId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) return

      // Create a minimal profile with only required fields
      const profileData = {
        id: userId,
        email: userData.user.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      // Try to insert the profile
      const { data, error } = await supabase.from("profiles").insert([profileData]).select().single()

      if (error) {
        console.error("Error creating profile:", error)
      } else if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error("Error in createProfile:", error)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Ensure database is set up
      await setupDatabase()

      return { error: null }
    } catch (error) {
      console.error("Error signing in:", error)
      return { error: error as Error }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      // Ensure database is set up
      await setupDatabase()

      return { error: null }
    } catch (error) {
      console.error("Error signing up:", error)
      return { error: error as Error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setLoading(false)
    }
  }

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      return { error: null }
    } catch (error) {
      console.error("Error updating password:", error)
      return { error: error as Error }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        updatePassword,
        setupDatabase,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


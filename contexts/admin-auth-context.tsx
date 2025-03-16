"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { User, Session } from "@supabase/supabase-js"

type AdminRole = "super_admin" | "admin" | "editor"

type AdminUser = {
  id: string
  userId: string
  role: AdminRole
  isSuperAdmin: boolean
  createdAt: string
  updatedAt: string
}

type AdminAuthContextType = {
  user: User | null
  session: Session | null
  adminUser: AdminUser | null
  loading: boolean
  isAdmin: boolean
  isSuperAdmin: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null; userId: string | null }>
  signOut: () => Promise<void>
  createFirstSuperAdmin: (email: string) => Promise<{ error: Error | null }>
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
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

          // Check if user is admin
          await checkAdminStatus(initialSession.user.id)
        }
      } catch (error) {
        console.error("Error initializing admin auth:", error)
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
        await checkAdminStatus(newSession.user.id)
      } else {
        setAdminUser(null)
        setIsAdmin(false)
        setIsSuperAdmin(false)
      }

      // Handle redirects based on auth state
      if (event === "SIGNED_IN" && pathname === "/admin/login") {
        router.push("/admin")
      } else if (event === "SIGNED_OUT" && pathname.startsWith("/admin") && pathname !== "/admin/login") {
        router.push("/admin/login")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, pathname])

  const checkAdminStatus = async (userId: string) => {
    try {
      // Check if user is admin
      const { data, error } = await supabase.from("admin_users").select("*").eq("user_id", userId).single()

      if (error) {
        if (error.code !== "PGRST104") {
          // Not found
          console.error("Error checking admin status:", error)
        }
        setAdminUser(null)
        setIsAdmin(false)
        setIsSuperAdmin(false)
        return
      }

      if (data) {
        const adminData: AdminUser = {
          id: data.id,
          userId: data.user_id,
          role: data.role,
          isSuperAdmin: data.is_super_admin,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        }

        setAdminUser(adminData)
        setIsAdmin(true)
        setIsSuperAdmin(data.is_super_admin)
      } else {
        setAdminUser(null)
        setIsAdmin(false)
        setIsSuperAdmin(false)
      }
    } catch (error) {
      console.error("Error in checkAdminStatus:", error)
      setAdminUser(null)
      setIsAdmin(false)
      setIsSuperAdmin(false)
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

      // Check if user is admin
      if (data.user) {
        await checkAdminStatus(data.user.id)

        if (!isAdmin) {
          await supabase.auth.signOut()
          throw new Error("You don't have admin access")
        }
      }

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

      return { error: null, userId: data.user?.id || null }
    } catch (error) {
      console.error("Error signing up:", error)
      return { error: error as Error, userId: null }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      router.push("/admin/login")
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setLoading(false)
    }
  }

  const createFirstSuperAdmin = async (email: string) => {
    try {
      const { data, error } = await supabase.rpc("create_first_super_admin", {
        admin_email: email,
      })

      if (error) throw error

      return { error: null }
    } catch (error) {
      console.error("Error creating first super admin:", error)
      return { error: error as Error }
    }
  }

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        session,
        adminUser,
        loading,
        isAdmin,
        isSuperAdmin,
        signIn,
        signUp,
        signOut,
        createFirstSuperAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}


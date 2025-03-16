import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Please check your .env.local file.")
}

export const supabase = createClient(supabaseUrl || "https://wdszxsfpsxjwvuwferzf.supabase.co", supabaseAnonKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkc3p4c2Zwc3hqd3Z1d2ZlcnpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDkwMTIsImV4cCI6MjA1NzM4NTAxMn0.1H5ERYCT7y3Zet0oNrtJoVcm-1HeSDgw9NhgjyUz0_Q")


"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
})

export async function updateProfile(formData: FormData) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const validatedFields = profileSchema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phoneNumber: formData.get("phoneNumber"),
    })

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: validatedFields.firstName,
        last_name: validatedFields.lastName,
        phone_number: validatedFields.phoneNumber,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) throw error

    revalidatePath("/account")
    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { success: false, error: "Failed to update profile" }
  }
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error updating password:", error)
    return { success: false, error: "Failed to update password" }
  }
}

export async function getProfile() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching profile:", error)
    return null
  }
}

export async function getOrders() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        items:order_items(*)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}


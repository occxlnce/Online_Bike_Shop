import { supabase } from "./supabase"

export type Product = {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category_id: number
  features: string[]
  specifications: Record<string, string>
  slug: string
  is_featured: boolean
  created_at: string
  updated_at: string
  category?: {
    name: string
    slug: string
  }
  images?: {
    id: number
    image_url: string
    is_primary: boolean
    display_order: number
  }[]
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(id, image_url, is_primary, display_order)
    `)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching featured products:", error)
    return []
  }

  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(id, image_url, is_primary, display_order)
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error(`Error fetching product with slug ${slug}:`, error)
    return null
  }

  return data as Product
}

export async function getProductsByCategory(categorySlug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(id, image_url, is_primary, display_order)
    `)
    .eq("category.slug", categorySlug)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(`Error fetching products in category ${categorySlug}:`, error)
    return []
  }

  return data as Product[]
}

export async function getAllProducts(options?: {
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}) {
  const { limit = 12, offset = 0, sortBy = "created_at", sortOrder = "desc" } = options || {}

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(id, image_url, is_primary, display_order)
    `)
    .order(sortBy, { ascending: sortOrder === "asc" })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching all products:", error)
    return []
  }

  return data as Product[]
}

export async function getProductCount() {
  const { count, error } = await supabase.from("products").select("*", { count: "exact", head: true })

  if (error) {
    console.error("Error getting product count:", error)
    return 0
  }

  return count || 0
}


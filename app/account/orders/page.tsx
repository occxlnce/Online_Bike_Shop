"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { AccountSidebar } from "@/components/account-sidebar"

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [filteredOrders, setFilteredOrders] = useState<any[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [loading, user, router])

  // Fetch orders when user is available
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return

      try {
        setOrdersLoading(true)
        const { data, error } = await supabase
          .from("orders")
          .select(`
            *,
            items:order_items(*)
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error

        setOrders(data || [])
        setFilteredOrders(data || [])
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setOrdersLoading(false)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user])

  // Filter orders based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredOrders(orders)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = orders.filter(
      (order) =>
        (order.order_number && order.order_number.toLowerCase().includes(query)) ||
        (order.id && order.id.toLowerCase().includes(query)) ||
        (order.status && order.status.toLowerCase().includes(query)),
    )
    setFilteredOrders(filtered)
  }, [searchQuery, orders])

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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View and manage your orders</CardDescription>
                  </div>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Orders</TabsTrigger>
                    <TabsTrigger value="processing">Processing</TabsTrigger>
                    <TabsTrigger value="shipped">Shipped</TabsTrigger>
                    <TabsTrigger value="delivered">Delivered</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">{renderOrdersList(filteredOrders, ordersLoading)}</TabsContent>

                  <TabsContent value="processing">
                    {renderOrdersList(
                      filteredOrders.filter((order) => order.status === "processing"),
                      ordersLoading,
                    )}
                  </TabsContent>

                  <TabsContent value="shipped">
                    {renderOrdersList(
                      filteredOrders.filter((order) => order.status === "shipped"),
                      ordersLoading,
                    )}
                  </TabsContent>

                  <TabsContent value="delivered">
                    {renderOrdersList(
                      filteredOrders.filter((order) => order.status === "delivered"),
                      ordersLoading,
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function renderOrdersList(orders: any[], loading: boolean) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading orders...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No orders found</h3>
        <p className="text-muted-foreground mb-4">
          {orders.length === 0
            ? "When you make your first purchase, it will appear here."
            : "No orders match your search criteria."}
        </p>
        <Button asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order: any) => (
        <div key={order.id} className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <p className="font-medium">Order #{order.order_number || order.id.substring(0, 8)}</p>
                <p className="text-sm text-muted-foreground">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                  {order.status || "processing"}
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/account/orders/${order.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {(order.items || []).slice(0, 2).map((item: any) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name || "Product"}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity || 1}</p>
                  </div>
                  <p className="font-medium">${(item.price || 0).toFixed(2)}</p>
                </div>
              ))}
              {(order.items || []).length > 2 && (
                <p className="text-sm text-muted-foreground">+ {(order.items || []).length - 2} more item(s)</p>
              )}
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-bold">${(order.total || 0).toFixed(2)}</p>
              </div>
              {order.status === "delivered" && (
                <Button variant="outline" size="sm">
                  Write a Review
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


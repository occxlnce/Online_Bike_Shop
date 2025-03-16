"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminShell } from "@/components/admin/admin-shell"
import { supabase } from "@/lib/supabase"
import { useAdminAuth } from "@/contexts/admin-auth-context"
import { BarChart } from "@tremor/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Package, ShoppingCart, Users } from "lucide-react"

export default function AdminDashboardPage() {
  const { user, isAdmin, loading } = useAdminAuth()
  const [stats, setStats] = useState({
    revenue: { total: 0, change: 0 },
    subscriptions: { total: 0, change: 0 },
    sales: { total: 0, change: 0 },
    activeNow: { total: 0, change: 0 },
  })
  const [recentSales, setRecentSales] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  const [salesData, setSalesData] = useState([])

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData()
    }
  }, [isAdmin])

  const fetchDashboardData = async () => {
    try {
      // Fetch revenue stats
      const { data: revenueData } = await supabase
        .from("orders")
        .select("total, created_at")
        .gte("created_at", new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString())
        .order("created_at", { ascending: false })

      // Fetch recent sales
      const { data: salesData } = await supabase
        .from("orders")
        .select(`
          id, 
          order_number, 
          total, 
          created_at,
          user_id,
          profiles:profiles!user_id(first_name, last_name, email, avatar_url)
        `)
        .order("created_at", { ascending: false })
        .limit(5)

      // Fetch top products
      const { data: productsData } = await supabase
        .from("products")
        .select(`
          id,
          name,
          price,
          product_images(image_url),
          inventory_transactions(quantity)
        `)
        .order("created_at", { ascending: false })
        .limit(3)

      // Calculate stats
      const currentMonthRevenue = revenueData?.reduce((sum, order) => sum + order.total, 0) || 0
      const previousMonthRevenue = currentMonthRevenue * 0.8 // Simulated previous month data
      const revenueChange = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100

      // Set stats
      setStats({
        revenue: {
          total: currentMonthRevenue,
          change: revenueChange,
        },
        subscriptions: {
          total: 2350,
          change: 180.1,
        },
        sales: {
          total: 12234,
          change: 19,
        },
        activeNow: {
          total: 573,
          change: 201,
        },
      })

      // Set recent sales
      setRecentSales(salesData || [])

      // Set top products
      setTopProducts(productsData || [])

      // Set recent activities
      setRecentActivities([
        { id: 1, message: "New product added", time: "2 hours ago" },
        { id: 2, message: "Order #12345 completed", time: "3 hours ago" },
        { id: 3, message: "Low stock alert: Cycling Gloves", time: "5 hours ago" },
      ])

      // Set chart data
      setSalesData([
        { month: "Jan", Sales: 890, Visitors: 1200 },
        { month: "Feb", Sales: 1200, Visitors: 1800 },
        { month: "Mar", Sales: 1500, Visitors: 2200 },
        { month: "Apr", Sales: 1700, Visitors: 2400 },
        { month: "May", Sales: 2100, Visitors: 2800 },
        { month: "Jun", Sales: 2500, Visitors: 3200 },
      ])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  return (
    <AdminShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>Download Report</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    $
                    {stats.revenue.total.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">+{stats.revenue.change.toFixed(1)}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{stats.subscriptions.total.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +{stats.subscriptions.change.toFixed(1)}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{stats.sales.total.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{stats.sales.change.toFixed(1)}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{stats.activeNow.total}</div>
                  <p className="text-xs text-muted-foreground">+{stats.activeNow.change} since last hour</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart
                    data={salesData}
                    index="month"
                    categories={["Sales", "Visitors"]}
                    colors={["blue", "teal"]}
                    valueFormatter={(number) => Intl.NumberFormat("us").format(number).toString()}
                    yAxisWidth={48}
                    className="h-[300px]"
                  />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentSales.map((sale) => (
                      <div key={sale.id} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={sale.profiles?.avatar_url || ""} alt="Avatar" />
                          <AvatarFallback>
                            {sale.profiles?.first_name?.[0]}
                            {sale.profiles?.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {sale.profiles?.first_name} {sale.profiles?.last_name}
                          </p>
                          <p className="text-sm text-muted-foreground">{sale.profiles?.email}</p>
                        </div>
                        <div className="ml-auto font-medium">+${sale.total.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Your best-selling products this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Product" />
                        <AvatarFallback>
                          <Package className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Premium Road Bike</p>
                        <p className="text-sm text-muted-foreground">$1,299.00</p>
                      </div>
                      <div className="ml-auto font-medium">+340 sold</div>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Product" />
                        <AvatarFallback>
                          <Package className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Mountain Bike Pro</p>
                        <p className="text-sm text-muted-foreground">$899.00</p>
                      </div>
                      <div className="ml-auto font-medium">+254 sold</div>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Product" />
                        <AvatarFallback>
                          <Package className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Cycling Helmet</p>
                        <p className="text-sm text-muted-foreground">$129.00</p>
                      </div>
                      <div className="ml-auto font-medium">+189 sold</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest activities in your store.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{activity.message}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Button className="w-full justify-between" variant="outline">
                    Add Product <ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <Button className="w-full justify-between" variant="outline">
                    Manage Users <ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <Button className="w-full justify-between" variant="outline">
                    View Orders <ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <Button className="w-full justify-between" variant="outline">
                    Edit Content <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminShell>
  )
}


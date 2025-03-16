import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import Image from "next/image"

const salesData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1900 },
  { name: "Mar", total: 1500 },
  { name: "Apr", total: 1700 },
  { name: "May", total: 2500 },
  { name: "Jun", total: 2300 },
]

const visitorsData = [
  { name: "Jan", total: 450 },
  { name: "Feb", total: 670 },
  { name: "Mar", total: 820 },
  { name: "Apr", total: 930 },
  { name: "May", total: 1100 },
  { name: "Jun", total: 1250 },
]

export function DashboardStats() {
  return (
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
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">+180.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
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
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
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
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function RecentSales() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop"
              width={42}
              height={42}
              alt="Customer"
              className="rounded-full"
            />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$1,999.00</div>
          </div>
          <div className="flex items-center">
            <Image
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&h=100&auto=format&fit=crop"
              width={42}
              height={42}
              alt="Customer"
              className="rounded-full"
            />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Jackson Lee</p>
              <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$39.00</div>
          </div>
          <div className="flex items-center">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop"
              width={42}
              height={42}
              alt="Customer"
              className="rounded-full"
            />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
              <p className="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$299.00</div>
          </div>
          <div className="flex items-center">
            <Image
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop"
              width={42}
              height={42}
              alt="Customer"
              className="rounded-full"
            />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">William Kim</p>
              <p className="text-sm text-muted-foreground">will@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$99.00</div>
          </div>
          <div className="flex items-center">
            <Image
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop"
              width={42}
              height={42}
              alt="Customer"
              className="rounded-full"
            />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$39.00</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function OverviewChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Tabs defaultValue="sales">
          <TabsList>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="visitors" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


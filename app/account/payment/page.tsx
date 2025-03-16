"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Plus, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { AccountSidebar } from "@/components/account-sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PaymentPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [isAddingCard, setIsAddingCard] = useState(false)

  // Mock payment methods - in a real app, these would come from your database
  const mockPaymentMethods = [
    {
      id: "1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      brand: "mastercard",
      last4: "5555",
      expMonth: 8,
      expYear: 2024,
      isDefault: false,
    },
  ]

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [loading, user, router])

  // Fetch payment methods
  useEffect(() => {
    // In a real app, you would fetch payment methods from your database
    // For now, we'll use mock data
    setPaymentMethods(mockPaymentMethods)
  }, [])

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would call your payment processor API
    // For now, we'll just close the dialog
    setIsAddingCard(false)
  }

  const handleRemoveCard = (id: string) => {
    // In a real app, you would call your payment processor API
    // For now, we'll just update the state
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const handleSetDefault = (id: string) => {
    // In a real app, you would call your payment processor API
    // For now, we'll just update the state
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

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
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods</CardDescription>
                  </div>
                  <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Payment Method</DialogTitle>
                        <DialogDescription>Add a new credit or debit card to your account.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddCard}>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input id="cardName" placeholder="John Doe" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Select defaultValue="ZA">
                              <SelectTrigger id="country">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ZA">South Africa</SelectItem>
                                <SelectItem value="US">United States</SelectItem>
                                <SelectItem value="UK">United Kingdom</SelectItem>
                                <SelectItem value="CA">Canada</SelectItem>
                                <SelectItem value="AU">Australia</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Add Card</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {paymentMethods.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No payment methods</h3>
                    <p className="text-muted-foreground mb-4">Add a payment method to make checkout faster.</p>
                    <Button onClick={() => setIsAddingCard(true)}>Add Payment Method</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-muted p-2 rounded">
                              {method.brand === "visa" ? (
                                <svg
                                  width="40"
                                  height="24"
                                  viewBox="0 0 40 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect width="40" height="24" rx="4" fill="white" />
                                  <path d="M15.4 15.0001H12.6L14.4 9.00012H17.2L15.4 15.0001Z" fill="#00579F" />
                                  <path
                                    d="M23.2 9.20012C22.6 9.00012 21.8 8.80012 20.8 8.80012C18.4 8.80012 16.6 10.0001 16.6 11.8001C16.6 13.2001 17.8 13.8001 18.8 14.2001C19.8 14.6001 20.2 14.8001 20.2 15.2001C20.2 15.8001 19.4 16.0001 18.6 16.0001C17.6 16.0001 17 15.8001 16.2 15.4001L15.8 15.2001L15.4 17.4001C16 17.6001 17.2 17.8001 18.4 17.8001C21 17.8001 22.8 16.6001 22.8 14.6001C22.8 13.4001 22 12.6001 20.6 12.0001C19.8 11.6001 19.2 11.4001 19.2 11.0001C19.2 10.6001 19.6 10.2001 20.6 10.2001C21.4 10.2001 22 10.4001 22.4 10.6001L22.8 10.8001L23.2 9.20012Z"
                                    fill="#00579F"
                                  />
                                  <path
                                    d="M26.8 9.00012C26.4 9.00012 26 9.20012 25.8 9.60012L22 15.0001H24.6L25 13.8001H28L28.2 15.0001H30.6L28.8 9.00012H26.8ZM25.8 12.2001C25.8 12.2001 26.6 10.2001 26.8 9.80012C26.8 9.80012 27 10.4001 27.2 10.8001L27.6 12.2001H25.8Z"
                                    fill="#00579F"
                                  />
                                  <path
                                    d="M11.8 9.00012L9.4 13.2001L9.2 12.4001C8.6 10.8001 7.2 9.60012 5.6 9.00012H5.4L8.6 15.0001H11.2L16 9.00012H11.8Z"
                                    fill="#00579F"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="40"
                                  height="24"
                                  viewBox="0 0 40 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect width="40" height="24" rx="4" fill="white" />
                                  <path d="M24.4 7.00012H15.6V17.0001H24.4V7.00012Z" fill="#FF5F00" />
                                  <path
                                    d="M16.2 12.0001C16.2 10.0001 17.2 8.20012 18.6 7.00012H15.6C13.4 7.00012 11.6 9.20012 11.6 12.0001C11.6 14.8001 13.4 17.0001 15.6 17.0001H18.6C17.2 15.8001 16.2 14.0001 16.2 12.0001Z"
                                    fill="#EB001B"
                                  />
                                  <path
                                    d="M28.4 12.0001C28.4 14.8001 26.6 17.0001 24.4 17.0001H21.4C22.8 15.8001 23.8 14.0001 23.8 12.0001C23.8 10.0001 22.8 8.20012 21.4 7.00012H24.4C26.6 7.00012 28.4 9.20012 28.4 12.0001Z"
                                    fill="#F79E1B"
                                  />
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">
                                {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} ending in {method.last4}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Expires {method.expMonth}/{method.expYear}
                              </p>
                              {method.isDefault && (
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary mt-1">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!method.isDefault && (
                              <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                                Set as Default
                              </Button>
                            )}
                            <Button variant="outline" size="icon" onClick={() => handleRemoveCard(method.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


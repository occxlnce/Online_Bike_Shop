export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  total: number
  shippingAddress: Address
  billingAddress: Address
  paymentStatus: "pending" | "paid" | "failed"
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Address {
  firstName: string
  lastName: string
  streetAddress: string
  apartment?: string
  city: string
  state: string
  postalCode: string
  country: string
  phoneNumber: string
}

export interface PasswordRequirements {
  minLength: boolean
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumber: boolean
  hasSymbol: boolean
}


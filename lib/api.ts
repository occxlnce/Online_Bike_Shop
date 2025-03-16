import { supabase } from "./supabase"

// Function to call Supabase Edge Functions
export async function callEdgeFunction(
  functionName: string,
  options?: {
    body?: any
    headers?: Record<string, string>
  },
) {
  try {
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: options?.body,
      headers: options?.headers,
    })

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error)
    return { data: null, error }
  }
}

// Create a checkout session with Stripe
export async function createCheckoutSession(items: any[], customerId?: string) {
  return callEdgeFunction("create-checkout-session", {
    body: { items, customerId },
  })
}

// Verify a webhook from Stripe
export async function handleStripeWebhook(signature: string, payload: any) {
  return callEdgeFunction("stripe-webhook", {
    body: payload,
    headers: {
      "Stripe-Signature": signature,
    },
  })
}


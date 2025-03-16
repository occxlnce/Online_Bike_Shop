"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { RealtimeChannel } from "@supabase/supabase-js"

type RealtimeSubscription = {
  table: string
  schema?: string
  filter?: string
  event?: "INSERT" | "UPDATE" | "DELETE" | "*"
}

export function useRealtime<T = any>(
  subscription: RealtimeSubscription,
  callback?: (payload: { new: T; old: T }) => void,
) {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let channel: RealtimeChannel

    const setupSubscription = async () => {
      try {
        // Set up the channel
        channel = supabase
          .channel(`${subscription.table}-changes`)
          .on(
            "postgres_changes",
            {
              event: subscription.event || "*",
              schema: subscription.schema || "public",
              table: subscription.table,
              filter: subscription.filter,
            },
            (payload) => {
              if (callback) {
                callback(payload.new as any)
              } else {
                // Default behavior: update the data state
                if (payload.eventType === "INSERT") {
                  setData((prev) => [...prev, payload.new as T])
                } else if (payload.eventType === "UPDATE") {
                  setData((prev) => prev.map((item: any) => (item.id === (payload.new as any).id ? payload.new : item)))
                } else if (payload.eventType === "DELETE") {
                  setData((prev) => prev.filter((item: any) => item.id !== (payload.old as any).id))
                }
              }
            },
          )
          .subscribe()

        // Initial data fetch
        const { data: initialData, error: initialError } = await supabase.from(subscription.table).select("*")

        if (initialError) {
          throw initialError
        }

        setData(initialData as T[])
        setLoading(false)
      } catch (err: any) {
        setError(err)
        setLoading(false)
      }
    }

    setupSubscription()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [subscription.table, subscription.event, subscription.filter, subscription.schema, callback])

  return { data, error, loading }
}


// app/providers.tsx
"use client"

import { createBrowserClient } from "@supabase/ssr"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

// Import generated types from Supabase (run `supabase gen types typescript --project-id YOUR_ID > src/lib/database.types.ts`)
import type { Database } from "@/types/supabase"
import { SupabaseClient } from "@supabase/supabase-js"

type SupabaseContextType = SupabaseClient<Database>

const SupabaseContext = createContext<SupabaseContextType | null>(null)

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() =>
    createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    ),
  )

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      // Handle session updates here if needed
      // e.g. update state, route user, etc.
      console.log("Auth state changed:", session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context)
    throw new Error("useSupabase must be used inside SupabaseProvider")
  return context
}

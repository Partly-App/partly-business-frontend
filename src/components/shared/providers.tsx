"use client"

import { createBrowserClient } from "@supabase/ssr"
import {
  createContext,
  ReactNode,
  useContext,
  useState
} from "react"

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

  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_, session) => {
  //     // Handle session updates here if needed
  //     // e.g. update state, route user, etc.
  //   })

  //   return () => {
  //     subscription.unsubscribe()
  //   }
  // }, [supabase])

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

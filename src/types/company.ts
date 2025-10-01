import { Database } from "./supabase"

export type Invite = Database["public"]["Tables"]["invites"]["Row"]
export type Company = Database["public"]["Tables"]["companies"]["Row"]

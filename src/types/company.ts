import { Database } from "./supabase"

export type Invite = Database["public"]["Tables"]["invites"]["Row"]

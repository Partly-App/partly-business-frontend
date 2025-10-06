import { Database } from "./supabase"

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export type Score = Database["public"]["Tables"]["scores"]["Row"]
export type SubScore = Database["public"]["Tables"]["subScores"]["Row"]

export type CurrentStruggle =
  Database["public"]["Tables"]["currentStruggles"]["Row"]

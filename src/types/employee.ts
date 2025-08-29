import { Database } from "./supabase"

export type Employee = Database["public"]["Tables"]["employees"]['Row']
export type Department = Database["public"]["Tables"]["departments"]['Row']

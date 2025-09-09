import { Database } from "./supabase"

export type Employee = Database["public"]["Tables"]["employees"]["Row"]

export type Department = Database["public"]["Tables"]["departments"]["Row"]
export type DepartmentScore =
  Database["public"]["Tables"]["departmentScores"]["Row"]
export type DepartmentSubScore =
  Database["public"]["Tables"]["departmentSubScores"]["Row"]

export type SUBSCORE_TYPES = DepartmentSubScore["type"]

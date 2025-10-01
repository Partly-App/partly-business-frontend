import { AchievementKeys } from "@/components/onboarding/types"

export const INDUSTRIES = [
  "Finance",
  "IT",
  "Healthcare",
  "Education",
  "Media",
  "Legal",
  "Government",
  "Retail",
  "Professional services",
  "Other",
]

export const ACHIEVEMENTS: Array<{ key: AchievementKeys; label: string }> = [
  {
    key: "tension",
    label: "Reduce workplace tension",
  },
  {
    key: "productivity",
    label: "Increase team productivity",
  },
  {
    key: "feedback",
    label: "Foster a culture of open feedback",
  },
  {
    key: "anxiety",
    label: "Reduce team anxiety during high-pressure projects",
  },
  {
    key: "conflict",
    label: "Improve conflict resolution",
  },
  {
    key: "other",
    label: "Other",
  },
]

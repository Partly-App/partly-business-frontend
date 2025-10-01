import { OnboardingData } from "./OnboardingPageContent"

export type OnboardingStepType = {
  onNext: (data?: Partial<OnboardingData>) => void
  data?: OnboardingData
}

export type AchievementKeys =
  | "anxiety"
  | "conflict"
  | "feedback"
  | "productivity"
  | "tension"
  | "other"

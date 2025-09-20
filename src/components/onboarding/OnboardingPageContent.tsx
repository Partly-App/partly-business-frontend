"use client"

import { useCallback, useState } from "react"
import OnboardingHeader from "./OnboardingHeader"
import PaymentContent from "./steps/PaymentContent"
import SignUpContent from "./steps/SignUpContent"
import { AchivementKeys } from "./types"
import LoaderStep from "./steps/LoaderStep"

export type OnboardingData = {
  numberOfEmployees: number
  industry: string[] | null
  department: string[] | null
  whatToAchieve: Array<{ key: AchivementKeys; label: string }> | null
}

const STEPS = [
  // EmployeeNumberSelect,
  // IndustrySelect,
  // DepartmentSelect,
  // ReturnOfInterest,
  // WhatToAchieve,
  // AchivementFacts,
  // LoaderStep,
  // SignUpContent,
  PaymentContent,
]

const OnboardingPageContent = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [fade, setFade] = useState<"in" | "out">("in")
  const [data, setData] = useState<OnboardingData>({
    numberOfEmployees: 5,
    industry: null,
    department: null,
    whatToAchieve: null,
  })

  const handleBack = () => {
    setFade("out")
    setTimeout(() => {
      setFade("in")
      setCurrentStep((prev) => prev - 1)
    }, 500)
  }

  const handleNext = useCallback((data?: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...data }))
    setFade("out")
    setTimeout(() => {
      setFade("in")
      setCurrentStep((prev) => prev + 1)
    }, 500)
  }, [])

  const StepComponent = STEPS[currentStep]

  return (
    <main className="min-h-screen">
      <OnboardingHeader
        currentStep={currentStep + 1}
        totalSteps={STEPS.length}
        onBack={handleBack}
      />
      <div
        className={`transition-opacity duration-500 ${
          fade === "in" ? "opacity-100" : "opacity-0"
        }`}
      >
        <StepComponent
          onNext={handleNext}
          data={data}
          count={data.numberOfEmployees}
        />
      </div>
    </main>
  )
}

export default OnboardingPageContent

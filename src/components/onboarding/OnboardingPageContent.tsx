"use client"

import OnboardingHeader from "./OnboardingHeader"
import EmployeeNumberSelect from "./steps/EmployeeNumberSelect"

const OnboardingPageContent = () => {
  const handleGoBack = () => {}

  return (
    <main className="min-h-screen">
      <OnboardingHeader currentStep={2} totalSteps={10} onBack={handleGoBack} />
      <EmployeeNumberSelect />
    </main>
  )
}

export default OnboardingPageContent

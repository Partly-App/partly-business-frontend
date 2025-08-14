'use client'

import OnboardingHeader from "./OnboardingHeader"

const OnboardingPageContent = () => {
  const handleGoBack = () => {}

  return (
    <main>
      <OnboardingHeader currentStep={2} totalSteps={10} onBack={handleGoBack} />
    </main>
  )
}

export default OnboardingPageContent

"use client"

import { Company } from "@/types/company"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useSupabase } from "../shared/providers"
import OnboardingHeader from "./OnboardingHeader"
import DepartmentSelect from "./steps/DepartmentSelect"
import EmployeeNumberSelect from "./steps/EmployeeNumberSelect"
import IndustrySelect from "./steps/IndustrySelect"
import LoaderStep from "./steps/LoaderStep"
import PaymentContent from "./steps/PaymentContent"
import ReturnOfInterest from "./steps/ReturnOfInterest"
import SignUpContent from "./steps/SignUpContent"
import WhatToAchieve from "./steps/WhatToAchieve"
import AchivementFacts from "./steps/achivementFacts"
import { AchivementKeys } from "./types"

export type OnboardingData = {
  numberOfEmployees: number
  industry: string[] | null
  department: string[] | null
  whatToAchieve: Array<{ key: AchivementKeys; label: string }> | null
}

const STEPS = [
  EmployeeNumberSelect,
  IndustrySelect,
  DepartmentSelect,
  ReturnOfInterest,
  WhatToAchieve,
  AchivementFacts,
  LoaderStep,
  SignUpContent,
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
  const [company, setCompany] = useState<Company | null>(null)

  const supabase = useSupabase()
  const router = useRouter()

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

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.log("Couldn't get user for onboarding: ", error)
        return
      }

      const { data: companyData, error: companyError } = await supabase
        .from("employees")
        .select("company:companyId(*)")
        .eq("userId", data.user.id)
        .single()

      if (!companyData || companyError) {
        console.log(
          "Erro getting companyData in getCompanyByUser: ",
          companyError,
        )
        return
      }

      const { data: subscriptionData, error: subscriptionDataError } =
        await supabase
          .from("companySubscriptions")
          .select("*")
          .eq("companyId", companyData.company.id)
          .single()

      if (subscriptionDataError) {
        console.log(
          "Error getting subscription data in onboarding page content: ",
          subscriptionDataError,
        )
      } else if (
        subscriptionData.status === "active" ||
        subscriptionData.status === "trialing"
      ) {
        router.push("/dashboard")
      }

      if (companyData) {
        setData((prev) => ({
          ...prev,
          numberOfEmployees: companyData.company.numberOfEmployees,
        }))

        setCurrentStep(8)
      }
    }

    getUserData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      <OnboardingHeader
        currentStep={currentStep + 1}
        totalSteps={STEPS.length}
        onBack={handleBack}
      />
      <div
        className={`flex-1 transition-opacity duration-500 ${
          fade === "in" ? "opacity-100" : "opacity-0"
        }`}
      >
        <StepComponent
          onNext={handleNext}
          data={data}
          count={data.numberOfEmployees}
          setCompany={setCompany}
          company={company}
        />
      </div>

      <div className="flex items-center justify-center gap-4 px-6 py-4">
        <Link
          href="https://fragrant-digit-84f.notion.site/Privacy-Policy-22a05fa90ec480edb75ee12ac613b861?source=copy_link"
          className="text-xs font-bold opacity-25 transition-opacity hover:opacity-50"
          target="_blank"
        >
          Privacy Policy
        </Link>
        <span className="select-none font-montserratAlt text-2xl font-black opacity-25">
          •
        </span>
        <Link
          href="https://fragrant-digit-84f.notion.site/Terms-of-Use-22a05fa90ec480fcb158fe6fe07c31e5?source=copy_link"
          className="text-xs font-bold opacity-25 transition-opacity hover:opacity-50"
          target="_blank"
        >
          Terms of Use
        </Link>
      </div>
    </main>
  )
}

export default OnboardingPageContent

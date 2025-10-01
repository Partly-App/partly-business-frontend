"use client"

import Button from "@/components/shared/Button"
import { useSupabase } from "@/components/shared/providers"
import { ACHIEVEMENTS, INDUSTRIES } from "@/constants/companyDetails"
import { useToast } from "@/context/ToastContext"
import { Company } from "@/types/company"
import { arraysEqualUnordered, toggleArraySelection } from "@/utils/arrays"
import { CustomerPortalSession } from "@paddle/paddle-node-sdk"
import clsx from "clsx"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { ExternalLink } from "react-feather"

const SettingsPageContent = ({
  customerPortal,
  company,
}: {
  customerPortal: CustomerPortalSession
  company: Company
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<typeof INDUSTRIES>(
    company.industry || [],
  )
  const [achievementGoals, setAchievementGoals] = useState(
    company.achievementGoals || [],
  )

  const supabase = useSupabase()
  const { showToast } = useToast()

  const updateCompany = useCallback(async () => {
    if (
      arraysEqualUnordered(company.industry, selectedIndustry) &&
      arraysEqualUnordered(company.achievementGoals || [], achievementGoals)
    ) {
      return
    }

    console.log(1)

    const { error } = await supabase
      .from("companies")
      .update({
        industry: selectedIndustry,
        achievementGoals: achievementGoals,
      })
      .eq("id", company.id)

    if (error) {
      console.error("Error updating company: ", error)
      showToast(
        "Unexpected error while updating company details. Please try again later",
        "bottom",
        "error",
        4000,
      )
    }
  }, [
    selectedIndustry,
    achievementGoals,
    company.id,
    supabase,
    company.achievementGoals,
    company.industry,
    showToast,
  ])

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateCompany()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [updateCompany, selectedIndustry, achievementGoals])

  return (
    <main className="realtive flex min-h-screen w-full flex-col px-6 py-4">
      <h1 className="mb-6 font-montserratAlt text-4xl font-black">Settings</h1>
      <div className="flex max-w-160 flex-1 flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="font-montserratAlt text-xl font-black opacity-75">
            Industry
          </h2>
          <div className="flex flex-row flex-wrap gap-3">
            {INDUSTRIES.map((label) => (
              <button
                key={label}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2",
                  "transition-[colors.transform]",
                  selectedIndustry.includes(label)
                    ? "scale-95 bg-purple-default"
                    : "bg-white-default/10",
                )}
                onClick={() => toggleArraySelection(label, setSelectedIndustry)}
              >
                <div
                  className={clsx(
                    "h-3 w-3 rounded-[3px] outline outline-1 outline-white-default/50",
                    "transition-colors",
                    selectedIndustry.includes(label)
                      ? "bg-white-default/50"
                      : "bg-transparent",
                  )}
                ></div>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-montserratAlt text-xl font-black opacity-75">
            Achievement Goals
          </h2>
          <div className="flex flex-col gap-4">
            {ACHIEVEMENTS.map((item) => {
              const isSelected = achievementGoals.some(
                (selectedItem) => item.label === selectedItem,
              )
              return (
                <button
                  key={item.key}
                  className={clsx(
                    "flex w-full items-center gap-3 rounded-lg px-5 py-4",
                    "transition-[colors.transform]",
                    !!isSelected
                      ? "scale-[98%] bg-purple-default"
                      : "bg-white-default/10",
                  )}
                  onClick={() =>
                    toggleArraySelection(item.label, setAchievementGoals)
                  }
                >
                  <div
                    className={clsx(
                      "h-3 w-3 rounded-[3px] outline outline-1 outline-white-default/50",
                      "transition-colors",
                      !!isSelected ? "bg-white-default/50" : "bg-transparent",
                    )}
                  ></div>
                  <span className="text-left">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-12 flex flex-col gap-4">
          <h2 className="font-montserratAlt text-xl font-black opacity-75">
            Subscription
          </h2>

          <Button
            size="L"
            color="white"
            href={customerPortal.urls.general.overview}
            target="_blank"
            containerClassName="w-fit"
          >
            Manage Subscription
            <ExternalLink size={20} className="text-black-default" />
          </Button>

          <span className="text-xs font-medium opacity-25">
            *This will take you to a separate portal provided by Paddle
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="https://fragrant-digit-84f.notion.site/Privacy-Policy-22a05fa90ec480edb75ee12ac613b861?source=copy_link"
          target="_blank"
          className="text-sm font-bold opacity-30 transition-opacity hover:opacity-50"
        >
          Privacy Policy
        </Link>
        <Link
          href="https://fragrant-digit-84f.notion.site/Terms-of-Use-22a05fa90ec480fcb158fe6fe07c31e5?source=copy_link"
          target="_blank"
          className="text-sm font-bold opacity-30 transition-opacity hover:opacity-50"
        >
          Terms of Use
        </Link>
      </div>
    </main>
  )
}

export default SettingsPageContent

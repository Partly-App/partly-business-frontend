import OverviewPageContent from "@/components/dashboard/overview/OverviewPageContent"
import { createClient } from "@/lib/supabaseServer"
import { getCompanyByUser } from "@/services/company"
import { redirect } from "next/navigation"

const DashboardPage = async () => {
  const data = await getCompanyByUser()
  const supabase = await createClient()

  if (!data?.company) {
    redirect("/auth")
  }

  const { data: subscriptionData, error: subscriptionDataError } =
    await supabase
      .from("companySubscriptions")
      .select("*")
      .eq("companyId", data.company.id)
      .single()

  if (subscriptionDataError) {
    console.log("Error getting subscription data: ", subscriptionDataError)
  }

  if (!subscriptionData || subscriptionData?.status === "inactive") {
    redirect("/onboarding")
  }

  const signOut = async (reason: "not-admin" | "error") => {
    await supabase.auth.signOut()
    redirect(`/auth?sign-out-reason=${reason}`)
  }

  const { data: employeeData, error: employeeDataError } = await supabase
    .from("employees")
    .select("id")
    .eq("userId", data.user.id)
    .single()

  if (!employeeData || employeeDataError) {
    signOut("error")
    return
  }

  const { error: isAdminError, count } = await supabase
    .from("companies")
    .select("id", { head: true, count: "exact" })
    .eq("adminId", employeeData.id)

  if (!count || count === 0) {
    signOut("not-admin")
    return
  }

  if (isAdminError) {
    console.error(isAdminError)
    signOut("error")
    return
  }

  return (
    <OverviewPageContent
      mostEngagedJourney="anxiety"
      scores={{
        angerNow: 50,
        angerPrev: 60,
        anxietyNow: 40,
        anxietyPrev: 30,
        confidenceNow: 40,
        confidencePrev: 60,
      }}
      currentChallenges={[
        {
          label: "Team conflict",
          weight: 0.1,
          note: "",
          fixSubtitle: "subtitle",
          fixTips: ["tip 1", "tip 2"],
        },
        {
          label: "High stress",
          weight: 0.3,
          note: "",
          fixSubtitle: "subtitle",
          fixTips: ["tip 1", "tip 2"],
        },
        {
          label: "Low focus",
          weight: 0.5,
          note: "",
          fixSubtitle: "subtitle",
          fixTips: ["tip 1", "tip 2"],
        },
        {
          label: "Poor balance",
          weight: 0.7,
          note: "",
          fixSubtitle: "subtitle",
          fixTips: ["tip 1", "tip 2"],
        },
        {
          label: "Missed deadlines",
          weight: 0.9,
          note: "",
          fixSubtitle: "subtitle",
          fixTips: ["tip 1", "tip 2"],
        },
        {
          label: "Role confusion",
          weight: 0.25,
          note: "",
          fixSubtitle: "subtitle",
          fixTips: ["tip 1", "tip 2"],
        },
      ]}
    />
  )
}

export default DashboardPage

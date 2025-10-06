import OverviewPageContent from "@/components/dashboard/overview/OverviewPageContent"
import { SCORE_TYPES } from "@/constants/employee"
import { createClient } from "@/lib/supabaseServer"
import { getCompanyByUser } from "@/services/company"
import { Journey } from "@/types/journey"
import { redirect } from "next/navigation"

type SubScoreType = "anger" | "anxiety" | "confidence" | "shame"
type SubScore = {
  createdAt: string
  id: string
  reason: string | null
  score: number
  scoreId: string
  type: SubScoreType
}
type SubScoresByType = Record<
  "anxiety" | "anger" | "confidence",
  SubScore | undefined
>

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
  const getScores = async () => {
    const { data: scores, error: scoresError } = await supabase
      .from("scores")
      .select("*")
      .eq("userId", data.user.id)
      .order("createdAt", { ascending: false })
      .limit(2)

    if (!scores?.length || scoresError) {
      console.error("Error fetching employee scores: ", scoresError)
      return {
        scores: null,
        currentSubScoresData: null,
        prevSubScoresData: null,
      }
    }

    const { data: currentSubScoresData, error: currentSubScoresError } =
      await supabase
        .from("subScores")
        .select("*")
        .eq("scoreId", scores[0].id)
        .in("type", SCORE_TYPES)

    if (!currentSubScoresData?.length || currentSubScoresError) {
      console.error(
        "Error fetching current sub scores: ",
        currentSubScoresError,
      )
      return {
        scores: null,
        currentSubScoresData: null,
        prevSubScoresData: null,
      }
    }

    let prevSubScores = null

    if (!!scores[1]?.id) {
      const { data: prevSubScoresData, error: prevSubScoresError } =
        await supabase
          .from("subScores")
          .select("*")
          .eq("scoreId", scores[1].id)
          .in("type", SCORE_TYPES)

      if (prevSubScoresError) {
        console.error("Error fetching previous scores: ", prevSubScoresError)
      } else {
        prevSubScores = prevSubScoresData
      }
    }

    return {
      scores,
      currentSubScoresData,
      prevSubScoresData: prevSubScores,
    }
  }

  const { scores, currentSubScoresData, prevSubScoresData } = await getScores()

  const currentSubScoreByType = (): SubScoresByType | null => {
    if (!currentSubScoresData) return null
    const subscoresByType: Record<SubScoreType, SubScore> = Object.fromEntries(
      currentSubScoresData.map((sub: SubScore) => [sub.type, sub]),
    ) as Record<SubScoreType, SubScore>

    return {
      anxiety: subscoresByType["anxiety"],
      anger: subscoresByType["anger"],
      confidence: subscoresByType["confidence"],
    }
  }

  const prevSubScoreByType = (): SubScoresByType | null => {
    if (!prevSubScoresData) return null
    const subscoresByType: Record<SubScoreType, SubScore> = Object.fromEntries(
      prevSubScoresData.map((sub: SubScore) => [sub.type, sub]),
    ) as Record<SubScoreType, SubScore>

    return {
      anxiety: subscoresByType["anxiety"],
      anger: subscoresByType["anger"],
      confidence: subscoresByType["confidence"],
    }
  }

  const { anxiety, anger, confidence } = currentSubScoreByType() || {}
  const {
    anxiety: anxietyPrev,
    anger: angerPrev,
    confidence: confidencePrev,
  } = prevSubScoreByType() || {}

  const {
    data: employees,
    error: employeesError,
    count: employeeCount,
  } = await supabase
    .from("employees")
    .select("mostEngagedJourney, userId", { count: "exact" })
    .eq("companyId", data.company.id)

  if (employeesError) {
    console.error("Error fetching employees ", employeeDataError)
  }

  const { error: departmentsError, count: departmentsCount } = await supabase
    .from("departments")
    .select("id", { head: true, count: "exact" })
    .eq("companyId", data.company.id)

  if (departmentsError) {
    console.error("error fetchin department count: ", departmentsError)
  }

  const mostUsedJourney = (): Journey | null => {
    if (!employees) return null
    const counts = {
      anxiety: 0,
      anger: 0,
      confidence: 0,
      shame: 0,
      null: 0,
    }

    for (const obj of employees) {
      counts[obj.mostEngagedJourney as Journey]++
    }

    let most = null
    let max = 0
    for (const journey of ["anxiety", "anger", "confidence", null] as const) {
      if (counts[journey as Journey] > max) {
        max = counts[journey as Journey]
        most = journey
      }
    }
    return most
  }

  const userIdForStruggles = employees?.map((item) => item.userId) || []

  const { data: struggles, error: strugglesError } = await supabase
    .from("currentStruggles")
    .select("label, severity, note, fixTitle, fixPoints, endNote")
    .order("createdAt", { ascending: false })
    .order("severity", { ascending: false })
    .in("userId", userIdForStruggles)
    .limit(6)

  if (strugglesError) {
    console.error("Error fetching struggles: ", strugglesError)
  }

  return (
    <OverviewPageContent
      mostEngagedJourney={mostUsedJourney()}
      score={scores?.[0].score || 50}
      prevScore={scores?.[1]?.score || 0}
      subScores={{
        angerNow: anger?.score || 50,
        angerPrev: angerPrev?.score || 0,
        anxietyNow: anxiety?.score || 50,
        anxietyPrev: anxietyPrev?.score || 0,
        confidenceNow: confidence?.score || 50,
        confidencePrev: confidencePrev?.score || 0,
      }}
      numberOfEmployees={employeeCount || 0}
      numberOfDepartments={departmentsCount || 0}
      currentStruggles={struggles}
    />
  )
}

export default DashboardPage

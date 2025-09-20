import OnboardingSuccessPageContent from "@/components/onboarding/OnboardingSuccessPageContent"
import { TRIAL_DAYS_AMOUNT } from "@/constants/subscription"
import { createClient } from "@/lib/supabaseServer"
import { Database } from "@/types/supabase"
import { Transaction } from "@paddle/paddle-node-sdk"
import { notFound } from "next/navigation"

const OnboardingSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { txnId, companyId } = await searchParams

  let txn: Transaction | undefined

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/transaction?txnId=${txnId}`, {
      cache: "no-store",
    })
    txn = await res.json()
  } catch (err) {
    console.error("Error fetching transaction: ", err)
    return notFound()
  }

  const supabase = await createClient()

  const date = new Date(txn!.billingPeriod!.startsAt)
  date.setUTCDate(date.getUTCDate() + TRIAL_DAYS_AMOUNT)
  const trialEnds = date.toISOString()

  const { error } = await supabase.from("companySubscriptions").upsert(
    {
      companyId: companyId,
      paddleCustomerId: txn!.customerId,
      paddleSubscriptionId: txn!.subscriptionId,
      periodStart: txn!.billingPeriod?.startsAt,
      periodEnd: txn!.billingPeriod?.endsAt,
      trialEnd: trialEnds,
      status: "active",
    } as Omit<
      Database["public"]["Tables"]["companySubscriptions"]["Row"],
      "companyId"
    > & { companyId: string },
    { onConflict: "companyId" },
  )

  if (error) {
    console.error("Error inserting company subscription data: ", error)
    return notFound()
  }

  return <OnboardingSuccessPageContent companyId={companyId as string} />
}

export default OnboardingSuccessPage

import SettingsPageContent from "@/components/dashboard/settings/SettingsPageContent"
import { createClient } from "@/lib/supabaseServer"
import { getCompanyByUser } from "@/services/company"
import { CustomerPortalSession } from "@paddle/paddle-node-sdk"
import { redirect } from "next/navigation"

const SettingsPage = async () => {
  const supabase = await createClient()
  const companyData = await getCompanyByUser()

  if (!companyData?.company) {
    redirect("/dashboard")
  }

  const { data: subscriptionData, error: subscriptionError } = await supabase
    .from("companySubscriptions")
    .select("paddleCustomerId, paddleSubscriptionId")
    .eq("companyId", companyData?.company.id)
    .single()

  if (subscriptionError) {
    if (subscriptionError.code === "PGRST116") {
      redirect("/dashboard")
    }
    console.error(subscriptionError)
    throw new Error("Error getting subscription data for the company")
  }

  const customerPortal = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer-portal`,
    {
      method: "POST",
      body: JSON.stringify({
        customerId: subscriptionData?.paddleCustomerId,
        subscriptionIds: [subscriptionData?.paddleSubscriptionId],
      }),
    },
  )
  const data: CustomerPortalSession = await customerPortal.json()

  if (!data) {
    throw new Error("Error creating new customer portal")
  }

  return (
    <SettingsPageContent customerPortal={data} company={companyData.company} />
  )
}

export default SettingsPage

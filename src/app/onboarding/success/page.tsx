import OnboardingSuccessPageContent from "@/components/onboarding/OnboardingSuccessPageContent"

const OnboardingSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const txnId = (await searchParams).txnId

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const res = await fetch(`${baseUrl}/api/transaction?txnId=${txnId}`, {
    cache: "no-store",
  })
  const data = await res.json()

  return <OnboardingSuccessPageContent txn={data} />
}

export default OnboardingSuccessPage

import DashboardPageContent from "@/components/dashboard/DashboardPageContent"

const DashboardPage = () => {
  return (
    <DashboardPageContent
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
        { label: "Team conflict", weight: 0.1, note: "" },
        { label: "High stress", weight: 0.3, note: "" },
        { label: "Low focus", weight: 0.5, note: "" },
        { label: "Poor balance", weight: 0.7, note: "" },
        { label: "Missed deadlines", weight: 0.9, note: "" },
        { label: "Role confusion", weight: 0.25, note: "" },
      ]}
    />
  )
}

export default DashboardPage

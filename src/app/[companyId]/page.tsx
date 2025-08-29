import OverviewPageContent from "@/components/dashboard/overview/OverviewPageContent"

const DashboardPage = () => {
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

import CheckCircle from "@/components/shared/icons/CheckCircle"

const INCLUDED_FEATURES = [
  {
    label: "Partly app premium access",
    description:
      "Unlock the complete library of journeys, paths, moments and all other features for all users",
  },
  {
    label: "Dedicated Admin Dashboard",
    description:
      "Manage users, departments, and access company-wide analytics seamlessly",
  },
  {
    label: "Advanced Organization Analytics",
    description:
      "Gain insights into company's well-being, engagement, and progress across your company",
  },
  {
    label: "Department-Level Analytics",
    description:
      "Track well-being, trends, and improvement within specific teams or departments",
  },
  {
    label: "Individual Progress Analytics",
    description:
      "Access general well-being metrics for individual employees, without revealing personal details",
  },
  {
    label: "Personalized Insights & Suggestions",
    description:
      "Receive customized summaries and suggestions based on usage and outcomes",
  },
]

const PricingFeatures = () => {
  return (
    <div className="mx-auto max-w-xl rounded-xl bg-green-light p-5">
      <h3 className="mb-6 text-center font-montserratAlt text-3xl font-black text-black-default">
        What's included?
      </h3>

      <div className="mb-3 flex flex-col gap-5">
        {INCLUDED_FEATURES.map((item) => (
          <div className="flex gap-2" key={item.label}>
            <CheckCircle size={32} className="text-purple-default" />
            <div className="flex flex-col gap-1">
              <span className="font-montserratAlt text-lg font-black text-black-default">
                {item.label}
              </span>
              <span className="text-xs text-black-default">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      <span className="text-[8px] font-medium text-black-default opacity-50">
        *All pricing tiers include the same features except for enterprise which
        gets priority support.
      </span>
    </div>
  )
}

export default PricingFeatures

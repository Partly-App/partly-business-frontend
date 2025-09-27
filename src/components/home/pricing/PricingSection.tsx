import Button from "@/components/shared/Button"
import InfinityIcon from "@/components/shared/icons/Infinity"
import clsx from "clsx"
import Plan from "./Plan"
import PricingFeatures from "./PricingFeatures"

const PLANS = [
  {
    name: "Starter",
    numberOfSeats: "5-20",
    price: "$6.99",
  },
  {
    name: "Growth",
    numberOfSeats: "21-50",
    price: "$5.99",
    isMostPopular: true,
  },
  {
    name: "Team",
    numberOfSeats: "51+",
    price: "$4.99",
  },
  {
    name: "Enterprise",
    numberOfSeats: <InfinityIcon className="text-purple-default" size={42} />,
    price: "Custom",
  },
]

const PricingSection = () => {
  return (
    <div className="px-4 pt-12">
      <h1
        className={clsx(
          "mb-8 text-center font-montserratAlt text-8xl font-black leading-[1.2]",
          "sm:text-16xl",
        )}
      >
        Corporate plans
      </h1>

      <div className="mx-auto mb-6 grid max-w-7xl xs:grid-cols-2 gap-4 lg:grid-cols-4">
        {PLANS.map((item) => (
          <Plan key={item.name} {...item} />
        ))}
      </div>

      <PricingFeatures />

      <div className="mt-8">
        <Button
          size="L"
          color="purple"
          href="/onboarding"
          containerClassName="max-w-78 mx-auto"
        >
          Start your 10-day free trial
        </Button>
      </div>
    </div>
  )
}

export default PricingSection

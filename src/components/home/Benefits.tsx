import Image from "next/image"

const BENEFITS = [
  {
    title: "Build Emotional Intelligence",
    subtitle:
      "Help your team understand, manage, and express emotions effectively",
    icon: "/images/icons/emotional.png",
  },
  {
    title: "Strengthen Team Connection",
    subtitle:
      "Foster empathy, trust, and open communication among team members",
    icon: "/images/icons/link.png",
  },
  {
    title: "Boost Resilience & Well-being",
    subtitle:
      "Equip employees to handle stress, adapt to challenges, and thrive at work",
    icon: "/images/icons/brain.png",
  },
]

const Benefits = () => {
  return (
    <div className="grid grid-cols-1 items-center gap-5 px-4 py-12 xs:grid-cols-3 xs:gap-3 sm:gap-5">
      {BENEFITS.map((item) => (
        <div className="h-full rounded-xl bg-white-mellow px-4 pb-6 pt-4 xs:px-3 xs:pb-4 xs:pt-3 sm:px-4 sm:pb-6 sm:pt-4">
          <Image
            src={item.icon}
            height={42}
            width={42}
            alt=""
            className="mb-6 ml-auto"
          />
          <div className="flex flex-col gap-2">
            <span className="font-montserratAlt text-4xl font-black leading-[1.2] text-black-default xs:text-lg sm:text-2xl">
              {item.title}
            </span>
            <span className="text-xs leading-[1.15] text-black-default sm:text-sm">
              {item.subtitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Benefits

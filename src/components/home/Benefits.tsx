import { renderWithBlack } from "@/utils/strings"
import clsx from "clsx"
import Image from "next/image"

const BENEFITS = [
  {
    title: "Build Emotional Intelligence",
    subtitle:
      "Help your team <black>manage</black> and <black>express</black> emotions in healthy, productive ways",
    icon: "/images/icons/emotional.png",
  },
  {
    title: "Strengthen Team Connection",
    subtitle:
      "Foster communication, and trust with <black>science-backed</black> knowledge",
    icon: "/images/icons/link.png",
  },
  {
    title: "Boost Resilience & Well-being",
    subtitle:
      "<black>Reduce stress</black>, prevent burnout, and help your people thrive",
    icon: "/images/icons/brain.png",
  },
]

const Benefits = () => {
  return (
    <div className="px-4 pb-12 pt-12">
      <h1 className="mb-4 text-center font-montserratAlt text-12xl font-black leading-none text-purple-default">
        Benefits
      </h1>
      <div
        className={clsx(
          "grid grid-cols-1 items-center gap-5",
          "xs:grid-cols-3 xs:gap-3 sm:gap-5",
        )}
      >
        {BENEFITS.map((item) => (
          <div
            key={item.title}
            className={clsx(
              "h-full rounded-xl bg-white-mellow px-4 pb-6 pt-4",
              "xs:px-3 xs:pb-4 xs:pt-3 sm:px-4 sm:pb-6 sm:pt-4",
            )}
          >
            <Image
              src={item.icon}
              height={42}
              width={42}
              alt=""
              className="mb-6 ml-auto hidden xs:block"
            />
            <Image
              src={item.icon}
              height={64}
              width={64}
              alt=""
              className="mb-6 ml-auto block xs:hidden"
            />
            <div className="flex flex-col gap-2">
              <span
                className={clsx(
                  "font-montserratAlt text-4xl font-black leading-[1.2] text-black-default",
                  "xs:text-lg sm:text-2xl",
                )}
              >
                {item.title}
              </span>
              <span className="text-xs leading-[1.15] text-black-default sm:text-sm">
                {renderWithBlack(item.subtitle)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Benefits

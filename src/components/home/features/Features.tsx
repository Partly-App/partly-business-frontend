import clsx from "clsx"
import FeaturesBlock from "./FeaturesBlock"

const FEATURES = [
  {
    title: "Reflect & Take Notes",
    description:
      "Capture thoughts, track progress, and chat daily for ongoing growth",
    imgSrc: "/images/features/reflect-take-notes.webp",
  },
  {
    title: "Personalized Insights",
    description:
      "Get tailored feedback and guidance based on each employee’s journey",
    imgSrc: "/images/features/insights.webp",
  },
  {
    title: "Team Analytics",
    description: "Monitor well-being trends across your company",
    imgSrc: "/images/features/well-being.webp",
  },
  {
    title: "Admin Controls",
    description:
      "Easily manage users and access detailed reports for your team",
    imgSrc: "/images/features/admin-controls.webp",
  },
]

const Features = () => {
  return (
    <section className="px-4 pt-12">
      <h1
        className={clsx(
          "mb-8 text-center font-montserratAlt text-8xl font-black leading-[1.2]",
          "sm:text-16xl",
        )}
      >
        Features
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {FEATURES.map((item) => (
          <FeaturesBlock key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}

export default Features

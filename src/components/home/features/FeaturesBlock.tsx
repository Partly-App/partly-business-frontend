import clsx from "clsx"
import Image from "next/image"

type FeaturesBlockProps = {
  title: string
  description: string
  imgSrc: string
}

const FeaturesBlock = ({ title, description, imgSrc }: FeaturesBlockProps) => {
  return (
    <div
      className={clsx(
        "col-span-1 flex aspect-[4/3] flex-col overflow-hidden rounded-xl bg-grey-dark",
        "xl:aspect-square 2xl:aspect-[2]",
      )}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div
          className={clsx(
            "absolute top-0 z-[2] h-[10%] w-full",
            "bg-gradient-to-b from-grey-dark via-grey-dark/75 to-transparent",
          )}
        />
        <Image
          fill
          src={imgSrc}
          alt={title}
          className="pointer-events-none select-none object-cover"
        />
        <div
          className={clsx(
            "absolute bottom-0 z-[2] h-1/2 w-full",
            "bg-gradient-to-t from-grey-dark to-transparent",
          )}
        />
      </div>

      <div className="flex flex-col px-6 pb-6">
        <span className="font-montserratAlt text-4xl font-black">{title}</span>
        <span className="text-sm opacity-50">{description}</span>
      </div>
    </div>
  )
}

export default FeaturesBlock

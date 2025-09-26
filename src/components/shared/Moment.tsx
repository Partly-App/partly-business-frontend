import { Tag } from "@/types/general"
import clsx from "clsx"
import Image from "next/image"

export type MomentProps = {
  title: string
  description: string
  imgSrc: string
  tag: Tag
  className?: string
}

const momentMap: Record<
  Tag,
  {
    bgColor: string
    color: string
    tagBg?: string
    tagText?: string
    tagTextColor?: string
    tagIconSrc?: string
  }
> = {
  exile: {
    bgColor: "bg-purple-light",
    color: "text-black-default",
    tagBg: "bg-black-default",
    tagText: "Exile",
    tagTextColor: "text-white-default",
    tagIconSrc: "/images/icons/moment/exile.svg",
  },
  manager: {
    bgColor: "bg-blue-light",
    color: "text-black-default",
    tagBg: "bg-black-default",
    tagText: "Manager",
    tagTextColor: "text-white-default",
    tagIconSrc: "/images/icons/moment/manager.svg",
  },
  firefighter: {
    bgColor: "bg-red-light",
    color: "text-black-default",
    tagBg: "bg-black-default",
    tagText: "Firefighter",
    tagTextColor: "text-white-default",
    tagIconSrc: "/images/icons/moment/firefighter.svg",
  },
  self: {
    bgColor: "bg-yellow-light",
    color: "text-black-default",
    tagBg: "bg-black-default",
    tagText: "Self",
    tagTextColor: "text-white-default",
    tagIconSrc: "/images/icons/moment/self.png",
  },
  reflection: {
    bgColor: "bg-white-mellow",
    color: "text-black-default",
  },
  regular: {
    bgColor: "bg-grey-dark",
    color: "text-white-default",
  },
}

const Moment = ({
  title,
  description,
  tag,
  imgSrc,
  className,
}: MomentProps) => {
  return (
    <div
      className={clsx(
        "flex max-w-[364px] justify-between gap-4 rounded-2xl p-3",
        "xs:items-stretch xs:p-4 sm:w-[460px] sm:max-w-max sm:gap-8",
        momentMap[tag].bgColor,
        className,
      )}
    >
      <div className="flex flex-col justify-between gap-3">
        <div className="self-stretch">
          <h5
            className={clsx(
              "mb-2 font-montserratAlt text-lg font-bold leading-[1.15] sm:text-2xl",
              momentMap[tag].color,
            )}
          >
            {title}
          </h5>
          <p
            className={clsx(
              "text-xs leading-[1.25] sm:text-sm",
              momentMap[tag].color,
            )}
          >
            {description}
          </p>
        </div>

        {momentMap[tag].tagIconSrc && (
          <div
            className={clsx(
              "flex w-fit items-center gap-2 rounded-md bg-black-default px-1.5 py-1",
              "xs:rounded-xl xs:px-3 xs:py-2",
            )}
          >
            <Image
              draggable={false}
              alt=""
              src={momentMap[tag].tagIconSrc as string}
              width={16}
              height={16}
              className="select-none"
            />
            <span className="text-xs font-medium">
              {momentMap[tag].tagText}
            </span>
          </div>
        )}
      </div>

      <div
        className={clsx(
          "relative aspect-square w-[25%] min-w-[60px] max-w-[140px] flex-shrink-0 self-center",
          "xs:w-[140px] xs:min-w-[140px] xs:max-w-[140px]",
        )}
      >
        <Image
          fill
          draggable={false}
          alt=""
          src={imgSrc}
          className="rounded-2xl object-cover"
        />
      </div>
    </div>
  )
}

export default Moment

import { DepartmentSubScore } from "@/types/employee"
import { SubScore } from "@/types/profile"
import clsx from "clsx"

type SubScoreBlockProps = {
  label: string
  colorClass: string
  subScore: DepartmentSubScore | SubScore | undefined
  prevSubScore: DepartmentSubScore | SubScore | undefined
  showMore: boolean
  onShowMore: () => void
}

const SubScoreBlock = ({
  label,
  colorClass,
  subScore,
  prevSubScore,
  showMore,
  onShowMore,
}: SubScoreBlockProps) => {
  const change =
    !subScore || !prevSubScore
      ? undefined
      : subScore?.score - prevSubScore?.score

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex w-fit items-baseline gap-2">
        <span className={`font-mont text-6xl font-black ${colorClass}`}>
          {label}
        </span>
        <div className="relative">
          <span className="font-montserratAlt font-black">
            {subScore?.score || 0}/<span className="opacity-50">100</span>
          </span>
          {prevSubScore?.score &&
            prevSubScore.score > 0 &&
            change !== undefined && (
              <div
                className={clsx(
                  "absolute -right-6 -top-3 font-montserratAlt text-xs font-bold",
                  change < 0 ? "text-green-default" : "text-red-default",
                )}
              >
                {change > 0 && "+"}
                {change}
                <span className="pl-0.5 text-[8px] font-medium text-white-default opacity-50">
                  7d
                </span>
              </div>
            )}
        </div>
      </div>
      {subScore?.reason && (
        <>
          <div
            className={clsx(
              "relative overflow-hidden",
              showMore ? "h-fit" : subScore.reason.length > 60 ? "h-18" : "",
            )}
          >
            {subScore.reason.length > 60 && !showMore && (
              <div className="absolute bottom-0 top-0 h-full w-full bg-gradient-to-t from-grey-dark to-transparent" />
            )}
            <span>{subScore.reason}</span>
          </div>
          {!showMore && subScore.reason.length > 60 && (
            <span
              className={clsx(
                "-mt-2 block w-fit cursor-pointer text-sm font-bold opacity-75",
                "transition-transform duration-200 hover:scale-[0.97]",
              )}
              onClick={onShowMore}
            >
              Show more...
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default SubScoreBlock

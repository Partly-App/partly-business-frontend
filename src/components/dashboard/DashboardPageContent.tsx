import { Journey } from "@/types/journey"
import { getStruggleColor } from "@/utils/colors"
import clsx from "clsx"
import Image from "next/image"
import InfoContainer from "../shared/containers/InfoContainer"
import WellBeingScore from "./WellBeingScore"

type DashboardPageContentProps = {
  mostEngagedJourney: Journey
  scores: {
    confidenceNow: number
    confidencePrev: number
    anxietyNow: number
    anxietyPrev: number
    angerNow: number
    angerPrev: number
  }
  currentChallenges: Array<{ label: string; weight: number; note: string }>
}

const JOURNEYS_SRCS: Record<
  Journey,
  { label: string; color: string; imgSrc: string }
> = {
  anger: {
    label: "Anger",
    color: "#F63F57",
    imgSrc: "/images/journeys/anger.webp",
  },
  anxiety: {
    label: "Anxiety",
    color: "#C3ACFF",
    imgSrc: "/images/journeys/anxiety.webp",
  },
  confidence: {
    label: "Confidence",
    color: "#FFC800",
    imgSrc: "/images/journeys/confidence.webp",
  },
  shame: { label: "", color: "", imgSrc: "" },
}

const DashboardPageContent = ({
  mostEngagedJourney,
  scores,
  currentChallenges,
}: DashboardPageContentProps) => {
  const anxietyChange = scores.anxietyNow - scores.anxietyPrev
  const angerChange = scores.angerNow - scores.angerPrev
  const confidenceChange = scores.confidenceNow - scores.confidencePrev

  return (
    <main className="realtive min-h-screen w-full px-6 py-4">
      <h1 className="mb-4 font-montserratAlt text-4xl font-black">Overview</h1>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <InfoContainer className="col-span-2">
          <span className="font-montserratAlt font-bold">
            <span className="font-black">Well-being</span> score
          </span>
          <div className="mt-4 flex gap-8">
            <WellBeingScore prevScore={80} score={70} size={230} />
            <div className="flex flex-col justify-between">
              <div className="relative flex items-center gap-2">
                <span className="font-bold">Confidence</span>
                <span className="font-montserratAlt font-black">
                  {scores.confidenceNow}/<span className="opacity-50">100</span>
                </span>
                {scores.confidencePrev > 0 && (
                  <div
                    className={clsx(
                      "absolute -right-6 -top-3 font-montserratAlt text-xs font-bold",
                      confidenceChange > 0
                        ? "text-green-default"
                        : "text-red-default",
                    )}
                  >
                    {confidenceChange > 0 && "+"}
                    {confidenceChange}
                    <span className="pl-0.5 text-[8px] font-medium text-white-default opacity-50">
                      7d
                    </span>
                  </div>
                )}
              </div>

              <div className="relative flex w-fit items-center gap-2">
                <span className="font-bold">Anxiety</span>
                <span className="font-montserratAlt font-black">
                  {scores.anxietyNow}/<span className="opacity-50">100</span>
                </span>
                {scores.anxietyPrev > 0 && (
                  <div
                    className={clsx(
                      "absolute -right-6 -top-3 font-montserratAlt text-xs font-bold",
                      anxietyChange > 0
                        ? "text-red-default"
                        : "text-green-default",
                    )}
                  >
                    {anxietyChange > 0 && "+"}
                    {anxietyChange}
                    <span className="pl-0.5 text-[8px] font-medium text-white-default opacity-50">
                      7d
                    </span>
                  </div>
                )}
              </div>

              <div className="relative flex w-fit items-center gap-2">
                <span className="font-bold">Anger</span>
                <span className="font-montserratAlt font-black">
                  {scores.angerNow}/<span className="opacity-50">100</span>
                </span>
                {scores.angerPrev > 0 && (
                  <div
                    className={clsx(
                      "absolute -right-6 -top-3 font-montserratAlt text-xs font-bold",
                      angerChange > 0
                        ? "text-red-default"
                        : "text-green-default",
                    )}
                  >
                    {angerChange > 0 && "+"}
                    {angerChange}
                    <span className="pl-0.5 text-[8px] font-medium text-white-default opacity-50">
                      7d
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </InfoContainer>
        <InfoContainer className="flex flex-col">
          <span className="font-montserratAlt font-bold">
            Employees / <span className="opacity-50">Departments</span>
          </span>
          <div className="mt-4 flex flex-1 items-center justify-center">
            <span className="font-montserratAlt text-14xl font-black">
              79/<span className="opacity-50">3</span>
            </span>
          </div>
        </InfoContainer>

        <InfoContainer className="col-span-1 flex flex-col">
          <span className="font-montserratAlt font-bold">
            Most Engaged <span className="font-black">Journey</span>
          </span>
          <div className="relative mt-4 flex flex-1 items-center justify-center gap-2">
            <Image
              draggable={false}
              alt=""
              width={42}
              height={42}
              src={JOURNEYS_SRCS[mostEngagedJourney].imgSrc}
              className="shrink-0 rounded-lg border"
              style={{ borderColor: JOURNEYS_SRCS[mostEngagedJourney].color }}
            />
            <span
              className={clsx(
                "font-montserratAlt text-3xl font-black xl:text-5xl",
              )}
              style={{ color: JOURNEYS_SRCS[mostEngagedJourney].color }}
            >
              {JOURNEYS_SRCS[mostEngagedJourney].label}
            </span>
          </div>
        </InfoContainer>
        <InfoContainer className="col-span-2">
          <span className="font-montserratAlt font-bold">
            Current <span className="font-black">Struggles</span>
          </span>

          <div className="relative mt-4 grid flex-1 grid-cols-3 items-center justify-center gap-3">
            {currentChallenges
              .sort((a, b) => b.weight - a.weight)
              .map((item) => {
                const weight = item.weight * 100
                const struggleColor = getStruggleColor(weight)

                return (
                  <div
                    key={item.label}
                    className={clsx(
                      "col-span-1 flex aspect-video items-center justify-center rounded-xl p-2",
                      "cursor-pointer transition-transform hover:scale-95",
                    )}
                    style={{ backgroundColor: struggleColor }}
                  >
                    <span className="text-center text-sm font-bold text-black-default">
                      {item.label}
                    </span>
                  </div>
                )
              })}
          </div>
        </InfoContainer>
      </div>
      <div className="flex items-center justify-center pb-6 pt-12">
        <span className="font-montserratAlt text-xl font-bold opacity-25">
          More stats coming soon...
        </span>
      </div>
    </main>
  )
}

export default DashboardPageContent

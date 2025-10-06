import { Journey } from "@/types/journey"
import { CurrentStruggle } from "@/types/profile"
import clsx from "clsx"
import Image from "next/image"
import InfoContainer from "../../shared/containers/InfoContainer"
import WellBeingScore from "../WellBeingScore"
import StruggleContent from "./StruggleContent"

export type OverviewPageContentProps = {
  mostEngagedJourney: Journey | null
  score: number
  prevScore: number
  subScores: {
    confidenceNow: number
    confidencePrev: number
    anxietyNow: number
    anxietyPrev: number
    angerNow: number
    angerPrev: number
  }
  numberOfEmployees: number
  numberOfDepartments: number
  currentStruggles: Array<Partial<CurrentStruggle>> | null
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

const OverviewPageContent = ({
  mostEngagedJourney,
  score,
  prevScore,
  subScores,
  numberOfEmployees,
  numberOfDepartments,
  currentStruggles,
}: OverviewPageContentProps) => {
  const anxietyChange = subScores.anxietyNow - subScores.anxietyPrev
  const angerChange = subScores.angerNow - subScores.angerPrev
  const confidenceChange = subScores.confidenceNow - subScores.confidencePrev

  return (
    <main className="realtive min-h-screen w-full px-6 py-4">
      <h1 className="mb-4 font-montserratAlt text-4xl font-black">Overview</h1>
      <div className="mb-4 flex grid-cols-1 flex-col gap-4 xs:grid xs:grid-cols-2 lg:grid-cols-3">
        <InfoContainer className="col-span-1 xs:col-span-2 2xl:col-span-1">
          <span className="font-montserratAlt font-bold">
            <span className="font-black">Well-being</span> score
          </span>
          <div className="mt-4 flex flex-col gap-8 xs:flex-row">
            <div className="hidden xs:contents">
              <WellBeingScore prevScore={prevScore} score={score} size={192} />
            </div>
            <div className="flex justify-center xs:hidden">
              <WellBeingScore prevScore={prevScore} score={score} size={280} />
            </div>
            <div className="flex flex-col justify-between gap-5">
              <div className="relative flex w-fit items-center">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold">Confidence</span>
                  <span className="font-montserratAlt font-black">
                    {subScores.confidenceNow}/
                    <span className="opacity-50">100</span>
                  </span>
                </div>
                {subScores.confidencePrev > 0 && (
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
                <div className="flex items-center gap-1.5">
                  <span className="font-bold">Anxiety</span>
                  <span className="font-montserratAlt font-black">
                    {subScores.anxietyNow}/
                    <span className="opacity-50">100</span>
                  </span>
                </div>

                {subScores.anxietyPrev > 0 && (
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
                <div className="flex items-center gap-1.5">
                  <span className="font-bold">Anger</span>
                  <span className="font-montserratAlt font-black">
                    {subScores.angerNow}/<span className="opacity-50">100</span>
                  </span>
                </div>

                {subScores.angerPrev > 0 && (
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
        <InfoContainer className="col-span-1 flex flex-col">
          <span className="font-montserratAlt font-bold">
            Employees / <span className="opacity-50">Departments</span>
          </span>
          <div className="mt-4 flex flex-1 items-center justify-center">
            <span className="font-montserratAlt text-4xl font-black xs:text-14xl">
              {numberOfEmployees}/
              <span className="opacity-50">{numberOfDepartments}</span>
            </span>
          </div>
        </InfoContainer>
        <InfoContainer className="col-span-1 flex flex-col">
          <span className="font-montserratAlt font-bold">
            Most Engaged <span className="font-black">Journey</span>
          </span>
          <div className="relative mt-4 flex flex-1 items-center justify-center gap-2">
            {mostEngagedJourney !== null ? (
              <>
                <Image
                  draggable={false}
                  alt=""
                  width={42}
                  height={42}
                  src={JOURNEYS_SRCS[mostEngagedJourney].imgSrc}
                  className="shrink-0 rounded-lg border"
                  style={{
                    borderColor: JOURNEYS_SRCS[mostEngagedJourney].color,
                  }}
                />
                <span
                  className={clsx(
                    "font-montserratAlt text-xl font-black xs:text-3xl xl:text-5xl",
                  )}
                  style={{ color: JOURNEYS_SRCS[mostEngagedJourney].color }}
                >
                  {JOURNEYS_SRCS[mostEngagedJourney].label}
                </span>
              </>
            ) : (
              <span className="text-center font-montserratAlt text-xl font-bold opacity-25">
                Need more time to gather info
              </span>
            )}
          </div>
        </InfoContainer>
        {!!currentStruggles?.length && (
          <StruggleContent currentStruggles={currentStruggles} />
        )}
      </div>
      <div className="flex items-center justify-center pb-6 pt-12">
        <span className="font-montserratAlt text-xl font-bold opacity-25">
          More stats coming soon...
        </span>
      </div>
    </main>
  )
}

export default OverviewPageContent

"use client"

import Button from "@/components/shared/Button"
import Portal from "@/components/shared/Portal"
import FallingMan from "@/components/shared/loaders/FallingMan"
import { useSupabase } from "@/components/shared/providers"
import { SCORE_TYPES } from "@/constants/employee"
import { DepartmentScore, DepartmentSubScore } from "@/types/employee"
import { Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { X } from "react-feather"
import WellBeingScore from "../WellBeingScore"

type DepartmentSidebarProps = {
  id: string
  title?: string
  isOpen: boolean
  onClose: () => void
  onExited: () => void
}

const DepartmentSidebar = ({
  id,
  title,
  isOpen,
  onClose,
  onExited,
}: DepartmentSidebarProps) => {
  const [departmentScores, setDepartmentScores] =
    useState<Array<DepartmentScore> | null>(null)
  const [currentSubScores, setCurrentSubScores] =
    useState<Array<DepartmentSubScore> | null>(null)
  const [prevSubScores, setPrevSubScores] =
    useState<Array<DepartmentSubScore> | null>(null)
  const [showMoreMap, setShowMoreMap] = useState({
    anger: false,
    anxiety: false,
    confidence: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  const supabase = useSupabase()

  const currentSubScoreByType = useMemo(() => {
    if (!currentSubScores) return null
    const subscoresByType = Object.fromEntries(
      currentSubScores.map((sub) => [sub.type, sub]),
    )

    return {
      anxiety: subscoresByType["anxiety"],
      anger: subscoresByType["anger"],
      confidence: subscoresByType["confidence"],
    }
  }, [currentSubScores])

  const prevSubScoreByType = useMemo(() => {
    if (!prevSubScores) return null
    const subscoresByType = Object.fromEntries(
      prevSubScores.map((sub) => [sub.type, sub]),
    )

    return {
      anxiety: subscoresByType["anxiety"],
      anger: subscoresByType["anger"],
      confidence: subscoresByType["confidence"],
    }
  }, [prevSubScores])

  const subScoreChanges = useMemo(() => {
    if (!currentSubScoreByType || !prevSubScoreByType) return null

    const anxietyChange =
      currentSubScoreByType.anxiety.score - prevSubScoreByType.anxiety.score
    const angerChange =
      currentSubScoreByType.anger.score - prevSubScoreByType.anger.score
    const confidenceChange =
      currentSubScoreByType.confidence.score -
      prevSubScoreByType.confidence.score

    return {
      anxietyChange,
      angerChange,
      confidenceChange,
    }
  }, [currentSubScoreByType, prevSubScoreByType])

  const getScores = useCallback(async () => {
    if (!id) return

    setIsLoading(true)

    const { data, error } = await supabase
      .from("departmentScores")
      .select("*")
      .eq("departmentId", id)
      .order("createdAt", { ascending: false })
      .limit(2)

    if (!data?.length || error) {
      console.error("Error fetching department scores: ", error)
      setIsLoading(false)
      return
    }

    setDepartmentScores(data)

    const { data: currentSubScoresData, error: currentSubScoresError } =
      await supabase
        .from("departmentSubScores")
        .select("*")
        .eq("departmentScoreId", data[0].id)
        .in("type", SCORE_TYPES)

    if (!currentSubScoresData?.length || currentSubScoresError) {
      console.error(
        "Error fetching current sub scores: ",
        currentSubScoresError,
      )
      setIsLoading(false)
    } else {
      setCurrentSubScores(currentSubScoresData)
    }

    if (!!data[1]?.id) {
      const { data: prevSubScoresData, error: prevSubScoresError } =
        await supabase
          .from("departmentSubScores")
          .select("*")
          .eq("departmentScoreId", data[1].id)
          .in("type", SCORE_TYPES)

      if (prevSubScoresError) {
        console.error("Error fetching previous scores: ", prevSubScoresError)
      } else {
        setPrevSubScores(prevSubScoresData)
      }
    }

    setIsLoading(false)
  }, [supabase, id])

  useEffect(() => {
    if (!id) return

    getScores()
  }, [getScores, id])

  return (
    <Portal>
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 z-30 bg-black-default/30"
          onClick={onClose}
        />
      </Transition>

      {/* Sidebar */}
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition-transform duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-200"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        afterLeave={onExited}
      >
        <div
          className={clsx(
            "fixed bottom-0 right-0 top-0 z-50 h-screen md:w-1/2 xl:w-1/3",
            "overflow-y-auto bg-grey-dark p-4 shadow-lg",
            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white-default/25",
          )}
        >
          <div className="flex items-center justify-between gap-6">
            <h3 className="font-montserratAlt text-xl font-black">{title}</h3>
            <Button
              color="transparent"
              size="S"
              containsIconOnly
              onClick={onClose}
            >
              <X size={20} className="text-white-default" />
            </Button>
          </div>
          <Transition
            show={isLoading}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
            className="absolute flex h-[90%] w-full items-center justify-center"
          >
            <FallingMan size={120} />
          </Transition>

          <Transition
            show={!isLoading}
            enter="transition-opacity duration-300 delay-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
            className="relative"
          >
            {departmentScores && currentSubScores && (
              <div className="mb-10 mt-6">
                <span
                  className={clsx(
                    "mx-auto block text-center font-montserratAlt text-4xl",
                    "font-black leading-none opacity-50",
                  )}
                >
                  Well-being
                </span>

                <WellBeingScore
                  prevScore={departmentScores[1]?.score}
                  score={departmentScores[0].score}
                  size={320}
                  className="mx-auto -mt-2 mb-6"
                />

                <div className="mt-10">
                  <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                      <div className="relative flex w-fit items-baseline gap-2">
                        <span className="font-mont text-6xl font-black text-yellow-default">
                          Confidence
                        </span>
                        <div className="relative">
                          <span className="font-montserratAlt font-black">
                            {currentSubScoreByType?.confidence.score || 0}/
                            <span className="opacity-50">100</span>
                          </span>
                          {prevSubScoreByType?.confidence.score &&
                            prevSubScoreByType.confidence.score > 0 &&
                            subScoreChanges && (
                              <div
                                className={clsx(
                                  "absolute -right-6 -top-3 font-montserratAlt text-xs font-bold",
                                  subScoreChanges.confidenceChange > 0
                                    ? "text-green-default"
                                    : "text-red-default",
                                )}
                              >
                                {subScoreChanges.confidenceChange > 0 && "+"}
                                {subScoreChanges.confidenceChange}
                                <span className="pl-0.5 text-[8px] font-medium text-white-default opacity-50">
                                  7d
                                </span>
                              </div>
                            )}
                        </div>
                      </div>

                      <div
                        className={clsx(
                          "relative overflow-hidden",
                          showMoreMap.confidence ? "h-fit" : "h-18",
                        )}
                      >
                        {!showMoreMap.confidence && (
                          <div className="absolute bottom-0 top-0 h-full w-full bg-gradient-to-t from-grey-dark to-transparent" />
                        )}
                        <span>{currentSubScoreByType?.confidence.reason}</span>
                      </div>
                      {!showMoreMap.confidence &&
                        currentSubScoreByType?.confidence.reason &&
                        currentSubScoreByType.confidence.reason.length > 60 && (
                          <span
                            className={clsx(
                              "-mt-2 block w-fit cursor-pointer text-sm font-bold opacity-75",
                              "transition-transform duration-200 hover:scale-[0.97]",
                            )}
                            onClick={() =>
                              setShowMoreMap((prev) => ({
                                ...prev,
                                confidence: true,
                              }))
                            }
                          >
                            Show more...
                          </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="relative flex w-fit items-baseline gap-2">
                        <span className="font-mont text-6xl font-black text-purple-default">
                          Anxiety
                        </span>
                        <div className="relative">
                          <span className="font-montserratAlt font-black">
                            {currentSubScoreByType?.anxiety.score || 0}/
                            <span className="opacity-50">100</span>
                          </span>
                          {prevSubScoreByType?.anxiety.score &&
                            prevSubScoreByType.anxiety.score > 0 &&
                            subScoreChanges && (
                              <div
                                className={clsx(
                                  "absolute -right-6 -top-3 font-montserratAlt text-xs font-bold",
                                  subScoreChanges.anxietyChange < 0
                                    ? "text-green-default"
                                    : "text-red-default",
                                )}
                              >
                                {subScoreChanges.anxietyChange > 0 && "+"}
                                {subScoreChanges.anxietyChange}
                                <span className="pl-0.5 text-[8px] font-medium text-white-default opacity-50">
                                  7d
                                </span>
                              </div>
                            )}
                        </div>
                      </div>

                      <div
                        className={clsx(
                          "relative overflow-hidden",
                          showMoreMap.anxiety ? "h-fit" : "h-18",
                        )}
                      >
                        {!showMoreMap.anxiety && (
                          <div className="absolute bottom-0 top-0 h-full w-full bg-gradient-to-t from-grey-dark to-transparent" />
                        )}
                        <span>{currentSubScoreByType?.anxiety.reason}</span>
                      </div>
                      {!showMoreMap.anxiety &&
                        currentSubScoreByType?.anxiety.reason &&
                        currentSubScoreByType.anxiety.reason.length > 60 && (
                          <span
                            className={clsx(
                              "-mt-2 block w-fit cursor-pointer text-sm font-bold opacity-75",
                              "transition-transform duration-200 hover:scale-[0.97]",
                            )}
                            onClick={() =>
                              setShowMoreMap((prev) => ({
                                ...prev,
                                anxiety: true,
                              }))
                            }
                          >
                            Show more...
                          </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="relative flex w-fit items-baseline gap-2">
                        <span className="font-mont text-6xl font-black text-red-default">
                          Anger
                        </span>
                        <div className="relative">
                          <span className="font-montserratAlt font-black">
                            {currentSubScoreByType?.anger.score || 0}/
                            <span className="opacity-50">100</span>
                          </span>
                          {prevSubScoreByType?.anger.score &&
                            prevSubScoreByType.anger.score > 0 &&
                            subScoreChanges && (
                              <div
                                className={clsx(
                                  "absolute -right-6 -top-3 font-montserratAlt text-xs font-bold",
                                  subScoreChanges.angerChange < 0
                                    ? "text-green-default"
                                    : "text-red-default",
                                )}
                              >
                                {subScoreChanges.angerChange > 0 && "+"}
                                {subScoreChanges.angerChange}
                                <span className="pl-0.5 text-[8px] font-medium text-white-default opacity-50">
                                  7d
                                </span>
                              </div>
                            )}
                        </div>
                      </div>

                      <div
                        className={clsx(
                          "relative overflow-hidden",
                          showMoreMap.anger ? "h-fit" : "h-18",
                        )}
                      >
                        {!showMoreMap.anger && (
                          <div className="absolute bottom-0 top-0 h-full w-full bg-gradient-to-t from-grey-dark to-transparent" />
                        )}
                        <span>{currentSubScoreByType?.anger.reason}</span>
                      </div>
                      {!showMoreMap.anger &&
                        currentSubScoreByType?.anger.reason &&
                        currentSubScoreByType.anger.reason.length > 60 && (
                          <span
                            className={clsx(
                              "-mt-2 block w-fit cursor-pointer text-sm font-bold opacity-75",
                              "transition-transform duration-200 hover:scale-[0.97]",
                            )}
                            onClick={() =>
                              setShowMoreMap((prev) => ({
                                ...prev,
                                anger: true,
                              }))
                            }
                          >
                            Show more...
                          </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="relative flex w-fit items-baseline gap-2">
                        <span className="font-mont text-6xl font-black">
                          Suggestions
                        </span>
                      </div>

                      <span>{departmentScores[0].fixSuggestion}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Transition>
        </div>
      </Transition>
    </Portal>
  )
}

export default DepartmentSidebar

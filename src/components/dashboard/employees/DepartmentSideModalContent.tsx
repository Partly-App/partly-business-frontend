"use client"

import SideSlideModal from "@/components/shared/modals/SideSlideModal"
import { useSupabase } from "@/components/shared/providers"
import { SCORE_TYPES } from "@/constants/employee"
import { useToast } from "@/context/ToastContext"
import { DepartmentScore, DepartmentSubScore } from "@/types/employee"
import clsx from "clsx"
import { useCallback, useEffect, useMemo, useState } from "react"
import WellBeingScore from "../WellBeingScore"
import SubScoreBlock from "./SubScoreBlock"

type DepartmentSideModalContentProps = {
  id: string
  title?: string
  isOpen: boolean
  onClose: () => void
  onExited: () => void
}

const DepartmentSideModalContent = ({
  id,
  title,
  isOpen,
  onClose,
  onExited,
}: DepartmentSideModalContentProps) => {
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
  const { showToast } = useToast()

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
      showToast(
        "Unexpected error while deleting a department! Please, try again later.",
        "bottom",
        "error",
      )
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
      showToast("Unexpected error! Please, try again later.", "bottom", "error")

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
    <SideSlideModal
      title={title}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onExited={onExited}
    >
      {departmentScores && currentSubScores && (
        <div className="mb-10 mt-6">
          <span
            className={clsx(
              "mx-auto block text-center font-montserratAlt text-4xl",
              "font-black leading-none",
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
              <SubScoreBlock
                label="Confidence"
                colorClass="text-yellow-default"
                subScore={currentSubScoreByType?.confidence}
                prevSubScore={prevSubScoreByType?.confidence}
                showMore={showMoreMap.confidence}
                onShowMore={() =>
                  setShowMoreMap((prev) => ({
                    ...prev,
                    confidence: true,
                  }))
                }
              />

              <SubScoreBlock
                inverseIndicator
                label="Anxiety"
                colorClass="text-purple-default"
                subScore={currentSubScoreByType?.anxiety}
                prevSubScore={prevSubScoreByType?.anxiety}
                showMore={showMoreMap.anxiety}
                onShowMore={() =>
                  setShowMoreMap((prev) => ({
                    ...prev,
                    anxiety: true,
                  }))
                }
              />

              <SubScoreBlock
                inverseIndicator
                label="Anger"
                colorClass="text-red-default"
                subScore={currentSubScoreByType?.anger}
                prevSubScore={prevSubScoreByType?.anger}
                showMore={showMoreMap.anger}
                onShowMore={() =>
                  setShowMoreMap((prev) => ({
                    ...prev,
                    anger: true,
                  }))
                }
              />

              {departmentScores[0].fixSuggestion ? (
                <div className="flex flex-col gap-4">
                  <div className="relative flex w-fit items-baseline gap-2">
                    <span className="font-mont text-6xl font-black">
                      Suggestions
                    </span>
                  </div>

                  <span>{departmentScores[0].fixSuggestion}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center px-6 py-4">
                  <span className="text-center font-montserratAlt font-black opacity-50">
                    Partly needs more time and info to provide score reasoning*
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SideSlideModal>
  )
}

export default DepartmentSideModalContent

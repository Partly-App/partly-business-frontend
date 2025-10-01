"use client"

import Modal from "@/components/shared/Modal"
import InfoContainer from "@/components/shared/containers/InfoContainer"
import { getStruggleColor } from "@/utils/colors"
import clsx from "clsx"
import { useState } from "react"
import { OverviewPageContentProps } from "./OverviewPageContent"

type StruggleContentProps = {
  currentChallenges: OverviewPageContentProps["currentChallenges"]
}

const StruggleContent = ({ currentChallenges }: StruggleContentProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <InfoContainer className="col-span-2 2xl:col-span-3">
        <span className="font-montserratAlt font-bold">
          Current <span className="font-black">Struggles</span>
        </span>

        <div className="relative mt-4 grid flex-1 grid-cols-2 items-center justify-center gap-3 xs:grid-cols-3">
          {currentChallenges
            .sort((a, b) => b.weight - a.weight)
            .map((item) => {
              const weight = item.weight * 100
              const struggleColor = getStruggleColor(weight)

              return (
                <div key={item.label} className="contents">
                  <Modal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title={`${item.label} ${item.label} ${item.label}`}
                  >
                    <></>
                  </Modal>
                  <div
                    className={clsx(
                      "col-span-1 flex aspect-square items-center justify-center rounded-xl p-2 md:aspect-video",
                      "relative cursor-pointer transition-transform hover:scale-95",
                    )}
                    style={{ backgroundColor: struggleColor }}
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="text-center text-sm font-bold text-black-default">
                      {item.label}
                    </span>
                    <span className="absolute right-2 top-2 font-montserratAlt text-sm font-black text-black-default">
                      {item.weight * 10}/<span className="opacity-50">10</span>
                    </span>
                  </div>
                </div>
              )
            })}
        </div>
      </InfoContainer>
    </>
  )
}

export default StruggleContent

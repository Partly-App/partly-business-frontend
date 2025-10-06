"use client"

import Modal from "@/components/shared/Modal"
import InfoContainer from "@/components/shared/containers/InfoContainer"
import { CurrentStruggle } from "@/types/profile"
import { getStruggleColor } from "@/utils/colors"
import clsx from "clsx"
import { useState } from "react"

type StruggleContentProps = {
  currentStruggles: Array<Partial<CurrentStruggle>>
}

const StruggleContent = ({ currentStruggles }: StruggleContentProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <InfoContainer className="col-span-2 2xl:col-span-3">
        <div className="flex flex-col">
          <span className="font-montserratAlt font-bold">
            Current <span className="font-black">Struggles</span>
          </span>
          <span className="text-[10px] opacity-30">
            *Taken from your employees
          </span>
        </div>

        <div className="relative mt-4 grid flex-1 grid-cols-2 items-center justify-center gap-3 xs:grid-cols-3">
          {currentStruggles
            .sort((a, b) => b.severity! - a.severity!)
            .map((item) => {
              const weight = item.severity! * 100
              const struggleColor = getStruggleColor(weight)

              return (
                <div key={item.label} className="contents">
                  <Modal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title={item.label}
                  >
                    <p className="mb-6 mt-2">{item.note}</p>
                    <span className="font-montserratAlt text-4xl font-black text-purple-light">
                      {item.fixTitle}
                    </span>
                    <ul className="pt-2">
                      {item.fixPoints?.map((item) => (
                        <li className="mb-0.5" key={item}>
                          • {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8">{item.endNote}</p>
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
                      {item.severity}/<span className="opacity-50">10</span>
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

"use client"

import clsx from "clsx"
import Image from "next/image"
import { ReactNode, useEffect, useRef, useState } from "react"

type StructureRowProps = {
  index: number
  textContent: ReactNode
  children: ReactNode
}

const StructureRow = ({ index, textContent, children }: StructureRowProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.25 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative flex gap-12 pt-12">
      <div className="flex flex-1 items-stretch gap-6 md:gap-12">
        <div className="flex h-[720px] w-6 flex-col items-center justify-between pt-6 xs:w-8 lg:h-[520px]">
          <div
            ref={ref}
            className={clsx(
              "flex h-8 w-8 items-center justify-center rounded-full xs:h-12 xs:w-12",
              "transition-colors duration-700 ease-out",
              isVisible ? "bg-green-default" : "bg-white-default/25",
            )}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="relative h-4 w-4 xs:h-7 xs:w-7">
              <Image
                fill
                alt=""
                src="/images/icons/check.svg"
                className={clsx(
                  "object-contain transition-opacity duration-700 ease-out",
                  isVisible ? "opacity-100" : "opacity-0",
                )}
                style={{ transitionDelay: "750ms" }}
              />
            </div>
          </div>
          {Array.from({ length: 7 })
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-full bg-white-default/25"
              />
            ))}
        </div>
        <div className="flex flex-1 flex-col gap-8 lg:flex-row">
          <div className="lg:flex-1">
            <span className="mb-4 inline-block font-montserratAlt text-19xl font-black opacity-25">
              {index}.
            </span>
            {textContent}
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

export default StructureRow

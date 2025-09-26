"use client"

import clsx from "clsx"
import { ReactNode, useEffect, useRef, useState } from "react"

type AppearAnimatedProps = {
  delay?: number
  slide?: boolean
  slideFrom?: "bottom" | "top" | "left" | "right"
  className?: string
  children: ReactNode
}

const AppearAnimated = ({
  delay,
  slide = true,
  slideFrom = "bottom",
  className,
  children,
}: AppearAnimatedProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const slideFromClasses: Record<NonNullable<typeof slideFrom>, string> = {
    bottom: "translate-y-20",
    top: "-translate-y-20",
    left: "-translate-x-20",
    right: "translate-x-20",
  }

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
    <div
      ref={ref}
      className={clsx(
        "transition-[transform,opacity] duration-700 ease-out",
        slide
          ? isVisible
            ? "translate-x-0 translate-y-0 opacity-100"
            : `${slideFromClasses[slideFrom]} opacity-0`
          : isVisible
            ? "opacity-100"
            : "opacity-0",
        className,
      )}
      style={{
        transitionDelay: delay ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  )
}

export default AppearAnimated

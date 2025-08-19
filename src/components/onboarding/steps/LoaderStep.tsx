"use client"

import Button from "@/components/shared/Button"
import CheckCircle from "@/components/shared/icons/CheckCircle"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { OnboardingStepType } from "../types"

const LABELS = [
  "Analyzing company's needs",
  "Creating your personal dashboard",
  "Setting up your departments",
]

const STEP_DURATION = 2500
const FPS = 30

const LoaderStep = ({ onNext }: OnboardingStepType) => {
  const [progress, setProgress] = useState<number[]>(
    Array(LABELS.length).fill(0),
  )
  const [activeStep, setActiveStep] = useState(-1)

  useEffect(() => {
    if (activeStep >= LABELS.length) {
      onNext()
    }

    const startTimeout = setTimeout(() => {
      const intervalMs = 1000 / FPS
      const increment = 100 / (STEP_DURATION / intervalMs)
      let current = 0

      if (activeStep === -1) {
        setActiveStep(0)
        return
      }

      const interval = setInterval(() => {
        current += increment
        setProgress((prev) => {
          const newProgress = [...prev]
          newProgress[activeStep] = Math.floor(Math.min(current, 100))
          return newProgress
        })

        if (current >= 100) {
          clearInterval(interval)
          setTimeout(() => setActiveStep((s) => s + 1), 300)
        }
      }, intervalMs)
    }, 500)

    return () => clearTimeout(startTimeout)
  }, [activeStep])

  return (
    <section className="mx-auto max-w-lg px-6 py-10">
      <div className="mb-12 flex flex-col items-center">
        <h1 className="mb-2 text-center font-montserratAlt text-2xl font-bold">
          We are shaping a{" "}
          <span className="font-montserratAlt font-black text-yellow-default">
            well-being strategy
          </span>{" "}
          for your team...
        </h1>
      </div>

      <div className="flex w-full flex-col gap-5">
        {LABELS.map((label, i) => {
          const value = progress[i]
          const isActive = i === activeStep
          return (
            <div key={label}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-bold">{label}</span>
                <div className="relative h-6 min-w-[40px]">
                  <div
                    className={clsx(
                      "absolute right-0 text-purple-default transition-opacity duration-300",
                      value >= 100 ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <CheckCircle size={24} />
                  </div>
                  <span
                    className={clsx(
                      "absolute right-0 text-right text-sm font-bold opacity-0 transition-opacity duration-300",
                      value < 100 && isActive ? "opacity-70" : "opacity-0",
                    )}
                  >
                    {value}%
                  </span>
                </div>
              </div>
              <div
                className={clsx(
                  "relative h-[5px] w-full rounded-md bg-white-default/25 transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              >
                <div
                  className="absolute h-full rounded bg-purple-default transition-all duration-100 ease-linear"
                  style={{ width: `${value}%` }}
                />
              </div>
              <div
                className={clsx(
                  "-mt-0.5 w-full rounded border-b border-white-default/25 transition-opacity duration-300",
                  !isActive ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default LoaderStep

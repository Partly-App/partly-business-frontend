"use client"

import { supabase } from "@/lib/supabaseClient"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"
import Button from "../shared/Button"
import { getCompanyByUser } from "@/services/company"

const FADE_IMAGES = [
  "/images/journeys/anger.webp",
  "/images/facts/anxiety.webp",
  "/images/journeys/confidence.webp",
  "/images/facts/conflict.webp",
  "/images/facts/feedback.webp",
  "/images/journeys/anxiety.webp",
  "/images/facts/productivity.png",
  "/images/facts/tension.jpg",
]

const FADE_DURATION = 1000
const VISIBLE_DURATION = 3000

const HeroSection = () => {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {

    const visibleTimeout = setTimeout(() => {
      setPrev(current)
      setCurrent((prevIndex) => (prevIndex + 1) % FADE_IMAGES.length)
      setIsFading(true)
    }, VISIBLE_DURATION)

    return () => clearTimeout(visibleTimeout)
  }, [current])

  useEffect(() => {
    if (isFading) {
      const fadeTimeout = setTimeout(() => {
        setPrev(null)
        setIsFading(false)
      }, FADE_DURATION)
      return () => clearTimeout(fadeTimeout)
    }
  }, [isFading])

  return (
    <section className="mt-28 grid-cols-2 items-center gap-5 px-4 md:grid lg:grid-cols-3">
      <div className="flex flex-col gap-5 md:col-span-1 lg:col-span-2">
        <div className="flex flex-1 flex-col justify-between rounded-2xl bg-grey-dark p-5 sm:p-8">
          <div className="mb-14 flex flex-col gap-2">
            <h1
              className={clsx(
                "font-montserratAlt text-6xl font-black leading-[1.15] text-white-default",
                "xs:text-12xl sm:text-14xl md:text-7xl lg:text-14xl",
              )}
            >
              Build <span className="text-red-default">Stronger</span>,
              <br />
              <span className="text-green-default">Healthier</span> Teams
            </h1>
            <div className="flex items-end gap-2 font-bold">
              <span className="leading-none opacity-50">with</span>{" "}
              <span
                className={clsx(
                  "select-none bg-transparent font-montserratAlt text-2xl font-black",
                  "leading-none text-yellow-light",
                )}
                style={{ textShadow: "0px 0px 2px #FFF7DF" }}
              >
                Partly
              </span>
            </div>
          </div>

          <Button
            size="L"
            color="purple"
            href="/onboarding"
            containerClassName="w-fit"
          >
            Start 10-day free trial
          </Button>
        </div>

        <div className="grid grid-cols-3 items-center lg:gap-5">
          <div className="flex flex-col items-center gap-1">
            <span
              className={clsx(
                "font-montserratAlt text-4xl font-black leading-none text-purple-light",
                "sm:text-8xl md:text-2xl lg:text-9xl",
              )}
            >
              3
            </span>
            <span
              className={clsx(
                "font-montserratAlg text-xl font-black text-white-default",
                "sm:text-2xl md:text-lg lg:text-2xl",
              )}
            >
              Journeys
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span
              className={clsx(
                "font-montserratAlt text-4xl font-black leading-none text-purple-light",
                "sm:text-8xl md:text-2xl lg:text-9xl",
              )}
            >
              +75
            </span>
            <span
              className={clsx(
                "font-montserratAlg text-xl font-black text-white-default",
                "sm:text-2xl md:text-lg lg:text-2xl",
              )}
            >
              Lessons
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span
              className={clsx(
                "font-montserratAlt text-4xl font-black leading-none text-purple-light",
                "sm:text-8xl md:text-2xl lg:text-9xl",
              )}
            >
              +600
            </span>
            <span
              className={clsx(
                "font-montserratAlg text-xl font-black text-white-default",
                "sm:text-2xl md:text-lg lg:text-2xl",
              )}
            >
              Scenarios
            </span>
          </div>
        </div>
      </div>

      <div className="relative hidden h-full max-h-[420px] w-full overflow-hidden rounded-2xl md:block">
        <Image
          key={current}
          fill
          src={FADE_IMAGES[current]}
          alt=""
          className={clsx(
            "absolute inset-0 object-cover transition-opacity duration-1000",
            isFading ? "opacity-100" : "opacity-100",
            prev !== null && isFading ? "opacity-0" : "opacity-100",
          )}
          priority
        />

        {prev !== null && (
          <Image
            key={prev}
            fill
            src={FADE_IMAGES[prev]}
            alt=""
            className={clsx(
              "absolute inset-0 object-cover transition-opacity duration-1000",
              isFading ? "opacity-0" : "opacity-0",
            )}
            priority
            style={{ zIndex: 0 }}
          />
        )}
      </div>
    </section>
  )
}

export default HeroSection

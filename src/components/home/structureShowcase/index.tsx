"use client"

import AppearAnimated from "@/components/shared/AppearAnimated"
import Moment from "@/components/shared/Moment"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"
import StructureRow from "./StructureRow"

const SCREENSHOTS = [
  "/images/showcase/chat.webp",
  "/images/showcase/reflect.webp",
  "/images/showcase/grow.webp",
]

const SctructureShowcase = () => {
  const [selected, setSelected] = useState(1)
  const [currentPhoto, setCurrentPhoto] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev === 2 ? 0 : prev + 1))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="px-6 pt-18">
      <h1 className="text-center font-montserratAlt text-8xl font-black leading-[1.2] sm:text-16xl">
        How it works
      </h1>
      <StructureRow
        index={1}
        textContent={
          <>
            <h3 className="mb-4 font-montserratAlt text-12xl font-bold leading-[1]">
              Choose your{" "}
              <span className="font-black text-purple-light">Journey</span>
            </h3>
            <p className="">
              Get more{" "}
              <span className="font-montserratAlt font-black text-blue-default">
                Confident
              </span>{" "}
              <br />
              Lower your{" "}
              <span className="font-montserratAlt font-black text-purple-default">
                Anxiety
              </span>{" "}
              <br />
              or control your{" "}
              <span className="font-montserratAlt font-black text-red-default">
                Anger
              </span>
            </p>
          </>
        }
      >
        <div className="relative flex-1 flex-shrink-0">
          <AppearAnimated
            slide={false}
            className={clsx(
              "absolute right-[15%] top-0 sm:right-[40%]",
              selected === 1 && "z-[3]",
            )}
            delay={100}
          >
            <div className="relative aspect-square w-[140px] xs:w-[192px]">
              <Image
                draggable={false}
                src="/images/journeys/confidence.webp"
                fill
                className={clsx(
                  "-rotate-12 rounded-2xl object-contain",
                  "border-4 transition-colors",
                  selected === 1
                    ? "border-green-default"
                    : "border-transparent",
                )}
                alt=""
                onClick={() => setSelected(1)}
              />
            </div>
          </AppearAnimated>
          <AppearAnimated
            slide={false}
            className={clsx(
              "absolute right-[50%] top-[28%] z-[2] xs:right-[45%] sm:right-[20%]",
              selected === 2 && "z-[3]",
            )}
            delay={300}
          >
            <div className="relative aspect-square w-[140px] xs:w-[192px]">
              <Image
                draggable={false}
                src="/images/journeys/anxiety.webp"
                fill
                className={clsx(
                  "rounded-2xl object-contain",
                  "border-4 transition-colors",
                  selected === 2
                    ? "border-green-default"
                    : "border-transparent",
                )}
                alt=""
                onClick={() => setSelected(2)}
              />
            </div>
          </AppearAnimated>
          <AppearAnimated
            slide={false}
            className={clsx(
              "absolute right-[15%] top-[60%] z-[1] sm:right-[45%] sm:top-[45%]",
              selected === 3 && "z-[3]",
            )}
            delay={750}
          >
            <div className="relative aspect-square w-[140px] xs:w-[192px]">
              <Image
                draggable={false}
                src="/images/journeys/anger.webp"
                fill
                className={clsx(
                  "rotate-6 rounded-2xl object-contain",
                  "border-4 transition-colors",
                  selected === 3
                    ? "border-green-default"
                    : "border-transparent",
                )}
                alt=""
                onClick={() => setSelected(3)}
              />
            </div>
          </AppearAnimated>
        </div>
      </StructureRow>

      <StructureRow
        index={2}
        textContent={
          <>
            <h3 className="mb-4 font-montserratAlt text-12xl font-bold leading-[1]">
              Explore{" "}
              <span className="font-black text-yellow-default">Moments</span>
            </h3>
            <p className="">
              With{" "}
              <span className="font-montserratAlt font-bold text-blue-light">
                guided
              </span>{" "}
              steps &{" "}
              <span className="font-montserratAlt font-bold text-blue-light">
                personal
              </span>{" "}
              insights
            </p>
          </>
        }
      >
        <div className="relative flex flex-1 flex-shrink-0 flex-col items-center justify-center">
          <div className="relative">
            <AppearAnimated delay={100}>
              <Moment
                tag="reflection"
                title="Acknowledging Effort"
                description="Recognize that staying busy is a way you try to manage discomfort or stress"
                imgSrc="https://vddlwdnrmeixsllizovo.supabase.co/storage/v1/object/public/moment-covers//acknowledging-effort.webp"
              />
            </AppearAnimated>
          </div>
          <div className="relative -mt-3 scale-[0.97] xs:-mt-4">
            <AppearAnimated delay={750}>
              <Moment
                tag="manager"
                title="Hyper-Alert"
                description="Meet the part that’s always scanning for threats, keeping you on guard"
                imgSrc="https://vddlwdnrmeixsllizovo.supabase.co/storage/v1/object/public/moment-covers//hyper-alert.webp"
              />
            </AppearAnimated>
          </div>
          <div className="relative -mt-3 scale-[0.94] xs:-mt-5">
            <AppearAnimated delay={1500}>
              <Moment
                tag="exile"
                title="The Old Longing"
                description="Sense a younger part that learned love or safety depended on pleasing others"
                imgSrc="https://vddlwdnrmeixsllizovo.supabase.co/storage/v1/object/public/moment-covers//the-old-longing.webp"
              />
            </AppearAnimated>
          </div>
        </div>
      </StructureRow>

      <StructureRow
        index={3}
        textContent={
          <>
            <h3 className="mb-4 flex-wrap font-montserratAlt text-12xl font-bold leading-[1]">
              Reflect, Chat,{" "}
              <span className="font-black text-green-default">Grow</span>
            </h3>
            <p className="">
              All in one app <br />
              Which guides you through{" "}
              <span className="font-montserratAlt font-bold text-purple-light">
                your patterns and emotions
              </span>
            </p>
          </>
        }
      >
        <div className="relative flex flex-1 items-center justify-center">
          <AppearAnimated delay={500} slideFrom="right">
            <Image
              alt="iPhone mockup"
              src={SCREENSHOTS[currentPhoto]}
              height={720}
              width={720}
              sizes="100vh"
              className="pointer-events-none relative z-[2] h-[520px] object-contain"
            />
          </AppearAnimated>
        </div>
      </StructureRow>
    </section>
  )
}

export default SctructureShowcase

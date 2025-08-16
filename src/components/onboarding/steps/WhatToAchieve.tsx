"use client"

import Button from "@/components/shared/Button"
import clsx from "clsx"
import { useState } from "react"

const ACHIEVEMENTS = [
  {
    key: "tension",
    label: "Reduce workplace tension",
  },
  {
    key: "productivity",
    label: "Increase team productivity",
  },
  {
    key: "feedback",
    label: "Foster a culture of open feedback",
  },
  {
    key: "anxiety",
    label: "Reduce team anxiety during high-pressure projects",
  },
  {
    key: "conflict",
    label: "Improve conflict resolution",
  },
  {
    key: "other",
    label: "Other",
  },
]

const WhatToAchieve = () => {
  const [selected, setSelected] = useState<Array<string>>([])

  const handleSelect = (industry: string) => {
    const isSelected = selected.find((item) => item === industry)
    console.log(isSelected)

    if (isSelected) {
      setSelected((prev) => prev.filter((item) => item !== industry))
    } else {
      setSelected((prev) => [...prev, industry])
    }
  }

  return (
    <section className="mx-auto max-w-lg px-6 py-10">
      <div className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-center font-montserratAlt text-2xl font-bold">
          What do you want to{" "}
          <span className="font-black text-green-default">achieve</span> <br />
          with{" "}
          <span
            className="font-black text-yellow-light"
            style={{ textShadow: "0px 0px 2px #FFF7DF" }}
          >
            Partly
          </span>
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        {ACHIEVEMENTS.map((item) => (
          <button
            key={item.key}
            className={clsx(
              "flex w-full items-center gap-3 rounded-lg px-5 py-4",
              "transition-[colors.transform]",
              selected.includes(item.label)
                ? "scale-[97%] bg-purple-default"
                : "bg-white-default/10",
            )}
            onClick={() => handleSelect(item.label)}
          >
            <div
              className={clsx(
                "h-3 w-3 rounded-[3px] outline outline-1 outline-white-default/50",
                "transition-colors",
                selected.includes(item.label)
                  ? "bg-white-default/50"
                  : "bg-transparent",
              )}
            ></div>
            <span className="text-left">{item.label}</span>
          </button>
        ))}
      </div>

      <Button
        disabled={selected.length === 0}
        size="L"
        color="purple"
        className="mt-10 w-full"
      >
        Continue
      </Button>
    </section>
  )
}

export default WhatToAchieve

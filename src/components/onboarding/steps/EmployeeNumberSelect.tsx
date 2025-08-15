"use client"

import { useEffect, useRef, useState } from "react"

import Button from "@/components/shared/Button"
import { Minus, Plus } from "react-feather"
import "./styles.css"

const MIN = 5
const MAX = 250

const EmployeeNumberSelect = () => {
  const [count, setCount] = useState(5)

  const ref = useRef<HTMLInputElement>(null)

  const updateBg = (v: number) => {
    const pct = ((v - MIN) / (MAX - MIN)) * 100
    ref.current?.style.setProperty("--pos", `${pct}%`)
  }

  useEffect(() => {
    updateBg(count)
  }, [count, MIN, MAX])

  return (
    <section className="mx-auto max-w-lg px-6 py-10">
      <div className="mb-12 flex flex-col items-center">
        <h1 className="mb-2 text-center font-montserratAlt text-2xl font-bold">
          Let's build a{" "}
          <span className="font-black text-yellow-default">well-being</span>{" "}
          plan <br className="hidden xs:inline" />
          that fits your team
        </h1>
        <span className="text-center text-sm">
          How many people work with you?
        </span>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <Button
          containsIconOnly
          size="S"
          color="white"
          onClick={() => setCount((prev) => (prev !== MIN ? prev - 1 : prev))}
        >
          <Minus size={24} color="black" />
        </Button>
        <span className="flex-1 text-center font-montserratAlt text-12xl font-black">
          {count}
        </span>
        <Button
          containsIconOnly
          size="S"
          color="white"
          onClick={() => setCount((prev) => (prev !== MAX ? prev + 1 : prev))}
        >
          <Plus size={24} color="black" />
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm">{MIN}</span>
        <span className="text-sm">{MAX}</span>
      </div>
      <input
        ref={ref}
        type="range"
        min={MIN}
        max={MAX}
        step={1}
        value={count}
        onChange={(e) => {
          const v = Number(e.target.value)
          setCount(v)
        }}
        className={`range`}
        aria-label="range"
      />

      <Button size="L" color="purple" className="mt-18 w-full">
        Continue
      </Button>
    </section>
  )
}

export default EmployeeNumberSelect

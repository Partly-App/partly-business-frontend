import Button from "@/components/shared/Button"
import clsx from "clsx"
import { useState } from "react"

const INDUSTRIES = [
  "Finance",
  "IT",
  "Healthcare",
  "Education",
  "Media",
  "Legal",
  "Government",
  "Retail",
  "Professional services",
  "Other",
]

const IndustrySelect = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<typeof INDUSTRIES>(
    [],
  )

  const handleSelect = (industry: string) => {
    const isSelected = selectedIndustry.find((item) => item === industry)
    console.log(isSelected)

    if (isSelected) {
      setSelectedIndustry((prev) => prev.filter((item) => item !== industry))
    } else {
      setSelectedIndustry((prev) => [...prev, industry])
    }
  }

  return (
    <section className="mx-auto max-w-lg px-6 py-10">
      <div className="mb-12 flex flex-col items-center">
        <h1 className="mb-2 text-center font-montserratAlt text-2xl font-bold">
          What <span className="font-black text-blue-default">industry</span> is
          your team in?
        </h1>
        <span className="text-center text-sm">
          We'll personalize your experience based on the challenges you face
        </span>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-3">
        {INDUSTRIES.map((label) => (
          <button
            key={label}
            className={clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2",
              "transition-[colors.transform]",
              selectedIndustry.includes(label)
                ? "scale-90 bg-purple-default"
                : "bg-white-default/10",
            )}
            onClick={() => handleSelect(label)}
          >
            <div
              className={clsx(
                "h-3 w-3 rounded-[3px] outline outline-1 outline-white-default/50",
                "transition-colors",
                selectedIndustry.includes(label)
                  ? "bg-white-default/50"
                  : "bg-transparent",
              )}
            ></div>
            <span className="capitalize">{label}</span>
          </button>
        ))}
      </div>

      <Button
        disabled={selectedIndustry.length === 0}
        size="L"
        color="purple"
        className="mt-18 w-full"
      >
        Continue
      </Button>
    </section>
  )
}

export default IndustrySelect

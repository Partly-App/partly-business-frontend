import Button from "@/components/shared/Button"
import clsx from "clsx"
import Image from "next/image"
import { useState } from "react"
import { OnboardingStepType } from "../types"

const DEPARTMENTS = [
  { label: "HR", imgSrc: "/images/departments/hr.png" },
  { label: "Marketing", imgSrc: "/images/departments/marketing.png" },
  { label: "Sales", imgSrc: "/images/departments/sales.png" },
  { label: "IT", imgSrc: "/images/departments/it.png" },
  { label: "Support", imgSrc: "/images/departments/support.png" },
  { label: "Other", imgSrc: "/images/departments/other-departments.png" },
]

const DepartmentSelect = ({ onNext, data }: OnboardingStepType) => {
  const [selectedDepartment, setSelectedDepartment] = useState<Array<string>>(
    data?.department || [],
  )

  const handleSelect = (department: string) => {
    const isSelected = selectedDepartment.find((item) => item === department)
    console.log(isSelected)

    if (isSelected) {
      setSelectedDepartment((prev) =>
        prev.filter((item) => item !== department),
      )
    } else {
      setSelectedDepartment((prev) => [...prev, department])
    }
  }

  return (
    <section className="mx-auto max-w-lg px-6 py-10">
      <div className="mb-12 flex flex-col items-center">
        <h1 className="mb-2 text-center font-montserratAlt text-2xl font-bold">
          What <span className="font-black text-blue-default">departments</span>{" "}
          make up your team?
        </h1>
        <span className="text-center text-sm">
          This will help us tailor guidance to each group&apos;s needs
        </span>
      </div>

      <div className="mb-2 grid grid-cols-3 justify-center gap-3">
        {DEPARTMENTS.map((item) => (
          <button
            key={item.label}
            className={clsx(
              "flex aspect-square w-full items-center gap-4 rounded-lg p-3",
              "gap flex-col justify-center transition-[colors.transform]",
              selectedDepartment.includes(item.label)
                ? "scale-95 bg-purple-default"
                : "bg-white-default/10",
            )}
            onClick={() => handleSelect(item.label)}
          >
            <Image
              alt=""
              draggable={false}
              src={item.imgSrc}
              sizes="100vh"
              width={52}
              height={52}
            />
            <span className="font-montserratAlt text-sm font-bold">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <span className="block text-center font-montserratAlt text-xs font-bold opacity-25">
        Later you&apos;ll be able to add/remove departments
      </span>

      <Button
        disabled={selectedDepartment.length === 0}
        size="L"
        color="purple"
        className="mt-14 w-full"
        onClick={() => {
          onNext({ department: selectedDepartment })
        }}
      >
        Continue
      </Button>
    </section>
  )
}

export default DepartmentSelect

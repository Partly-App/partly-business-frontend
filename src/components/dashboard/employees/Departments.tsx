"use client"

import { getRandomColor } from "@/utils/colors"
import clsx from "clsx"
import { useMemo } from "react"
import { Plus, User } from "react-feather"
import { EmployeesPageContentProps } from "./EmployeesPageContent"

const Departments = ({ departments, employees }: EmployeesPageContentProps) => {
  const employeeCountPerDepartment = useMemo(() => {
    const departmentEmployeeCounts = new Map<string, number>()

    employees?.forEach((emp) => {
      if (emp.departmentId) {
        departmentEmployeeCounts.set(
          emp.departmentId,
          (departmentEmployeeCounts.get(emp.departmentId) || 0) + 1,
        )
      }
    })

    return departmentEmployeeCounts
  }, [departments, employees])

  return (
    <>
      <div className="mb-4 px-6">
        <h1 className="font-montserratAlt text-4xl font-black">Departments</h1>
      </div>
      <div
        className={clsx(
          "flex gap-4 overflow-x-auto px-6 pb-2",
          "scrollbar-track-transparent scrollbar-thumb-white-default/25 scrollbar-thin",
        )}
      >
        <div
          className={clsx(
            "rounded-xl border border-white-default/50 bg-white-default/10 p-4",
            "flex aspect-square w-28 shrink-0 items-center justify-center",
            "cursor-pointer transition-transform hover:scale-95",
          )}
        >
          <Plus size={42} className="text-purple-light" />
        </div>

        {departments?.map((item) => {
          const color = getRandomColor(["transparent"])
          const count = item.id
            ? employeeCountPerDepartment.get(item.id) || 0
            : 0

          return (
            <div
              key={item.id}
              className={clsx(
                "relative aspect-video rounded-xl px-4 py-6",
                "flex shrink-0 items-center justify-center",
                "cursor-pointer transition-transform hover:scale-95",
                color.backgroundColor,
                color.color,
              )}
            >
              <div className="absolute right-2 top-2 flex items-center gap-1">
                <span className="font-montserratAlt text-sm font-bold leading-none">
                  {count}
                </span>
                <User size={14} className={color.color} />
              </div>
              <span className="text-center font-montserratAlt font-black">
                {item.name}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Departments

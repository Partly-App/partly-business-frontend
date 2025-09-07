"use client"

import { useSupabase } from "@/components/shared/providers"
import { getRandomColor } from "@/utils/colors"
import clsx from "clsx"
import { useMemo, useState } from "react"
import { Plus, User } from "react-feather"
import DepartmentSidebar from "./DepartmentSidebar"
import { EmployeesPageContentProps } from "./EmployeesPageContent"

const Departments = ({ departments, employees }: EmployeesPageContentProps) => {
  const [openedDepartmentId, setOpenedDepartmentId] = useState("")
  const [isSidebarMounted, setIsSidebarMounted] = useState(false)

  const supabase = useSupabase()

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

  const openSidebar = (id?: string) => {
    if (id) {
      setOpenedDepartmentId(id)
      setIsSidebarMounted(true)
    }
  }

  return (
    <>
      <div className="mb-4 px-6">
        <h1 className="font-montserratAlt text-4xl font-black">Departments</h1>
      </div>
      <div
        className={clsx(
          "flex gap-4 overflow-x-auto px-6 pb-2",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white-default/25",
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
          const color = item.id
            ? getRandomColor(item.id, ["transparent"])
            : undefined
          const count = item.id
            ? employeeCountPerDepartment.get(item.id) || 0
            : 0

          return (
            <div
              key={item.id}
              className={clsx(
                "relative aspect-video w-40 rounded-xl px-4 py-6",
                "flex shrink-0 items-center justify-center",
                "cursor-pointer transition-transform hover:scale-95",
                color?.backgroundColor,
                color?.color,
              )}
              onClick={() => openSidebar(item.id)}
            >
              <div className="absolute right-2 top-2 flex items-center gap-1">
                <span className="font-montserratAlt text-sm font-bold leading-none">
                  {count}
                </span>
                <User size={14} className={color?.color} />
              </div>
              <span className="text-center font-montserratAlt font-black">
                {item.name}
              </span>
            </div>
          )
        })}
      </div>
      {isSidebarMounted && (
        <DepartmentSidebar
          isOpen={!!openedDepartmentId}
          title={
            departments?.find((item) => item.id == openedDepartmentId)?.name
          }
          id={openedDepartmentId}
          onClose={() => setOpenedDepartmentId("")}
          onExited={() => setIsSidebarMounted(false)}
        />
      )}
    </>
  )
}

export default Departments

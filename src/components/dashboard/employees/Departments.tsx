"use client"

import Button from "@/components/shared/Button"
import Edit from "@/components/shared/icons/Edit"
import { supabase } from "@/lib/supabaseClient"
import { getRandomColor } from "@/utils/colors"
import { toggleStringInArray } from "@/utils/general"
import clsx from "clsx"
import useEmblaCarousel from "embla-carousel-react"
import { useMemo, useState } from "react"
import { User, X } from "react-feather"
import DepartmentSideModalContent from "./DepartmentSideModalContent"
import { EmployeesPageContentProps } from "./EmployeesPageContent"
import NewDepartment from "./NewDepartment"

const Departments = ({
  departments: initialDepartments,
  employees,
  companyId,
}: Omit<EmployeesPageContentProps, "scores">) => {
  const [openedDepartmentId, setOpenedDepartmentId] = useState("")
  const [isSidebarMounted, setIsSidebarMounted] = useState(false)
  const [isBeingEdited, setIsBeingEdited] = useState(false)
  const [departmentsToDelete, setDepartmentsToDelete] = useState<Array<string>>(
    [],
  )
  const [departments, setDepartments] =
    useState<EmployeesPageContentProps["departments"]>(initialDepartments)

  const [emblaRef] = useEmblaCarousel({ dragFree: true })

  const employeeCountPerDepartment = useMemo(() => {
    const departmentEmployeeCounts = new Map<string, number>()

    employees?.forEach((emp) => {
      if (emp.department?.id) {
        departmentEmployeeCounts.set(
          emp.department.id,
          (departmentEmployeeCounts.get(emp.department.id) || 0) + 1,
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

  const handleDepartmentDelete = async () => {
    const { error } = await supabase
      .from("departments")
      .delete()
      .in("id", departmentsToDelete)

    if (error) {
      console.error("Error deleting departments: ", error)
      return
    }

    const newDepartments = departments?.filter(
      (item) => !departmentsToDelete.includes(item.id!),
    )

    setDepartments(newDepartments || [])
    setDepartmentsToDelete([])
    setIsBeingEdited(false)
  }

  return (
    <>
      <div className="mb-2 flex items-center gap-4 px-5 sm:px-9">
        <h1 className="font-montserratAlt text-4xl font-black">Departments</h1>
        {isBeingEdited ? (
          <>
            <Button
              containsIconOnly
              size="S"
              color="red"
              onClick={() => {
                setIsBeingEdited(false)
                setDepartmentsToDelete([])
              }}
            >
              <X size={14} className="text-white-default" />
            </Button>
            <Button
              size="S"
              color="green"
              containerClassName="!min-h-[38px]"
              onClick={handleDepartmentDelete}
              disabled={departmentsToDelete.length === 0}
            >
              Delete
            </Button>
          </>
        ) : (
          <Button
            size="XS"
            color="transparent"
            containsIconOnly
            onClick={() => setIsBeingEdited((prev) => !prev)}
          >
            <Edit size={14} className="text-white-default" />
          </Button>
        )}
      </div>
      <div className="overflow-x-hidden pr-5 sm:pr-9" ref={emblaRef}>
        <div className="flex gap-4 px-5 py-2 sm:px-9">
          <NewDepartment companyId={companyId} disabled={isBeingEdited} />
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
                  departmentsToDelete.includes(item.id!) && "!scale-95",
                  color?.backgroundColor,
                  color?.color,
                )}
                onClick={() => {
                  if (isBeingEdited) {
                    setDepartmentsToDelete((prev) =>
                      toggleStringInArray(prev, item.id!),
                    )
                  } else {
                    openSidebar(item.id)
                  }
                }}
              >
                {isBeingEdited && (
                  <div
                    className={clsx(
                      "h-4.5 w-4.5 rounded-md border border-black-default/50",
                      "absolute left-2 top-2 transition-colors",
                      departmentsToDelete.includes(item.id!)
                        ? "bg-green-default"
                        : "bg-grey-default",
                    )}
                  />
                )}

                <div className="absolute right-2 top-2 flex items-center gap-1">
                  <span className="select-none font-montserratAlt text-sm font-bold leading-none">
                    {count}
                  </span>
                  <User
                    size={14}
                    className={clsx(color?.color, "select-none")}
                  />
                </div>
                <span className="select-none break-all text-center font-montserratAlt font-black">
                  {item.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      {isSidebarMounted && (
        <DepartmentSideModalContent
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

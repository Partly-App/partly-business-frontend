"use client"

import Button from "@/components/shared/Button"
import Edit from "@/components/shared/icons/Edit"
import { useSupabase } from "@/components/shared/providers"
import { useToast } from "@/context/ToastContext"
import { Department, Employee } from "@/types/employee"
import clsx from "clsx"
import { useCallback, useEffect, useMemo, useState } from "react"
import { X } from "react-feather"
import EmployeeRow from "./EmployeeRow"
import EmployeeSideModalContent from "./EmployeeSideModalContent"
import { EmployeeConstructed } from "./EmployeesPageContent"

type EmployeesProps = {
  employees: Array<EmployeeConstructed>
  scores:
    | {
        score: number
        userId: string
      }[]
    | null
}

type EmployeeMap = Record<
  string,
  {
    id: string
    department: { id: string; name: string } | null
    role: string | null
  }
>

const EmployeesList = ({
  employees: initialEmployeeList,
  scores,
}: EmployeesProps) => {
  const [isSidebarMounted, setIsSidebarMounted] = useState(false)
  const [openedEmployeeId, setOpenedEmployeeId] = useState<string | null>(null)
  const [isBeingEdited, setIsBeingEdited] = useState(false)
  const [values, setValues] = useState<EmployeeMap | null>(null)
  const [defaultValues, setDefaultValues] = useState<EmployeeMap | null>(null)
  const [departments, setDepartments] = useState<Array<
    Partial<Department>
  > | null>(null)
  const [employees, setEmployees] = useState(initialEmployeeList)

  const { showToast } = useToast()

  const supabase = useSupabase()

  const scoreByUserMap = useMemo(() => {
    if (!scores) return {}
    return scores.reduce(
      (acc, curr) => {
        if (!(curr.userId in acc)) {
          acc[curr.userId] = curr.score
        }
        return acc
      },
      {} as Record<string, number>,
    )
  }, [scores])

  const openSidebar = (id?: string) => {
    if (id) {
      setOpenedEmployeeId(id)
      setIsSidebarMounted(true)
    }
  }

  const updateEmployees = async () => {
    setIsBeingEdited(false)

    if (!values) return

    const updates = Object.entries(values)
      .map(([id, value]) => {
        const employee = employees.find((item) => item.id === id)
        if (!employee) return null

        const originalRole = employee.role ?? null
        const originalDepartmentId = employee.department?.id ?? null
        const newRole = value.role ?? null
        const newDepartmentId = value.department?.id ?? null

        if (
          originalRole === newRole &&
          originalDepartmentId === newDepartmentId
        ) {
          return null
        }

        return {
          id: employee.id,
          departmentId: newDepartmentId,
          role: newRole,
          companyId: employee.companyId as string,
          userId: employee.profile.id as string,
        }
      })
      .filter((u): u is Employee => u !== null)

    const { error } = await supabase
      .from("employees")
      .upsert(updates, { onConflict: "id" })

    if (error) {
      console.error("Error updating employees: ", error)
      showToast(
        "Failed to update employees! Please, try again later.",
        "bottom",
        "error",
      )
      return
    } else {
      console.log("Updated employees")
    }

    setEmployees((prev) =>
      prev.map((emp) => {
        const updated = Object.values(values).find((u) => u.id === emp.id)
        return updated
          ? {
              ...emp,
              role: updated.role,
              departmentId: updated.department?.id ?? null,
              department: updated.department
                ? { id: updated.id, name: updated.department.name }
                : emp.department,
            }
          : emp
      }),
    )

    showToast("Employees updated!", "bottom", "success")
  }

  const getDepartments = useCallback(async () => {
    const { data, error } = await supabase
      .from("departments")
      .select("id, name")
    if (!data?.length || error) {
      console.error("Error fetching departments in EmployeeList: ", error)
      showToast(
        "Failed to find your departments! Please, try again later or add departments.",
        "bottom",
        "error",
      )
      setDepartments([])
      return
    }
    setDepartments(data)
  }, [supabase])

  useEffect(() => {
    getDepartments()
  }, [getDepartments])

  useEffect(() => {
    const mappedValues = employees.reduce((acc, emp) => {
      const id = emp.id
      if (!id) return acc

      acc[id] = {
        id: id,
        department:
          emp.department?.name && emp.department?.id
            ? { id: emp.department.id, name: emp.department.name }
            : null,
        role: emp.role ?? null,
      }
      return acc
    }, {} as EmployeeMap)

    setValues(mappedValues)
    setDefaultValues(mappedValues)
  }, [employees])

  return (
    <>
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-4 px-5 sm:px-9">
          <h1 className="font-montserratAlt text-4xl font-black leading-none">
            Employees
          </h1>
          <div className={clsx("flex items-center gap-2.5")}>
            {isBeingEdited ? (
              <>
                <Button
                  containsIconOnly
                  size="S"
                  color="red"
                  onClick={() => {
                    setIsBeingEdited(false)
                    setValues(defaultValues)
                  }}
                >
                  <X size={14} className="text-white-default" />
                </Button>
                <Button
                  size="S"
                  color="green"
                  containerClassName="!min-h-[38px]"
                  onClick={updateEmployees}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="XS"
                  color="transparent"
                  containsIconOnly
                  onClick={() => setIsBeingEdited((prev) => !prev)}
                >
                  <Edit size={14} className="text-white-default" />
                </Button>
                <Button size="XS" color="transparent" containsIconOnly>
                  <span className="font-montserratAlt text-2xl leading-none text-white-default">
                    +
                  </span>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center px-5 sm:px-9">
          <p className="w-1/3 font-bold opacity-50">Name</p>
          <p className="w-1/3 flex-wrap text-center font-bold opacity-50">
            Department/Role
          </p>
          <p className="w-1/3 text-right font-bold opacity-50">
            Well-being Score
          </p>
        </div>
        <div className="flex flex-col px-3 sm:px-7">
          {employees?.map((item) => (
            <div key={item.id}>
              <EmployeeRow
                employee={item}
                onClick={openSidebar}
                score={scoreByUserMap[item.profile.id!]}
                isBeingEdited={isBeingEdited}
                departmentValue={values?.[item.id!].department || null}
                departmentOnChange={(value) =>
                  setValues((prev) => ({
                    ...prev,
                    [item.id!]: {
                      ...prev?.[item.id!],
                      id: prev?.[item.id!].id as string,
                      role: prev?.[item.id!].role ?? null,
                      department: value,
                    },
                  }))
                }
                roleValue={values?.[item.id!].role || ""}
                roleOnChange={(value) =>
                  setValues((prev) => ({
                    ...prev,
                    [item.id!]: {
                      ...prev?.[item.id!],
                      id: prev?.[item.id!].id as string,
                      role: value,
                      department: prev?.[item.id!].department ?? null,
                    },
                  }))
                }
                allDepartments={departments}
              />
              <div className="mx-auto h-[1px] w-[98%] bg-white-default/10" />
            </div>
          ))}
        </div>
      </div>

      {isSidebarMounted && (
        <EmployeeSideModalContent
          isOpen={!!openedEmployeeId}
          title={
            employees?.find((item) => item.profile.id == openedEmployeeId)
              ?.profile.fullName
          }
          id={openedEmployeeId}
          onClose={() => setOpenedEmployeeId("")}
          onExited={() => setIsSidebarMounted(false)}
        />
      )}
    </>
  )
}

export default EmployeesList

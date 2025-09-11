"use client"

import Button from "@/components/shared/Button"
import Input from "@/components/shared/Input"
import SideSlideModal from "@/components/shared/modals/SideSlideModal"
import { useSupabase } from "@/components/shared/providers"
import { Employee } from "@/types/employee"
import { Profile } from "@/types/profile"
import { toggleStringInArray } from "@/utils/general"
import clsx from "clsx"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { Plus } from "react-feather"

const NewDepartment = ({
  companyId,
  disabled,
}: {
  companyId: string
  disabled: boolean
}) => {
  const [isNewDepOpen, setIsNewDepOpen] = useState(false)
  const [isNewDepMounted, setIsNewDepMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [nameValue, setNameValue] = useState("")
  const [employees, setEmployees] = useState<Array<
    Partial<Employee> & { profile: Partial<Profile> }
  > | null>(null)
  const [selectedIds, setSelectedIds] = useState<Array<string>>([])

  const supabase = useSupabase()

  const handleClose = () => {
    setIsNewDepOpen(false)
    setNameValue("")
    setSelectedIds([])
  }

  const handleDepartmentCreation = async () => {
    const { data: departmentData, error: departmentError } = await supabase
      .from("departments")
      .insert({
        companyId: companyId,
        name: nameValue,
      })
      .select("id")
      .single()

    if (!departmentData || departmentError) {
      console.error("Error creating a department: ", departmentError)
      setIsLoading(false)
      handleClose()
      return
    }

    const { data: departmentScoreData, error: departmentScoreError } =
      await supabase
        .from("departmentScores")
        .upsert({ score: 50, departmentId: departmentData.id })
        .select("id")
        .single()

    if (!departmentScoreData || departmentScoreError) {
      console.error(
        "Error creating initial department score: ",
        departmentScoreError,
      )
      handleClose()
      return
    } else {
      const { error: departmentSubScoreError } = await supabase
        .from("departmentSubScores")
        .upsert([
          {
            score: 50,
            reason: null,
            departmentScoreId: departmentScoreData.id,
            type: "anxiety",
          },
          {
            score: 50,
            reason: null,
            departmentScoreId: departmentScoreData.id,
            type: "anger",
          },
          {
            score: 50,
            reason: null,
            departmentScoreId: departmentScoreData.id,
            type: "confidence",
          },
        ])

      if (departmentSubScoreError) {
        console.error(
          "Error creating initial department sub scores: ",
          departmentSubScoreError,
        )
      }
    }

    const { error } = await supabase
      .from("employees")
      .update({ departmentId: departmentData.id })
      .in("id", selectedIds)

    if (error) {
      console.error("Error updating departmentIds in employees: ", error)
    }

    handleClose()
  }

  const getEmployeeList = useCallback(async () => {
    const { data, error } = await supabase
      .from("employees")
      .select("id, profile:userId(id, avatarUrl, fullName), companyId, role")

    if (error) {
      console.error("Error fetching employees for new department: ", error)
    }

    setEmployees(data || [])

    setIsLoading(false)
  }, [supabase, companyId])

  useEffect(() => {
    getEmployeeList()
  }, [getEmployeeList])

  return (
    <>
      <div
        className={clsx(
          "rounded-xl border bg-white-default/5 p-4",
          "flex aspect-square w-28 shrink-0 items-center justify-center",
          "transition-transform",
          disabled
            ? "cursor-default border-grey-default"
            : "cursor-pointer border-purple-light hover:scale-95",
        )}
        onClick={() => {
          if (!disabled) {
            setIsNewDepOpen(true)
            setIsNewDepMounted(true)
          }
        }}
      >
        <Plus
          size={42}
          className={disabled ? "text-grey-default" : "text-purple-light"}
        />
      </div>
      {isNewDepMounted && (
        <SideSlideModal
          isOpen={isNewDepOpen}
          onClose={() => setIsNewDepOpen(false)}
          onExited={() => setIsNewDepMounted(false)}
          isLoading={isLoading}
          title="New Department"
        >
          <Button
            color="white"
            size="M"
            containerClassName="fixed right-4 bottom-4"
            disabled={selectedIds.length === 0 || nameValue.length === 0}
            onClick={handleDepartmentCreation}
          >
            Create
          </Button>
          <div className="flex flex-col gap-6 pt-8">
            <div className="flex flex-col gap-2">
              <span className="font-montserratAlt text-xl font-black">
                Name
              </span>
              <Input
                value={nameValue}
                onChange={(v) => setNameValue(v.target.value.substring(0, 25))}
                placeholder="Marketing"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="items-cente flex gap-3">
                <span className="font-montserratAlt text-xl font-black">
                  Select Employees
                </span>
                <span className="font-montserratAlt text-xl font-black">
                  {selectedIds.length}/
                  <span className="opacity-50">{employees?.length || 0}</span>
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between px-2">
                  <span className="font-black opacity-25">Name</span>
                  <span className="font-black opacity-25">Role</span>
                </div>

                <div className="flex flex-col pb-16">
                  {employees?.map((item) => (
                    <div key={item.id}>
                      <div
                        className={clsx(
                          "group w-full cursor-pointer rounded-xl p-2 transition-colors",
                          "flex items-center gap-4 hover:bg-white-default/10",
                          selectedIds.includes(item.id!) &&
                            "!bg-purple-default",
                        )}
                        onClick={() =>
                          setSelectedIds((prev) =>
                            toggleStringInArray(prev, item.id!),
                          )
                        }
                      >
                        <div className="flex w-1/2 select-none items-center gap-3">
                          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              fill
                              src={
                                item.profile.avatarUrl ||
                                "/images/profile-placeholder.png"
                              }
                              alt=""
                            />
                            <div
                              className={clsx(
                                "absolute flex h-full w-full items-center justify-center bg-grey-default",
                                "opacity-0 transition-opacity group-hover:opacity-100",
                              )}
                            >
                              <div
                                className={clsx(
                                  "h-4 w-4 rounded-md border-2 border-purple-light transition-colors",
                                  selectedIds.includes(item.id!) &&
                                    "!bg-purple-light",
                                )}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-medium sm:text-base">
                            {item.profile.fullName}
                          </span>
                        </div>

                        <div className="flex w-1/2 justify-end pr-2">
                          <span className="text-right font-bold opacity-50">
                            {item.role}
                          </span>
                        </div>
                      </div>
                      <div className="mx-auto my-1 h-[1px] w-[96%] bg-white-default/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SideSlideModal>
      )}
    </>
  )
}

export default NewDepartment
